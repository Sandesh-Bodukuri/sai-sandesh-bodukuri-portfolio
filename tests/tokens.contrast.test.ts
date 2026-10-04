import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Enforces the contrast claims in CLAUDE_CONTEXT.md §3 and §9.4 against src/styles/tokens.css.

const css = readFileSync(
  fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url)),
  'utf-8',
);

function token(name: string): string {
  const match = new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})\\b`).exec(css);
  if (!match?.[1]) throw new Error(`Colour token ${name} not found in tokens.css`);
  return match[1];
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const surfaces = ['--bg-0', '--bg-1', '--bg-2'] as const;

describe('design token contrast (WCAG 2.2 AA)', () => {
  it.each(['--fg-1', '--fg-2', '--fg-3', '--accent-text', '--data'])(
    'body-size text token %s reaches 4.5:1 on every surface',
    (name) => {
      for (const surface of surfaces) {
        expect(ratio(token(name), token(surface)), `${name} on ${surface}`).toBeGreaterThanOrEqual(
          4.5,
        );
      }
    },
  );

  it('accent works for fills, lines and large text: 4.5:1 on bg-0 and bg-1, 3:1 on bg-2', () => {
    expect(ratio(token('--accent'), token('--bg-0'))).toBeGreaterThanOrEqual(4.5);
    expect(ratio(token('--accent'), token('--bg-1'))).toBeGreaterThanOrEqual(4.5);
    expect(ratio(token('--accent'), token('--bg-2'))).toBeGreaterThanOrEqual(3);
  });

  it('button labels (--on-accent) reach 4.5:1 on the accent fill', () => {
    expect(ratio(token('--on-accent'), token('--accent'))).toBeGreaterThanOrEqual(4.5);
  });

  it('the focus ring reaches 3:1 on every surface', () => {
    for (const surface of surfaces) {
      expect(ratio(token('--focus'), token(surface)), `focus on ${surface}`).toBeGreaterThanOrEqual(
        3,
      );
    }
  });

  it('control borders drawn in --fg-3 reach 3:1 on every surface (§9.17)', () => {
    for (const surface of surfaces) {
      expect(ratio(token('--fg-3'), token(surface)), `fg-3 on ${surface}`).toBeGreaterThanOrEqual(
        3,
      );
    }
  });

  it('keeps --line-1 and --line-2 decorative: below 3:1, so never a control boundary (D-030)', () => {
    for (const name of ['--line-1', '--line-2']) {
      expect(ratio(token(name), token('--bg-0')), name).toBeLessThan(3);
    }
  });
});
