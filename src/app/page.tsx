import { type Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getAllArticles,
  getFeaturedArticles,
  getRadioShows,
  getLiveRadioShow,
  getPodcastEpisodes,
  getTvVideos,
  getMarketItems,
  getAllCompanies,
  getEconomicEvents,
} from "@/lib/media/service";
import { categoryConfigs } from "@/config/category-configs";
import { FeaturedArticle } from "@/components/media/FeaturedArticle";
import { ArticleCard } from "@/components/media/ArticleCard";
import { IntelligenceDashboard } from "@/components/media/IntelligenceDashboard";
import { RadioPlayer } from "@/components/media/RadioPlayer";
import { PodcastCard } from "@/components/media/PodcastCard";
import { VideoCard } from "@/components/media/VideoCard";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { AiXIntelligenceBox } from "@/components/media/AiXIntelligenceBox";
import {
  Radio,
  Tv,
  Mic,
  GraduationCap,
  Building2,
  TrendingUp,
  Briefcase,
  Globe2,
  ArrowRight,
  Flame,
  Activity,
  Layers,
  Calendar,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AiX Media | Romania's Bloomberg - Business Intelligence & Capital Markets",
  description:
    "Digital headquarters of Romania's next generation business intelligence network. Live market terminal, BVB indices, macroeconomics, real estate intelligence, radio and video journalism.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const mainFeatured = featuredArticles[0] || getAllArticles()[0];
  const secondaryFeatured = featuredArticles.slice(1, 4);

  const realEstateArticles = getAllArticles("real-estate");
  const investmentArticles = getAllArticles("investments");
  const businessArticles = getAllArticles("business");
  const financeArticles = getAllArticles("finance");

  const liveRadioShow = getLiveRadioShow();
  const radioShows = getRadioShows();
  const podcasts = getPodcastEpisodes();
  const videos = getTvVideos();
  const companies = getAllCompanies();
  const events = getEconomicEvents();

  const homepageMetrics = [
    { label: "BVB BET Index", value: "18,420.5", change: "+2.3%", subtext: "Historical liquidity high", isPositive: true },
    { label: "EUR / RON", value: "4.9765", change: "+0.02%", subtext: "BNR managed float", isPositive: true },
    { label: "ROBOR 3M", value: "5.58%", change: "-0.05%", subtext: "Interbank rate easing", isPositive: true },
    { label: "IRCC Benchmark", value: "5.86%", change: "-0.11%", subtext: "Quarterly index drop", isPositive: true },
    { label: "Prime RE Yield", value: "7.25%", change: "Stable", subtext: "Bucharest office corridor", isPositive: true },
    { label: "PE Dry Powder", value: "€1.2B", change: "+14%", subtext: "CEE capital allocation", isPositive: true },
    { label: "CPI Inflation", value: "5.1%", change: "-0.4%", subtext: "Converging to target", isPositive: true },
    { label: "Business Confidence", value: "108.2 pts", change: "+1.5%", subtext: "Expansionary sentiment", isPositive: true },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Editorial Section */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
            <Flame className="w-4 h-4 text-amber-400" />
            Featured Investigation & Newsroom Lead
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
            <Link href="/search" className="flex items-center gap-1 text-neutral-300 hover:text-amber-400">
              <Search className="w-3.5 h-3.5" />
              <span>FT Terminal Search</span>
            </Link>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Updated Real-Time</span>
          </div>
        </div>

        {mainFeatured && <FeaturedArticle article={mainFeatured} />}
      </section>

      {/* 2. Breaking News Ticker */}
      <section className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 flex items-center gap-4 overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider shrink-0 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/30">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          BREAKING
        </div>
        <div className="text-xs text-neutral-200 font-mono truncate flex-1">
          <span className="text-amber-400 font-semibold mr-2">[BVB Markets]</span>
          BVB BET Index breaks 18,420 pts threshold driven by strategic energy &amp; banking institutional inflows.
        </div>
        <Link href="/news" className="text-xs text-amber-400 hover:underline shrink-0 font-mono font-semibold hidden md:inline">
          View News Stream →
        </Link>
      </section>

      {/* 3. AiX Intelligence AI Briefing Box */}
      <AiXIntelligenceBox />

      {/* 4. Market Intelligence Dashboard (Bloomberg Style) */}
      <IntelligenceDashboard
        metrics={homepageMetrics.slice(0, 4)}
        title="Romania & CEE Market Intelligence Dashboard"
        description="Real-time macro indicators, capital markets, interest rates, and institutional benchmarks."
      />

      {/* 5. Top Editorial Investigations Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Top Editorial Investigations
          </h2>
          <Link href="/news" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1">
            <span>Explore All Reports</span>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Institutional Real Estate
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
              The Intelligence Layer Behind Real Estate Decisions
            </h2>
          </div>
          <Link href="/real-estate" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 shrink-0">
            <span>Real Estate Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realEstateArticles.slice(0, 3).map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* 7. AiX Radio Player (Pillar Section) */}
      {liveRadioShow && <RadioPlayer currentShow={liveRadioShow} allShows={radioShows} />}

      {/* 8. Corporate Champions & Company Profiles Spotlight */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Company Profiles & Financials
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Romania&apos;s Corporate Champions (BVB Listed)
            </h2>
          </div>
          <Link href="/companies" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1">
            <span>All Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((comp) => (
            <Link
              key={comp.id}
              href={`/companies/${comp.slug}`}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-colors block space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-mono text-xs font-bold">{comp.symbol}</span>
                <span className="text-white font-mono text-xs font-bold">{comp.stockPrice}</span>
              </div>
              <h3 className="text-sm font-bold text-white truncate">{comp.name}</h3>
              <div className="text-[11px] text-neutral-400 font-mono flex items-center justify-between pt-2 border-t border-neutral-800">
                <span>Cap: {comp.marketCap}</span>
                <span className="text-amber-400">Div: {comp.dividendYield}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Economic Calendar Spotlight */}
      <section className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Upcoming Macro & Central Bank Events</h3>
          </div>
          <Link href="/calendar" className="text-xs font-mono text-amber-400 hover:underline">
            Full Calendar →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          {events.map((ev) => (
            <div key={ev.id} className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-400 font-bold">{ev.country} • {ev.date}</span>
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400">{ev.importance}</span>
              </div>
              <div className="text-white font-bold truncate">{ev.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Investment Intelligence */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Private Wealth & Equity
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Investment Intelligence & Capital Allocation
            </h2>
          </div>
          <Link href="/investments" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1">
            <span>Investments Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {investmentArticles.slice(0, 3).map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* 11. AiX TV & Video Section */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Tv className="w-4 h-4" />
              Video Journalism
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
              AiX TV & Studio Investigations
            </h2>
          </div>
          <Link href="/tv" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1">
            <span>Watch AiX TV</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <VideoCard key={vid.id} video={vid} />
          ))}
        </div>
      </section>

      {/* 12. Executive Podcasts Hub */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Mic className="w-4 h-4" />
              Executive Audio
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Podcasts: Strategic Dialogues & Masterclasses
            </h2>
          </div>
          <Link href="/podcasts" className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1">
            <span>Podcast Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {podcasts.map((pod) => (
            <PodcastCard key={pod.id} episode={pod} />
          ))}
        </div>
      </section>

      {/* 13. Academy Spotlight */}
      <section className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
            <GraduationCap className="w-4 h-4" />
            Intelligence Academy
          </div>
          <h3 className="text-2xl font-bold text-white">Executive Education & Market Frameworks</h3>
          <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
            Access masterclasses on commercial real estate yield modeling, BVB stock analysis, and macro policy forecasts.
          </p>
        </div>
        <Link
          href="/academy"
          className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono transition-all shrink-0"
        >
          EXPLORE ACADEMY →
        </Link>
      </section>

      {/* 14. Newsletter */}
      <NewsletterBox />
    </div>
  );
}
