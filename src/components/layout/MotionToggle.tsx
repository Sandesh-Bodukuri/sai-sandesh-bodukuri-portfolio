'use client';

import { useMotionPreference } from '@/hooks/useMotionPreference';
import { cn } from '@/lib/cn';

type MotionToggleProps = { className?: string };

/**
 * Pause control for ambient motion (CLAUDE_CONTEXT.md §5.1, WCAG 2.2.2). The slot has a fixed size and is
 * rendered on the server; the button appears after hydration, so there is no layout shift and no inert
 * control when JavaScript is off.
 */
export function MotionToggle({ className }: MotionToggleProps) {
  const { ready, enabled, toggle } = useMotionPreference();
  return (
    <span className={cn('min-h-11 min-w-24 items-center', className)}>
      {ready ? (
        <button
          type="button"
          aria-pressed={enabled}
          onClick={toggle}
          className="inline-flex min-h-11 items-center gap-2 text-small text-fg-2 underline-offset-4 hover:underline"
        >
          <span
            aria-hidden="true"
            data-decorative
            className={cn('size-3 border border-fg-3', enabled && 'bg-fg-1')}
          />
          Motion
        </button>
      ) : null}
    </span>
  );
}
