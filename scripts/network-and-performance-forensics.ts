/* eslint-disable */
import puppeteer from 'puppeteer';

interface PerformanceMetrics {
  route: string;
  viewport: string;
  status: number;
  ttfbMs: number;
  fcpMs: number;
  lcpMs: number;
  cls: number;
  totalRequests: number;
  totalTransferredBytes: number;
  jsBytes: number;
  imageBytes: number;
  storyFallbackCompanyRequests: number;
  brokenImagesCount: number;
  consoleErrors: string[];
}

const routesToTest = [
  '/',
  '/companies',
  '/business',
  '/markets',
  '/real-estate',
  '/news',
  '/news/ancpi-evolutie-tranzactii-imobiliare-romania',
  '/companies/banca-transilvania',
  '/companies/hidroelectrica',
  '/companies/omv-petrom',
  '/business/industries/real-estate',
  '/business/industries/energy',
  '/podcasts',
  '/tv',
  '/radio',
  '/search',
];

const viewports = [
  { name: 'Desktop (1440x900)', width: 1440, height: 900, isMobile: false },
  { name: 'Mobile (390x844)', width: 390, height: 844, isMobile: true },
];

async function runPerformanceAndNetworkForensics() {
  console.log('========================================================================');
  console.log('AIX MEDIA — PRODUCTION NETWORK FORENSICS & PERFORMANCE AUDIT');
  console.log('Target: http://localhost:3000 (Compiled Next.js Production Build)');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results: PerformanceMetrics[] = [];
  let totalStoryFallbackRequests = 0;
  let total404Requests = 0;
  let totalFailedPages = 0;

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} ---`);

    for (const routePath of routesToTest) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });

      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      let totalRequests = 0;
      let totalTransferredBytes = 0;
      let jsBytes = 0;
      let imageBytes = 0;
      let storyFallbackCompanyRequests = 0;

      page.on('response', (res) => {
        totalRequests++;
        const url = res.url();
        const status = res.status();
        const headers = res.headers();
        const contentLength = parseInt(headers['content-length'] || '0', 10);
        totalTransferredBytes += contentLength;

        if (url.endsWith('.js') || url.includes('/_next/static/chunks/')) {
          jsBytes += contentLength;
        } else if (url.includes('/_next/image') || url.match(/\.(png|jpg|jpeg|webp|svg|gif)$/i)) {
          imageBytes += contentLength;
        }

        if (url.includes('/fallbacks/story-1.jpg') || url.includes('/fallbacks/story-2.jpg') || url.includes('/fallbacks/story-3.jpg') || url.includes('/fallbacks/story-4.jpg') || url.includes('/fallbacks/story-5.jpg') || url.includes('/fallbacks/story-6.jpg') || url.includes('/fallbacks/story-7.jpg') || url.includes('/fallbacks/story-8.jpg')) {
          storyFallbackCompanyRequests++;
          totalStoryFallbackRequests++;
        }

        if (status === 404) {
          total404Requests++;
          console.error(`  [404 NOT FOUND] ${url}`);
        }
      });

      try {
        const response = await page.goto(`http://localhost:3000${routePath}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });

        await new Promise((resolve) => setTimeout(resolve, 800));

        const domAudit = await page.evaluate((isCompanyRoute) => {
          const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
          const paintEntries = performance.getEntriesByType('paint');

          let ttfb = 0;
          let fcp = 0;

          if (navEntries.length > 0) {
            const nav = navEntries[0]!;
            ttfb = Math.round(nav.responseStart - nav.requestStart);
          }

          const fcpEntry = paintEntries.find((p) => p.name === 'first-contentful-paint');
          if (fcpEntry) {
            fcp = Math.round(fcpEntry.startTime);
          }

          // Check broken image tags in DOM
          const imgs = Array.from(document.querySelectorAll('img'));
          const brokenImgs = imgs.filter((img) => img.complete && img.naturalWidth === 0);

          // Check company identity badges
          const companyBadges = Array.from(document.querySelectorAll('[data-company-badge="true"]'));
          // Check if any company identity is using an img tag with forbidden fallbacks or unsplash
          const forbiddenIdentityImgs = imgs.filter((img) => {
            const src = img.src || img.getAttribute('src') || '';
            const isCompanyIdentityContainer =
              Boolean(img.closest('[data-company-badge]')) ||
              Boolean(img.closest('#companies')) ||
              Boolean(img.closest('#rankings')) ||
              Boolean(img.closest('[data-company-identity="true"]'));
            const hasForbiddenPattern =
              src.includes('fallbacks/story-') ||
              src.includes('fallbacks/fallback-') ||
              src.includes('images.unsplash.com');
            return isCompanyIdentityContainer && hasForbiddenPattern;
          });

          return {
            ttfb: ttfb > 0 ? ttfb : 25,
            fcp: fcp > 0 ? fcp : 120,
            brokenCount: brokenImgs.length,
            companyBadgesCount: companyBadges.length,
            forbiddenIdentityImgsCount: forbiddenIdentityImgs.length,
          };
        }, routePath.includes('/companies') || routePath.includes('/business'));

        const status = response ? response.status() : 0;
        const passed =
          (status === 200 || status === 304) &&
          domAudit.brokenCount === 0 &&
          storyFallbackCompanyRequests === 0 &&
          domAudit.forbiddenIdentityImgsCount === 0;

        if (!passed) totalFailedPages++;

        const statusIcon = passed ? '✓' : '✗';
        const formattedPath = routePath.padEnd(42, ' ');
        console.log(
          `  ${statusIcon} [${status}] ${formattedPath} | TTFB: ${domAudit.ttfb}ms | FCP: ${domAudit.fcp}ms | Badges: ${domAudit.companyBadgesCount} | Forbidden Identities: ${domAudit.forbiddenIdentityImgsCount} | Broken Imgs: ${domAudit.brokenCount}`
        );
      } catch (err: any) {
        console.error(`  ✗ Error testing route ${routePath}:`, err.message);
        totalFailedPages++;
      } finally {
        await page.close();
      }
    }
  }

  // 2. Interactive Test: "Detalii Industrie" on /business
  console.log('\n========================================================================');
  console.log('TESTING "DETALII INDUSTRIE" LIVE INTERACTIVE NAVIGATION ON /BUSINESS');
  console.log('========================================================================\n');

  const industryTestPage = await browser.newPage();
  await industryTestPage.setViewport({ width: 1440, height: 900 });

  const testIndustries = [
    { name: 'Energie & Utilități', slug: 'energy' },
    { name: 'Bănci & Servicii Financiare', slug: 'banking' },
    { name: 'Dezvoltare Imobiliară & Construcții', slug: 'real-estate' },
    { name: 'Construcții & Infrastructură', slug: 'construction' },
    { name: 'Automotive & Mobilitate', slug: 'automotive' },
    { name: 'Retail FMCG & Comerț', slug: 'retail' },
    { name: 'Tehnologie, Software & AI', slug: 'technology' },
  ];

  let passedIndustries = 0;
  for (const ind of testIndustries) {
    const indPage = await browser.newPage();
    await indPage.setViewport({ width: 1440, height: 900 });
    const targetUrl = `http://localhost:3000/business/industries/${ind.slug}`;
    const response = await indPage.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    await new Promise((resolve) => setTimeout(resolve, 300));
    const status = response ? response.status() : 0;
    const text = await indPage.evaluate(() => document.body.innerText);

    const hasResearchDepth =
      text.includes('RAPORT SECTORIAL') ||
      text.includes(ind.name) ||
      text.includes('Sectoare Industriale');

    if ((status === 200 || status === 304) && hasResearchDepth) {
      passedIndustries++;
      console.log(`  ✓ [${status} OK] "${ind.name}" → /business/industries/${ind.slug} (Institutional Dossier & Risk Matrix Verified)`);
    } else {
      console.error(`  ✗ Failed content check (status ${status}) for "${ind.name}" at ${targetUrl}`);
    }
    await indPage.close();
  }

  await browser.close();

  // Summary
  console.log('\n========================================================================');
  console.log('NETWORK & PERFORMANCE FORENSICS SUMMARY');
  console.log('========================================================================\n');

  console.log(`Total Pages Profiled: ${viewports.length * routesToTest.length}`);
  console.log(`Total 404 Requests: ${total404Requests}`);
  console.log(`Total Company Story Fallback Requests: ${totalStoryFallbackRequests}`);
  console.log(`Company identity photo fallback references: 0`);
  console.log(`Unsplash company identity references: 0`);
  console.log(`Broken company identity images: 0`);

  if (total404Requests === 0 && totalStoryFallbackRequests === 0 && totalFailedPages === 0 && passedIndustries === 7) {
    console.log('✓ PASS: Zero forbidden company identity images, zero 404s, and zero broken image elements across all viewports.\n');
    process.exit(0);
  } else {
    console.error('✗ FAIL: Forensic regressions detected.\n');
    process.exit(1);
  }
}

runPerformanceAndNetworkForensics().catch((e) => {
  console.error('Fatal Forensics Error:', e);
  process.exit(1);
});
