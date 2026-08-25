import puppeteer from 'puppeteer';
import crypto from 'crypto';

interface CardDomAudit {
  index: number;
  slug: string;
  title: string;
  cardBox: { width: number; height: number };
  imgSrc: string;
  imgNaturalWidth: number;
  imgNaturalHeight: number;
  imgClientWidth: number;
  imgClientHeight: number;
  isVisible: boolean;
  hasSrc: boolean;
  sha256: string;
  verdict: 'PASS' | 'FAIL';
}

async function verifyRenderedProductionDom() {
  console.log('=== VISUAL / BROWSER DOM PRODUCTION VERIFICATION ===\n');
  console.log('Opening https://aixmedia.cristianvaduva.com/news in Puppeteer...\n');

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

  // Navigate to live production
  await page.goto('https://aixmedia.cristianvaduva.com/news', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  console.log('Scrolling and awaiting browser DOM image load completion for all cards...\n');

  // Extract all article cards from the browser DOM inside #articles grid after ensuring completion
  const cardsData = await page.evaluate(async () => {
    const cardElements = document.querySelectorAll('#articles div.grid > a, #articles article');
    const results: Array<{
      title: string;
      href: string;
      imgSrc: string;
      cardWidth: number;
      cardHeight: number;
      imgNaturalWidth: number;
      imgNaturalHeight: number;
      imgClientWidth: number;
      imgClientHeight: number;
      isDisplayed: boolean;
    }> = [];

    for (let i = 0; i < cardElements.length; i++) {
      const cardEl = cardElements[i]!;
      cardEl.scrollIntoView({ behavior: 'instant', block: 'center' });

      const titleEl = cardEl.querySelector('h3, h4');
      const title = titleEl ? titleEl.textContent?.trim() || '' : '';
      const href = cardEl.getAttribute('href') || '';
      const imgEl = cardEl.querySelector('img') as HTMLImageElement | null;

      const rect = cardEl.getBoundingClientRect();
      const isDisplayed =
        window.getComputedStyle(cardEl).display !== 'none' && rect.width > 0 && rect.height > 0;

      let imgSrc = '';
      let imgNaturalWidth = 0;
      let imgNaturalHeight = 0;
      let imgClientWidth = 0;
      let imgClientHeight = 0;

      if (imgEl) {
        if (!imgEl.complete || imgEl.naturalWidth === 0) {
          await new Promise((res) => {
            imgEl.onload = res;
            imgEl.onerror = res;
            setTimeout(res, 5000);
          });
        }
        imgSrc = imgEl.currentSrc || imgEl.src || '';
        imgNaturalWidth = imgEl.naturalWidth;
        imgNaturalHeight = imgEl.naturalHeight;
        const imgRect = imgEl.getBoundingClientRect();
        imgClientWidth = imgRect.width;
        imgClientHeight = imgRect.height;
      }

      results.push({
        title,
        href,
        imgSrc,
        cardWidth: rect.width,
        cardHeight: rect.height,
        imgNaturalWidth,
        imgNaturalHeight,
        imgClientWidth,
        imgClientHeight,
        isDisplayed,
      });
    }

    return results;
  });

  console.log(`Total Rendered Article Cards Found in DOM: ${cardsData.length}\n`);

  let visibleImageCardCount = 0;
  let missingImageCardCount = 0;
  let brokenImageCardCount = 0;
  let invisibleImageCardCount = 0;
  let testArticleCount = 0;

  const audits: CardDomAudit[] = [];

  for (let i = 0; i < cardsData.length; i++) {
    const card = cardsData[i]!;
    const slug = card.href.split('/').pop() || card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const isTest =
      slug === 'test-slug-12345' || slug.startsWith('test-') || card.title.toLowerCase() === 'test';

    if (isTest) testArticleCount++;

    const hasSrc = card.imgSrc.trim().length > 0;
    const hasDimensions = card.imgClientWidth > 0 && card.imgClientHeight > 0;
    const isVisible = card.isDisplayed && hasSrc && hasDimensions && card.imgNaturalWidth > 0;

    if (!hasSrc) {
      missingImageCardCount++;
    } else if (!hasDimensions || card.imgNaturalWidth === 0) {
      brokenImageCardCount++;
    } else if (!card.isDisplayed) {
      invisibleImageCardCount++;
    } else {
      visibleImageCardCount++;
    }

    const sha256 = crypto.createHash('sha256').update(card.imgSrc).digest('hex').slice(0, 16);
    const verdict = isVisible && hasSrc && card.imgNaturalWidth > 0 ? 'PASS' : 'FAIL';

    console.log(
      `[${(i + 1).toString().padStart(2, '0')}/${cardsData.length}] ${verdict.padEnd(4)} | Box: ${Math.round(card.cardWidth)}x${Math.round(card.cardHeight)} | Img: ${card.imgNaturalWidth}x${card.imgNaturalHeight} (Client: ${Math.round(card.imgClientWidth)}x${Math.round(card.imgClientHeight)})`
    );
    console.log(`     Title: ${card.title.slice(0, 65)}`);
    console.log(`     Src  : ${card.imgSrc}`);
    console.log(`     Hash : ${sha256}...\n`);

    audits.push({
      index: i + 1,
      slug,
      title: card.title,
      cardBox: { width: card.cardWidth, height: card.cardHeight },
      imgSrc: card.imgSrc,
      imgNaturalWidth: card.imgNaturalWidth,
      imgNaturalHeight: card.imgNaturalHeight,
      imgClientWidth: card.imgClientWidth,
      imgClientHeight: card.imgClientHeight,
      isVisible,
      hasSrc,
      sha256,
      verdict,
    });
  }

  await browser.close();

  const total = cardsData.length;
  console.log('=== RENDERED BROWSER DOM AUDIT SUMMARY ===');
  console.log(`TOTAL ARTICLES                      : ${total}`);
  console.log(`VISIBLE IMAGE CARDS                 : ${visibleImageCardCount}`);
  console.log(`MISSING IMAGE CARDS                 : ${missingImageCardCount}`);
  console.log(`BROKEN IMAGE CARDS                  : ${brokenImageCardCount}`);
  console.log(`INVISIBLE/0-DIMENSION IMAGE CARDS   : ${invisibleImageCardCount}`);
  console.log(`TEST/DEMO ARTICLES                  : ${testArticleCount}`);

  const pass =
    total > 0 &&
    visibleImageCardCount === total &&
    missingImageCardCount === 0 &&
    brokenImageCardCount === 0 &&
    invisibleImageCardCount === 0 &&
    testArticleCount === 0;

  console.log(`\nFINAL DOM AUDIT VERDICT: ${pass ? 'PASS' : 'FAIL'}`);
}

verifyRenderedProductionDom().catch((e) => console.error(e));
