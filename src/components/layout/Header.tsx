import Link from 'next/link';
import { site } from '@/content/site';
import { Container } from './Container';
import { MotionToggle } from './MotionToggle';

// Static header shell (Step 1): brand + anchor links, wrapping on small screens.
// The mobile menu and the section-name label arrive in Step 3. The motion toggle shows here from md up;
// below md it lives in the footer.
const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#experiments', label: 'Experiments' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Header() {
  return (
    <header>
      <Container className="flex flex-wrap items-center justify-between gap-x-6 py-3">
        <Link href="/" className="inline-flex min-h-11 items-center font-semibold">
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <MotionToggle className="hidden md:inline-flex" />
      </Container>
    </header>
  );
}
