import { type Metadata } from "next";
import { articleService } from "@/services/article.service";
import { ArticleCard } from "@/components/media/ArticleCard";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { siteConfig } from "@/config/site";
import { Landmark, ArrowRight, ExternalLink, Calculator } from "lucide-react";
import { getMarketData } from "@/lib/market-data";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";

export const metadata: Metadata = {
  title: "Credit Intelligence & Financial Optimization | AiX Media",
  description:
    "Analize de creditare ipotecară și refinanțare: indicatori BNR, indicii IRCC/ROBOR, gradul maxim de îndatorare și optimizarea costului capitalului.",
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

  const keyCreditGuides = [
    {
      title: "Dobândă Fixă vs. Dobândă Variabilă în 2026",
      description: "Analiză comparativă privind structura creditelor ipotecare: de ce peste 80% din achiziții folosesc dobânda fixă inițială pe 3-5 ani.",
      tag: "CREDIT INSIGHT",
    },
    {
      title: "Optimizarea Refinanțării Ipotecare",
      description: "Cum poți reduce rata lunară și costul total al dobânzilor prin refinanțarea creditelor vechi în condiții de piață mai avantajoase.",
      tag: "FINANCING GUIDE",
    },
    {
      title: "Evaluarea Capacității de Îndatorare (ANAF & BNR)",
      description: "Cadru practic de calcul al gradului maxim de îndatorare de 40% din veniturile nete lunare verificate oficial.",
      tag: "CREDIT INTELLIGENCE",
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
              Credit Intelligence &amp; Financial Optimization
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Inteligență în Creditare Ipotecară &amp; Refinanțare
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-serif leading-relaxed">
              Analize privind evoluția ratelor dobânzilor IRCC și ROBOR, normele BNR privind îndatorarea și strategii de optimizare a costului creditelor.
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

      {/* Credit Dashboard */}
      <IntelligenceDashboard
        metrics={creditMetrics}
        title="Indicatori Oficiali de Creditare BNR"
        description="Date de referință privind indicii IRCC, ROBOR și rata dobânzii de politică monetară."
      />

      {/* Evergreen Credit Guides */}
      <section className="space-y-6">
        <div className="border-b border-[var(--border)] pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            Optimizare Financiară &amp; Ghiduri
          </span>
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
            Ghiduri &amp; Strategii de Creditare Ipotecară
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyCreditGuides.map((guide, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {guide.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">{guide.title}</h3>
                <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                  {guide.description}
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--border)] text-xs font-mono text-amber-400 flex items-center gap-1">
                <Calculator className="w-4 h-4 text-amber-500" />
                <span>Analiză Structurată Evergreen</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credit Articles */}
      {creditArticles.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-[var(--border)] pb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Analize &amp; Dobânzi
            </span>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Analize Financiar-Bancare &amp; Refinanțare
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* Dedicated Advisory CTA Block */}
      <section className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Credit Advisory &amp; Structuring
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Ai nevoie de asistență pentru structurarea sau refinanțarea unui credit?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-serif">
            Consultă opțiunile de finanțare și beneficiază de recomandări optimizate pentru profilul tău de venituri.
          </p>
        </div>
        <a
          href="https://credite.cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Request Credit Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      <DataDisclaimer type="general" />

      <NewsletterBox
        overline="AiX Credit Advisory Brief"
        headline="Sinteza Periodică a Dobânzilor &amp; Ipotecilor"
        description="Primiți direct pe email evoluția noului IRCC, prognozele BNR și ghidurile de refinanțare."
      />
    </div>
  );
}
