import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Activity } from "lucide-react";

const slug = "markets";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function MarketsPage() {
  const articles = getAllArticles("markets");

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={config.marketSignals}
      />

      {/* Market Instruments Table */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              AiX Terminal Market Monitor
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">Capital, FX & Commodity Instruments</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 animate-pulse">
            Data source not connected
          </span>
        </div>

        <div className="py-16 text-center text-neutral-400 font-mono text-sm border border-dashed border-neutral-800 rounded-xl bg-neutral-950/40">
          <p className="text-white font-bold mb-2">Market data currently unavailable.</p>
          <p className="text-xs text-neutral-500">Live feed connection is currently offline or data source is not connected.</p>
        </div>
      </section>

      <IntelligenceDashboard
        metrics={config.intelligenceMetrics}
        title={config.dashboardTitle}
        description={config.dashboardDescription}
      />

      <EditorialGrid
        articles={articles}
        title="Capital Markets Analysis & Equity Reports"
        description="BVB listings, stock metrics, currency movements, and bond yield dynamics."
      />

      <NewsletterBox
        overline={config.newsletterOverline}
        headline={config.newsletterHeadline}
        description={config.newsletterDescription}
      />
    </div>
  );
}
