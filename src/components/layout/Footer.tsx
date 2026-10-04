import { site } from '@/content/site';
import { Container } from './Container';

// Static footer shell (Step 1). The seal, contact rows and email arrive in later steps.
export function Footer() {
  return (
    <footer className="border-t border-line-1 py-8">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-small text-fg-2">
        <p>{site.name}</p>
        <a
          href={site.github.href}
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
        >
          {site.github.label}
        </a>
      </Container>
    </footer>
  );
}
