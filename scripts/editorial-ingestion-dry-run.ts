import { articleService } from '../src/services/article.service';
import { normalizeTitle } from '../src/lib/html-entities';
import { getVerifiedCompanyEntities } from '../src/lib/entity-linker';

export interface FeedConfig {
  name: string;
  url: string;
  sourceAttribution: string;
}

export interface FeedCandidate {
  feed: string;
  sourceAttribution: string;
  title: string;
  slug: string;
  category: string;
  pubDate: string;
  detectedEntities: string[];
  wordCount: number;
  excerpt: string;
}

export const EXPANDED_FEEDS: FeedConfig[] = [
  {
    name: 'Economedia',
    url: 'https://economedia.ro/feed',
    sourceAttribution: 'Economedia / Surse Publice',
  },
  {
    name: 'Profit.ro',
    url: 'https://www.profit.ro/rss',
    sourceAttribution: 'Profit.ro / Rapoarte Oficiale',
  },
  {
    name: 'HotNews Economie',
    url: 'https://hotnews.ro/feed',
    sourceAttribution: 'HotNews / Date Oficiale',
  },
];

export function detectMultiVerticalCategory(text: string): 'real-estate' | 'markets' | 'business' | 'finance' | 'credits' | 'insurance' | 'investments' {
  const lower = text.toLowerCase();

  // 1. Insurance
  if (/\b(asigurare|asigurari|rca|asf|polita|polite|omniasig|allianz|generali)\b/i.test(lower)) {
    return 'insurance';
  }

  // 2. Credits
  if (/\b(credit|credite|dobanda|dobanzi|ircc|robor|ipotecar|ipotecare|refinantare|rate bancare)\b/i.test(lower)) {
    return 'credits';
  }

  // 3. Investments
  if (/\b(titluri de stat|fidelis|tezaur|fonduri de investitii|obligatiuni|randament|cupon)\b/i.test(lower)) {
    return 'investments';
  }

  // 4. Markets / BVB
  if (/\b(bvb|bursa|bursa de valori|indicele bet|bet-tr|actiuni|hidroelectrica|omv petrom|romgaz|nuclearelectrica|banca transilvania|uipath|dedeman)\b/i.test(lower)) {
    return 'markets';
  }

  // 5. Real Estate
  if (/\b(imobil|imobiliare|apartament|apartamente|cadastru|ancpi|rezidential|rezidentiale|constructii|constructie|dezvoltator|birouri)\b/i.test(lower)) {
    return 'real-estate';
  }

  // 6. Finance
  if (/\b(buget|fiscal|fiscala|taxe|impozit|impozite|inflatie|bnr|ministerul finantelor|deficit|macroeconomie)\b/i.test(lower)) {
    return 'finance';
  }

  // 7. Business (Default for company announcements/M&A)
  return 'business';
}

function generateSlug(title: string): string {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const cleanSlug = normalized.slice(0, 90).replace(/-$/, '');
  return cleanSlug || `stire-aix-${Date.now()}`;
}

async function runEditorialIngestionDryRun() {
  console.log('=== AIX MEDIA — PRODUCTION EDITORIAL INGESTION DRY RUN ===\n');

  const existingArticles = await articleService.getPublishedArticles(500);
  const existingSlugs = new Set(existingArticles.map((a) => a.slug));
  const existingTitles = new Set(existingArticles.map((a) => a.title.toLowerCase()));

  console.log(`[VERIFIED] Existing Published Articles in DB: ${existingArticles.length}`);

  const candidatesPerCategory: Record<string, FeedCandidate[]> = {
    markets: [],
    business: [],
    finance: [],
    credits: [],
    investments: [],
    insurance: [],
    'real-estate': [],
  };

  const verifiedEntities = getVerifiedCompanyEntities();

  for (const feed of EXPANDED_FEEDS) {
    console.log(`\nFetching Feed: ${feed.name} (${feed.url})...`);
    try {
      const response = await fetch(feed.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'AiX-Media-NewsBot/1.0 (+https://media.aixluxury.com)',
          Accept: 'application/rss+xml, application/xml, text/xml',
        },
      });

      if (!response.ok) {
        console.error(`  ✗ Feed ${feed.name} returned HTTP ${response.status}`);
        continue;
      }

      const xmlText = await response.text();
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let match;
      let count = 0;

      while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemContent = match[1];
        if (!itemContent) continue;

        const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/i);
        const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/i);
        const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

        if (!titleMatch || !titleMatch[1]) continue;

        const rawTitle = titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/<[^>]+>/g, '').trim();
        const rawDesc = descMatch && descMatch[1] ? descMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/<[^>]+>/g, '').trim() : rawTitle;
        const pubDate = pubDateMatch && pubDateMatch[1] ? pubDateMatch[1] : new Date().toUTCString();

        const cleanTitle = normalizeTitle(rawTitle);
        const slug = generateSlug(cleanTitle);

        // Deduplication Check
        if (existingSlugs.has(slug) || existingTitles.has(cleanTitle.toLowerCase())) {
          continue;
        }

        const fullText = `${cleanTitle} ${rawDesc}`;
        const category = detectMultiVerticalCategory(fullText);

        // Detect company entities mentioned
        const detectedEntities = verifiedEntities
          .filter((e) => e.matchPatterns.some((p) => p.test(fullText)))
          .map((e) => e.primaryName);

        const wordCount = rawDesc.split(/\s+/).filter(Boolean).length;

        const candidate = {
          feed: feed.name,
          sourceAttribution: feed.sourceAttribution,
          title: cleanTitle,
          slug,
          category,
          pubDate,
          detectedEntities,
          wordCount,
          excerpt: rawDesc.slice(0, 180),
        };

        if (candidatesPerCategory[category]) {
          candidatesPerCategory[category]!.push(candidate);
          count++;
        }
      }

      console.log(`  ✓ Successfully parsed ${count} new candidate articles from ${feed.name}`);
    } catch (err) {
      console.error(`  ✗ Error fetching ${feed.name}:`, err);
    }
  }

  console.log('\n--- DRY RUN CANDIDATES BY VERTICAL ---');
  for (const cat of ['markets', 'business', 'finance', 'credits', 'investments', 'insurance']) {
    const list = candidatesPerCategory[cat] || [];
    console.log(`\nVertical: /${cat} (${list.length} candidate articles)`);
    list.slice(0, 3).forEach((item, idx) => {
      console.log(`  [${idx + 1}] Title: "${item.title}"`);
      console.log(`      Source: ${item.sourceAttribution}`);
      console.log(`      Slug: /news/${item.slug}`);
      console.log(`      Entities: ${item.detectedEntities.length > 0 ? item.detectedEntities.join(', ') : 'None'}`);
    });
  }

  console.log('\n=== DRY RUN VERDICT ===');
  console.log('DRY RUN COMPLETE: 0 database insertions executed.');
}

runEditorialIngestionDryRun().catch((err) => {
  console.error('Dry run error:', err);
  process.exit(1);
});
