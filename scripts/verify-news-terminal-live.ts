import puppeteer from 'puppeteer';

async function verifyNewsLive() {
  console.log('=== FORENSIC LIVE QA: NEWS & INTELLIGENCE TERMINAL ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Audit /news homepage
  const urlHome = 'https://aixmedia.cristianvaduva.com/news';
  console.log(`Auditing Homepage: ${urlHome}`);
  const resHome = await page.goto(urlHome, { waitUntil: 'domcontentloaded' });
  const statusHome = resHome?.status() || 0;

  const homeAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const searchInput = !!document.querySelector('input[placeholder*="Caută"]');
    const articlesCount = document.querySelectorAll('article, .group').length;
    const images = Array.from(document.querySelectorAll('img'));
    const brokenImages = images.filter((img) => !img.complete || img.naturalWidth === 0).length;

    return {
      h1,
      searchInput,
      articlesCount,
      totalImages: images.length,
      brokenImages,
    };
  });

  console.log(`     HTTP Status     : ${statusHome}`);
  console.log(`     H1 Headline     : ${homeAudit.h1}`);
  console.log(`     Search Bar      : ${homeAudit.searchInput ? 'YES' : 'NO'}`);
  console.log(`     Articles Cards  : ${homeAudit.articlesCount}`);
  console.log(`     Images Rendered : ${homeAudit.totalImages} (Broken: ${homeAudit.brokenImages})\n`);

  // 2. Audit individual article detail page
  const sampleArticleSlug = 'decizie-istorica-a-bancii-nationale-a-romaniei-rata-dobanzii-de-politica-monetara-a-fost-redusa-la-65-pe-an';
  const urlArticle = `https://aixmedia.cristianvaduva.com/news/${sampleArticleSlug}`;
  console.log(`Auditing Individual Article: ${urlArticle}`);
  const resArt = await page.goto(urlArticle, { waitUntil: 'domcontentloaded' });
  const statusArt = resArt?.status() || 0;

  const artAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const bodyText = document.querySelector('.prose')?.textContent?.trim() || '';
    const isTruncated = bodyText.includes('[...]') || bodyText.includes('…') || bodyText.includes('&#8230;');
    const hasIntelPanel = bodyText.includes('Why It Matters') || document.body.innerHTML.includes('Why It Matters');
    const length = bodyText.length;

    return {
      h1,
      length,
      isTruncated,
      hasIntelPanel,
    };
  });

  await browser.close();

  console.log(`     HTTP Status     : ${statusArt}`);
  console.log(`     H1 Article      : ${artAudit.h1}`);
  console.log(`     Body Length     : ${artAudit.length} chars`);
  console.log(`     Is Truncated    : ${artAudit.isTruncated ? 'YES (FAIL)' : 'NO (PASS)'}`);
  console.log(`     Intel Panel Live: ${artAudit.hasIntelPanel ? 'YES' : 'NO'}`);
  console.log(`     PASS/FAIL VERDICT: ${statusHome === 200 && statusArt === 200 && !artAudit.isTruncated ? 'PASS' : 'FAIL'}\n`);
}

verifyNewsLive().catch(console.error);
