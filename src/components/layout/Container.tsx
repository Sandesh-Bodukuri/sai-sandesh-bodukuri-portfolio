import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-(--container-max) px-(--gutter)', className)}>
      {children}
    </div>
  );
}
