import puppeteer from 'puppeteer';

async function verifyRealRadioPlayerLive() {
  console.log('=== FORENSIC LIVE QA: REAL STREAM RADIO PLAYER ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const urlRadio = 'https://aixmedia.cristianvaduva.com/radio';
  console.log(`Auditing Live Radio Platform: ${urlRadio}`);
  const res = await page.goto(urlRadio, { waitUntil: 'domcontentloaded' });
  const status = res?.status() || 0;

  // Click first station Play button
  await page.waitForSelector('button');
  const playButtonText = await page.evaluate(() => {
    const btn = document.querySelector('button');
    return btn ? btn.textContent : '';
  });

  // Click first station Ascultă Live button
  await page.click('button');
  await new Promise((r) => setTimeout(r, 1000));

  const audioSrcAfterClick = await page.evaluate(() => {
    const audio = document.querySelector('audio');
    return audio ? audio.src : '';
  });

  await browser.close();

  console.log(`     HTTP Status        : ${status}`);
  console.log(`     Audio Src On Play  : ${audioSrcAfterClick}`);
  console.log(`     PASS/FAIL VERDICT  : ${status === 200 && audioSrcAfterClick.includes('/api/radio/stream-proxy') ? 'PASS' : 'FAIL'}\n`);
}

verifyRealRadioPlayerLive().catch(console.error);
