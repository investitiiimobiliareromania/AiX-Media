"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Building2,
  FileText,
  Film,
  Headphones,
  TrendingUp,
  ArrowRight,
  Filter,
  Layers,
} from "lucide-react";
import { verifiedNewsArticles } from "@/lib/news-service";
import { bvbCompanies } from "@/lib/bvb-data";
import { institutionalDossiers } from "@/lib/institutional-company-dossiers";
import { verifiedVideos } from "@/config/youtube";
import { podcastEpisodes } from "@/lib/media/mock-db";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { SafeImage } from "@/components/common/SafeImage";

type SearchCategory = "all" | "articles" | "companies" | "videos" | "podcasts" | "markets";

interface UnifiedSearchResult {
  id: string;
  type: "ARTICLE" | "COMPANY" | "VIDEO" | "PODCAST" | "MARKET";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  badge: string;
  image?: string;
  date?: string;
  score: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SearchCategory>("all");

  const results: UnifiedSearchResult[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items: UnifiedSearchResult[] = [];

    // 1. Articles
    verifiedNewsArticles.forEach((art) => {
      let score = 0;
      if (q) {
        if (art.title.toLowerCase().includes(q)) score += 10;
        if (art.excerpt.toLowerCase().includes(q)) score += 5;
        if (art.content.toLowerCase().includes(q)) score += 2;
        if (art.category.toLowerCase().includes(q)) score += 4;
      } else {
        score = 1;
      }

      if (!q || score > 0) {
        items.push({
          id: `art-${art.id}`,
          type: "ARTICLE",
          title: art.title,
          subtitle: art.categoryLabel || "Articol Editorial",
          description: art.excerpt,
          href: `/news/${art.slug}`,
          badge: "ARTICLE",
          image: art.image,
          date: art.publishedAt,
          score,
        });
      }
    });

    // 2. Companies (BVB & Dossiers)
    const companySlugsSeen = new Set<string>();
    institutionalDossiers.forEach((d) => {
      companySlugsSeen.add(d.slug);
      let score = 0;
      if (q) {
        if (d.name.toLowerCase().includes(q)) score += 12;
        if (d.symbol && d.symbol.toLowerCase().includes(q)) score += 15;
        if (d.executiveSummary.toLowerCase().includes(q)) score += 4;
        if (d.industry && d.industry.toLowerCase().includes(q)) score += 5;
      } else {
        score = 2;
      }

      if (!q || score > 0) {
        items.push({
          id: `dossier-${d.slug}`,
          type: "COMPANY",
          title: d.name,
          subtitle: `${d.symbol ? `BVB: ${d.symbol}` : 'Profil Financiar'} • ${d.industry || 'Business'}`,
          description: d.executiveSummary,
          href: `/companies/${d.slug}`,
          badge: "COMPANY",
          score,
        });
      }
    });

    bvbCompanies.forEach((c) => {
      if (!companySlugsSeen.has(c.slug)) {
        let score = 0;
        if (q) {
          if (c.name.toLowerCase().includes(q)) score += 12;
          if (c.symbol.toLowerCase().includes(q)) score += 15;
          if (c.description.toLowerCase().includes(q)) score += 4;
          if (c.sector && c.sector.toLowerCase().includes(q)) score += 5;
        } else {
          score = 1;
        }

        if (!q || score > 0) {
          items.push({
            id: `comp-${c.slug}`,
            type: "COMPANY",
            title: c.name,
            subtitle: `BVB: ${c.symbol} • ${c.sector || "Profil BVB"}`,
            description: c.description,
            href: `/companies/${c.slug}`,
            badge: "COMPANY",
            score,
          });
        }
      }
    });

    // 3. Videos
    verifiedVideos.forEach((vid) => {
      let score = 0;
      if (q) {
        if (vid.title.toLowerCase().includes(q)) score += 10;
        if (vid.description && vid.description.toLowerCase().includes(q)) score += 4;
        if (vid.category && vid.category.toLowerCase().includes(q)) score += 4;
      } else {
        score = 1;
      }

      if (!q || score > 0) {
        items.push({
          id: `vid-${vid.id}`,
          type: "VIDEO",
          title: vid.title,
          subtitle: `Canal YouTube • ${vid.category || "Video"}`,
          description: vid.description || "Prezentare și analiză video oficială.",
          href: `/video/${vid.slug || vid.id}`,
          badge: "VIDEO",
          image: `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`,
          score,
        });
      }
    });

    // 4. Podcasts
    podcastEpisodes.forEach((pod) => {
      let score = 0;
      if (q) {
        if (pod.title.toLowerCase().includes(q)) score += 10;
        if (pod.description.toLowerCase().includes(q)) score += 4;
        if (pod.showName.toLowerCase().includes(q)) score += 6;
      } else {
        score = 1;
      }

      if (!q || score > 0) {
        items.push({
          id: `pod-${pod.id}`,
          type: "PODCAST",
          title: pod.title,
          subtitle: `${pod.showName} • EP #${pod.episodeNumber || 1}`,
          description: pod.description,
          href: `/podcast/${pod.slug}`,
          badge: "PODCAST",
          image: pod.coverImage,
          date: pod.publishedAt,
          score,
        });
      }
    });

    // 5. Market Terminals
    const marketNodes = [
      {
        id: "mkt-bvb",
        title: "Bursa de Valori București (BVB) & Indici Globali",
        subtitle: "Terminalul de Piețe Financiare",
        description: "Evoluția indicilor BET, BET-TR, lichiditatea bursieră și cotațiile de referință.",
        href: "/markets",
      },
      {
        id: "mkt-ancpi",
        title: "Piața Imobiliară & Cadastru ANCPI",
        subtitle: "Terminalul Imobiliar",
        description: "Statistici oficiale cadastrale lunare, autorizații de construire INS și indici rezidențiali.",
        href: "/real-estate",
      },
      {
        id: "mkt-bnr",
        title: "Banca Națională a României & Dobânzi Oficiale",
        subtitle: "Politică Monetară & Macro",
        description: "Ratele ROBOR 3M/6M, indicele IRCC și rata dobânzii de politică monetară BNR.",
        href: "/finance",
      },
    ];

    marketNodes.forEach((m) => {
      let score = 0;
      if (q) {
        if (m.title.toLowerCase().includes(q)) score += 10;
        if (m.subtitle.toLowerCase().includes(q)) score += 8;
        if (m.description.toLowerCase().includes(q)) score += 4;
      } else {
        score = 1;
      }

      if (!q || score > 0) {
        items.push({
          id: m.id,
          type: "MARKET",
          title: m.title,
          subtitle: m.subtitle,
          description: m.description,
          href: m.href,
          badge: "MARKET",
          score,
        });
      }
    });

    // Sort by relevance score descending
    return items.sort((a, b) => b.score - a.score);
  }, [query]);

  // Filter by selected tab
  const filteredResults = useMemo(() => {
    if (selectedType === "all") return results;
    if (selectedType === "articles") return results.filter((r) => r.type === "ARTICLE");
    if (selectedType === "companies") return results.filter((r) => r.type === "COMPANY");
    if (selectedType === "videos") return results.filter((r) => r.type === "VIDEO");
    if (selectedType === "podcasts") return results.filter((r) => r.type === "PODCAST");
    if (selectedType === "markets") return results.filter((r) => r.type === "MARKET");
    return results;
  }, [results, selectedType]);

  const counts = useMemo(() => {
    return {
      all: results.length,
      articles: results.filter((r) => r.type === "ARTICLE").length,
      companies: results.filter((r) => r.type === "COMPANY").length,
      videos: results.filter((r) => r.type === "VIDEO").length,
      podcasts: results.filter((r) => r.type === "PODCAST").length,
      markets: results.filter((r) => r.type === "MARKET").length,
    };
  }, [results]);

  const getTypeIcon = (type: UnifiedSearchResult["type"]) => {
    switch (type) {
      case "ARTICLE":
        return <FileText className="w-3.5 h-3.5 text-amber-500" />;
      case "COMPANY":
        return <Building2 className="w-3.5 h-3.5 text-emerald-500" />;
      case "VIDEO":
        return <Film className="w-3.5 h-3.5 text-rose-500" />;
      case "PODCAST":
        return <Headphones className="w-3.5 h-3.5 text-sky-500" />;
      case "MARKET":
        return <TrendingUp className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  const getBadgeStyle = (type: UnifiedSearchResult["type"]) => {
    switch (type) {
      case "ARTICLE":
        return "bg-amber-500/10 text-amber-400 border-amber-500/25";
      case "COMPANY":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      case "VIDEO":
        return "bg-rose-500/10 text-rose-400 border-rose-500/25";
      case "PODCAST":
        return "bg-sky-500/10 text-sky-400 border-sky-500/25";
      case "MARKET":
        return "bg-purple-500/10 text-purple-400 border-purple-500/25";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 pb-20 text-neutral-100 px-4 sm:px-6">
      {/* Search Header Banner */}
      <div className="p-8 md:p-12 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-5 shadow-2xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
          <Search className="w-3.5 h-3.5" />
          <span>Unified Intelligence Search</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Căutare în Ecosistemul AiX Media
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-serif leading-relaxed">
          Accesați articole economice, dosare corporative BVB, emisiuni video și indicatori imobiliari din surse oficiale verificate.
        </p>

        <div className="max-w-2xl mx-auto pt-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Căutați 'Banca Transilvania', 'ANCPI', 'BVB', 'OMV Petrom', 'ROBOR'..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-white text-sm sm:text-base placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none transition-colors shadow-lg font-mono"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pt-4 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          {[
            { id: "all", label: `Toate (${counts.all})` },
            { id: "articles", label: `Articole (${counts.articles})` },
            { id: "companies", label: `Companii (${counts.companies})` },
            { id: "videos", label: `Video (${counts.videos})` },
            { id: "podcasts", label: `Podcasts (${counts.podcasts})` },
            { id: "markets", label: `Piețe (${counts.markets})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as SearchCategory)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer border ${
                selectedType === tab.id
                  ? "bg-amber-500 text-neutral-950 font-bold border-amber-500 shadow-md"
                  : "bg-[var(--surface)] text-neutral-400 hover:text-white border-[var(--border)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Rezultate Găsite ({filteredResults.length})</span>
          </h2>
          {query && (
            <span className="text-xs font-mono text-neutral-400">
              Căutare după: &quot;{query}&quot;
            </span>
          )}
        </div>

        {filteredResults.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-3">
            <p className="text-neutral-300 font-serif">
              Nu am găsit rezultate pentru termenul căutat.
            </p>
            <p className="text-xs font-mono text-neutral-500">
              Încercați termeni precum: &quot;BVB&quot;, &quot;ANCPI&quot;, &quot;Banca Transilvania&quot;, &quot;BNR&quot; sau &quot;Imobiliare&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResults.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 hover:bg-[var(--surface-editorial)] transition-all shadow-md space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${getBadgeStyle(
                        item.type
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                      <span>{item.badge}</span>
                    </span>
                    {item.date && (
                      <span className="text-[11px] font-mono text-neutral-400">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-amber-500/90 font-medium">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-amber-400 transition-colors">
                  <span>Accesează resursa</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <DataDisclaimer type="general" />
    </div>
  );
}
