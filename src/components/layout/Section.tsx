import type { ReactNode } from 'react';
import { Container } from './Container';

type SectionProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

// Hairline section rule (CLAUDE_CONTEXT.md §2.2): h2 plus a 1px line to the grid edge. No eyebrow label.
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="py-(--section-y)">
      <Container>
        <div className="flex items-center gap-6">
          <h2 id={headingId}>{title}</h2>
          <span aria-hidden="true" data-decorative className="h-(--stroke-hair) flex-1 bg-line-1" />
        </div>
        {children}
      </Container>
    </section>
  );
}
