import puppeteer from 'puppeteer';
import { createAdminClient } from '../src/lib/supabase/admin';

async function verifyLiveFullArticles() {
  console.log('=== FORENSIC LIVE QA: FULL ARTICLE UNTRUNCATED CONTENT ===\n');

  const supabase = createAdminClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, title')
    .order('created_at', { ascending: false })
    .limit(10);

  if (!articles || articles.length === 0) {
    console.error('No articles found in DB');
    return;
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let totalTested = 0;
  let totalFullContent = 0;
  let totalWithTruncationArtifacts = 0;

  for (const art of articles) {
    const url = `https://aixmedia.cristianvaduva.com/news/${art.slug}`;
    console.log(`Testing Article: ${art.title}`);
    console.log(`URL: ${url}`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await page.setExtraHTTPHeaders({
      'Referer': 'https://www.economedia.ro/',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const status = res?.status() || 0;

    const audit = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const articleEl = document.querySelector('article');
      const bodyText = articleEl ? articleEl.innerText : document.body.innerText;
      const paragraphs = Array.from(document.querySelectorAll('article p')).map((p) => p.textContent || '');

      const hasTruncationPattern = bodyText.includes('[…]') || bodyText.includes('[...]') || bodyText.includes('&#8230;');
      const charCount = bodyText.length;

      return {
        h1,
        charCount,
        paragraphCount: paragraphs.length,
        hasTruncationPattern,
        textEnding: bodyText.slice(-100).replace(/\s+/g, ' '),
      };
    });

    totalTested++;
    if (!audit.hasTruncationPattern && audit.charCount > 300) {
      totalFullContent++;
    }
    if (audit.hasTruncationPattern) {
      totalWithTruncationArtifacts++;
    }

    console.log(`     HTTP Status    : ${status}`);
    console.log(`     H1 Headline    : ${audit.h1}`);
    console.log(`     Body Length    : ${audit.charCount} chars (${audit.paragraphCount} paragraphs)`);
    console.log(`     Contains [...] : ${audit.hasTruncationPattern ? 'YES' : 'NO'}`);
    console.log(`     Ending Text    : "${audit.textEnding}"\n`);

    await page.close();
  }

  await browser.close();

  console.log('=== FORENSIC QA SUMMARY ===');
  console.log(`ARTICLES TESTED               : ${totalTested}`);
  console.log(`ARTICLES WITH FULL CONTENT     : ${totalFullContent} / ${totalTested}`);
  console.log(`ARTICLES CONTAINING […]        : ${totalWithTruncationArtifacts}`);
  console.log(`ACCEPTANCE CRITERIA PASS/FAIL  : ${totalWithTruncationArtifacts === 0 ? 'PASS' : 'FAIL'}`);
}

verifyLiveFullArticles().catch(console.error);
