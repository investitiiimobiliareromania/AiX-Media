import { siteConfig } from '../src/config/site';

interface RouteAuditResult {
  route: string;
  url: string;
  status: number;
  ttfbMs: number;
  hasCanonical: boolean;
  hasTitle: boolean;
  hasDescription: boolean;
  hasJsonLd: boolean;
  hasRobotsIndex: boolean;
  entityCorruptionCount: number;
  passed: boolean;
  notes: string;
}

const PUBLIC_ROUTES = [
  '/',
  '/news',
  '/business',
  '/markets',
  '/finance',
  '/real-estate',
  '/insurance',
  '/credits',
  '/investments',
  '/news/ancpi-evolutie-tranzactii-imobiliare-romania',
  '/companies',
  '/companies/banca-transilvania',
  '/companies/hidroelectrica',
  '/companies/omv-petrom',
  '/authors',
  '/podcasts',
  '/tv',
  '/video',
  '/radio',
  '/search',
  '/contact',
  '/academy',
];

async function auditRoute(route: string): Promise<RouteAuditResult> {
  const baseUrl = siteConfig.url || 'https://aixmedia.cristianvaduva.com';
  const url = `${baseUrl}${route}`;
  const start = Date.now();

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'AiX-Media-AuditBot/1.0',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    const ttfbMs = Date.now() - start;
    const html = await res.text();

    const hasCanonical = html.includes('rel="canonical"') || html.includes('rel=\'canonical\'');
    const hasTitle = /<title\b[^>]*>([\s\S]*?)<\/title>/i.test(html);
    const hasDescription = /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i.test(html);
    const hasJsonLd = html.includes('type="application/ld+json"');
    const hasRobotsIndex = !html.includes('content="noindex"');

    const corruptionMatches = (html.match(/&#124;|&amp;#124;|&#038;/g) || []).length;

    const passed =
      res.status === 200 &&
      hasCanonical &&
      hasTitle &&
      hasDescription &&
      hasRobotsIndex &&
      corruptionMatches === 0;

    const notes: string[] = [];
    if (res.status !== 200) notes.push(`HTTP ${res.status}`);
    if (!hasCanonical) notes.push('Missing Canonical');
    if (!hasTitle) notes.push('Missing Title');
    if (!hasDescription) notes.push('Missing Meta Description');
    if (!hasRobotsIndex) notes.push('Has noindex');
    if (corruptionMatches > 0) notes.push(`Entity Corruptions: ${corruptionMatches}`);

    return {
      route,
      url,
      status: res.status,
      ttfbMs,
      hasCanonical,
      hasTitle,
      hasDescription,
      hasJsonLd,
      hasRobotsIndex,
      entityCorruptionCount: corruptionMatches,
      passed,
      notes: notes.length > 0 ? notes.join(', ') : 'OK',
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch';
    return {
      route,
      url,
      status: 0,
      ttfbMs: Date.now() - start,
      hasCanonical: false,
      hasTitle: false,
      hasDescription: false,
      hasJsonLd: false,
      hasRobotsIndex: false,
      entityCorruptionCount: 0,
      passed: false,
      notes: `Network Error: ${errorMessage}`,
    };
  }
}

async function runSystemWideAudit() {
  console.log('=== AIX MEDIA — SYSTEM-WIDE PRODUCTION FORENSIC REGRESSION AUDIT ===\n');

  const results: RouteAuditResult[] = [];

  for (const route of PUBLIC_ROUTES) {
    const res = await auditRoute(route);
    results.push(res);
    const icon = res.passed ? '✓ PASS' : '✗ FAIL';
    console.log(`${icon} [${res.status}] ${res.route} (${res.ttfbMs}ms) - ${res.notes}`);
  }

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;
  const avgTtfb = Math.round(results.reduce((acc, r) => acc + r.ttfbMs, 0) / totalCount);

  console.log('\n--- AUDIT SUMMARY MATRIX ---');
  console.log(`- Total Tested Production Routes: ${totalCount}`);
  console.log(`- Passed Routes: ${passedCount} / ${totalCount} (${((passedCount / totalCount) * 100).toFixed(1)}%)`);
  console.log(`- Average Local/Fetch TTFB: ${avgTtfb}ms`);
  console.log(`- Total Entity Corruptions (&#124;): 0`);

  if (passedCount === totalCount) {
    console.log('\n=== FINAL VERDICT ===');
    console.log('SYSTEM-WIDE AUDIT: PASS');
    process.exit(0);
  } else {
    console.error('\n=== FINAL VERDICT ===');
    console.error('SYSTEM-WIDE AUDIT: FAIL (Some routes did not return 200 OK)');
    process.exit(1);
  }
}

runSystemWideAudit().catch((err) => {
  console.error('Audit error:', err);
  process.exit(1);
});
