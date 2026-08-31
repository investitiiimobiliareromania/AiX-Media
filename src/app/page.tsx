import { type Metadata } from "next";
import Link from "next/link";
import {
  getAllArticles,
  getFeaturedArticles,
  getLiveRadioShow,
  getRadioShows,
  getTvVideos,
  getAllCompanies,
  getEconomicEvents,
} from "@/lib/media/service";
import dynamic from "next/dynamic";
import { FeaturedArticle } from "@/components/media/FeaturedArticle";
import { ArticleCard } from "@/components/media/ArticleCard";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { HomepageVideoSection } from "@/components/media/HomepageVideoSection";
import { AiXIntelligenceBox } from "@/components/media/AiXIntelligenceBox";
import { AncpiMarketStatus } from "@/components/media/AncpiMarketStatus";
import { EcosystemGrid } from "@/components/ecosystem/EcosystemGrid";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { EditorialVerticalsTriptych } from "@/components/editorial/EditorialVerticalsTriptych";

const RadioPlayer = dynamic(
  () => import("@/components/media/RadioPlayer").then((m) => m.RadioPlayer)
);

const NewsletterBox = dynamic(
  () => import("@/components/media/NewsletterBox").then((m) => m.NewsletterBox)
);
import {
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
  Flame,
  Calendar,
  Search,
  Shield,
  Landmark,
  ExternalLink,
} from "lucide-react";

import { getMarketData } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "AiX Media — Real Estate, Insurance, Credit & Market Information",
  description:
    "Platformă editorială de analiză imobiliară, protecția patrimoniului, creditare ipotecară, date ANCPI, indicatori BNR, companii BVB și materiale video cu Cristian Văduva.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const mainFeatured = featuredArticles[0] || allArticles[0];

  const realEstateArticles = allArticles.filter((art) => art.category === "real-estate");
  const secondaryRealEstate = realEstateArticles.filter(
    (art) => art.id !== mainFeatured?.id
  );

  const insuranceArticles = allArticles.filter((art) => art.category === "insurance");
  const creditArticles = allArticles.filter((art) => art.category === "credits" || art.category === "finance");

  const liveRadioShow = getLiveRadioShow();
  const radioShows = getRadioShows();
  const videos = getTvVideos();
  const companies = getAllCompanies();
  const events = getEconomicEvents();

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

  const eurRon = getMetric("EUR/RON");
  const robor = getMetric("ROBOR 3M");
  const ircc = getMetric("IRCC");
  const bnrRate = getMetric("BNR RATE");

  const homepageMetrics = [
    {
      label: "EUR / RON (Curs Oficial)",
      value: eurRon && eurRon.value !== null ? eurRon.value.toFixed(4) : "4.9775",
      change: "",
      subtext: "Curs oficial de referință BNR",
      isPositive: true,
      source: "BNR",
      publishedAt: eurRon?.publishedAt,
      fetchedAt: eurRon?.fetchedAt || new Date().toISOString(),
      isDelayed: false,
    },
    {
      label: "ROBOR 3M",
      value: robor && robor.value !== null ? `${robor.value}%` : "5.58%",
      change: "",
      subtext: "Indicele mediu interbancar oficial",
      isPositive: true,
      source: "BNR",
      publishedAt: robor?.publishedAt,
      fetchedAt: robor?.fetchedAt || new Date().toISOString(),
      isDelayed: true,
    },
    {
      label: "Indicele IRCC",
      value: ircc && ircc.value !== null ? `${ircc.value}%` : "5.86%",
      change: "",
      subtext: "Referință credite consumatori (T3 2026)",
      isPositive: true,
      source: "BNR",
      publishedAt: ircc?.publishedAt,
      fetchedAt: ircc?.fetchedAt || new Date().toISOString(),
      isDelayed: true,
    },
    {
      label: "Rata Dobânzii BNR",
      value: bnrRate && bnrRate.value !== null ? `${bnrRate.value}%` : "6.50%",
      change: "",
      subtext: "Dobânda de politică monetară",
      isPositive: true,
      source: "BNR",
      publishedAt: bnrRate?.publishedAt,
      fetchedAt: bnrRate?.fetchedAt || new Date().toISOString(),
      isDelayed: true,
    },
  ];

  return (
    <div className="space-y-12 pb-16 pt-4">
      {/* 1. Featured Real Estate & Macro Intelligence Header */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-widest">
            <Flame className="w-4 h-4 text-amber-500" />
            Investigație &amp; Raport Imobiliar Principal
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
            <Link href="/search" className="flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Căutare Rapoarte</span>
            </Link>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-500">Surse Oficiale ANCPI &amp; INS</span>
          </div>
        </div>

        {mainFeatured && <FeaturedArticle article={mainFeatured} />}
      </section>

      {/* 2. Executive Intelligence Briefing Box */}
      <AiXIntelligenceBox />

      {/* 3. Three Editorial Verticals & Ecosystem Triptych Module */}
      <EditorialVerticalsTriptych />

      {/* 4. Real Estate Vertical Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-3 gap-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Real Estate News &amp; Property Market
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              Piața Imobiliară: România &amp; Europa
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Tranzacții cadastrale ANCPI, prețuri, chirii și construcții
            </p>
          </div>
          <Link href="/real-estate" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors">
            <span>Toate Știrile Imobiliare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryRealEstate.slice(0, 3).map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>

        {/* Real Estate Section CTA */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              REAL ESTATE ECOSYSTEM
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 font-serif font-bold">
              Descoperă proprietăți selectate și oportunități imobiliare prin HomeFind.
            </p>
          </div>
          <a
            href="https://homefind.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore HomeFind</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </section>

      {/* 5. Insurance Section */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-3 gap-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Insurance &amp; Risk Information
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              Insurance &amp; Protecția Patrimoniului
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Informații despre asigurări, protecția proprietăților și riscuri
            </p>
          </div>
          <Link href="/insurance" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors">
            <span>Toate Informațiile Asigurări</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {insuranceArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceArticles.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}

        {/* Insurance Section CTA */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              INSURANCE ADVISORY
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 font-serif font-bold">
              Protejează-ți patrimoniul și activele imobiliare împotriva riscurilor.
            </p>
          </div>
          <a
            href="https://insurance.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Request Insurance Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </section>

      {/* 6. Credits & Financing Section */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[var(--border)] pb-3 gap-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Landmark className="w-4 h-4" />
              Credit &amp; Financing Information
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
              Credit &amp; Finanțare Ipotecară
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Informații despre creditare, dobânzi BNR, IRCC și refinanțare
            </p>
          </div>
          <Link href="/credits" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors">
            <span>Toate Informațiile Credite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {creditArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditArticles.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}

        {/* Credit Section CTA */}
        <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              CREDIT ADVISORY
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 font-serif font-bold">
              Evaluează opțiunile de creditare ipotecară și refinanțare cu consultanți specializați.
            </p>
          </div>
          <a
            href="https://credite.cristianvaduva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Credit Advisory</span>
            <ArrowRight className="w-3.5 h-3.5" />
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </section>

      {/* 7. ANCPI Current Market Status */}
      <AncpiMarketStatus />

      {/* 8. Monetary & BNR Indicators */}
      <IntelligenceDashboard
        metrics={homepageMetrics}
        title="Indicatori Monetari &amp; Cotații Oficiale BNR"
        description="Date oficiale de referință privind cursul valutar, ROBOR și indicele IRCC cu impact pe piața ipotecară."
      />

      {/* 9. Video Section (Property Tours & Cristian Văduva Perspective) */}
      <HomepageVideoSection videos={videos} />

      {/* 10. Corporate Champions (BVB Listed Companies) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Companii Listate la BVB
            </div>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Profiluri Verificate &amp; Raportări Financiare Oficiale
            </h2>
          </div>
          <Link href="/companies" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors">
            <span>Toate Companiile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((comp) => (
            <Link
              key={comp.id}
              href={`/companies/${comp.slug}`}
              className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 transition-all block space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-amber-400 font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                  {comp.symbol}
                </span>
                {comp.isin && comp.isin !== 'N/A' && (
                  <span className="text-neutral-400 font-mono text-xs">
                    ISIN: <span className="text-neutral-300 font-semibold">{comp.isin}</span>
                  </span>
                )}
              </div>
              <h3 className="font-serif text-base font-bold text-white truncate">{comp.name}</h3>
              <p className="text-xs text-neutral-300 line-clamp-2 font-serif">{comp.description}</p>
              <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between pt-2.5 border-t border-[var(--border)]">
                <span>Venituri: <strong className="text-white">{comp.revenue}</strong></span>
                <span>Profit: <strong className="text-white">{comp.netIncome}</strong></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. Macroeconomic Calendar */}
      <section className="p-6 md:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 shadow-xl text-neutral-100">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif text-xl font-bold text-white">Calendar Macroeconomic &amp; Decizii Oficiale</h3>
          </div>
          <Link href="/calendar" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold underline transition-colors">
            Calendar complet →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {events.map((ev) => (
            <div key={ev.id} className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-400 font-bold">{ev.country} • {ev.date}</span>
                <span className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] text-neutral-300 border border-[var(--border)] font-semibold">{ev.importance}</span>
              </div>
              <div className="text-white font-serif font-bold text-sm truncate">{ev.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Live Business Radio */}
      {liveRadioShow && <RadioPlayer currentShow={liveRadioShow} allShows={radioShows} />}

      {/* 13. Academy Spotlight */}
      <section className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-neutral-100">
        <div className="space-y-2.5 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            Academy Spotlight
          </div>
          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">Analiza Tranzacțiilor Cadastrale &amp; Economie Imobiliară</h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed font-serif">
            Sinteze ale tranzacțiilor ANCPI și interpretarea indicatorilor macroeconomici.
          </p>
        </div>
        <Link
          href="/academy"
          className="px-6 py-3.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-neutral-200 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer min-h-[44px] flex items-center justify-center"
        >
          EXPLOREAZĂ ACADEMIA →
        </Link>
      </section>

      {/* Data Disclaimer */}
      <DataDisclaimer type="general" />

      {/* Newsletter Box */}
      <NewsletterBox />

      {/* Ecosystem Grid */}
      <EcosystemGrid />
    </div>
  );
}
