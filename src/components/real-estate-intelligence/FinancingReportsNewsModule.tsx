'use client';

import React from 'react';
import { Percent, ShieldAlert, FileText, Newspaper } from 'lucide-react';
import { realEstateReports, RealEstateReportItem } from '@/lib/real-estate-intelligence-service';
import { Article } from '@/lib/media/models/article';
import { ArticleCard } from '@/components/media/ArticleCard';

interface FinancingReportsNewsModuleProps {
  newsArticles: Article[];
}

export function FinancingReportsNewsModule({ newsArticles }: FinancingReportsNewsModuleProps) {
  return (
    <div className="space-y-12">
      {/* Financing & IRCC Intelligence Section */}
      <section id="financing" className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Percent className="w-4 h-4" />
            <span>Financing &amp; Affordability Intelligence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Dinamica Creditării Ipotecare &amp; Indicele IRCC
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
            <div className="text-neutral-400 uppercase text-[10px]">Indice IRCC Trimestrul 3 2026</div>
            <div className="text-3xl font-extrabold text-amber-400">5.86%</div>
            <p className="text-xs font-serif text-neutral-300">
              Reglementat de BNR pentru creditele noi acordate populației.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
            <div className="text-neutral-400 uppercase text-[10px]">Dobândă Fixă Ipotecară (5 Ani)</div>
            <div className="text-3xl font-extrabold text-emerald-400">5.90% - 6.50%</div>
            <p className="text-xs font-serif text-neutral-300">
              Oferte competitive ale băncilor comerciale (BCR, BT, BRD, ING, Raiffeisen).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
            <div className="text-neutral-400 uppercase text-[10px]">Indice Accesibilitate (București)</div>
            <div className="text-3xl font-extrabold text-white">7.4 Ani</div>
            <p className="text-xs font-serif text-neutral-300">
              Număr de salarii medii nete necesare achiziției unui apartament de 50 mp.
            </p>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>Institutional Real Estate Reports</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Rapoarte &amp; Cercetare de Piață
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {realEstateReports.map((r: RealEstateReportItem) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  {r.category}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">{r.publishedAt}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">{r.title}</h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">{r.summary}</p>

              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Concluzii Cheie:</div>
                <ul className="space-y-1 text-xs font-serif text-neutral-300">
                  {r.keyFindings.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Estate News Section */}
      <section id="news" className="space-y-6 pt-6 border-t border-neutral-800">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Newspaper className="w-4 h-4" />
            <span>Latest Real Estate News</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Știri &amp; Noutăți Imobiliare
          </h2>
        </div>

        {newsArticles && newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center font-serif text-neutral-400 text-sm">
            Nicio știre imobiliară recentă.
          </div>
        )}
      </section>
    </div>
  );
}
