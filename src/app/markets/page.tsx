import { type Metadata } from "next";
import { categoryConfigs } from "@/config/category-configs";
import { getAllArticles } from "@/lib/media/service";
import { PremiumHero } from "@/components/media/PremiumHero";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { EditorialGrid } from "@/components/media/EditorialGrid";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { Activity, ExternalLink } from "lucide-react";
import { getMarketData } from "@/lib/market-data";

const slug = "markets";
const config = categoryConfigs[slug];

export const metadata: Metadata = {
  title: `${config.title} | AiX Media`,
  description: config.description,
  alternates: { canonical: `/${slug}` },
};

export default async function MarketsPage() {
  const articles = getAllArticles("markets");
  const snapshot = await getMarketData();

  const getMetric = (symbol: string) => {
    const list = [
      ...snapshot.currencies,
      ...snapshot.interestRates,
      ...snapshot.equities,
      ...snapshot.commodities,
    ];
    return list.find(item => item.symbol === symbol);
  };

  const bet = getMetric("BET");
  const eurRon = getMetric("EUR/RON");
  const usdRon = getMetric("USD/RON");
  const gbpRon = getMetric("GBP/RON");
  const chfRon = getMetric("CHF/RON");
  const robor3m = getMetric("ROBOR 3M");
  const ircc = getMetric("IRCC");

  const marketsMetrics = [
    {
      label: "BVB BET Index",
      value: bet && bet.value !== null ? bet.value.toString() : "Unavailable",
      subtext: bet && bet.value !== null ? "BVB Index" : "Connection offline",
      source: "BVB",
      publishedAt: bet?.publishedAt,
      fetchedAt: bet?.fetchedAt || new Date().toISOString(),
      isDelayed: bet?.isDelayed
    },
    {
      label: "EUR / RON",
      value: eurRon && eurRon.value !== null ? eurRon.value.toFixed(4) : "Unavailable",
      subtext: eurRon && eurRon.value !== null ? "BNR Reference Rate" : "Connection offline",
      source: "BNR",
      publishedAt: eurRon?.publishedAt,
      fetchedAt: eurRon?.fetchedAt || new Date().toISOString(),
      isDelayed: eurRon?.isDelayed
    },
    {
      label: "ROBOR 3M",
      value: robor3m && robor3m.value !== null ? `${robor3m.value}%` : "Unavailable",
      subtext: robor3m && robor3m.value !== null ? "Interbank Rate" : "Date oficiale indisponibile automat",
      source: "BNR",
      publishedAt: robor3m?.publishedAt,
      fetchedAt: robor3m?.fetchedAt || new Date().toISOString(),
      isDelayed: robor3m?.isDelayed
    },
    {
      label: "IRCC Benchmark",
      value: ircc && ircc.value !== null ? `${ircc.value}%` : "Unavailable",
      subtext: ircc && ircc.value !== null ? "Quarterly Benchmark" : "Sursă oficială: indisponibilă pentru preluare",
      source: "BNR",
      publishedAt: ircc?.publishedAt,
      fetchedAt: ircc?.fetchedAt || new Date().toISOString(),
      isDelayed: ircc?.isDelayed
    },
  ];

  const premiumSignals = [
    { label: "EUR / RON", value: eurRon && eurRon.value !== null ? eurRon.value.toFixed(4) : "Unavailable", change: "Curs BNR", isPositive: true },
    { label: "USD / RON", value: usdRon && usdRon.value !== null ? usdRon.value.toFixed(4) : "Unavailable", change: "Curs BNR", isPositive: true },
    { label: "BVB BET Index", value: bet && bet.value !== null ? bet.value.toString() : "Unavailable", change: "BVB Index", isPositive: true },
  ];

  const instrumentsList = [
    ...snapshot.currencies,
    ...snapshot.interestRates,
    ...snapshot.equities,
    ...snapshot.commodities,
  ];

  return (
    <div className="space-y-8">
      <PremiumHero
        eyebrow={config.eyebrow}
        headline={config.headline}
        description={config.description}
        ctaLabel={config.ctaLabel}
        marketSignals={premiumSignals}
      />

      {/* Market Instruments Table */}
      <section className="p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              AiX Terminal Market Monitor
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">Capital, FX & Commodity Instruments</h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800">
            BNR connected • BVB offline
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono text-neutral-300">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-right">Value</th>
                <th className="py-3 px-4">Reference/Date</th>
                <th className="py-3 px-4">Last Fetched</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {instrumentsList.map((inst) => {
                const isAvail = inst.value !== null;
                return (
                  <tr key={inst.symbol} className="hover:bg-neutral-900/40">
                    <td className="py-3.5 px-4 font-bold text-white">{inst.symbol}</td>
                    <td className="py-3.5 px-4">
                      {inst.sourceUrl ? (
                        <a
                          href={inst.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-400 flex items-center gap-1"
                        >
                          {inst.source}
                          <ExternalLink className="w-3 h-3 text-neutral-500" />
                        </a>
                      ) : (
                        inst.source
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white">
                      {isAvail ? `${inst.value?.toFixed(inst.unit === "RON" ? 4 : 2)}${inst.unit === "%" ? "%" : ""}` : "Unavailable"}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      {isAvail && inst.publishedAt ? inst.publishedAt : "N/A"}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">
                      {inst.fetchedAt.split("T")[0]}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                          isAvail
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-neutral-800 text-neutral-500 border border-neutral-700/50"
                        }`}
                      >
                        {isAvail ? "Available" : "Unavailable"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Disclaimer Area */}
        <div className="p-4 rounded bg-neutral-950 border border-neutral-900 text-[11px] leading-relaxed text-neutral-500 font-mono space-y-2">
          <p>
            <strong>Disclaimer:</strong> Market information is provided for informational purposes only. Data is sourced from the indicated provider and may be delayed, revised, or temporarily unavailable. AiX Media does not guarantee continuous availability or real-time accuracy of third-party data.
          </p>
          <p>
            BNR exchange rates are official published reference rates and are not equivalent to live interbank or trading-market quotations. Data retrieved from the publicly available BNR source.
          </p>
        </div>
      </section>

      <IntelligenceDashboard
        metrics={marketsMetrics}
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
