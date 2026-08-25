import puppeteer from 'puppeteer';

async function verifyYouTubeChannelLive() {
  console.log('=== FORENSIC LIVE QA: YOUTUBE CHANNEL PLATFORM ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Audit /tv homepage
  const urlTv = 'https://aixmedia.cristianvaduva.com/tv';
  console.log(`Auditing YouTube Channel Homepage: ${urlTv}`);
  const resTv = await page.goto(urlTv, { waitUntil: 'domcontentloaded' });
  const statusTv = resTv?.status() || 0;

  const tvAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const sectionHeaders = Array.from(document.querySelectorAll('h2')).map((h2) => h2.textContent?.trim() || '');
    const iframeCount = document.querySelectorAll('iframe').length;
    const cardsCount = document.querySelectorAll('.rounded-2xl, .rounded-3xl').length;

    return {
      h1,
      sectionHeaders,
      iframeCount,
      cardsCount,
    };
  });

  console.log(`     HTTP Status      : ${statusTv}`);
  console.log(`     H1 Headline      : ${tvAudit.h1}`);
  console.log(`     Section Headers  : ${tvAudit.sectionHeaders.join(' | ')}`);
  console.log(`     YouTube Embeds   : ${tvAudit.iframeCount}`);
  console.log(`     Video Cards      : ${tvAudit.cardsCount}\n`);

  // 2. Audit individual video page
  const videoSlug = 'the-negociation-that-never-happened';
  const urlVideo = `https://aixmedia.cristianvaduva.com/video/${videoSlug}`;
  console.log(`Auditing Individual Video Page: ${urlVideo}`);
  const resVideo = await page.goto(urlVideo, { waitUntil: 'domcontentloaded' });
  const statusVideo = resVideo?.status() || 0;

  const videoAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const hasPlayButton = !!document.querySelector('button[aria-label*="Play video"]') || document.querySelectorAll('iframe').length > 0;

    return {
      h1,
      hasPlayButton,
    };
  });

  await browser.close();

  console.log(`     HTTP Status      : ${statusVideo}`);
  console.log(`     H1 Video Title   : ${videoAudit.h1}`);
  console.log(`     Facade / Player  : ${videoAudit.hasPlayButton ? 'YES' : 'NO'}`);
  console.log(`     PASS/FAIL VERDICT: ${statusTv === 200 && statusVideo === 200 && videoAudit.hasPlayButton ? 'PASS' : 'FAIL'}\n`);
}

verifyYouTubeChannelLive().catch(console.error);
