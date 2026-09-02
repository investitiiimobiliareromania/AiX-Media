import { articleService } from '../src/services/article.service';
import {
  createNewsArticleJsonLd,
  createOrganizationJsonLd,
  createWebSiteJsonLd,
  createBreadcrumbJsonLd,
  createCollectionPageJsonLd,
} from '../src/components/common/json-ld';
import { siteConfig } from '../src/config/site';

async function runLiveVerification() {
  console.log('=== AIX MEDIA — LIVE PRODUCTION SCHEMA VERIFICATION ===\n');

  const testSlugs = [
    'ancpi-evolutie-tranzactii-imobiliare-romania',
    'ins-autorizatii-construire-cladiri-rezidentiale',
    'bnr-decizie-rata-dobanzii-politica-monetara',
    'piata-imobiliara-europeana-preturi-chirii',
  ];

  let totalTests = 0;
  let passedTests = 0;

  // 1. Verify Global Organization & WebSite Schemas
  console.log('1. Verifying Organization & WebSite Schemas...');
  const orgSchema = createOrganizationJsonLd();
  const siteSchema = createWebSiteJsonLd();

  const serializedOrg = JSON.stringify(orgSchema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  const parsedOrg = JSON.parse(serializedOrg);

  const serializedSite = JSON.stringify(siteSchema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  const parsedSite = JSON.parse(serializedSite);

  console.log(`  - Organization @id: ${parsedOrg['@id']}`);
  console.log(`  - Organization type: ${parsedOrg['@type']}`);
  console.log(`  - Organization logo: ${parsedOrg.logo.url} (${parsedOrg.logo.width}x${parsedOrg.logo.height})`);
  console.log(`  - WebSite @id: ${parsedSite['@id']}`);
  console.log(`  - WebSite publisher @id: ${parsedSite.publisher['@id']}`);

  if (
    parsedOrg['@id'] === 'https://aixmedia.cristianvaduva.com/#organization' &&
    parsedSite['@id'] === 'https://aixmedia.cristianvaduva.com/#website' &&
    parsedSite.publisher['@id'] === 'https://aixmedia.cristianvaduva.com/#organization'
  ) {
    console.log('  ✓ PASS: Organization & WebSite schemas are 100% compliant.\n');
    passedTests++;
  } else {
    console.error('  ✗ FAIL: Organization or WebSite graph anchor mismatch.\n');
  }
  totalTests++;

  // 2. Verify News Index Page Schema (/news)
  console.log('2. Verifying News Index Page (/news)...');
  const newsCollection = createCollectionPageJsonLd({
    name: 'Știri Economice & Analize Financiare',
    description: 'Flux de știri economice, analize de politică monetară...',
    slug: '/news',
  });
  const newsBreadcrumbs = createBreadcrumbJsonLd(
    [
      { label: 'AiX Media', href: '/' },
      { label: 'Știri Economice & Analize', href: '/news' },
    ],
    `${siteConfig.url}/news`
  );

  const parsedCollection = JSON.parse(JSON.stringify(newsCollection));
  const parsedIndexBreadcrumb = JSON.parse(JSON.stringify(newsBreadcrumbs));

  console.log(`  - CollectionPage @id: ${parsedCollection['@id']}`);
  console.log(`  - CollectionPage isPartOf: ${parsedCollection.isPartOf['@id']}`);
  console.log(`  - BreadcrumbList @id: ${parsedIndexBreadcrumb['@id']}`);

  if (
    parsedCollection['@id'] === 'https://aixmedia.cristianvaduva.com/news' &&
    parsedCollection.isPartOf['@id'] === 'https://aixmedia.cristianvaduva.com/#website' &&
    parsedIndexBreadcrumb['@id'] === 'https://aixmedia.cristianvaduva.com/news#breadcrumb'
  ) {
    console.log('  ✓ PASS: News Index Page schemas are 100% compliant.\n');
    passedTests++;
  } else {
    console.error('  ✗ FAIL: News index page schema mismatch.\n');
  }
  totalTests++;

  // 3. Verify Specific Production Articles
  console.log('3. Verifying Individual Production Articles...');
  for (const slug of testSlugs) {
    const article = await articleService.getPublishedArticleBySlug(slug);
    if (!article) {
      console.error(`  ✗ FAIL: Could not fetch article '${slug}'`);
      totalTests++;
      continue;
    }

    const canonicalUrl = `https://aixmedia.cristianvaduva.com/news/${article.slug}`;

    const newsArticleSchema = createNewsArticleJsonLd({
      title: article.title,
      description: article.excerpt,
      slug: article.slug,
      publishedAt: article.publishedAt,
      imageUrl: article.coverImage,
      section: article.categoryLabel || article.category,
      authorName: article.authorName,
      authorRole: article.authorRole,
    });

    const breadcrumbSchema = createBreadcrumbJsonLd(
      [
        { label: 'Știri & Rapoarte', href: '/news' },
        { label: article.categoryLabel || 'Analiză', href: '/news' },
        { label: article.title },
      ],
      canonicalUrl
    );

    // Safe HTML script serialization simulation
    const scriptContent = JSON.stringify(newsArticleSchema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');

    const parsedArticle = JSON.parse(scriptContent);
    const parsedBreadcrumb = JSON.parse(JSON.stringify(breadcrumbSchema));

    console.log(`  Article: /news/${slug}`);
    console.log(`  - Headline: "${parsedArticle.headline}"`);
    console.log(`  - NewsArticle @id: ${parsedArticle['@id']}`);
    console.log(`  - mainEntityOfPage @id: ${parsedArticle.mainEntityOfPage['@id']}`);
    console.log(`  - Breadcrumb @id: ${parsedBreadcrumb['@id']}`);
    console.log(`  - Author: @type=${parsedArticle.author['@type']}, name="${parsedArticle.author.name}"`);
    console.log(`  - Publisher @id: ${parsedArticle.publisher['@id']}`);
    console.log(`  - Image: ${parsedArticle.image[0]}`);
    console.log(`  - DatePublished: ${parsedArticle.datePublished}`);
    console.log(`  - DateModified: ${parsedArticle.dateModified || 'OMITTED (Unmodified)'}`);

    // Verification checks
    const hasLiteralPipePreserved = !parsedArticle.headline.includes('&#124;');
    const isCanonicalEqual =
      parsedArticle.url === canonicalUrl &&
      parsedArticle.mainEntityOfPage['@id'] === canonicalUrl &&
      parsedArticle['@id'] === `${canonicalUrl}#article` &&
      parsedBreadcrumb['@id'] === `${canonicalUrl}#breadcrumb`;
    const isAuthorOrg =
      parsedArticle.author['@type'] === 'Organization' &&
      parsedArticle.author.name === 'AiX Media Editorial Desk';
    const isImageAbsolute = parsedArticle.image[0].startsWith('https://');
    const isDateModifiedOmitted = parsedArticle.dateModified === undefined;

    if (
      hasLiteralPipePreserved &&
      isCanonicalEqual &&
      isAuthorOrg &&
      isImageAbsolute &&
      isDateModifiedOmitted
    ) {
      console.log('  ✓ PASS: Article schema 100% verified.\n');
      passedTests++;
    } else {
      console.error('  ✗ FAIL: Article schema verification failed.\n');
    }
    totalTests++;
  }

  // 4. Verify Literal Pipe & Title Repair Article Test
  console.log('4. Verifying Title Repair & Literal Pipe Article...');
  const pipeArticle = createNewsArticleJsonLd({
    title: 'BREAKING. DOCUMENTE | SURSE: Cum arată legea salarizării după modificări',
    description: 'Sinteză pe legea salarizării',
    slug: 'breaking-documente-surse-legea-salarizarii',
    publishedAt: '2026-08-25T10:00:00Z',
  });

  const parsedPipe = JSON.parse(JSON.stringify(pipeArticle));
  console.log(`  - Headline string: "${parsedPipe.headline}"`);

  if (
    parsedPipe.headline === 'BREAKING. DOCUMENTE | SURSE: Cum arată legea salarizării după modificări' &&
    !parsedPipe.headline.includes('&#124;')
  ) {
    console.log('  ✓ PASS: Literal pipe preserved with 0 entity corruption.\n');
    passedTests++;
  } else {
    console.error('  ✗ FAIL: Literal pipe corrupted.\n');
  }
  totalTests++;

  console.log(`=== VERIFICATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===`);

  if (passedTests === totalTests) {
    console.log('LIVE SCHEMA VERIFICATION: PASS');
    process.exit(0);
  } else {
    console.error('LIVE SCHEMA VERIFICATION: FAIL');
    process.exit(1);
  }
}

runLiveVerification().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
