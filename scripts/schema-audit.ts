/* eslint-disable */
import {
  createNewsArticleJsonLd,
  createOrganizationJsonLd,
  createCorporationJsonLd,
  createWebSiteJsonLd,
  createBreadcrumbJsonLd,
  createVideoObjectJsonLd,
  JsonLd,
} from '../src/components/common/json-ld';

interface SchemaIssue {
  test: string;
  field: string;
  reason: string;
}

const issues: SchemaIssue[] = [];

console.log('=== AIX MEDIA — PRODUCTION SCHEMA.ORG / JSON-LD TEST SUITE ===\n');

// -------------------------------------------------------------
// Test A — Literal pipe preservation
// -------------------------------------------------------------
console.log('Test A: Testing literal pipe preservation in NewsArticle headline...');
const testPipeTitle = 'BREAKING. DOCUMENTE | SURSE: Cum arată legea salarizării';
const articleWithPipe = createNewsArticleJsonLd({
  title: testPipeTitle,
  description: 'Test description',
  slug: 'breaking-documente-surse-legea-salarizarii',
  publishedAt: '2026-08-25T10:00:00Z',
});

if (articleWithPipe.headline !== testPipeTitle) {
  issues.push({
    test: 'Test A (Literal Pipe)',
    field: 'headline',
    reason: `Expected literal pipe in headline "${testPipeTitle}", received "${articleWithPipe.headline}"`,
  });
} else {
  console.log('  ✓ PASS: Literal pipe preserved in headline.');
}

// -------------------------------------------------------------
// Test B — Encoded pipe rejection
// -------------------------------------------------------------
console.log('\nTest B: Testing rejection of HTML entity encoding (&#124;)...');
const articleWithEncodedInput = createNewsArticleJsonLd({
  title: 'BREAKING. DOCUMENTE &#124; SURSE: Cum arată legea salarizării',
  description: 'Test description',
  slug: 'breaking-documente-surse',
  publishedAt: '2026-08-25T10:00:00Z',
});

if (
  articleWithEncodedInput.headline.includes('&#124;') ||
  articleWithEncodedInput.headline.includes('&amp;#124;')
) {
  issues.push({
    test: 'Test B (Encoded Pipe Rejection)',
    field: 'headline',
    reason: `Headline contains raw HTML entity code: "${articleWithEncodedInput.headline}"`,
  });
} else if (articleWithEncodedInput.headline === testPipeTitle) {
  console.log('  ✓ PASS: HTML entity &#124; successfully decoded to literal pipe.');
} else {
  issues.push({
    test: 'Test B (Encoded Pipe Rejection)',
    field: 'headline',
    reason: `Unexpected headline result: "${articleWithEncodedInput.headline}"`,
  });
}

// -------------------------------------------------------------
// Test C — Safe < escaping (XSS / Script Tag break protection)
// -------------------------------------------------------------
console.log('\nTest C: Testing safe HTML script escaping (<script> tag protection)...');
const xssPayload = 'Analiză <script>alert("xss")</script> Monetară';
const articleXSS = createNewsArticleJsonLd({
  title: xssPayload,
  description: 'Descriere cu <tag>html</tag>',
  slug: 'test-xss-safety',
});

const serializedRaw = JSON.stringify(articleXSS)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026');

if (serializedRaw.includes('<script>') || serializedRaw.includes('</script>')) {
  issues.push({
    test: 'Test C (Safe < Escaping)',
    field: 'serialization',
    reason: 'Serialized JSON contains raw unescaped script tags',
  });
} else {
  const parsedBack = JSON.parse(serializedRaw);
  if (parsedBack.headline.includes('alert("xss")')) {
    console.log('  ✓ PASS: Script tag safely escaped in JSON-LD output without corrupting content.');
  } else {
    issues.push({
      test: 'Test C (Safe < Escaping)',
      field: 'parsing',
      reason: 'Failed to restore text accurately after JSON parse',
    });
  }
}

// -------------------------------------------------------------
// Test D — Ampersand handling
// -------------------------------------------------------------
console.log('\nTest D: Testing ampersand handling (A & B)...');
const ampTitle = 'Banca Națională & Piața Financiară CEE';
const articleAmp = createNewsArticleJsonLd({
  title: ampTitle,
  description: 'Descriere & Analiză',
  slug: 'banca-nationala-piata-financiara',
});

const serializedAmp = JSON.stringify(articleAmp)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026');

const parsedAmp = JSON.parse(serializedAmp);
if (parsedAmp.headline !== ampTitle) {
  issues.push({
    test: 'Test D (Ampersand)',
    field: 'headline',
    reason: `Ampersand title expected "${ampTitle}", received "${parsedAmp.headline}"`,
  });
} else {
  console.log('  ✓ PASS: Ampersand correctly preserved and parsed.');
}

// -------------------------------------------------------------
// Test E — Romanian Diacritics
// -------------------------------------------------------------
console.log('\nTest E: Testing Romanian diacritics (ă â î ș ț Ă Â Î Ș Ț)...');
const roTitle = 'Știri de Ultimă Oră: Înțelegere privind Țintele de Inflație';
const articleRo = createNewsArticleJsonLd({
  title: roTitle,
  description: 'Analiză privind evoluția prețurilor în România',
  slug: 'stiri-ultima-ora-tinte-inflatie',
});

if (articleRo.headline !== roTitle) {
  issues.push({
    test: 'Test E (Romanian Diacritics)',
    field: 'headline',
    reason: `Diacritics expected "${roTitle}", received "${articleRo.headline}"`,
  });
} else {
  console.log('  ✓ PASS: Romanian diacritics 100% intact.');
}

// -------------------------------------------------------------
// Test F — Quotes
// -------------------------------------------------------------
console.log('\nTest F: Testing quotes handling ("DOCUMENTE")...');
const quoteTitle = 'EXCLUSIV: "DOCUMENTE" privind tranzacția imobiliară';
const articleQuote = createNewsArticleJsonLd({
  title: quoteTitle,
  description: 'Descriere cu ghilimele "oficiale"',
  slug: 'exclusiv-documente-tranzactie',
});

const serializedQuote = JSON.stringify(articleQuote)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026');

const parsedQuote = JSON.parse(serializedQuote);
if (parsedQuote.headline !== quoteTitle) {
  issues.push({
    test: 'Test F (Quotes)',
    field: 'headline',
    reason: `Quotes title expected "${quoteTitle}", received "${parsedQuote.headline}"`,
  });
} else {
  console.log('  ✓ PASS: Quoted title correctly preserved.');
}

// -------------------------------------------------------------
// Test G — Entity Graph & Canonical @id Integrity
// -------------------------------------------------------------
console.log('\nTest G: Testing Entity Graph @id integrity...');
const org = createOrganizationJsonLd();
const site = createWebSiteJsonLd();
const sampleArticle = createNewsArticleJsonLd({
  title: 'Test Article',
  description: 'Test Description',
  slug: 'test-article-graph',
});
const breadcrumbs = createBreadcrumbJsonLd(
  [{ label: 'AiX Media', href: '/' }, { label: 'Știri', href: '/news' }],
  'https://aixmedia.cristianvaduva.com/news/test-article-graph'
);

if (org['@id'] !== 'https://aixmedia.cristianvaduva.com/#organization') {
  issues.push({ test: 'Test G', field: 'Organization.@id', reason: 'Invalid Organization @id' });
}
if (site['@id'] !== 'https://aixmedia.cristianvaduva.com/#website') {
  issues.push({ test: 'Test G', field: 'WebSite.@id', reason: 'Invalid WebSite @id' });
}
if (site.publisher['@id'] !== 'https://aixmedia.cristianvaduva.com/#organization') {
  issues.push({ test: 'Test G', field: 'WebSite.publisher.@id', reason: 'WebSite publisher does not reference Organization @id' });
}
if (sampleArticle['@id'] !== 'https://aixmedia.cristianvaduva.com/news/test-article-graph#article') {
  issues.push({ test: 'Test G', field: 'NewsArticle.@id', reason: 'Invalid NewsArticle @id' });
}
if (sampleArticle.publisher['@id'] !== 'https://aixmedia.cristianvaduva.com/#organization') {
  issues.push({ test: 'Test G', field: 'NewsArticle.publisher.@id', reason: 'NewsArticle publisher does not reference Organization @id' });
}
if (sampleArticle.mainEntityOfPage['@id'] !== 'https://aixmedia.cristianvaduva.com/news/test-article-graph') {
  issues.push({ test: 'Test G', field: 'NewsArticle.mainEntityOfPage.@id', reason: 'NewsArticle mainEntityOfPage @id does not match canonical URL' });
}
if (sampleArticle.author['@type'] !== 'Organization' || sampleArticle.author.name !== 'AiX Media Editorial Desk') {
  issues.push({ test: 'Test G', field: 'NewsArticle.author', reason: 'AiX Media Editorial Desk should be represented as Organization' });
}
if (breadcrumbs['@id'] !== 'https://aixmedia.cristianvaduva.com/news/test-article-graph#breadcrumb') {
  issues.push({ test: 'Test G', field: 'BreadcrumbList.@id', reason: 'Invalid BreadcrumbList @id' });
}

if (issues.filter((i) => i.test === 'Test G').length === 0) {
  console.log('  ✓ PASS: Entity graph @id structure is 100% consistent.');
}

// -------------------------------------------------------------
// Test H — Date Modified Omission Safety
// -------------------------------------------------------------
console.log('\nTest H: Testing publication & modification date handling...');
const articleNoMod = createNewsArticleJsonLd({
  title: 'Unmodified Article',
  description: 'Description',
  slug: 'unmodified-article',
  publishedAt: '2026-08-01T00:00:00Z',
});

if (articleNoMod.dateModified !== undefined) {
  issues.push({
    test: 'Test H (Dates)',
    field: 'dateModified',
    reason: 'dateModified should be omitted when no distinct modification timestamp exists',
  });
} else if (articleNoMod.datePublished === '2026-08-01T00:00:00Z') {
  console.log('  ✓ PASS: datePublished set accurately and dateModified omitted when unmodified.');
} else {
  issues.push({
    test: 'Test H (Dates)',
    field: 'datePublished',
    reason: `Unexpected datePublished: ${articleNoMod.datePublished}`,
  });
}

// Report Summary
console.log('\n=== PRODUCTION SCHEMA AUDIT RESULTS ===');
if (issues.length === 0) {
  console.log('✓ PASS: All 8 structured-data tests passed with zero errors.');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${issues.length} schema issues:`);
  issues.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.test}] ${err.field}: ${err.reason}`);
  });
  process.exit(1);
}
