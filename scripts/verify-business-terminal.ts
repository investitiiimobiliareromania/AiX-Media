import puppeteer from 'puppeteer';

async function verifyBusinessTerminal() {
  console.log('=== BUSINESS INTELLIGENCE TERMINAL PRODUCTION QA VERIFICATION ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. DESKTOP VERIFICATION (1440x900)
  console.log('--- 1. DESKTOP AUDIT (1440x900) ---');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });

  await desktopPage.setExtraHTTPHeaders({
    'Referer': 'https://www.economedia.ro/',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  await desktopPage.goto('https://aixmedia.cristianvaduva.com/business', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const desktopResults = await desktopPage.evaluate(async () => {
    const sections = ['overview', 'companies', 'rankings', 'industries', 'deals', 'executives', 'radar', 'the-numbers', 'insights', 'latest-news'];
    const sectionCheck = sections.map((id) => ({
      id,
      exists: !!document.getElementById(id),
    }));

    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
    for (const img of imgs) {
      img.scrollIntoView({ behavior: 'instant', block: 'center' });
      if (!img.complete || img.naturalWidth === 0) {
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
          setTimeout(res, 3000);
        });
      }
    }

    const loadedImgs = imgs.filter((img) => img.naturalWidth > 0).length;
    const brokenImgs = imgs.filter((img) => img.naturalWidth === 0).length;

    return {
      sectionCheck,
      totalImgs: imgs.length,
      loadedImgs,
      brokenImgs,
    };
  });

  console.log('Desktop Sections Check:', desktopResults.sectionCheck);
  console.log(`Desktop Images Rendered: ${desktopResults.loadedImgs} / ${desktopResults.totalImgs} (Broken: ${desktopResults.brokenImgs})\n`);

  // 2. MOBILE VERIFICATION (390x844 - iPhone 12/13/14)
  console.log('--- 2. MOBILE AUDIT (390x844) ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await mobilePage.setExtraHTTPHeaders({
    'Referer': 'https://www.economedia.ro/',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
  });

  await mobilePage.goto('https://aixmedia.cristianvaduva.com/business', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const mobileResults = await mobilePage.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
    for (const img of imgs) {
      img.scrollIntoView({ behavior: 'instant', block: 'center' });
      if (!img.complete || img.naturalWidth === 0) {
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
          setTimeout(res, 3000);
        });
      }
    }

    const loadedImgs = imgs.filter((img) => img.naturalWidth > 0).length;
    const brokenImgs = imgs.filter((img) => img.naturalWidth === 0).length;

    return {
      totalImgs: imgs.length,
      loadedImgs,
      brokenImgs,
    };
  });

  console.log(`Mobile Images Rendered: ${mobileResults.loadedImgs} / ${mobileResults.totalImgs} (Broken: ${mobileResults.brokenImgs})\n`);

  await browser.close();

  const allSectionsPresent = desktopResults.sectionCheck.every((s) => s.exists);
  const noBrokenImages = desktopResults.brokenImgs === 0 && mobileResults.brokenImgs === 0;

  console.log('=== BUSINESS INTELLIGENCE TERMINAL QA SUMMARY ===');
  console.log(`ALL 10 MODULE SECTIONS PRESENT      : ${allSectionsPresent ? 'YES' : 'NO'}`);
  console.log(`DESKTOP LOADED IMAGES               : ${desktopResults.loadedImgs} / ${desktopResults.totalImgs}`);
  console.log(`MOBILE LOADED IMAGES                : ${mobileResults.loadedImgs} / ${mobileResults.totalImgs}`);
  console.log(`BROKEN IMAGES                       : ${desktopResults.brokenImgs + mobileResults.brokenImgs}`);

  const pass = allSectionsPresent && noBrokenImages && desktopResults.totalImgs > 5;
  console.log(`\nFINAL VERDICT: ${pass ? 'PASS' : 'FAIL'}`);
}

verifyBusinessTerminal().catch((e) => console.error(e));
