import puppeteer from 'puppeteer';

async function verifyNewsRealSlug() {
  console.log('=== FORENSIC LIVE QA: NEWS TERMINAL (REAL SLUGS) ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const urlHome = 'https://aixmedia.cristianvaduva.com/news';
  await page.goto(urlHome, { waitUntil: 'domcontentloaded' });

  // Extract first article href from live page
  const articleHref = await page.evaluate(() => {
    const link = document.querySelector('a[href^="/news/"]');
    return link ? link.getAttribute('href') : null;
  });

  console.log(`Live Article Link Found: ${articleHref}`);

  if (articleHref) {
    const fullArticleUrl = `https://aixmedia.cristianvaduva.com${articleHref}`;
    console.log(`Auditing Real Article: ${fullArticleUrl}`);

    const res = await page.goto(fullArticleUrl, { waitUntil: 'domcontentloaded' });
    const status = res?.status() || 0;

    const audit = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const bodyText = document.querySelector('.prose')?.textContent?.trim() || '';
      const isTruncated = bodyText.includes('[...]') || bodyText.includes('…') || bodyText.includes('&#8230;');
      const hasIntelPanel = document.body.innerHTML.includes('Why It Matters');

      return {
        h1,
        bodyLength: bodyText.length,
        isTruncated,
        hasIntelPanel,
      };
    });

    console.log(`     HTTP Status     : ${status}`);
    console.log(`     H1 Headline     : ${audit.h1}`);
    console.log(`     Body Length     : ${audit.bodyLength} characters`);
    console.log(`     Is Truncated    : ${audit.isTruncated ? 'YES (FAIL)' : 'NO (PASS)'}`);
    console.log(`     Intel Panel Live: ${audit.hasIntelPanel ? 'YES' : 'NO'}`);
    console.log(`     PASS/FAIL VERDICT: ${status === 200 && !audit.isTruncated && audit.hasIntelPanel ? 'PASS' : 'FAIL'}\n`);
  }

  await browser.close();
}

verifyNewsRealSlug().catch(console.error);
