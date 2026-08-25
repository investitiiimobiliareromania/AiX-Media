import puppeteer from 'puppeteer';

async function verifyFullCompaniesAudit() {
  console.log('=== FULL COVERAGE FORENSIC QA: COMPANIES INTELLIGENCE TERMINAL ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const routes = [
    'https://aixmedia.cristianvaduva.com/companies',
    'https://aixmedia.cristianvaduva.com/companies/banca-transilvania',
    'https://aixmedia.cristianvaduva.com/companies/hidroelectrica',
    'https://aixmedia.cristianvaduva.com/companies/omv-petrom',
  ];

  let totalBrokenImages = 0;
  let allH1sValid = true;

  for (const url of routes) {
    console.log(`Auditing Route: ${url}`);
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
      const bodyText = document.body.innerText;
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

      return {
        h1,
        totalImgs: imgs.length,
        loadedImgs,
        brokenImgs,
        hasCoverageScore: bodyText.includes('DATA COVERAGE') || bodyText.includes('Dossiers Auditate'),
        hasDiagram: bodyText.includes('How the Business Works'),
        hasFinancials: bodyText.includes('Financial Statements') || bodyText.includes('Istoric Financiar'),
      };
    });

    if (!audit.h1) allH1sValid = false;
    totalBrokenImages += audit.brokenImgs;

    console.log(`     H1 Title       : ${audit.h1}`);
    console.log(`     Data Coverage  : ${audit.hasCoverageScore ? 'YES' : 'NO'}`);
    console.log(`     Business Diagram: ${audit.hasDiagram ? 'YES' : 'NO'}`);
    console.log(`     Financial Stmts: ${audit.hasFinancials ? 'YES' : 'NO'}`);
    console.log(`     Images Rendered: ${audit.loadedImgs} / ${audit.totalImgs} (Broken: ${audit.brokenImgs})\n`);

    await page.close();
  }

  await browser.close();

  const pass = allH1sValid && totalBrokenImages === 0;

  console.log('=== FORENSIC QA SUMMARY ===');
  console.log(`ALL H1 HEADERS PRESENT : ${allH1sValid ? 'YES' : 'NO'}`);
  console.log(`TOTAL BROKEN IMAGES    : ${totalBrokenImages}`);
  console.log(`PASS/FAIL VERDICT      : ${pass ? 'PASS' : 'FAIL'}`);
}

verifyFullCompaniesAudit().catch((e) => console.error(e));
