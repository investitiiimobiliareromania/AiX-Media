// playwright test for NewSiteHeader interactions
import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 430, height: 932 },
];

for (const vp of viewports) {
  test.describe(`Header interactions at ${vp.width}x${vp.height}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto('/');
    });

    test('Menu button opens drawer', async ({ page }) => {
      const menuBtn = page.getByRole('button', { name: /deschide meniul|open menu/i });
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();
      const drawer = page.locator('#mobile-menu-drawer');
      await expect(drawer).toBeVisible();
      // close drawer via overlay click
      await page.locator('[data-testid="drawer-close"]').click();
      await expect(drawer).toBeHidden();
    });

    test('Ecosystem accordion works in drawer', async ({ page }) => {
      const menuBtn = page.getByRole('button', { name: /deschide meniul|open menu/i });
      await menuBtn.click();
      const ecoBtn = page.getByRole('button', { name: /AiX Ecosystem/i });
      await expect(ecoBtn).toBeVisible();
      await ecoBtn.click();
      const panel = page.locator('#mobile-ecosystem-panel');
      await expect(panel).toBeVisible();
      const firstLink = panel.locator('a').first();
      await expect(firstLink).toBeVisible();
    });
  });
}

// Desktop tests (lg breakpoint)
test.describe('Desktop header interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  test('Ecosystem dropdown opens', async ({ page }) => {
    const ecoBtn = page.getByRole('button', { name: /AiX Ecosystem/i });
    await expect(ecoBtn).toBeVisible();
    await ecoBtn.click();
    const panel = page.locator('#ecosystem-panel');
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('link', { name: 'AiX OS' })).toHaveAttribute('href', 'https://os.cristianvaduva.com');
  });
});
