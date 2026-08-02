export type ArticleStatus = 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  content: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  publishDate?: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  url: string;
  altText?: string;
  fileName: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalCategories: number;
}
