// Motion preference storage and resolution (CLAUDE_CONTEXT.md §5.1). No React, no direct window access.

export const MOTION_STORAGE_KEY = 'motion-preference';

export type MotionChoice = 'on' | 'off';
export type MotionStored = MotionChoice | null;

export function parseStored(value: string | null | undefined): MotionStored {
  return value === 'on' || value === 'off' ? value : null;
}

/** An explicit choice wins; otherwise motion defaults to off when the system asks for reduced motion. */
export function resolveMotion(stored: MotionStored, prefersReducedMotion: boolean): boolean {
  return stored === null ? !prefersReducedMotion : stored === 'on';
}

export function readStored(storage: Pick<Storage, 'getItem'> | undefined): MotionStored {
  try {
    return parseStored(storage?.getItem(MOTION_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeStored(
  storage: Pick<Storage, 'setItem'> | undefined,
  value: MotionChoice,
): boolean {
  try {
    storage?.setItem(MOTION_STORAGE_KEY, value);
    return storage !== undefined;
  } catch {
    return false;
  }
}

/**
 * A tiny external store for useSyncExternalStore. The in-memory value keeps working when storage is
 * blocked or throws, so the toggle still operates for the current page.
 */
export function createMotionStore(getStorage: () => Storage | undefined) {
  let loaded = false;
  let value: MotionStored = null;
  const listeners = new Set<() => void>();
  const emit = () => {
    for (const listener of listeners) listener();
  };

  return {
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot(): MotionStored {
      if (!loaded) {
        value = readStored(getStorage());
        loaded = true;
      }
      return value;
    },
    set(next: MotionChoice): void {
      value = next;
      loaded = true;
      writeStored(getStorage(), next);
      emit();
    },
    /** Re-read storage (another tab changed it) and notify if the value differs. */
    refresh(): void {
      const next = readStored(getStorage());
      const changed = !loaded || next !== value;
      value = next;
      loaded = true;
      if (changed) emit();
    },
  };
}

export type MotionStore = ReturnType<typeof createMotionStore>;
