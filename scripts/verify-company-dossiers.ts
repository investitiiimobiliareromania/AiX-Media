import puppeteer from 'puppeteer';

async function verifyCompanyDossiers() {
  console.log('=== INSTITUTIONAL COMPANY DOSSIER QA AUDIT ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const urls = [
    'https://aixmedia.cristianvaduva.com/companies/banca-transilvania',
    'https://aixmedia.cristianvaduva.com/companies/hidroelectrica',
    'https://aixmedia.cristianvaduva.com/business/companies/banca-transilvania',
  ];

  for (const url of urls) {
    console.log(`Auditing ${url}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.setExtraHTTPHeaders({
      'Referer': 'https://www.economedia.ro/',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const audit = await page.evaluate(async () => {
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
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

      const loadedImgs = imgs.filter((i) => i.naturalWidth > 0).length;
      const brokenImgs = imgs.filter((i) => i.naturalWidth === 0).length;
      const hasFinancials = document.body.innerText.includes('Financial Statements') || document.body.innerText.includes('Istoric Financiar');

      return {
        h1,
        totalImgs: imgs.length,
        loadedImgs,
        brokenImgs,
        hasFinancials,
      };
    });

    console.log(`     H1 Header      : ${audit.h1}`);
    console.log(`     Financials     : ${audit.hasFinancials ? 'PRESENT' : 'MISSING'}`);
    console.log(`     Images Rendered: ${audit.loadedImgs} / ${audit.totalImgs} (Broken: ${audit.brokenImgs})\n`);
    await page.close();
  }

  await browser.close();
  console.log('=== INSTITUTIONAL COMPANY DOSSIERS QA COMPLETE ===');
}

verifyCompanyDossiers().catch((e) => console.error(e));
