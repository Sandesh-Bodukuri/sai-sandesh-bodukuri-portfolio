import { describe, expect, it, vi } from 'vitest';
import {
  createMotionStore,
  MOTION_STORAGE_KEY,
  parseStored,
  readStored,
  resolveMotion,
  writeStored,
} from '@/lib/motion-preference';

// Motion preference storage and resolution (CLAUDE_CONTEXT.md §5.1).

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    data,
  } as unknown as Storage & { data: Map<string, string> };
}

const throwingStorage = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
} as unknown as Storage;

describe('parseStored', () => {
  it('accepts only on and off', () => {
    expect(parseStored('on')).toBe('on');
    expect(parseStored('off')).toBe('off');
    expect(parseStored('yes')).toBeNull();
    expect(parseStored('')).toBeNull();
    expect(parseStored(null)).toBeNull();
    expect(parseStored(undefined)).toBeNull();
  });
});

describe('resolveMotion', () => {
  it('defaults to on, and to off when the system asks for reduced motion', () => {
    expect(resolveMotion(null, false)).toBe(true);
    expect(resolveMotion(null, true)).toBe(false);
  });

  it('lets an explicit choice win in either direction', () => {
    expect(resolveMotion('off', false)).toBe(false);
    expect(resolveMotion('on', true)).toBe(true);
    expect(resolveMotion('on', false)).toBe(true);
    expect(resolveMotion('off', true)).toBe(false);
  });
});

describe('storage access never throws', () => {
  it('reads null when storage is missing or throws', () => {
    expect(readStored(undefined)).toBeNull();
    expect(readStored(throwingStorage)).toBeNull();
  });

  it('reports a failed write without throwing', () => {
    expect(writeStored(throwingStorage, 'off')).toBe(false);
    expect(writeStored(undefined, 'off')).toBe(false);
    const storage = fakeStorage();
    expect(writeStored(storage, 'off')).toBe(true);
    expect(storage.data.get(MOTION_STORAGE_KEY)).toBe('off');
  });
});

describe('createMotionStore', () => {
  it('loads the stored value lazily and returns a stable snapshot', () => {
    const storage = fakeStorage({ [MOTION_STORAGE_KEY]: 'off' });
    const getItem = vi.spyOn(storage, 'getItem');
    const store = createMotionStore(() => storage);
    expect(store.getSnapshot()).toBe('off');
    expect(store.getSnapshot()).toBe('off');
    expect(getItem).toHaveBeenCalledTimes(1);
  });

  it('persists a choice and notifies subscribers', () => {
    const storage = fakeStorage();
    const store = createMotionStore(() => storage);
    const listener = vi.fn();
    store.subscribe(listener);
    store.set('off');
    expect(store.getSnapshot()).toBe('off');
    expect(storage.data.get(MOTION_STORAGE_KEY)).toBe('off');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops notifying after unsubscribe', () => {
    const store = createMotionStore(() => fakeStorage());
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.set('on');
    expect(listener).not.toHaveBeenCalled();
  });

  it('keeps working in memory when storage is blocked', () => {
    const store = createMotionStore(() => throwingStorage);
    expect(store.getSnapshot()).toBeNull();
    expect(() => store.set('off')).not.toThrow();
    expect(store.getSnapshot()).toBe('off');
  });

  it('keeps working when no storage exists at all', () => {
    const store = createMotionStore(() => undefined);
    store.set('on');
    expect(store.getSnapshot()).toBe('on');
  });

  it('refresh picks up another tab changing the value and notifies only on change', () => {
    const storage = fakeStorage({ [MOTION_STORAGE_KEY]: 'on' });
    const store = createMotionStore(() => storage);
    const listener = vi.fn();
    store.getSnapshot();
    store.subscribe(listener);
    store.refresh();
    expect(listener).not.toHaveBeenCalled();
    storage.data.set(MOTION_STORAGE_KEY, 'off');
    store.refresh();
    expect(store.getSnapshot()).toBe('off');
    expect(listener).toHaveBeenCalledTimes(1);
    storage.data.delete(MOTION_STORAGE_KEY);
    store.refresh();
    expect(store.getSnapshot()).toBeNull();
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
