import { describe, expect, it } from 'vitest';
import {
  activeScale,
  classifyPointerTarget,
  classifyTarget,
  cursorReducer,
  deriveView,
  INTERACTIVE_SELECTOR,
  isCursorEnabled,
  isSettled,
  MAX_FRAME_MS,
  NONE_SELECTOR,
  parseCssMs,
  parseCssPx,
  readCursorTokens,
  shouldStopLoop,
  smoothingAlpha,
  stepRing,
  TEXT_SELECTOR,
  type CursorConditions,
  type CursorEvent,
  type CursorMode,
} from '@/lib/cursor';

// Cursor state machine and loop control (CLAUDE_CONTEXT.md §5.2, §13).

const allOn: CursorConditions = {
  jsReady: true,
  finePointer: true,
  reducedMotion: false,
  motionOn: true,
  forcedColors: false,
};

describe('isCursorEnabled', () => {
  it('is enabled only when every condition holds', () => {
    expect(isCursorEnabled(allOn)).toBe(true);
  });

  it.each([
    ['JavaScript not ready (SSR, hydration)', { jsReady: false }],
    ['touch / non-fine pointer', { finePointer: false }],
    ['prefers-reduced-motion', { reducedMotion: true }],
    ['motion toggle off', { motionOn: false }],
    ['forced colours', { forcedColors: true }],
  ] as const)('is inert on %s', (_label, override) => {
    expect(isCursorEnabled({ ...allOn, ...override })).toBe(false);
  });
});

describe('classifyTarget', () => {
  const stub = (...matching: string[]) => ({
    closest: (selector: string) => (matching.includes(selector) ? {} : null),
  });

  it('defaults when there is no target or no match', () => {
    expect(classifyTarget(null)).toBe('default');
    expect(classifyTarget(stub())).toBe('default');
  });

  it('classifies each kind', () => {
    expect(classifyTarget(stub(INTERACTIVE_SELECTOR))).toBe('interactive');
    expect(classifyTarget(stub(TEXT_SELECTOR))).toBe('text');
    expect(classifyTarget(stub(NONE_SELECTOR))).toBe('none');
  });

  it('gives none precedence over interactive and text, and interactive over text', () => {
    expect(classifyTarget(stub(NONE_SELECTOR, INTERACTIVE_SELECTOR, TEXT_SELECTOR))).toBe('none');
    expect(classifyTarget(stub(INTERACTIVE_SELECTOR, TEXT_SELECTOR))).toBe('interactive');
  });

  it('covers the spec selectors: links, buttons, role=button, summary', () => {
    for (const part of ['a', 'button', '[role="button"]', 'summary']) {
      expect(INTERACTIVE_SELECTOR.split(', ')).toContain(part);
    }
  });
});

describe('classifyPointerTarget (shadow-DOM retargeting)', () => {
  const host = { closest: (selector: string) => (selector === INTERACTIVE_SELECTOR ? {} : null) };
  const plain = { closest: () => null };

  it('defers to the native cursor when the real target differs from the retargeted one', () => {
    // Over a shadow-DOM widget, event.target is the host and composedPath()[0] is the inner element.
    expect(classifyPointerTarget(host, { inner: true })).toBe('none');
    expect(classifyPointerTarget(plain, { inner: true })).toBe('none');
  });

  it('classifies normally when there was no retargeting', () => {
    expect(classifyPointerTarget(host, host)).toBe('interactive');
    expect(classifyPointerTarget(plain, plain)).toBe('default');
    expect(classifyPointerTarget(null, null)).toBe('default');
  });

  it('classifies normally when the composed target is unavailable', () => {
    expect(classifyPointerTarget(host, undefined)).toBe('interactive');
  });
});

describe('cursorReducer', () => {
  const run = (events: CursorEvent[], start: CursorMode = 'inert'): CursorMode =>
    events.reduce(cursorReducer, start);

  it('ignores movement while inert', () => {
    expect(run([{ type: 'move', kind: 'interactive' }, { type: 'leave' }])).toBe('inert');
  });

  it('arms on enable and stays native-cursor until the first move', () => {
    const armed = run([{ type: 'enable' }]);
    expect(armed).toBe('armed');
    expect(deriveView(armed)).toEqual({ visible: false, hideNative: false });
  });

  it('follows the classified kind on move', () => {
    expect(run([{ type: 'enable' }, { type: 'move', kind: 'default' }])).toBe('default');
    expect(run([{ type: 'enable' }, { type: 'move', kind: 'interactive' }])).toBe('interactive');
    expect(
      run([
        { type: 'enable' },
        { type: 'move', kind: 'interactive' },
        { type: 'move', kind: 'text' },
      ]),
    ).toBe('text');
  });

  it('returns to armed when the pointer leaves the window', () => {
    expect(run([{ type: 'enable' }, { type: 'move', kind: 'default' }, { type: 'leave' }])).toBe(
      'armed',
    );
  });

  it('does not reset an active mode when enable repeats', () => {
    expect(cursorReducer('interactive', { type: 'enable' })).toBe('interactive');
  });

  it('returns to inert from any mode on disable', () => {
    for (const mode of ['armed', 'default', 'interactive', 'text', 'none'] as const) {
      expect(cursorReducer(mode, { type: 'disable' })).toBe('inert');
    }
  });

  it('shows the custom cursor and hides the native one only in default and interactive', () => {
    const modes: CursorMode[] = ['inert', 'armed', 'default', 'interactive', 'text', 'none'];
    const visible = modes.filter((mode) => deriveView(mode).visible);
    expect(visible).toEqual(['default', 'interactive']);
    for (const mode of modes) {
      expect(deriveView(mode).hideNative).toBe(deriveView(mode).visible);
    }
  });
});

describe('smoothing and loop control', () => {
  it('computes alpha = 1 - exp(-dt / tau)', () => {
    expect(smoothingAlpha(32, 70)).toBeCloseTo(1 - Math.exp(-32 / 70), 10); // below the 64 ms clamp
    expect(smoothingAlpha(0, 70)).toBe(0);
  });

  it('is monotonic in dt, bounded by 1, and clamps long frame gaps', () => {
    expect(smoothingAlpha(8, 70)).toBeLessThan(smoothingAlpha(16, 70));
    expect(smoothingAlpha(16, 70)).toBeLessThan(1);
    expect(smoothingAlpha(10_000, 70)).toBe(smoothingAlpha(MAX_FRAME_MS, 70));
    expect(smoothingAlpha(-5, 70)).toBe(0);
    expect(smoothingAlpha(16, 0)).toBe(1);
  });

  it('is frame-rate independent: two 8 ms steps equal one 16 ms step', () => {
    const target = { x: 100, y: 50 };
    const start = { x: 0, y: 0 };
    const twoSteps = stepRing(stepRing(start, target, 8, 70), target, 8, 70);
    const oneStep = stepRing(start, target, 16, 70);
    expect(twoSteps.x).toBeCloseTo(oneStep.x, 6);
    expect(twoSteps.y).toBeCloseTo(oneStep.y, 6);
  });

  it('moves the ring toward the target without overshooting', () => {
    let ring = { x: 0, y: 0 };
    const target = { x: 200, y: -80 };
    for (let i = 0; i < 200; i += 1) {
      ring = stepRing(ring, target, 16, 70);
      expect(ring.x).toBeLessThanOrEqual(target.x);
      expect(ring.y).toBeGreaterThanOrEqual(target.y);
    }
    expect(isSettled(ring, target)).toBe(true);
  });

  it('settles only inside the epsilon', () => {
    expect(isSettled({ x: 0, y: 0 }, { x: 0.05, y: 0.05 })).toBe(true);
    expect(isSettled({ x: 0, y: 0 }, { x: 0.5, y: 0 })).toBe(false);
  });

  it('stops the loop only when idle long enough and settled', () => {
    const base = { nowMs: 1000, lastMoveMs: 900, idleMs: 120, settled: true };
    expect(shouldStopLoop(base)).toBe(false); // 100 ms since the last move
    expect(shouldStopLoop({ ...base, nowMs: 1020 })).toBe(true); // exactly idleMs
    expect(shouldStopLoop({ ...base, nowMs: 5000, settled: false })).toBe(false); // still travelling
  });
});

describe('token parsing', () => {
  it('parses px and time values', () => {
    expect(parseCssPx('34px')).toBe(34);
    expect(parseCssPx(' 1.5px ')).toBe(1.5);
    expect(parseCssPx('2rem')).toBeNull();
    expect(parseCssMs('70ms')).toBe(70);
    expect(parseCssMs('0.12s')).toBeCloseTo(120, 6);
    expect(parseCssMs('fast')).toBeNull();
  });

  it('reads the cursor tokens and derives the active scale', () => {
    const values: Record<string, string> = {
      '--cursor-ring': '34px',
      '--cursor-ring-active': '52px',
      '--cursor-tau': '70ms',
      '--cursor-idle': '120ms',
    };
    const tokens = readCursorTokens({ getPropertyValue: (name) => values[name] ?? '' });
    expect(tokens).toEqual({ ringPx: 34, ringActivePx: 52, tauMs: 70, idleMs: 120 });
    expect(activeScale(tokens!)).toBeCloseTo(52 / 34, 10);
  });

  it('fails closed when any token is missing or invalid', () => {
    expect(readCursorTokens({ getPropertyValue: () => '' })).toBeNull();
    expect(
      readCursorTokens({
        getPropertyValue: (name) =>
          ({
            '--cursor-ring': '0px',
            '--cursor-ring-active': '52px',
            '--cursor-tau': '70ms',
            '--cursor-idle': '120ms',
          })[name] ?? '',
      }),
    ).toBeNull();
  });
});
