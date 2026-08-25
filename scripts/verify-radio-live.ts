import puppeteer from 'puppeteer';

async function verifyRadioLive() {
  console.log('=== FORENSIC LIVE QA: RADIO INTELLIGENCE PLATFORM ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Audit /radio homepage
  const urlRadio = 'https://aixmedia.cristianvaduva.com/radio';
  console.log(`Auditing Radio Platform: ${urlRadio}`);
  const resRadio = await page.goto(urlRadio, { waitUntil: 'domcontentloaded' });
  const statusRadio = resRadio?.status() || 0;

  const radioAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const sectionHeaders = Array.from(document.querySelectorAll('h2')).map((h2) => h2.textContent?.trim() || '');
    const cardsCount = document.querySelectorAll('.rounded-3xl').length;

    return {
      h1,
      sectionHeaders,
      cardsCount,
    };
  });

  await browser.close();

  console.log(`     HTTP Status      : ${statusRadio}`);
  console.log(`     H1 Headline      : ${radioAudit.h1}`);
  console.log(`     Section Headers  : ${radioAudit.sectionHeaders.join(' | ')}`);
  console.log(`     Station Cards    : ${radioAudit.cardsCount}`);
  console.log(`     PASS/FAIL VERDICT: ${statusRadio === 200 && radioAudit.cardsCount > 0 ? 'PASS' : 'FAIL'}\n`);
}

verifyRadioLive().catch(console.error);
