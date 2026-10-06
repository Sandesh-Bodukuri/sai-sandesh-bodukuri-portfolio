import { useMediaQuery } from './useMediaQuery';

/** True for a mouse-like pointer that can hover (CLAUDE_CONTEXT.md §5.2). False on touch and in SSR. */
export function usePointerFine(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
