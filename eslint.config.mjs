import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// Next core-web-vitals + typescript-eslint, which also register the jsx-a11y and react plugins.
// Extra rules below reference those plugins by name (no direct plugin imports needed).
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // CLAUDE_CONTEXT.md §9 / §15: accessibility and code conventions
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-noninteractive-tabindex': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      // CLAUDE_CONTEXT.md §12: no HTML injection, no eval
      'react/no-danger': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      // CLAUDE_CONTEXT.md §15: no console.log in commits, no enums
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use a string-literal union instead of an enum (§15).',
        },
      ],
    },
  },
  {
    // Node scripts may print to the console.
    files: ['scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.lighthouseci*/**',
    'playwright-report/**',
    'test-results/**',
  ]),
]);

export default eslintConfig;
