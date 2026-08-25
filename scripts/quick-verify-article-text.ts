import puppeteer from 'puppeteer';

async function quickVerify() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Auditing https://aixmedia.cristianvaduva.com/news...');
  await page.goto('https://aixmedia.cristianvaduva.com/news', { waitUntil: 'domcontentloaded' });

  const firstSlug = await page.evaluate(() => {
    const link = document.querySelector('a[href^="/news/"]') as HTMLAnchorElement;
    return link ? link.getAttribute('href') : null;
  });

  if (firstSlug) {
    const articleUrl = `https://aixmedia.cristianvaduva.com${firstSlug}`;
    console.log(`Auditing article: ${articleUrl}`);
    await page.goto(articleUrl, { waitUntil: 'domcontentloaded' });

    const audit = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const articleEl = document.querySelector('article');
      const text = articleEl ? articleEl.innerText : document.body.innerText;
      const paragraphs = Array.from(document.querySelectorAll('article p')).map((p) => p.textContent || '');

      return {
        h1,
        textLen: text.length,
        paragraphCount: paragraphs.length,
        containsTruncation: text.includes('[…]') || text.includes('[...]'),
        sampleParagraph: paragraphs[0] || '',
      };
    });

    console.log(`\nARTICLE AUDIT RESULTS:`);
    console.log(`Headline           : ${audit.h1}`);
    console.log(`Total Text Length  : ${audit.textLen} chars`);
    console.log(`Paragraphs Count   : ${audit.paragraphCount}`);
    console.log(`Contains [...]     : ${audit.containsTruncation ? 'YES (FAIL)' : 'NO (PASS)'}`);
    console.log(`Sample Paragraph 1 : "${audit.sampleParagraph.slice(0, 150)}..."`);
  }

  await browser.close();
}

quickVerify().catch(console.error);
