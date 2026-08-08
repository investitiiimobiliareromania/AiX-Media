import { test, expect } from '@playwright/test';

const viewports = [320, 360, 375, 390, 412, 430];

viewports.forEach((width) => {
  test(`Menu and Ecosystem work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('http://localhost:3000');
    const menuButton = page.getByRole('button', { name: /Deschide meniul/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    // Drawer should appear
    const drawer = page.locator('#mobile-menu-drawer');
    await expect(drawer).toBeVisible();
    // Close drawer
    await drawer.getByRole('button', { name: /Închide meniul/i }).click();
    await expect(drawer).toBeHidden();
    // Open ecosystem accordion
    const ecoButton = page.getByRole('button', { name: /Deschide ecosistemul/i });
    await ecoButton.click();
    const ecoAccordion = page.locator('#mobile-ecosystem-accordion');
    await expect(ecoAccordion).toBeVisible();
    // Close ecosystem
    await ecoButton.click();
    await expect(ecoAccordion).toBeHidden();
  });
});
