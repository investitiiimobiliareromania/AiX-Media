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
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  const url = `${domain}/news/${input.slug}`;
  const defaultImage = `${domain}/og-image.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: input.title,
    description: input.description,
    image: input.coverImageUrl || defaultImage,
    datePublished: input.publishDate || new Date().toISOString(),
    dateModified: input.modifiedDate || input.publishDate || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: input.authorName || 'Cristian Văduva',
      url: domain,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AiX Media',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/logo.png`,
      },
    },
    articleSection: input.categoryName || 'Market Pulse',
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
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.title,
    description: input.description,
    thumbnailUrl: [input.thumbnailUrl],
    uploadDate: input.uploadDate || new Date().toISOString(),
    contentUrl: `${domain}/video/${input.slug}`,
    embedUrl: `${domain}/video/${input.slug}`,
  };
}

export interface PodcastSEOInput {
  title: string;
  description: string;
  slug: string;
  audioUrl: string;
  artworkUrl: string;
  publishDate?: string;
}

export function generatePodcastEpisodeSchema(input: PodcastSEOInput) {
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: input.title,
    description: input.description,
    image: input.artworkUrl,
    datePublished: input.publishDate || new Date().toISOString(),
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: input.audioUrl,
    },
    url: `${domain}/podcast/${input.slug}`,
  };
}

export function generateOrganizationSchema() {
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AiX Media Network',
    url: domain,
    logo: `${domain}/logo.png`,
    sameAs: [
      'https://linkedin.com/in/cristianvaduva',
      'https://twitter.com/aixmedia',
    ],
  };
}

export function generateWebSiteSchema() {
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AiX Media',
    url: domain,
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
