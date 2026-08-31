import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import { Landmark, ArrowRight, ExternalLink } from "lucide-react";
import { getMarketData } from "@/lib/market-data";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";

export const metadata: Metadata = {
  title: "Credit & Financing Information | AiX Media",
  description:
    "Informații relevante despre creditare, dobânzi, IRCC și finanțarea proprietăților.",
  alternates: {
    canonical: `${siteConfig.url}/credits`,
  },
};

export default async function CreditsPage() {
  const allArticles = await articleService.getPublishedArticles();
  const creditArticles = allArticles.filter(
    (art) =>
      art.category === "credits" ||
      art.category === "finance" ||
      art.title.toLowerCase().includes("credit") ||
      art.title.toLowerCase().includes("ircc") ||
      art.title.toLowerCase().includes("dobân") ||
      art.title.toLowerCase().includes("refinanț")
  );

  const snapshot = await getMarketData();
  const getMetric = (symbol: string) => {
    const list = [
      ...snapshot.currencies,
      ...snapshot.interestRates,
      ...snapshot.equities,
      ...snapshot.commodities,
    ];
    return list.find((item) => item.symbol === symbol);
  };

  const robor = getMetric("ROBOR 3M");
  const ircc = getMetric("IRCC");
  const bnrRate = getMetric("BNR RATE");

  const creditMetrics = [
    {
      label: "Indicele IRCC",
      value: ircc && ircc.value !== null ? `${ircc.value}%` : "5.86%",
      change: "",
      subtext: "Referință oficială BNR credite consumatori",
      isPositive: true,
      source: "BNR",
    },
    {
      label: "ROBOR 3M",
      value: robor && robor.value !== null ? `${robor.value}%` : "5.58%",
      change: "",
      subtext: "Indice mediu piață interbancară",
      isPositive: true,
      source: "BNR",
    },
    {
      label: "Rata Dobânzii BNR",
      value: bnrRate && bnrRate.value !== null ? `${bnrRate.value}%` : "6.50%",
      change: "",
      subtext: "Dobânda de politică monetară",
      isPositive: true,
      source: "BNR",
    },
    {
      label: "Grad Max. Îndatorare",
      value: "40% - 45%",
      change: "",
      subtext: "Plafon reglementat BNR",
      isPositive: true,
      source: "BNR",
    },
  ];

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <section className="p-8 md:p-10 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
              <Landmark className="w-4 h-4 text-amber-500" />
              Credit &amp; Financing Information
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Informații Despre Creditare &amp; Dobânzi
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
              Informații relevante despre creditare, dobânzi, IRCC și finanțarea proprietăților.
            </p>
          </div>

          <a
            href="https://credite.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]"
          >
            <span>Explore Credit Advisory</span>
            <ArrowRight className="w-4 h-4" />
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </section>

      {/* Official Monetary Metrics Dashboard */}
      <IntelligenceDashboard
        metrics={creditMetrics}
        title="Indicatori Monetari &amp; Dobânzi BNR"
        description="Cotații oficiale de referință privind indicii IRCC, ROBOR și rata dobânzii BNR."
      />

      {/* Credit Articles or Premium Empty State */}
      {creditArticles.length > 0 ? (
        <section className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Știri &amp; Informații
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Informații Finanțare &amp; Dobânzi Ipotecare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      ) : (
        <section className="p-8 md:p-12 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
              CREDIT &amp; FINANCING ADVISORY
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Looking for the right financing structure?
            </h2>
            <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
              Platforma AiX Media oferă acces direct la serviciile de consultanță financiară și structurare ipotecară.
            </p>
            <div className="pt-2">
              <a
                href="https://credite.cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <span>Explore Credit Advisory</span>
                <ArrowRight className="w-4 h-4" />
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Advisory CTA Block */}
      <section className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            External Credit Advisory
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Dorești asistență pentru structurarea unei finanțări sau refinanțări?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-serif">
            Accesează platforma dedicată de consultanță în creditare și finanțare.
          </p>
        </div>
        <a
          href="https://credite.cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Explore Credit Advisory</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Credit Brief"
        headline="Notificări &amp; Actualizări Dobânzi"
        description="Abonați-vă pentru a primi informații la publicarea noului indice IRCC și a deciziilor BNR."
      />
    </div>
  );
}
