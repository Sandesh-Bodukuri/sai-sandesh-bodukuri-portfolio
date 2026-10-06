import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/interactive/Cursor';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SkipLink } from '@/components/layout/SkipLink';
import { site } from '@/content/site';
import { env } from '@/lib/env';
import { fontDisplay, fontMono, fontText } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.metaDescription,
};

export const viewport: Viewport = {
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClasses = [fontDisplay.variable, fontText.variable, fontMono.variable].join(' ');
  return (
    <html lang="en" className={fontClasses}>
      <body>
        <SkipLink />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
