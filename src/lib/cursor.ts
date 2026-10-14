// Custom cursor logic (CLAUDE_CONTEXT.md §5.2). Pure functions only: no DOM access, no React.
// The Cursor component wires these to pointer events and one requestAnimationFrame loop.

export const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary';
export const TEXT_SELECTOR = [
  'input:not([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"], [type="image"])',
  'textarea',
  'select',
  '[contenteditable]:not([contenteditable="false"])',
  '[data-cursor="text"]',
].join(', ');
export const NONE_SELECTOR = '[data-cursor="none"]';

export type TargetKind = 'default' | 'interactive' | 'text' | 'none';
export type ClosestLike = { closest(selector: string): unknown };

/** Precedence: none > interactive > text > default. A link inside a text region still reads as interactive. */
export function classifyTarget(target: ClosestLike | null): TargetKind {
  if (!target) return 'default';
  if (target.closest(NONE_SELECTOR)) return 'none';
  if (target.closest(INTERACTIVE_SELECTOR)) return 'interactive';
  if (target.closest(TEXT_SELECTOR)) return 'text';
  return 'default';
}

/**
 * Pointer events are retargeted at shadow boundaries: over content inside a shadow tree, `event.target`
 * is the shadow host while `composedPath()[0]` is the real element. That content styles its own cursor
 * and cannot be classified from here, and the page's `cursor: none` rule does not reach into it, so the
 * native cursor would show underneath a second, custom one. Defer to the native cursor instead.
 * (Only open shadow roots can be detected: a closed root reports the host as `composedPath()[0]`.)
 */
export function classifyPointerTarget(
  target: ClosestLike | null,
  composedTarget: unknown,
): TargetKind {
  if (composedTarget !== undefined && composedTarget !== target) return 'none';
  return classifyTarget(target);
}

export type CursorConditions = {
  jsReady: boolean;
  finePointer: boolean;
  reducedMotion: boolean;
  motionOn: boolean;
  forcedColors: boolean;
};

/** The custom cursor exists only when every condition holds; otherwise the native cursor is untouched. */
export function isCursorEnabled(c: CursorConditions): boolean {
  return c.jsReady && c.finePointer && !c.reducedMotion && c.motionOn && !c.forcedColors;
}

/**
 * inert: disabled, nothing rendered.
 * armed: enabled but no pointer position yet (or the pointer left the window): native cursor shown.
 * default / interactive: custom cursor visible, native cursor hidden.
 * text / none: custom cursor hidden, native cursor shown.
 */
export type CursorMode = 'inert' | 'armed' | 'default' | 'interactive' | 'text' | 'none';

export type CursorEvent =
  { type: 'enable' } | { type: 'disable' } | { type: 'move'; kind: TargetKind } | { type: 'leave' };

export function cursorReducer(mode: CursorMode, event: CursorEvent): CursorMode {
  if (event.type === 'disable') return 'inert';
  if (mode === 'inert') return event.type === 'enable' ? 'armed' : 'inert';
  switch (event.type) {
    case 'enable':
      return mode;
    case 'move':
      return event.kind;
    case 'leave':
      return 'armed';
  }
}

export function deriveView(mode: CursorMode): { visible: boolean; hideNative: boolean } {
  const visible = mode === 'default' || mode === 'interactive';
  return { visible, hideNative: visible };
}

// ---- smoothing and loop control ------------------------------------------------------------

export type Point = { x: number; y: number };

/** Frame gaps longer than this (background tab, long task) are clamped so the ring never jumps. */
export const MAX_FRAME_MS = 64;
export const SETTLE_EPSILON_PX = 0.1;

/** Frame-rate-independent smoothing factor: alpha = 1 - exp(-dt / tau). */
export function smoothingAlpha(dtMs: number, tauMs: number): number {
  if (tauMs <= 0) return 1;
  const dt = Math.min(Math.max(dtMs, 0), MAX_FRAME_MS);
  return 1 - Math.exp(-dt / tauMs);
}

export function stepRing(ring: Point, target: Point, dtMs: number, tauMs: number): Point {
  const alpha = smoothingAlpha(dtMs, tauMs);
  return { x: ring.x + (target.x - ring.x) * alpha, y: ring.y + (target.y - ring.y) * alpha };
}

export function isSettled(
  ring: Point,
  target: Point,
  epsilon: number = SETTLE_EPSILON_PX,
): boolean {
  return Math.abs(target.x - ring.x) < epsilon && Math.abs(target.y - ring.y) < epsilon;
}

/** The rAF loop runs only while the pointer moves: stop once it has been idle and the ring has settled. */
export function shouldStopLoop(input: {
  nowMs: number;
  lastMoveMs: number;
  idleMs: number;
  settled: boolean;
}): boolean {
  return input.settled && input.nowMs - input.lastMoveMs >= input.idleMs;
}

// ---- tokens --------------------------------------------------------------------------------

export type CursorTokens = { ringPx: number; ringActivePx: number; tauMs: number; idleMs: number };

export function parseCssPx(value: string): number | null {
  const match = /^\s*(-?\d*\.?\d+)px\s*$/.exec(value);
  return match?.[1] === undefined ? null : Number(match[1]);
}

export function parseCssMs(value: string): number | null {
  const match = /^\s*(-?\d*\.?\d+)(ms|s)\s*$/.exec(value);
  if (match?.[1] === undefined || match[2] === undefined) return null;
  const amount = Number(match[1]);
  return match[2] === 's' ? amount * 1000 : amount;
}

/** Reads the cursor tokens from tokens.css. Returns null on any failure so the cursor stays inert. */
export function readCursorTokens(style: {
  getPropertyValue(name: string): string;
}): CursorTokens | null {
  const ringPx = parseCssPx(style.getPropertyValue('--cursor-ring'));
  const ringActivePx = parseCssPx(style.getPropertyValue('--cursor-ring-active'));
  const tauMs = parseCssMs(style.getPropertyValue('--cursor-tau'));
  const idleMs = parseCssMs(style.getPropertyValue('--cursor-idle'));
  if (
    ringPx === null ||
    ringPx <= 0 ||
    ringActivePx === null ||
    tauMs === null ||
    idleMs === null
  ) {
    return null;
  }
  return { ringPx, ringActivePx, tauMs, idleMs };
}

export function activeScale(tokens: CursorTokens): number {
  return tokens.ringActivePx / tokens.ringPx;
}
