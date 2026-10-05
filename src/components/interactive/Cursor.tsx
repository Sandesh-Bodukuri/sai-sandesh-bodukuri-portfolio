'use client';

import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { usePointerFine } from '@/hooks/usePointerFine';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  activeScale,
  classifyTarget,
  cursorReducer,
  deriveView,
  isCursorEnabled,
  isSettled,
  readCursorTokens,
  shouldStopLoop,
  stepRing,
  type CursorMode,
  type Point,
} from '@/lib/cursor';

const NATIVE_HIDDEN_ATTRIBUTE = 'data-cursor-native';

/**
 * Dot + ring cursor for fine pointers (CLAUDE_CONTEXT.md §5.2). Renders nothing, and leaves the native
 * cursor untouched, unless every condition in `isCursorEnabled` holds. Position lives in refs and one
 * requestAnimationFrame loop runs only while the pointer moves, so React never re-renders on movement.
 */
export function Cursor() {
  const { ready, enabled: motionOn } = useMotionPreference();
  const finePointer = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();
  const forcedColors = useMediaQuery('(forced-colors: active)');
  const active = isCursorEnabled({
    jsReady: ready,
    finePointer,
    reducedMotion,
    motionOn,
    forcedColors,
  });

  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!layer || !dot || !ring) return;

    const root = document.documentElement;
    const tokens = readCursorTokens(getComputedStyle(root));
    if (!tokens) return; // fail closed: the native cursor stays
    layer.style.setProperty('--cursor-scale', String(activeScale(tokens)));

    let mode: CursorMode = cursorReducer('inert', { type: 'enable' });
    let lastTarget: EventTarget | null = null;
    const target: Point = { x: 0, y: 0 };
    let ringPosition: Point = { x: 0, y: 0 };
    let lastMoveMs = 0;
    let lastFrameMs = 0;
    let frame = 0;

    const place = (element: HTMLElement, point: Point) => {
      element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
    };

    const apply = (next: CursorMode) => {
      mode = next;
      const view = deriveView(mode);
      layer.hidden = !view.visible;
      layer.dataset.mode = mode;
      if (view.hideNative) root.setAttribute(NATIVE_HIDDEN_ATTRIBUTE, 'hidden');
      else root.removeAttribute(NATIVE_HIDDEN_ATTRIBUTE);
    };

    const loop = (now: number) => {
      const dt = lastFrameMs === 0 ? 16 : now - lastFrameMs;
      lastFrameMs = now;
      ringPosition = stepRing(ringPosition, target, dt, tokens.tauMs);
      place(ring, ringPosition);
      if (
        shouldStopLoop({
          nowMs: now,
          lastMoveMs,
          idleMs: tokens.idleMs,
          settled: isSettled(ringPosition, target),
        })
      ) {
        frame = 0;
        lastFrameMs = 0;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const wasArmed = mode === 'armed';
      target.x = event.clientX;
      target.y = event.clientY;
      lastMoveMs = performance.now();
      place(dot, target);
      if (wasArmed) {
        ringPosition = { ...target }; // appear in place, no fly-in from the corner
        place(ring, ringPosition);
      }
      if (wasArmed || event.target !== lastTarget) {
        lastTarget = event.target;
        const kind = classifyTarget(event.target instanceof Element ? event.target : null);
        apply(cursorReducer(mode, { type: 'move', kind }));
      }
      if (frame === 0) frame = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      lastTarget = null;
      apply(cursorReducer(mode, { type: 'leave' }));
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') onLeave();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('pointermove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (frame !== 0) cancelAnimationFrame(frame);
      root.removeAttribute(NATIVE_HIDDEN_ATTRIBUTE);
    };
  }, [active]);

  if (!active) return null;
  return (
    <div
      ref={layerRef}
      className="cursor-layer"
      aria-hidden="true"
      data-decorative
      data-cursor-layer
      hidden
    >
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-ring__shape" />
      </div>
      <div ref={dotRef} className="cursor-dot">
        <span className="cursor-dot__shape" />
      </div>
    </div>
  );
}
