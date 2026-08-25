import puppeteer from 'puppeteer';

async function verifyBusinessPage() {
  console.log('=== BUSINESS & COMPANII ROMÂNEȘTI PRODUCTION VERIFICATION ===\n');
  console.log('Opening https://aixmedia.cristianvaduva.com/business in Puppeteer...\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.setExtraHTTPHeaders({
    'Referer': 'https://www.economedia.ro/',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  await page.goto('https://aixmedia.cristianvaduva.com/business', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  console.log('Awaiting image completion and evaluating DOM for all business cards...\n');

  const auditResult = await page.evaluate(async () => {
    const cards = Array.from(document.querySelectorAll('a[href*="/business/"], a[href*="/news/"], article'));
    const results: Array<{
      title: string;
      href: string;
      imgSrc: string;
      nw: number;
      nh: number;
      cw: number;
      ch: number;
      complete: boolean;
    }> = [];

    for (const card of cards) {
      card.scrollIntoView({ behavior: 'instant', block: 'center' });
      const img = card.querySelector('img') as HTMLImageElement | null;
      const titleEl = card.querySelector('h1, h2, h3, h4');
      const title = titleEl ? titleEl.textContent?.trim() || '' : '';
      const href = card.getAttribute('href') || '';

      if (img) {
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((res) => {
            img.onload = res;
            img.onerror = res;
            setTimeout(res, 4000);
          });
        }

        const rect = img.getBoundingClientRect();
        results.push({
          title,
          href,
          imgSrc: img.currentSrc || img.src || '',
          nw: img.naturalWidth,
          nh: img.naturalHeight,
          cw: rect.width,
          ch: rect.height,
          complete: img.complete,
        });
      }
    }

    return results;
  });

  console.log(`Total Business Cards with Images Rendered in Browser DOM: ${auditResult.length}\n`);

  let loadedImages = 0;
  let brokenImages = 0;
  let publisherImages = 0;
  let fallbackImages = 0;

  auditResult.forEach((res, i) => {
    const isLoaded = res.nw > 0 && res.nh > 0;
    if (isLoaded) loadedImages++;
    else brokenImages++;

    if (res.imgSrc.includes('economedia.ro') || res.imgSrc.startsWith('http')) {
      publisherImages++;
    } else {
      fallbackImages++;
    }

    const verdict = isLoaded ? 'PASS' : 'FAIL';
    console.log(
      `[${(i + 1).toString().padStart(2, '0')}/${auditResult.length}] ${verdict} | Img: ${res.nw}x${res.nh} | ${res.title.slice(0, 60)}`
    );
    console.log(`     Src: ${res.imgSrc.slice(0, 90)}\n`);
  });

  await browser.close();

  console.log('=== BUSINESS PAGE AUDIT SUMMARY ===');
  console.log(`TOTAL BUSINESS CARDS DISPLAYED      : ${auditResult.length}`);
  console.log(`RENDERED IMAGES (naturalWidth > 0)  : ${loadedImages}`);
  console.log(`BROKEN IMAGES                       : ${brokenImages}`);
  console.log(`PUBLISHER IMAGES                    : ${publisherImages}`);
  console.log(`FALLBACK IMAGES                     : ${fallbackImages}`);

  const pass = auditResult.length > 5 && loadedImages === auditResult.length && brokenImages === 0;
  console.log(`\nFINAL AUDIT VERDICT: ${pass ? 'PASS' : 'FAIL'}`);
}

verifyBusinessPage().catch((e) => console.error(e));
