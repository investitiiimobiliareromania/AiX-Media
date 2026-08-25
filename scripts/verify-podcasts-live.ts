import puppeteer from 'puppeteer';

async function verifyPodcastsLive() {
  console.log('=== FORENSIC LIVE QA: PODCASTS INTELLIGENCE TERMINAL ===\n');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Audit /podcasts homepage
  const urlPod = 'https://aixmedia.cristianvaduva.com/podcasts';
  console.log(`Auditing Podcasts Homepage: ${urlPod}`);
  const resPod = await page.goto(urlPod, { waitUntil: 'domcontentloaded' });
  const statusPod = resPod?.status() || 0;

  const podAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const sectionHeaders = Array.from(document.querySelectorAll('h2')).map((h2) => h2.textContent?.trim() || '');
    const cardsCount = document.querySelectorAll('.rounded-2xl, .rounded-3xl').length;

    return {
      h1,
      sectionHeaders,
      cardsCount,
    };
  });

  console.log(`     HTTP Status      : ${statusPod}`);
  console.log(`     H1 Headline      : ${podAudit.h1}`);
  console.log(`     Section Headers  : ${podAudit.sectionHeaders.join(' | ')}`);
  console.log(`     Cards Rendered   : ${podAudit.cardsCount}\n`);

  // 2. Audit individual episode detail page
  const episodeSlug = 'evolutia-pietei-imobiliare-tranzactii-oficiale';
  const urlEpisode = `https://aixmedia.cristianvaduva.com/podcast/${episodeSlug}`;
  console.log(`Auditing Individual Episode Page: ${urlEpisode}`);
  const resEp = await page.goto(urlEpisode, { waitUntil: 'domcontentloaded' });
  const statusEp = resEp?.status() || 0;

  const epAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const hasSpotifyBtn = document.body.innerText.includes('Spotify');

    return {
      h1,
      hasSpotifyBtn,
    };
  });

  await browser.close();

  console.log(`     HTTP Status      : ${statusEp}`);
  console.log(`     H1 Episode Title : ${epAudit.h1}`);
  console.log(`     Spotify Link     : ${epAudit.hasSpotifyBtn ? 'YES' : 'NO'}`);
  console.log(`     PASS/FAIL VERDICT: ${statusPod === 200 && statusEp === 200 && epAudit.hasSpotifyBtn ? 'PASS' : 'FAIL'}\n`);
}

verifyPodcastsLive().catch(console.error);
