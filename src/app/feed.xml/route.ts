import { articleService } from "@/services/article.service";
import { siteConfig } from "@/config/site";
import { CANONICAL_SITE_TITLE } from "@/config/metadata";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await articleService.getPublishedArticles(100);
  const now = new Date().toUTCString();

  const itemsXml = articles
    .map((article) => {
      const url = `${siteConfig.url}/news/${article.slug}`;
      const pubDate = new Date(article.publishedAt).toUTCString();
      const title = escapeXml(article.title);
      const description = escapeXml(article.excerpt || article.title);
      const author = escapeXml(article.authorName || siteConfig.author);
      const category = escapeXml(article.category);
      const coverImage = article.coverImage;

      const enclosureTag = coverImage
        ? `<enclosure url="${escapeXml(coverImage.startsWith("http") ? coverImage : `${siteConfig.url}${coverImage}`)}" type="image/webp" />`
        : "";

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${category}</category>
      <author>${author}</author>
      ${enclosureTag}
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(CANONICAL_SITE_TITLE)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
