import { type Metadata } from "next";

import { IntelligenceDashboard } from "@/components/editorial/IntelligenceDashboard";
import { ArticleGrid } from "@/components/editorial/ArticleGrid";
import { EmptyState } from "@/components/editorial/EmptyState";
import { NewsletterPremium } from "@/components/editorial/NewsletterPremium";
import { PremiumHero } from "@/components/editorial/PremiumHero";
import { categoryConfigs, type CategorySlug } from "@/config/category-configs";
import { categoryBySlug } from "@/constants/categories";
import { ArticleRow } from "@/repositories/article.repository";
import { articleService } from "@/services/article.service";

const slug: CategorySlug = "insurance";
const category = categoryBySlug[slug];
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.eyebrow} | AiX Media`,
  description: config.description,
  keywords: [
    "insurance Romania",
    "asigurari Romania",
    "insurance market intelligence",
    "insurance analysis",
    "protection Romania",
    "risk management Romania",
  ],
  alternates: { canonical: `/${slug}` },
  openGraph: {
    title: config.headline,
    description: config.description,
    type: "website",
    siteName: "AiX Media",
  },
  twitter: {
    card: "summary_large_image",
    title: config.headline,
    description: config.description,
  },
};

function mapArticle(row: ArticleRow) {
  return {
    category: category.label,
    title: row.title ?? "",
    excerpt: row.excerpt ?? "",
    date: row.publish_date
      ? new Date(row.publish_date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
    href: `/news/${row.slug}`,
    author: row.author_id ?? undefined,
    readTime: row.read_time ? `${row.read_time} min read` : undefined,
    imageUrl: row.cover_image_url ?? undefined,
  };
}

export default async function InsurancePage() {
  const rows = await articleService.getArticles({ categoryId: slug });
  const articles = rows.map(mapArticle);

  return (
    <>
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        ctaHref="#intelligence"
        secondaryCtaLabel="View All Reports"
        secondaryCtaHref="/news"
        marketSignals={config.marketSignals}
      />

      <IntelligenceDashboard
        metrics={config.intelligenceMetrics}
        categorySlug={slug}
        title={config.dashboardTitle}
        description={config.dashboardDescription}
      />

      {articles.length > 0 ? (
        <ArticleGrid
          title="Insurance Analysis"
          description="Expert analysis and intelligence reports from Romania's insurance and risk markets."
          articles={articles}
          categorySlug={slug}
        />
      ) : (
        <EmptyState
          category={category.label}
          headline={config.featuredInsightHeadline}
          description={config.featuredInsightExcerpt}
        />
      )}

      <NewsletterPremium
        overline={config.newsletterOverline}
        headline={config.newsletterHeadline}
        description={config.newsletterDescription}
      />
    </>
  );
}
