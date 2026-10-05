// Lap line (scroll progress) logic (CLAUDE_CONTEXT.md §5.3). Pure functions only.

export type LapMode = 'css' | 'js';

/**
 * CSS scroll-driven animation where supported, else a passive scroll listener. Reduced-motion users get the
 * listener, so the global reduced-motion rule (which zeroes animation durations) cannot break the line.
 */
export function chooseLapMode(input: {
  supportsScrollTimeline: boolean;
  reducedMotion: boolean;
}): LapMode {
  return input.supportsScrollTimeline && !input.reducedMotion ? 'css' : 'js';
}

export function scrollRange(scrollHeight: number, viewportHeight: number): number {
  return Math.max(0, scrollHeight - viewportHeight);
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** 0 at the top, 1 at the bottom, 0 when the page does not scroll. */
export function lapProgress(input: {
  scrollY: number;
  scrollHeight: number;
  viewportHeight: number;
}): number {
  const range = scrollRange(input.scrollHeight, input.viewportHeight);
  return range === 0 ? 0 : clamp01(input.scrollY / range);
}

/** Section boundaries as fractions of the scroll range. Ticks at the very start are dropped. */
export function tickPositions(
  sectionTops: readonly number[],
  scrollHeight: number,
  viewportHeight: number,
): number[] {
  const range = scrollRange(scrollHeight, viewportHeight);
  if (range === 0) return [];
  return sectionTops.map((top) => clamp01(top / range)).filter((position) => position > 0);
}

export function ticksEqual(a: readonly number[], b: readonly number[], epsilon = 0.0005): boolean {
  return (
    a.length === b.length &&
    a.every((value, index) => Math.abs(value - (b[index] ?? NaN)) < epsilon)
  );
}
