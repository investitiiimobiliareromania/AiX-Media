import * as React from "react";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/academy-data";
import { ArticleContent } from "@/components/sections/article-content";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  
  return {
    title: `${article.title} | AiX Academy`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return <ArticleContent article={article} relatedArticles={relatedArticles} />;
}
