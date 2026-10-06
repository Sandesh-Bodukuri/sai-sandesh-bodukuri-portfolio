'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { chooseLapMode, lapProgress, tickPositions, ticksEqual } from '@/lib/lap-line';

/**
 * Lap line: a thin fixed line at the top edge with one tick per section boundary (CLAUDE_CONTEXT.md §5.3).
 * Decorative, so aria-hidden; the header links remain the navigation. Renders after hydration only.
 * The section-name label arrives with the real header in Step 3.
 */
export function ScrollProgress() {
  const ready = useIsClient();
  const reducedMotion = usePrefersReducedMotion();
  const [ticks, setTicks] = useState<number[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const supportsScrollTimeline =
    ready && typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');
  const mode = chooseLapMode({ supportsScrollTimeline, reducedMotion });

  // Tick positions follow layout: ResizeObserver reports once on observe and on every size change.
  useEffect(() => {
    if (!ready) return;
    const measure = () => {
      const tops = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]')).map(
        (section) => section.getBoundingClientRect().top + window.scrollY,
      );
      const next = tickPositions(tops, document.documentElement.scrollHeight, window.innerHeight);
      setTicks((previous) => (ticksEqual(previous, next) ? previous : next));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [ready]);

  // Fallback mode: one passive scroll listener, batched through requestAnimationFrame.
  useEffect(() => {
    if (!ready || mode !== 'js') return;
    const line = lineRef.current;
    if (!line) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = lapProgress({
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
      });
      line.style.setProperty('--lap', progress.toFixed(4));
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [ready, mode]);

  if (!ready) return null;
  return (
    <div ref={lineRef} className="lap-line" aria-hidden="true" data-decorative data-lap-mode={mode}>
      <div className="lap-line__fill" />
      {ticks.map((tick, index) => (
        <span key={index} className="lap-line__tick" style={{ '--tick': tick } as CSSProperties} />
      ))}
    </div>
  );
}
