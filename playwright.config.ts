// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './scripts',
  timeout: 60_000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: 'list',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
