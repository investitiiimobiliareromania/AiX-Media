import { Database } from '@/types/database.types';
import { articleService } from "@/services/article.service";
import { cleanText } from "./sanitizer";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeTitle } from "@/lib/html-entities";
// Database import removed as unused

export interface RSSFeedConfig {
  name: string;
  url: string;
  categoryName: string;
}

export const VERIFIED_RSS_FEEDS: RSSFeedConfig[] = [
  {
    name: "Economedia",
    url: "https://economedia.ro/feed",
    categoryName: "Economie & Imobiliare",
  },
  {
    name: "HotNews",
    url: "https://hotnews.ro/feed",
    categoryName: "Știri Economice",
  },
];

export interface FeedExecutionStats {
  feed: string;
  fetched: number;
  inserted: number;
  skipped: number;
  errors: number;
}

export interface IngestionResult {
  ok: boolean;
  fetched: number;
  inserted: number;
  skipped: number;
  errors: number;
  durationMs: number;
  details: FeedExecutionStats[];
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function generateSlug(title: string): string {
  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const cleanSlug = normalized.slice(0, 90).replace(/-$/, "");
  return cleanSlug || `stire-aix-${Date.now()}`;
}

export function extractImage(itemXml: string): string | null {
  const tryValid = (url: string | undefined) => (url && isValidImageUrl(url) ? url : null);

  // 1. media:content or media:thumbnail
  const mediaMatch = itemXml.match(/<media:(?:content|thumbnail)[^>]*url=["']([^"']+)["']/i);
  if (mediaMatch && mediaMatch[1]) {
    const valid = tryValid(mediaMatch[1]);
    if (valid) return valid;
  }

  // 2. enclosure with image MIME type
  const enclosureMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image\/[^"']+["']/i);
  if (enclosureMatch && enclosureMatch[1]) {
    const valid = tryValid(enclosureMatch[1]);
    if (valid) return valid;
  }

  // 3. OpenGraph og:image
  const ogMatch = itemXml.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogMatch && ogMatch[1]) {
    const valid = tryValid(ogMatch[1]);
    if (valid) return valid;
  }

  // 4. Twitter twitter:image
  const twitterMatch = itemXml.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
  if (twitterMatch && twitterMatch[1]) {
    const valid = tryValid(twitterMatch[1]);
    if (valid) return valid;
  }

  // 5. first valid <img> src
  const imgMatch = itemXml.match(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/i);
  if (imgMatch && imgMatch[1]) {
    const valid = tryValid(imgMatch[1]);
    if (valid) return valid;
  }

  return null;
}
import { isValidImageUrl } from './image-validator';
export { isValidImageUrl };

interface ParsedItem {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  content: string;
  imageUrl: string | null;
}

function parseRSSXml(xmlText: string): ParsedItem[] {
  const items: ParsedItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    if (!itemContent) continue;

    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/i);
    const guidMatch = itemContent.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i);
    const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/i);
    const encodedMatch = itemContent.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);

    const rawTitle = titleMatch ? stripHtml(titleMatch[1] || "") : "";
    const rawLink = linkMatch ? stripHtml(linkMatch[1] || "") : "";
    const rawGuid = guidMatch ? stripHtml(guidMatch[1] || "") : rawLink;
    const rawPubDate = pubDateMatch ? stripHtml(pubDateMatch[1] || "") : new Date().toISOString();
    const rawDesc = descMatch ? stripHtml(descMatch[1] || "") : "";
    const rawEncoded = encodedMatch ? stripHtml(encodedMatch[1] || "") : rawDesc;
    const imageUrl = extractImage(itemContent);

    const cleanBody = (rawEncoded || rawDesc)
      .replace(/\[\s*…\s*\]/g, '')
      .replace(/\[\s*\.\.\.\s*\]/g, '')
      .replace(/&#8230;/g, '')
      .replace(/Citiți mai mult pe [a-zA-Z0-9\.\-]+/gi, '')
      .trim();

    if (rawTitle && (rawLink || rawGuid)) {
      items.push({
        title: normalizeTitle(rawTitle),
        link: rawLink,
        guid: rawGuid,
        pubDate: rawPubDate,
        description: cleanText(rawDesc.replace(/\[\s*…\s*\]/g, '').replace(/&#8230;/g, '')),
        content: cleanText(cleanBody),
        imageUrl,
      });
    }
  }

  return items;
}

export async function runNewsIngestion(): Promise<IngestionResult> {
  const startTime = Date.now();
  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  const feedStats: FeedExecutionStats[] = [];
  const batchSlugs = new Set<string>();
  const supabaseAdmin = createAdminClient();

  for (const feed of VERIFIED_RSS_FEEDS) {
    const stats: FeedExecutionStats = {
      feed: feed.name,
      fetched: 0,
      inserted: 0,
      skipped: 0,
      errors: 0,
    };

    try {
      const response = await fetch(feed.url, {
        method: "GET",
        headers: {
          "User-Agent": "AiX-Media-NewsBot/1.0 (+https://media.aixluxury.com)",
          Accept: "application/rss+xml, application/xml, text/xml",
        },
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        console.error(`[NewsIngestion] Feed ${feed.name} returned HTTP ${response.status}`);
        stats.errors++;
        totalErrors++;
        feedStats.push(stats);
        continue;
      }

      const xmlText = await response.text();
      const items = parseRSSXml(xmlText);
      stats.fetched = items.length;
      totalFetched += items.length;

      for (const item of items) {
        try {
          const slug = generateSlug(item.title);
          
          if (batchSlugs.has(slug)) {
            stats.skipped++;
            totalSkipped++;
            continue;
          }

          // Check if article already exists in Supabase by slug
          const existing = await articleService.getPublishedArticleBySlug(slug).catch(() => null);

          if (existing && existing.slug === slug) {
            batchSlugs.add(slug);
            stats.skipped++;
            totalSkipped++;
            continue;
          }

          batchSlugs.add(slug);

          const wordCount = item.content.split(/\s+/).filter(Boolean).length;
          const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

          const detectMultiVerticalCategory = (text: string): string => {
            const lower = text.toLowerCase();

            if (/\b(asigurare|asigurari|rca|asf|polita|polite|omniasig|allianz|generali)\b/i.test(lower)) {
              return 'insurance';
            }
            if (/\b(credit|credite|dobanda|dobanzi|ircc|robor|ipotecar|ipotecare|refinantare|rate bancare)\b/i.test(lower)) {
              return 'credits';
            }
            if (/\b(titluri de stat|fidelis|tezaur|fonduri de investitii|obligatiuni|randament|cupon)\b/i.test(lower)) {
              return 'investments';
            }
            if (/\b(bvb|bursa|bursa de valori|indicele bet|bet-tr|actiuni|hidroelectrica|omv petrom|romgaz|nuclearelectrica|banca transilvania|uipath|dedeman)\b/i.test(lower)) {
              return 'markets';
            }
            if (/\b(imobil|imobiliare|apartament|apartamente|cadastru|ancpi|rezidential|rezidentiale|constructii|constructie|dezvoltator|birouri)\b/i.test(lower)) {
              return 'real-estate';
            }
            if (/\b(buget|fiscal|fiscala|taxe|impozit|impozite|inflatie|bnr|ministerul finantelor|deficit|macroeconomie)\b/i.test(lower)) {
              return 'finance';
            }
            return 'business';
          };

          const detectedCategory = detectMultiVerticalCategory(`${item.title} ${item.description}`);

          const payload: Database['public']['Tables']['articles']['Insert'] = {
            title: item.title,
            slug,
            excerpt: item.description.slice(0, 250) || item.title,
            content: item.content || item.description || item.title,
            cover_image_url: isValidImageUrl(item.imageUrl) ? item.imageUrl : null,
            category_id: detectedCategory,
            status: "published",
            publish_date: new Date(item.pubDate).toISOString(),
            seo_title: item.title.slice(0, 100),
            seo_description: item.description.slice(0, 255),
            read_time: `${readTimeMinutes} min read`,
            view_count: 0,
          };
            
            const { error: insertErr } = await supabaseAdmin
              .from('articles')
              .insert([payload]);

          if (!insertErr) {
            stats.inserted++;
            totalInserted++;
          } else {
            // Check if failure was duplicate constraint
            if (insertErr && insertErr.code === "23505") {
              stats.skipped++;
              totalSkipped++;
            } else {
              console.error(`[NewsIngestion] Insert error for "${item.title}":`, insertErr);
              stats.errors++;
              totalErrors++;
            }
          }
        } catch (itemErr) {
          console.error(`[NewsIngestion] Error processing item "${item.title}":`, itemErr);
          stats.errors++;
          totalErrors++;
        }
      }
    } catch (feedErr) {
      console.error(`[NewsIngestion] Failed to fetch feed ${feed.name}:`, feedErr);
      stats.errors++;
      totalErrors++;
    }

    feedStats.push(stats);
  }

  // Revalidate routes if any new items were inserted
  if (totalInserted > 0) {
    try {
      revalidatePath("/news");
      revalidatePath("/");
    } catch (revErr) {
      console.error("[NewsIngestion] Revalidation error:", revErr);
    }
  }

  const durationMs = Date.now() - startTime;

  return {
    ok: totalErrors === 0 || totalInserted > 0 || totalSkipped > 0,
    fetched: totalFetched,
    inserted: totalInserted,
    skipped: totalSkipped,
    errors: totalErrors,
    durationMs,
    details: feedStats,
  };
}

