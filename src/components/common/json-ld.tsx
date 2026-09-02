import { siteConfig } from "@/config/site";
import { normalizeTitle } from "@/lib/html-entities";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Safe JSON-LD renderer for Next.js / React HTML script tags.
 * Escapes `<`, `>`, and `&` to unicode escape sequences to prevent script breaking/XSS
 * while preserving literal pipe `|`, Romanian diacritics, quotes, and JSON semantics.
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonString = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

/**
 * Canonical Organization entity graph definition
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: ["https://www.youtube.com/@CristianVaduvaCV"],
  logo: {
    "@type": "ImageObject",
    "@id": `${siteConfig.url}/#logo`,
    url: `${siteConfig.url}/apple-icon`,
    width: 180,
    height: 180,
  },
  publishingPrinciples: `${siteConfig.url}/legal`,
  correctionsPolicy: `${siteConfig.url}/legal`,
} as const;

export function createOrganizationJsonLd() {
  return organizationJsonLd;
}

/**
 * Canonical WebSite entity graph definition
 */
export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ro-RO",
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

export function createWebSiteJsonLd() {
  return webSiteJsonLd;
}

/**
 * Dynamic NewsArticle Schema Builder
 */
export function createNewsArticleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  imageUrl?: string | null;
  section?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
}) {
  const canonicalUrl = `${siteConfig.url}/news/${article.slug}`;
  const normalizedTitle = normalizeTitle(article.title);

  // Author entity determination
  const authorName = article.authorName?.trim() || "AiX Media Editorial Desk";
  const isEditorialDesk =
    authorName.toLowerCase().includes("editorial") ||
    authorName.toLowerCase().includes("redacția") ||
    authorName.toLowerCase().includes("desk") ||
    authorName === "AiX Media Editorial Desk";

  const authorEntity = isEditorialDesk
    ? {
        "@type": "Organization" as const,
        name: authorName,
        url: siteConfig.url,
      }
    : {
        "@type": "Person" as const,
        name: authorName,
        ...(article.authorRole ? { jobTitle: article.authorRole } : {}),
      };

  // Image handling (ensure absolute URL)
  let imageArray: string[] = [];
  if (article.imageUrl && article.imageUrl.startsWith("http")) {
    imageArray = [article.imageUrl];
  } else {
    imageArray = [`${siteConfig.url}/opengraph-image`];
  }

  // Publication date ISO format
  const datePublished = article.publishedAt
    ? (article.publishedAt.includes("T")
        ? article.publishedAt
        : `${article.publishedAt}T08:00:00Z`)
    : undefined;

  // Modified date ISO format (only if genuine modification timestamp exists and differs from published date)
  const dateModified = article.modifiedAt && article.modifiedAt !== article.publishedAt
    ? (article.modifiedAt.includes("T")
        ? article.modifiedAt
        : `${article.modifiedAt}T08:00:00Z`)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${canonicalUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    headline: normalizedTitle,
    description: article.description,
    image: imageArray,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: "ro-RO",
    author: authorEntity,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    articleSection: article.section || "Știri & Analize",
  };
}

/**
 * Dynamic CollectionPage / WebPage Schema Builder
 */
export function createCollectionPageJsonLd(page: {
  name: string;
  description: string;
  slug: string;
}) {
  const canonicalUrl = `${siteConfig.url}${page.slug.startsWith("/") ? page.slug : `/${page.slug}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: page.name,
    description: page.description,
    inLanguage: "ro-RO",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * Dynamic BreadcrumbList Schema Builder
 */
export function createBreadcrumbJsonLd(
  items: { label: string; href?: string }[],
  canonicalUrl?: string
) {
  const breadcrumbId = canonicalUrl
    ? `${canonicalUrl}#breadcrumb`
    : `${siteConfig.url}/#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: normalizeTitle(it.label),
      item: it.href
        ? it.href.startsWith("http")
          ? it.href
          : `${siteConfig.url}${it.href}`
        : canonicalUrl || siteConfig.url,
    })),
  };
}

export function createCorporationJsonLd(corp: {
  name: string;
  legalName?: string;
  slug: string;
  ticker?: string;
  description: string;
  industry?: string;
  headquarters?: string;
  website?: string;
  logo?: string;
}) {
  const canonicalUrl = `${siteConfig.url}/companies/${corp.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "@id": `${canonicalUrl}#corporation`,
    name: corp.name,
    legalName: corp.legalName || corp.name,
    description: corp.description,
    url: canonicalUrl,
    tickerSymbol: corp.ticker,
    industry: corp.industry,
    address: corp.headquarters
      ? {
          "@type": "PostalAddress",
          addressLocality: corp.headquarters,
          addressCountry: "RO",
        }
      : undefined,
    sameAs: corp.website ? [corp.website] : undefined,
  };
}

export function createItemListJsonLd(
  name: string,
  description: string,
  items: { name: string; url: string; position: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((it) => ({
      "@type": "ListItem",
      position: it.position,
      name: normalizeTitle(it.name),
      url: it.url.startsWith("http") ? it.url : `${siteConfig.url}${it.url}`,
    })),
  };
}

export function createVideoObjectJsonLd(video: {
  id: string;
  title: string;
  description: string;
  slug?: string;
  uploadDate?: string;
}) {
  const url = `${siteConfig.url}/video/${video.slug || video.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: normalizeTitle(video.title),
    description: video.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
    ],
    uploadDate: video.uploadDate || "2026-08-01T00:00:00Z",
    contentUrl: url,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    inLanguage: "ro-RO",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

