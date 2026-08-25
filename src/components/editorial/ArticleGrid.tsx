import React from "react";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { Article } from "@/lib/media/models/article";
import { getFallbackImage } from "@/lib/fallbackImage";

interface LegacyArticle {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  author?: string;
  readTime?: string;
  imageUrl?: string;
}

interface ArticleGridProps {
  title?: string;
  description?: string;
  articles: Array<Article | LegacyArticle>;
  categorySlug?: string;
}

export function ArticleGrid({ title, description, articles }: ArticleGridProps) {
  const normalizedArticles: Article[] = articles.map((art, idx) => {
    if ("id" in art && "slug" in art) {
      return art as Article;
    }

    const legacy = art as LegacyArticle;
    const slugFromHref = legacy.href ? legacy.href.split("/").pop() || `article-${idx}` : `article-${idx}`;

    return {
      id: `legacy-${idx}`,
      title: legacy.title,
      slug: slugFromHref,
      category: "news",
      categoryLabel: legacy.category || "Intelligence",
      authorId: "aix-author",
      authorName: legacy.author || "AiX Staff",
      excerpt: legacy.excerpt,
      content: legacy.excerpt,
      coverImage: legacy.imageUrl || getFallbackImage(slugFromHref),
      publishedAt: legacy.date || "2026-08-04",
      readTime: legacy.readTime || "5 min read",
    } as Article;
  });

  return <EditorialGrid articles={normalizedArticles} title={title} description={description} />;
}

export default ArticleGrid;
