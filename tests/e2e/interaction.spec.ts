import AxeBuilder from '@axe-core/playwright';
import { devices, expect, test, type Page } from '@playwright/test';

// Step 2 interaction infrastructure (CLAUDE_CONTEXT.md §5.1 to §5.3, §13).
// Runs against the production server (`pnpm e2e` builds first).

const cursorLayer = '[data-cursor-layer]';
const axeTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const motionToggle = (page: Page) => page.getByRole('button', { name: 'Motion' });

async function lapFillScale(page: Page): Promise<number> {
  return page.evaluate(() => {
    const fill = document.querySelector('.lap-line__fill');
    if (!fill) return Number.NaN;
    return new DOMMatrix(getComputedStyle(fill).transform).a;
  });
}

test.describe('cursor (fine pointer)', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('appears on first pointer move and hides the native cursor', async ({ page }) => {
    await page.goto('/');
    await expect(motionToggle(page)).toBeVisible(); // hydrated
    await expect(page.locator(cursorLayer)).toBeHidden();
    await page.mouse.move(400, 400);
    await expect(page.locator(cursorLayer)).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-cursor-native', 'hidden');
  });

  test('switches to the interactive state over a link and back', async ({ page }) => {
    await page.goto('/');
    await expect(motionToggle(page)).toBeVisible();
    await page.mouse.move(600, 600);
    await expect(page.locator(cursorLayer)).toHaveAttribute('data-mode', 'default');
    await page.getByRole('link', { name: 'Projects' }).hover();
    await expect(page.locator(cursorLayer)).toHaveAttribute('data-mode', 'interactive');
    await page.mouse.move(600, 600);
    await expect(page.locator(cursorLayer)).toHaveAttribute('data-mode', 'default');
  });

  test('is removed when motion is toggled off, and the choice persists across reloads', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(motionToggle(page)).toBeVisible(); // wait for hydration before moving the pointer
    await page.mouse.move(300, 300);
    await expect(page.locator(cursorLayer)).toBeVisible();

    await motionToggle(page).click();
    await expect(motionToggle(page)).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    await expect(page.locator(cursorLayer)).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveAttribute('data-cursor-native', 'hidden');

    await page.reload();
    await expect(motionToggle(page)).toHaveAttribute('aria-pressed', 'false');
    await page.mouse.move(320, 320);
    await expect(page.locator(cursorLayer)).toHaveCount(0);

    await motionToggle(page).click();
    await expect(motionToggle(page)).toHaveAttribute('aria-pressed', 'true');
    await page.mouse.move(340, 340);
    await expect(page.locator(cursorLayer)).toBeVisible();
  });
});

test.describe('cursor is inert where it must be', () => {
  test.describe('touch device', () => {
    // Only the emulation fields: `defaultBrowserType` cannot be set inside a describe group.
    const pixel7 = devices['Pixel 7'];
    test.use({
      viewport: pixel7.viewport,
      userAgent: pixel7.userAgent,
      deviceScaleFactor: pixel7.deviceScaleFactor,
      isMobile: pixel7.isMobile,
      hasTouch: pixel7.hasTouch,
    });

    test('never renders the cursor', async ({ page }) => {
      await page.goto('/');
      await expect(motionToggle(page)).toBeVisible();
      await page.touchscreen.tap(200, 300);
      await expect(page.locator(cursorLayer)).toHaveCount(0);
      await expect(page.locator('html')).not.toHaveAttribute('data-cursor-native', 'hidden');
    });
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } });

    test('never renders the cursor, and motion defaults to off', async ({ page }) => {
      await page.goto('/');
      await expect(motionToggle(page)).toHaveAttribute('aria-pressed', 'false');
      await page.mouse.move(400, 400);
      await expect(page.locator(cursorLayer)).toHaveCount(0);
      await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    });
  });

  test.describe('forced colours', () => {
    test.use({ forcedColors: 'active', viewport: { width: 1280, height: 800 } });

    test('never renders the cursor', async ({ page }) => {
      await page.goto('/');
      await expect(motionToggle(page)).toBeVisible();
      await page.mouse.move(400, 400);
      await expect(page.locator(cursorLayer)).toHaveCount(0);
    });
  });

  test.describe('JavaScript disabled', () => {
    test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });

    test('renders the page with no cursor, no lap line, and no dead motion control', async ({
      page,
    }) => {
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sai Sandesh Bodukuri');
      await expect(page.locator(cursorLayer)).toHaveCount(0);
      await expect(page.locator('.lap-line')).toHaveCount(0);
      await expect(motionToggle(page)).toHaveCount(0);
    });
  });
});

test.describe('motion toggle', () => {
  test('shows the header copy from md up and the footer copy below md, never both', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(motionToggle(page)).toHaveCount(1);
    await expect(page.locator('header').getByRole('button', { name: 'Motion' })).toBeVisible();

    await page.setViewportSize({ width: 360, height: 800 });
    await expect(motionToggle(page)).toHaveCount(1);
    await expect(page.locator('footer').getByRole('button', { name: 'Motion' })).toBeVisible();
  });

  test('is operable by keyboard and exposes its state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const toggle = motionToggle(page);
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Space');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  test('keeps the skip link first in the tab order', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });
});

test.describe('lap line', () => {
  test.use({ viewport: { width: 1280, height: 600 } });

  test('is decorative, ticks every section, and fills from 0 to 1 across the page', async ({
    page,
  }) => {
    await page.goto('/');
    const line = page.locator('.lap-line');
    await expect(line).toHaveAttribute('aria-hidden', 'true');
    await expect(line).toHaveAttribute('data-lap-mode', /^(css|js)$/);
    await expect(page.locator('.lap-line__tick')).toHaveCount(
      await page.locator('main > section[id]').count(),
    );

    await expect.poll(() => lapFillScale(page)).toBeCloseTo(0, 2);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(() => lapFillScale(page)).toBeCloseTo(1, 2);
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('still works, through the scroll-listener fallback', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('.lap-line')).toHaveAttribute('data-lap-mode', 'js');
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect.poll(() => lapFillScale(page)).toBeCloseTo(1, 2);
    });
  });
});

test.describe('no layout shift', () => {
  test('stays at zero through load, pointer movement, toggling, and scrolling', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      type LayoutShiftEntry = PerformanceEntry & { value: number; hadRecentInput: boolean };
      const holder = window as unknown as { __cls: number };
      holder.__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput) holder.__cls += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto('/');
    await expect(motionToggle(page)).toBeVisible();
    await page.mouse.move(500, 300);
    await page.mouse.move(700, 500);
    await motionToggle(page).click();
    await motionToggle(page).click();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(300);

    const shift = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    expect(shift).toBeLessThanOrEqual(0.001);
  });
});

test.describe('accessibility with the new controls', () => {
  for (const viewport of [
    { name: 'desktop 1280', width: 1280, height: 800 },
    { name: 'mobile 360', width: 360, height: 800 },
  ]) {
    for (const motion of ['on', 'off'] as const) {
      test(`has no axe violations at ${viewport.name} with motion ${motion}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        const toggle = motionToggle(page);
        await expect(toggle).toBeVisible();
        if (motion === 'off') await toggle.click();
        await expect(toggle).toHaveAttribute('aria-pressed', motion === 'on' ? 'true' : 'false');
        await page.mouse.move(viewport.width / 2, viewport.height / 2);
        const results = await new AxeBuilder({ page }).withTags(axeTags).analyze();
        expect(results.violations).toEqual([]);
      });
    }
  }
});
