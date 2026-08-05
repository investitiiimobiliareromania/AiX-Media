import { CategorySlug } from "@/config/category-configs";

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategorySlug;
  categoryLabel: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  views?: number;
  featured?: boolean;
  breaking?: boolean;
  trending?: boolean;
}
