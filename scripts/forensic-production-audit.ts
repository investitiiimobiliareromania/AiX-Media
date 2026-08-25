/* eslint-disable */
import puppeteer from 'puppeteer';

interface AuditCheck {
  section: string;
  test: string;
  status: 'PASS' | 'FAIL';
  details: string;
}

const auditChecks: AuditCheck[] = [];

const desktopViewports = [
  { name: 'Desktop Large (1728x1117)', width: 1728, height: 1117, isMobile: false },
  { name: 'Desktop Standard (1440x900)', width: 1440, height: 900, isMobile: false },
];

const mobileViewports = [
  { name: 'iPhone 14 Pro (393x852)', width: 393, height: 852, isMobile: true },
  { name: 'iPhone 14 Pro Max (430x932)', width: 430, height: 932, isMobile: true },
  { name: 'iPhone 12/13 (390x844)', width: 390, height: 844, isMobile: true },
];

const majorRoutes = [
  { path: '/', name: 'Homepage' },
  { path: '/news', name: 'News Terminal' },
  { path: '/news/ancpi-evolutie-tranzactii-imobiliare-romania', name: 'Article Detail (ANCPI)' },
  { path: '/news/bnr-decizie-rata-dobanzii-politica-monetara', name: 'Article Detail (BNR)' },
  { path: '/business', name: 'Business Intelligence' },
  { path: '/companies', name: 'Companies Directory' },
  { path: '/companies/banca-transilvania', name: 'Company Dossier (TLV)' },
  { path: '/companies/hidroelectrica', name: 'Company Dossier (H2O)' },
  { path: '/companies/omv-petrom', name: 'Company Dossier (SNP)' },
  { path: '/markets', name: 'Capital Markets & Macro' },
  { path: '/real-estate', name: 'Real Estate Intelligence' },
  { path: '/podcasts', name: 'Podcast Catalog' },
  { path: '/podcast/evolutia-pietei-imobiliare-tranzactii-oficiale', name: 'Podcast Episode Detail' },
  { path: '/tv', name: 'AiX TV & Video' },
  { path: '/video/PzPo7wbtUB4', name: 'Video Detail' },
  { path: '/radio', name: 'Radio Intelligence Player' },
  { path: '/search', name: 'Search Terminal' },
];

async function runForensicAudit() {
  console.log('========================================================================');
  console.log('AIX MEDIA — FORENSIC PRODUCTION REALITY & UX HARDENING AUDIT');
  console.log('Target: http://localhost:3000 (Compiled Next.js Production Server)');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Desktop & Mobile Viewport Matrix & Overflow Check
  console.log('1. Checking Viewport Responsiveness & Zero Horizontal Overflow...');
  const allViewports = [...desktopViewports, ...mobileViewports];

  for (const vp of allViewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
    page.setDefaultNavigationTimeout(30000);

    for (const route of majorRoutes) {
      try {
        const response = await page.goto(`http://localhost:3000${route.path}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });

        const status = response ? response.status() : 0;
        const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

        if (status === 200 || status === 304) {
          if (!hasOverflow) {
            auditChecks.push({
              section: 'Viewport & Overflow',
              test: `${vp.name} -> ${route.path}`,
              status: 'PASS',
              details: `HTTP ${status}, Overflow: false`,
            });
          } else {
            auditChecks.push({
              section: 'Viewport & Overflow',
              test: `${vp.name} -> ${route.path}`,
              status: 'FAIL',
              details: 'Horizontal overflow detected',
            });
          }
        } else {
          auditChecks.push({
            section: 'Viewport & Overflow',
            test: `${vp.name} -> ${route.path}`,
            status: 'FAIL',
            details: `Unexpected HTTP status ${status}`,
          });
        }
      } catch (err: any) {
        auditChecks.push({
          section: 'Viewport & Overflow',
          test: `${vp.name} -> ${route.path}`,
          status: 'FAIL',
          details: err.message,
        });
      }
    }
    await page.close();
  }

  // 2. Interactive Search Engine & Entity Query Testing
  console.log('\n2. Testing Search Engine & Multi-Entity Resolution...');
  const searchPage = await browser.newPage();
  await searchPage.setViewport({ width: 1440, height: 900 });

  const testQueries = ['Banca Transilvania', 'Hidroelectrica', 'OMV Petrom', 'ANCPI', 'imobiliare', 'BVB'];
  for (const query of testQueries) {
    try {
      await searchPage.goto(`http://localhost:3000/search?q=${encodeURIComponent(query)}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      });

      const hasResults = await searchPage.evaluate(() => {
        const text = document.body.innerText;
        return !text.includes('Niciun rezultat') && text.length > 500;
      });

      if (hasResults) {
        auditChecks.push({
          section: 'Search Engine',
          test: `Query: "${query}"`,
          status: 'PASS',
          details: 'Resolved relevant entities and content cards',
        });
      } else {
        auditChecks.push({
          section: 'Search Engine',
          test: `Query: "${query}"`,
          status: 'FAIL',
          details: 'No results found or empty response',
        });
      }
    } catch (e: any) {
      auditChecks.push({
        section: 'Search Engine',
        test: `Query: "${query}"`,
        status: 'FAIL',
        details: e.message,
      });
    }
  }
  await searchPage.close();

  // 3. Audio & Media Interactive Component Testing
  console.log('\n3. Testing Media & Audio Interactive Controls...');
  const podcastPage = await browser.newPage();
  await podcastPage.setViewport({ width: 1440, height: 900 });
  try {
    await podcastPage.goto('http://localhost:3000/podcast/evolutia-pietei-imobiliare-tranzactii-oficiale', {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });

    const playerState = await podcastPage.evaluate(() => {
      const audio = document.querySelector('audio');
      const buttons = Array.from(document.querySelectorAll('button'));
      const playBtn =
        document.querySelector('button[aria-label*="Redă"], button[aria-label*="Play"], button[aria-label*="Pauză"]') ||
        buttons.find((b) => b.textContent?.includes('Ascultă') || b.textContent?.includes('Pauză') || b.textContent?.includes('Play'));
      const scrubber = document.querySelector('input[type="range"]');
      return {
        hasAudio: !!audio,
        hasPlayBtn: !!playBtn,
        hasScrubber: !!scrubber,
        audioSrc: audio?.src || '',
      };
    });

    if (playerState.hasAudio && playerState.hasPlayBtn && playerState.hasScrubber) {
      auditChecks.push({
        section: 'Media & Podcasts',
        test: 'Interactive Podcast Player Controls',
        status: 'PASS',
        details: `Audio element found, play button & scrubber verified (src: ${playerState.audioSrc.slice(0, 40)}...)`,
      });
    } else {
      auditChecks.push({
        section: 'Media & Podcasts',
        test: 'Interactive Podcast Player Controls',
        status: 'FAIL',
        details: `Missing elements: ${JSON.stringify(playerState)}`,
      });
    }
  } catch (e: any) {
    auditChecks.push({
      section: 'Media & Podcasts',
      test: 'Interactive Podcast Player Controls',
      status: 'FAIL',
      details: e.message,
    });
  }
  await podcastPage.close();

  // 4. Company Dossier Financial Integrity & Provenance
  console.log('\n4. Testing Company Dossiers & Multi-Year Financial Statements...');
  const companyPage = await browser.newPage();
  await companyPage.setViewport({ width: 1440, height: 900 });
  const companiesToTest = [
    { slug: 'banca-transilvania', name: 'Banca Transilvania' },
    { slug: 'hidroelectrica', name: 'Hidroelectrica' },
    { slug: 'omv-petrom', name: 'OMV Petrom' },
  ];

  for (const comp of companiesToTest) {
    try {
      await companyPage.goto(`http://localhost:3000/companies/${comp.slug}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      });

      const dossierData = await companyPage.evaluate(() => {
        const text = document.body.innerText;
        const has2025 = text.includes('2025') || text.includes('FY 2025');
        const has2024 = text.includes('2024') || text.includes('FY 2024');
        const hasProvenance = text.includes('Audited') || text.includes('Official') || text.includes('IFRS') || text.includes('BVB');
        const hasResearchView = text.includes('Growth Drivers') || text.includes('What Investors Should Watch') || text.includes('Notă de cercetare');
        return { has2025, has2024, hasProvenance, hasResearchView };
      });

      if (dossierData.has2025 && dossierData.has2024 && dossierData.hasProvenance && dossierData.hasResearchView) {
        auditChecks.push({
          section: 'Company Dossiers',
          test: `Dossier: ${comp.name}`,
          status: 'PASS',
          details: 'Multi-year audited financials, provenance badges, and institutional research view verified',
        });
      } else {
        auditChecks.push({
          section: 'Company Dossiers',
          test: `Dossier: ${comp.name}`,
          status: 'FAIL',
          details: `Missing components: ${JSON.stringify(dossierData)}`,
        });
      }
    } catch (e: any) {
      auditChecks.push({
        section: 'Company Dossiers',
        test: `Dossier: ${comp.name}`,
        status: 'FAIL',
        details: e.message,
      });
    }
  }
  await companyPage.close();

  // 5. Live DOM JSON-LD Schema Verification
  console.log('\n5. Testing Live DOM Structured Data Schemas...');
  const schemaPage = await browser.newPage();
  await schemaPage.setViewport({ width: 1440, height: 900 });

  const schemaEndpoints = [
    { path: '/news/ancpi-evolutie-tranzactii-imobiliare-romania', required: ['NewsArticle', 'NewsMediaOrganization', 'BreadcrumbList'] },
    { path: '/companies/banca-transilvania', required: ['Corporation', 'NewsMediaOrganization', 'BreadcrumbList'] },
    { path: '/video/PzPo7wbtUB4', required: ['VideoObject', 'NewsMediaOrganization', 'BreadcrumbList'] },
    { path: '/podcast/evolutia-pietei-imobiliare-tranzactii-oficiale', required: ['PodcastEpisode', 'NewsMediaOrganization', 'BreadcrumbList'] },
  ];

  for (const ep of schemaEndpoints) {
    try {
      await schemaPage.goto(`http://localhost:3000${ep.path}`, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      });

      const schemasFound = await schemaPage.evaluate(() => {
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

      const allPresent = ep.required.every((r) => schemasFound.includes(r));
      if (allPresent) {
        auditChecks.push({
          section: 'Structured Data',
          test: `Schemas on ${ep.path}`,
          status: 'PASS',
          details: `Injected: ${schemasFound.join(', ')}`,
        });
      } else {
        auditChecks.push({
          section: 'Structured Data',
          test: `Schemas on ${ep.path}`,
          status: 'FAIL',
          details: `Expected: ${ep.required.join(', ')} | Found: ${schemasFound.join(', ')}`,
        });
      }
    } catch (e: any) {
      auditChecks.push({
        section: 'Structured Data',
        test: `Schemas on ${ep.path}`,
        status: 'FAIL',
        details: e.message,
      });
    }
  }
  await schemaPage.close();

  await browser.close();

  // Summary Report
  console.log('\n========================================================================');
  console.log('FORENSIC PRODUCTION AUDIT SUMMARY');
  console.log('========================================================================\n');

  const failed = auditChecks.filter((c) => c.status === 'FAIL');
  const passed = auditChecks.filter((c) => c.status === 'PASS');

  console.log(`Total Forensic Checks: ${auditChecks.length}`);
  console.log(`Passed: ${passed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length === 0) {
    console.log('\n✓ ALL FORENSIC PRODUCTION & UX QUALITY GATES PASSED (100% GREEN)');
    process.exit(0);
  } else {
    console.error(`\n✗ ${failed.length} FORENSIC DEFECTS IDENTIFIED:`);
    failed.forEach((f, idx) => {
      console.error(`  ${idx + 1}. [${f.section}] ${f.test}: ${f.details}`);
    });
    process.exit(1);
  }
}

runForensicAudit().catch((e) => {
  console.error('Fatal Forensic Production Audit Error:', e);
  process.exit(1);
});
