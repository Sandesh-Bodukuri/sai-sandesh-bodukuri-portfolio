import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Step 1 smoke + accessibility check of `/` at the two reference widths (CLAUDE_CONTEXT.md §13).
// Runs against the production server (`pnpm e2e` builds first).

const viewports = [
  { name: 'mobile 360', width: 360, height: 800 },
  { name: 'desktop 1280', width: 1280, height: 800 },
] as const;

for (const viewport of viewports) {
  test.describe(`home at ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('renders the name as the h1, with no console errors and no horizontal overflow', async ({
      page,
    }) => {
      const problems: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') problems.push(message.text());
      });
      page.on('pageerror', (error) => problems.push(error.message));

      await page.goto('/');

      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sai Sandesh Bodukuri');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      expect(problems).toEqual([]);
    });

    test('puts the skip link first in the tab order', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    });

    test('has no axe violations (WCAG 2.2 AA)', async ({ page }) => {
      await page.goto('/');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });
}
