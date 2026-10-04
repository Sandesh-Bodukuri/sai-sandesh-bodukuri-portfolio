import localFont from 'next/font/local';

// Self-hosted, committed OFL fonts (see src/fonts/README.md). next/font/local keeps the build
// offline-deterministic and applies automatic fallback metrics to limit layout shift.
// Fallback stacks follow CLAUDE_CONTEXT.md §4. Only display + text are preloaded; mono is not
// needed above the fold.

export const fontDisplay = localFont({
  src: '../fonts/big-shoulders-display-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-display-face',
  fallback: ['Arial Narrow', 'Roboto Condensed', 'sans-serif'],
});

export const fontText = localFont({
  src: [
    { path: '../fonts/ibm-plex-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-text-face',
  fallback: ['system-ui', 'sans-serif'],
});

export const fontMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  variable: '--font-mono-face',
  fallback: ['ui-monospace', 'monospace'],
});
