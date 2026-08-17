import { type Metadata } from "next";
import Link from "next/link";
import {
  getAllArticles,
  getFeaturedArticles,
  getRadioShows,
  getLiveRadioShow,
  getPodcastEpisodes,
  getTvVideos,
  getAllCompanies,
  getEconomicEvents,
} from "@/lib/media/service";
import { FeaturedArticle } from "@/components/media/FeaturedArticle";
import { ArticleCard } from "@/components/media/ArticleCard";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { RadioPlayer } from "@/components/media/RadioPlayer";
import { PodcastCard } from "@/components/media/PodcastCard";
import { HomepageVideoSection } from "@/components/media/HomepageVideoSection";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { AiXIntelligenceBox } from "@/components/media/AiXIntelligenceBox";
import { EcosystemGrid } from "@/components/ecosystem/EcosystemGrid";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import {
  Mic,
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
  Flame,
  Layers,
  Calendar,
  Search,
} from "lucide-react";

import { getMarketData } from "@/lib/market-data";
import { getRealEstateMetrics } from "@/lib/real-estate-data";

export const metadata: Metadata = {
  title: "AiX Media | Financial & Real Estate Intelligence",
  description:
    "Platformă de analiză macroeconomică, cotații oficiale BNR, date imobiliare ANCPI și inteligență corporativă BVB.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const mainFeatured = featuredArticles[0] || getAllArticles()[0];
  const secondaryFeatured = featuredArticles.slice(1, 4);

  const realEstateArticles = getAllArticles("real-estate");
  const liveRadioShow = getLiveRadioShow();
  const radioShows = getRadioShows();
  const podcasts = getPodcastEpisodes();
  const videos = getTvVideos();
  const companies = getAllCompanies();
  const events = getEconomicEvents();

  const snapshot = await getMarketData();
  const realEstateMetrics = await getRealEstateMetrics();

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
      value: eurRon && eurRon.value !== null ? eurRon.value.toFixed(4) : "Indisponibil",
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
      value: robor && robor.value !== null ? `${robor.value}%` : "Indisponibil",
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
      value: ircc && ircc.value !== null ? `${ircc.value}%` : "Indisponibil",
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
      value: bnrRate && bnrRate.value !== null ? `${bnrRate.value}%` : "Indisponibil",
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
      {/* 1. Hero Editorial Section */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4 border-b border-[#262932] pb-3">
          <div className="flex items-center gap-2 text-white font-mono text-xs uppercase font-bold tracking-widest">
            <Flame className="w-4 h-4 text-amber-500" />
            Investigație &amp; Raport Instituțional Principal
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
            <Link href="/search" className="flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Căutare Rapoarte</span>
            </Link>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-500">Surse Oficiale Verificate</span>
          </div>
        </div>

        {mainFeatured && <FeaturedArticle article={mainFeatured} />}
      </section>

      {/* 2. Institutional Flash Banner */}
      <section className="bg-[#111317] border border-[#262932] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-md">
        <div className="flex items-center gap-2 text-neutral-200 font-mono text-xs font-bold uppercase tracking-wider shrink-0 bg-[#171920] px-3 py-1 rounded-lg border border-[#262932] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-amber-400">ACTUALITATE</span>
        </div>
        <div className="text-xs text-neutral-300 font-mono flex-1 leading-relaxed">
          <span className="text-white font-bold mr-1.5">[Statistici ANCPI]</span>
          Peste 51.000 de imobile tranzacționate la nivel național în ultima lună raportată oficial.
        </div>
        <Link href="/real-estate" className="text-xs text-neutral-300 hover:text-amber-400 font-mono font-bold shrink-0 underline transition-colors">
          Vezi datele detaliate →
        </Link>
      </section>

      {/* 3. AiX Intelligence Briefing Box */}
      <AiXIntelligenceBox />

      {/* 4. Market Intelligence Dashboard */}
      <IntelligenceDashboard
        metrics={homepageMetrics}
        title="Indicatori Monetari & Cotații Oficiale BNR"
        description="Date oficiale de referință privind cursul valutar, ROBOR și indicele IRCC."
      />

      {/* 5. Top Editorial Investigations Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#262932] pb-3">
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Rapoarte &amp; Analize Economice
          </h2>
          <Link href="/news" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors">
            <span>Toate Rapoartele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryFeatured.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* 6. Real Estate Intelligence Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#262932] pb-3 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Statistici &amp; Tranzacții Imobiliare
            </div>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Dinamica Tranzacțiilor și Autorizațiilor de Construire
            </h2>
          </div>
          <Link href="/real-estate" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 shrink-0 transition-colors">
            <span>Hub Imobiliar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Real Estate Verified Data Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {realEstateMetrics.slice(0, 3).map((metric) => (
            <div key={metric.id} className="p-5 rounded-2xl bg-[#111317] border border-[#262932] space-y-2 shadow-lg group hover:border-amber-500/40 transition-all">
              <div className="text-xs text-neutral-400 font-mono">{metric.label}</div>
              <div className="text-3xl font-bold text-white font-mono group-hover:text-amber-400 transition-colors">
                {metric.value} <span className="text-xs font-normal text-neutral-500 font-mono">{metric.unit}</span>
              </div>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">{metric.subtext}</p>
              <div className="pt-2 border-t border-[#262932] text-[11px] font-mono text-neutral-400">
                Sursă: <span className="text-neutral-200 font-semibold">{metric.source}</span> • {metric.referencePeriod}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {realEstateArticles.slice(0, 3).map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* 7. AiX Radio Player */}
      {liveRadioShow && <RadioPlayer currentShow={liveRadioShow} allShows={radioShows} />}

      {/* 8. Corporate Champions (BVB Listed) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#262932] pb-3">
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
              className="p-5 rounded-2xl bg-[#111317] border border-[#262932] hover:border-amber-500/50 hover:bg-[#171920] transition-all block space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#171920] border border-[#262932]">
                  {comp.symbol}
                </span>
                <span className="text-neutral-400 font-mono text-xs">{comp.isin}</span>
              </div>
              <h3 className="font-serif text-base font-bold text-white truncate">{comp.name}</h3>
              <p className="text-xs text-neutral-300 line-clamp-2 font-serif">{comp.description}</p>
              <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between pt-2.5 border-t border-[#262932]">
                <span>Venituri: <strong className="text-white">{comp.revenue}</strong></span>
                <span>Profit: <strong className="text-white">{comp.netIncome}</strong></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Economic Calendar */}
      <section className="p-6 md:p-8 rounded-2xl bg-[#111317] border border-[#262932] space-y-4 shadow-xl text-neutral-100">
        <div className="flex items-center justify-between border-b border-[#262932] pb-3">
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
            <div key={ev.id} className="p-4 rounded-xl bg-[#171920] border border-[#262932] space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-400 font-bold">{ev.country} • {ev.date}</span>
                <span className="px-1.5 py-0.5 rounded bg-[#1f222b] text-neutral-300 border border-[#262932] font-semibold">{ev.importance}</span>
              </div>
              <div className="text-white font-serif font-bold text-sm truncate">{ev.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. AiX TV & Video Section */}
      <HomepageVideoSection videos={videos} />

      {/* 11. Podcasts */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[#262932] pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-500 font-bold tracking-widest flex items-center gap-1.5">
              <Mic className="w-4 h-4" />
              AiX Audio &amp; Podcast
            </div>
            <h2 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">
              Episoade &amp; Dialoguri Economice
            </h2>
          </div>
          <Link href="/podcasts" className="text-xs font-mono text-neutral-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors">
            <span>Catalog Podcast</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcasts.map((pod) => (
            <PodcastCard key={pod.id} episode={pod} />
          ))}
        </div>
      </section>

      {/* 12. Academy Spotlight */}
      <section className="p-8 rounded-2xl bg-[#111317] border border-[#262932] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-neutral-100">
        <div className="space-y-2.5 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            Intelligence Academy
          </div>
          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white">Ghiduri &amp; Modele de Analiză Imobiliară</h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed font-serif">
            Metodologii structurate pentru calculul randamentelor investiționale, analiza tranzacțiilor cadastrale și interpretarea indicatorilor macroeconomici.
          </p>
        </div>
        <Link
          href="/academy"
          className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer min-h-[44px] flex items-center justify-center"
        >
          EXPLOREAZĂ ACADEMIA →
        </Link>
      </section>

      {/* 13. Data Disclaimer */}
      <DataDisclaimer type="general" />

      {/* 14. Newsletter */}
      <NewsletterBox />

      {/* 15. The AiX Ecosystem Section */}
      <EcosystemGrid />
    </div>
  );
}

