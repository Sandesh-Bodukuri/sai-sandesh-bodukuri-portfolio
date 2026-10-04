import type { ContentStatus } from './types';

const STATUSES: readonly ContentStatus[] = ['verified', 'pending', 'optional'];

export function isContentStatus(value: unknown): value is ContentStatus {
  return typeof value === 'string' && (STATUSES as readonly string[]).includes(value);
}

/** Production renders only Verified items (§0 content status system). */
export function publishable<T extends { status: ContentStatus }>(items: readonly T[]): T[] {
  return items.filter((item) => item.status === 'verified');
}
