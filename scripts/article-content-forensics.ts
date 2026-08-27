import { chromium } from 'playwright';
import { articleService } from '../src/services/article.service';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

const FORBIDDEN_TEXT_PATTERNS = [
  { name: 'Raw JSX className', regex: /className=["']/i },
  { name: 'Raw VSCode file protocol', regex: /vscode-file:\/\//i },
  { name: 'Raw HTML p tag as visible text', regex: /<\/?p(?: [^>]*)?>/i },
  { name: 'Raw HTML heading tag as visible text', regex: /<\/?h[1-6](?: [^>]*)?>/i },
  { name: 'Raw HTML anchor tag as visible text', regex: /<a\s+href=/i },
  { name: 'Raw HTML bold/italic tags as visible text', regex: /<b>|<i>|<\/b>|<\/i>/i },
  { name: 'Scraped BNR ticker header junk', regex: /EUR:\s*[\d\.,]+\s*USD:/i },
  { name: 'Scraper comments prompt', regex: /Lasă un răspuns|Anulează răspunsul/i },
  { name: 'Scraper sidebar widget title', regex: /Cele mai noi articole/i },
  { name: 'Standalone SVG artifact word', regex: /\b(svg)\b(?!\s*[\w\d])/i },
  { name: 'Image placeholder syntax', regex: /\[\s*image\s*\]|!\[[^\]]*\]\([^)]+\)/i },
  { name: 'Escaped HTML entities in text', regex: /&#8230;|&amp;gt;|&amp;lt;/i },
  { name: 'Raw transport Markdown in HTML href', regex: /href=["']\[https?:\/\//i },
];

async function runArticleContentForensics() {
  console.log(`=== RUNNING FORENSIC ARTICLE CONTENT AUDIT against ${BASE_URL} ===\n`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  const publishedArticles = await articleService.getPublishedArticles(15);
  console.log(`Testing ${publishedArticles.length} news articles for content integrity...\n`);

  let totalViolations = 0;

  for (const article of publishedArticles) {
    const targetUrl = `${BASE_URL}/news/${article.slug}`;
    console.log(`[TESTING] ${article.slug}`);

    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response || response.status() !== 200) {
      console.error(`  FAIL: HTTP ${response?.status()} for ${targetUrl}`);
      totalViolations++;
      continue;
    }

    // Inspect rendered article content inside the article body
    const bodyText = await page.locator('.article-body-content').innerText().catch(() => '');
    const bodyHtml = await page.locator('.article-body-content').innerHTML().catch(() => '');

    if (!bodyText || bodyText.length < 50) {
      console.error(`  FAIL: Article body is empty or too short (${bodyText.length} chars)`);
      totalViolations++;
      continue;
    }

    let articleViolations = 0;

    for (const pattern of FORBIDDEN_TEXT_PATTERNS) {
      if (pattern.regex.test(bodyText)) {
        console.error(`  FAIL: Found forbidden pattern in visible text [${pattern.name}]!`);
        console.error(`    Matching text sample: ${bodyText.slice(0, 300)}`);
        articleViolations++;
        totalViolations++;
      }
    }

    // Check for raw className in rendered HTML
    if (/className=/i.test(bodyHtml)) {
      console.error(`  FAIL: Rendered HTML contains raw JSX attribute [className=]!`);
      articleViolations++;
      totalViolations++;
    }

    if (articleViolations === 0) {
      console.log(`  PASS: Pristine editorial render (${bodyText.length} chars, 0 artifacts)`);
    }
  }

  await browser.close();

  console.log('\n=============================================');
  if (totalViolations === 0) {
    console.log(`ALL NEWS ARTICLES PASSED FORENSIC AUDIT (0 VIOLATIONS)`);
    console.log('=============================================\n');
    process.exit(0);
  } else {
    console.error(`FORENSIC AUDIT FAILED WITH ${totalViolations} VIOLATIONS!`);
    console.log('=============================================\n');
    process.exit(1);
  }
}

runArticleContentForensics().catch((err) => {
  console.error('Audit crashed:', err);
  process.exit(1);
});
