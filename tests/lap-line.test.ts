import { describe, expect, it } from 'vitest';
import { chooseLapMode, lapProgress, scrollRange, tickPositions, ticksEqual } from '@/lib/lap-line';

// Lap line logic (CLAUDE_CONTEXT.md §5.3).

describe('chooseLapMode', () => {
  it('uses the CSS scroll-driven animation when supported and motion is allowed', () => {
    expect(chooseLapMode({ supportsScrollTimeline: true, reducedMotion: false })).toBe('css');
  });

  it('falls back to the scroll listener when unsupported', () => {
    expect(chooseLapMode({ supportsScrollTimeline: false, reducedMotion: false })).toBe('js');
  });

  it('uses the scroll listener under reduced motion, so the global animation rule cannot break it', () => {
    expect(chooseLapMode({ supportsScrollTimeline: true, reducedMotion: true })).toBe('js');
  });
});

describe('lapProgress', () => {
  const page = { scrollHeight: 3000, viewportHeight: 1000 };

  it('is 0 at the top and 1 at the bottom of the scroll range', () => {
    expect(lapProgress({ ...page, scrollY: 0 })).toBe(0);
    expect(lapProgress({ ...page, scrollY: 2000 })).toBe(1);
    expect(lapProgress({ ...page, scrollY: 1000 })).toBeCloseTo(0.5, 10);
  });

  it('clamps overscroll in both directions', () => {
    expect(lapProgress({ ...page, scrollY: -120 })).toBe(0);
    expect(lapProgress({ ...page, scrollY: 2600 })).toBe(1);
  });

  it('is 0 when the page does not scroll', () => {
    expect(lapProgress({ scrollY: 0, scrollHeight: 800, viewportHeight: 1000 })).toBe(0);
    expect(lapProgress({ scrollY: 50, scrollHeight: 1000, viewportHeight: 1000 })).toBe(0);
    expect(scrollRange(800, 1000)).toBe(0);
  });
});

describe('tickPositions', () => {
  it('maps section tops to fractions of the scroll range', () => {
    expect(tickPositions([500, 1000, 2000], 3000, 1000)).toEqual([0.25, 0.5, 1]);
  });

  it('clamps sections beyond the reachable range to the end', () => {
    expect(tickPositions([2500], 3000, 1000)).toEqual([1]);
  });

  it('drops a tick at the very start and returns none when the page does not scroll', () => {
    expect(tickPositions([0, 400], 3000, 1000)).toEqual([0.2]);
    expect(tickPositions([300], 900, 1000)).toEqual([]);
  });
});

describe('ticksEqual', () => {
  it('compares within a small epsilon', () => {
    expect(ticksEqual([0.1, 0.5], [0.1001, 0.5])).toBe(true);
    expect(ticksEqual([0.1, 0.5], [0.1, 0.52])).toBe(false);
    expect(ticksEqual([0.1], [0.1, 0.5])).toBe(false);
  });
});
