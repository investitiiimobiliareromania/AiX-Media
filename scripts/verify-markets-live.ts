import puppeteer from 'puppeteer';

async function verifyMarketsLive() {
  console.log('=== FORENSIC LIVE QA: MARKETS INTELLIGENCE TERMINAL ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const url = 'https://aixmedia.cristianvaduva.com/markets';
  console.log(`Auditing URL: ${url}`);

  const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
  const status = res?.status() || 0;

  const audit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const sectionHeaders = Array.from(document.querySelectorAll('h2')).map((h2) => h2.textContent?.trim() || '');
    const cardsCount = document.querySelectorAll('.rounded-2xl, .rounded-3xl').length;
    const images = Array.from(document.querySelectorAll('img'));
    const brokenImages = images.filter((img) => !img.complete || img.naturalWidth === 0).length;

    return {
      h1,
      sectionHeaders,
      cardsCount,
      totalImages: images.length,
      brokenImages,
    };
  });

  await browser.close();

  console.log(`     HTTP Status      : ${status}`);
  console.log(`     H1 Headline      : ${audit.h1}`);
  console.log(`     Section Headers  : ${audit.sectionHeaders.join(' | ')}`);
  console.log(`     Cards Rendered   : ${audit.cardsCount}`);
  console.log(`     Images Rendered  : ${audit.totalImages} (Broken: ${audit.brokenImages})`);
  console.log(`     PASS/FAIL VERDICT: ${status === 200 && audit.brokenImages === 0 ? 'PASS' : 'FAIL'}\n`);
}

verifyMarketsLive().catch(console.error);
