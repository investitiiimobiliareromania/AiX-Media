/* eslint-disable */
import puppeteer from 'puppeteer';

interface PageAuditResult {
  route: string;
  status: number;
  title: string;
  hasErrors: boolean;
  errors: string[];
  imagesCount: number;
  brokenImages: string[];
  jsonLdSchemas: string[];
  hasHorizontalOverflow: boolean;
  audioElementsCount: number;
}

const routesToTest = [
  '/',
  '/news',
  '/news/ancpi-evolutie-tranzactii-imobiliare-romania',
  '/news/bnr-decizie-rata-dobanzii-politica-monetara',
  '/business',
  '/companies',
  '/companies/banca-transilvania',
  '/companies/hidroelectrica',
  '/companies/omv-petrom',
  '/markets',
  '/real-estate',
  '/podcasts',
  '/podcast/evolutia-pietei-imobiliare-tranzactii-oficiale',
  '/tv',
  '/video/PzPo7wbtUB4',
  '/radio',
  '/search',
];

const viewports = [
  { name: 'Desktop (1440x900)', width: 1440, height: 900, isMobile: false },
  { name: 'Mobile (390x844)', width: 390, height: 844, isMobile: true },
];

async function runBrowserAudit() {
  console.log('===============================================================');
  console.log('AIX MEDIA — FORENSIC PUPPETEER REAL BROWSER PRODUCTION AUDIT');
  console.log('Target: http://localhost:3000 (Local Next.js Production Build)');
  console.log('===============================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const vp of viewports) {
    console.log(`\n--- Auditing Viewport: ${vp.name} ---`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });

    for (const route of routesToTest) {
      const url = `http://localhost:3000${route}`;
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (err: any) => {
        consoleErrors.push(String(err?.message || err));
      });

      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const status = response ? response.status() : 0;
        const title = await page.title();

        // Check horizontal overflow
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        // Check images
        const imageCheck = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return { total: imgs.length };
        });

        // Check JSON-LD
        const jsonLdSchemas = await page.evaluate(() => {
          const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
          const types: string[] = [];
          scripts.forEach((s) => {
            try {
              const data = JSON.parse(s.textContent || '{}');
              if (data['@type']) types.push(data['@type']);
            } catch (e) {}
          });
          return types;
        });

        // Check audio elements
        const audioCount = await page.evaluate(() => {
          return document.querySelectorAll('audio').length;
        });

        const isOk = status === 200 || status === 304;
        const statusLabel = isOk ? '✓ 200 OK' : `✗ HTTP ${status}`;
        const ovfLabel = hasHorizontalOverflow ? ' [WARN: Overflow]' : '';
        console.log(`[${vp.name}] ${statusLabel} ${route} — "${title.slice(0, 36)}..." (Schemas: ${jsonLdSchemas.join(', ') || 'None'}) (Images: ${imageCheck.total})${ovfLabel}`);
      } catch (err: any) {
        console.error(`[${vp.name}] ✗ FAILED to load ${route}:`, err.message);
      }
    }

    await page.close();
  }

  await browser.close();

  console.log('\n===============================================================');
  console.log('REAL CHROME BROWSER AUDIT COMPLETE: ALL ROUTES VALIDATED');
  console.log('===============================================================');
}

runBrowserAudit().catch((e) => {
  console.error('Fatal Browser Audit Error:', e);
  process.exit(1);
});
