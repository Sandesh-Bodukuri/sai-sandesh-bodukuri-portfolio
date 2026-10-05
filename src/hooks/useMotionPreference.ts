import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { createMotionStore, MOTION_STORAGE_KEY, resolveMotion } from '@/lib/motion-preference';
import { useIsClient } from './useIsClient';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

function getLocalStorage(): Storage | undefined {
  try {
    return typeof window === 'undefined' ? undefined : window.localStorage;
  } catch {
    return undefined; // storage blocked (privacy mode, policy)
  }
}

// One store shared by every consumer (both MotionToggle instances and the Cursor).
const store = createMotionStore(getLocalStorage);

function subscribe(onChange: () => void): () => void {
  const unsubscribe = store.subscribe(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === MOTION_STORAGE_KEY || event.key === null) store.refresh();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    unsubscribe();
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Shared motion preference. `ready` is false until hydration is complete. `enabled` is the resolved state:
 * an explicit choice, else on unless the system asks for reduced motion. Mirrors the result onto
 * `<html data-motion="on|off">` for CSS.
 */
export function useMotionPreference() {
  const ready = useIsClient();
  const reducedMotion = usePrefersReducedMotion();
  const stored = useSyncExternalStore(subscribe, store.getSnapshot, () => null);
  const enabled = resolveMotion(stored, reducedMotion);

  useEffect(() => {
    if (ready) document.documentElement.dataset.motion = enabled ? 'on' : 'off';
  }, [ready, enabled]);

  const toggle = useCallback(() => store.set(enabled ? 'off' : 'on'), [enabled]);
  return { ready, enabled, toggle };
}
