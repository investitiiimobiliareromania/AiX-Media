import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";

const slug = "business";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function BusinessPage() {
  const articles = getAllArticles("business");

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={config.marketSignals}
      />

      <IntelligenceDashboard
        metrics={config.intelligenceMetrics}
        title={config.dashboardTitle}
        description={config.dashboardDescription}
      />

      <EditorialGrid
        articles={articles}
        title="Enterprise & Strategy Intelligence"
        description="Corporate expansion, founder interviews, M&A teardowns, and regional scaleup playbooks."
      />

      <NewsletterBox
        overline={config.newsletterOverline}
        headline={config.newsletterHeadline}
        description={config.newsletterDescription}
      />
    </div>
  );
}
