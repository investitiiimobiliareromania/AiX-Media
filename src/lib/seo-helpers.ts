import {
  createNewsArticleJsonLd,
  createVideoObjectJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/components/common/json-ld";

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
  return createNewsArticleJsonLd({
    title: input.title,
    description: input.description,
    slug: input.slug,
    imageUrl: input.coverImageUrl,
    publishedAt: input.publishDate,
    modifiedAt: input.modifiedDate,
    authorName: input.authorName,
    section: input.categoryName,
  });
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
  return createVideoObjectJsonLd({
    id: input.slug,
    title: input.title,
    description: input.description,
    slug: input.slug,
    uploadDate: input.uploadDate,
  });
}

export function generateOrganizationSchema() {
  return organizationJsonLd;
}

export function generateWebSiteSchema() {
  return webSiteJsonLd;
}

