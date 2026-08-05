import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getMarketItems, getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Activity, BarChart2 } from "lucide-react";

const slug = "markets";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default function MarketsPage() {
  const markets = getMarketItems();
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

      {/* Full Bloomberg-style Market Instruments Table */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              AiX Terminal Data Stream
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">Live Capital, FX & Commodity Instruments</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800">
            Real-Time Feed • BVB & Global
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4 text-right">Value</th>
                <th className="py-3 px-4 text-right">24h Daily</th>
                <th className="py-3 px-4 text-right">Weekly</th>
                <th className="py-3 px-4 text-right">Monthly</th>
                <th className="py-3 px-4 text-right">Yearly</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {markets.map((item) => (
                <tr key={item.symbol} className="hover:bg-neutral-900/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">{item.symbol}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-white">{item.value}</td>
                  <td className={`py-3.5 px-4 text-right font-bold ${item.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {item.changeDaily}
                  </td>
                  <td className="py-3.5 px-4 text-right text-neutral-300">{item.changeWeekly || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-300">{item.changeMonthly || "—"}</td>
                  <td className="py-3.5 px-4 text-right text-amber-400 font-bold">{item.changeYearly || "—"}</td>
                  <td className="py-3.5 px-4 text-center uppercase text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
