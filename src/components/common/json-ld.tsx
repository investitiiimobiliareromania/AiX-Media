import { siteConfig } from "@/config/site";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [
    "https://www.youtube.com/@CristianVaduvaCV",
  ],
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/icon`,
    width: 512,
    height: 512,
  },
  publishingPrinciples: `${siteConfig.url}/legal`,
  correctionsPolicy: `${siteConfig.url}/legal`,
} as const;

export function createOrganizationJsonLd() {
  return organizationJsonLd;
}

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ro-RO",
  publisher: {
    "@type": "NewsMediaOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
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

export function createNewsArticleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string;
  modifiedAt?: string;
  imageUrl?: string;
  section?: string;
  authorName?: string;
}) {
  const canonicalUrl = `${siteConfig.url}/news/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.imageUrl ? [article.imageUrl] : [`${siteConfig.url}/fallbacks/story-1.jpg`],
    datePublished: article.publishedAt || "2026-08-01T00:00:00Z",
    dateModified: article.modifiedAt || article.publishedAt || "2026-08-01T00:00:00Z",
    inLanguage: "ro-RO",
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Organization",
      name: article.authorName || "AiX Media Editorial Desk",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon`,
        width: 512,
        height: 512,
      },
    },
    articleSection: article.section || "Business & Economy",
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
  return {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: corp.name,
    legalName: corp.legalName || corp.name,
    description: corp.description,
    url: `${siteConfig.url}/companies/${corp.slug}`,
    tickerSymbol: corp.ticker,
    industry: corp.industry,
    address: corp.headquarters ? {
      "@type": "PostalAddress",
      addressLocality: corp.headquarters,
      addressCountry: "RO",
    } : undefined,
    sameAs: corp.website ? [corp.website] : undefined,
  };
}

export function createBreadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.label,
      item: it.href ? (it.href.startsWith("http") ? it.href : `${siteConfig.url}${it.href}`) : undefined,
    })),
  };
}

export function createItemListJsonLd(name: string, description: string, items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((it) => ({
      "@type": "ListItem",
      position: it.position,
      name: it.name,
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
    name: video.title,
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
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon`,
        width: 512,
        height: 512,
      },
    },
  };
}

export function createPodcastSeriesJsonLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name,
    description,
    url: `${siteConfig.url}/podcasts`,
    inLanguage: "ro-RO",
    webFeed: `${siteConfig.url}/podcasts`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createPodcastEpisodeJsonLd(episode: {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string;
  duration?: string;
  coverImage: string;
  showName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    image: episode.coverImage,
    datePublished: episode.publishedAt || "2026-08-01",
    url: `${siteConfig.url}/podcast/${episode.slug}`,
    inLanguage: "ro-RO",
    partOfSeries: {
      "@type": "PodcastSeries",
      name: episode.showName || "AiX Media Podcasts",
      url: `${siteConfig.url}/podcasts`,
    },
  };
}
