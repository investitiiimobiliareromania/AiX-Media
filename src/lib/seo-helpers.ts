import { siteConfig } from "@/config/site";

export interface NewsArticleSEOInput {
  title: string;
  description: string;
  slug: string;
  coverImageUrl?: string | null;
  publishDate?: string | null;
  modifiedDate?: string | null;
  authorName?: string;
  categoryName?: string;
}

/**
 * Calculates estimated reading time in minutes
 */
export function estimateReadTime(content: string, wpm = 200): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wpm);
  return `${minutes} min citire`;
}

/**
 * Generates Schema.org NewsArticle JSON-LD structured data
 */
export function generateNewsArticleSchema(input: NewsArticleSEOInput) {
  const domain = siteConfig.url;
  const url = `${domain}/news/${input.slug}`;
  const defaultImage = `${domain}/opengraph-image`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    headline: input.title,
    description: input.description,
    image: [input.coverImageUrl || defaultImage],
    datePublished: input.publishDate || new Date().toISOString(),
    dateModified: input.modifiedDate || input.publishDate || new Date().toISOString(),
    inLanguage: 'ro-RO',
    author: {
      '@type': 'Organization',
      name: 'AiX Media Editorial Desk',
      url: domain,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'AiX Media',
      url: domain,
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/icon`,
        width: 512,
        height: 512,
      },
    },
    articleSection: input.categoryName || 'Știri Economice',
  };
}

export interface VideoSEOInput {
  title: string;
  description: string;
  slug: string;
  thumbnailUrl: string;
  uploadDate?: string;
  duration?: string;
}

export function generateVideoObjectSchema(input: VideoSEOInput) {
  const domain = siteConfig.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.title,
    description: input.description,
    thumbnailUrl: [input.thumbnailUrl],
    uploadDate: input.uploadDate || new Date().toISOString(),
    contentUrl: `${domain}/video/${input.slug}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.slug}`,
    inLanguage: 'ro-RO',
  };
}

export function generateOrganizationSchema() {
  const domain = siteConfig.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'AiX Media',
    url: domain,
    logo: {
      '@type': 'ImageObject',
      url: `${domain}/icon`,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://www.youtube.com/@CristianVaduvaCV',
    ],
  };
}

export function generateWebSiteSchema() {
  const domain = siteConfig.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AiX Media',
    url: domain,
    inLanguage: 'ro-RO',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${domain}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
