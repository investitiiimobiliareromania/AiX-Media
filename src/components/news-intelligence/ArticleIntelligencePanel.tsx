'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, TrendingUp, Building2, Activity, ShieldCheck, Compass } from 'lucide-react';
import { Article } from '@/lib/media/models/article';

interface ArticleIntelligencePanelProps {
  article: Article;
  relatedArticles?: Article[];
}

export function ArticleIntelligencePanel({ article }: ArticleIntelligencePanelProps) {
  // Derive factual intelligence tags based on category & title
  const isBusinessOrEnergy =
    article.category === 'business' ||
    article.category === 'finance' ||
    article.title.toLowerCase().includes('energie') ||
    article.title.toLowerCase().includes('petrol') ||
    article.title.toLowerCase().includes('gaz');

  const isRealEstate =
    article.category === 'real-estate' ||
    article.title.toLowerCase().includes('imobil') ||
    article.title.toLowerCase().includes('apartament') ||
    article.title.toLowerCase().includes('construct');

  const isBanking =
    article.title.toLowerCase().includes('banca') ||
    article.title.toLowerCase().includes('banc') ||
    article.title.toLowerCase().includes('credite') ||
    article.title.toLowerCase().includes('ircc');

  return (
    <div className="space-y-8 pt-8 border-t border-neutral-800">
      {/* 1. ARTICLE INTELLIGENCE BOARD */}
      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-neutral-800 pb-3">
          <Zap className="w-4 h-4" />
          <span>AiX Media — Executive News Intelligence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif text-sm">
          {/* WHY IT MATTERS */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Why It Matters</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              Evenimentul aduce claritate asupra evoluției macroeconomice și influențează direct așteptările din piață privind lichiditatea, inflația și activitatea corporativă.
            </p>
          </div>

          {/* BUSINESS IMPACT */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Business &amp; Sector Impact</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              Sectorul {article.categoryLabel || 'Economic'} înregistrează ajustări de costuri și marje, cu impact direct asupra strategiilor de investiții și bugetelor de expansiune ale companiilor din domeniu.
            </p>
          </div>

          {/* MARKET IMPACT */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-sky-400 uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Market &amp; BVB Connection</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              Influențează randamentele titlurilor de stat, indicii BVB (BET/BET-TR) și dinamica creditării pe piața monetară interbancară.
            </p>
          </div>

          {/* WHAT TO WATCH NEXT */}
          <div className="space-y-2 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
            <h3 className="font-sans text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>What to Watch Next</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              Următoarele raportări oficiale ale INS, decizia BNR privind dobânda de referință și publicarea rezultatelor financiare trimestriale.
            </p>
          </div>
        </div>
      </div>

      {/* 2. CONNECTED ENTITIES (COMPANIES, MARKETS, SECTORS) */}
      <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <h3 className="font-sans text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
          Conexiuni Intelligence Ecosystem
        </h3>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <Link
            href="/companies"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Corporate Terminal: Companies</span>
          </Link>

          <Link
            href="/markets"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Markets Terminal: BET &amp; BNR</span>
          </Link>

          <Link
            href="/real-estate"
            className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-neutral-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span>Real Estate Terminal: Bucharest</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
