import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { industryDossiers } from '@/lib/industry-intelligence-data';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { DataDisclaimer } from '@/components/common/DataDisclaimer';
import { NewsletterBox } from '@/components/media/NewsletterBox';
import {
  Layers,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sectoare Industriale & Analize Economice | AiX Media',
  description:
    'Rapoarte de cercetare sectorială pentru cele mai importante industrii din România: energie, bănci, real estate, construcții, automotive, retail și tehnologie.',
  alternates: {
    canonical: `${siteConfig.url}/business/industries`,
  },
};

export default function IndustriesIndexPage() {
  return (
    <div className="space-y-10 py-6 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Business Intelligence', href: '/business' },
          { label: 'Sectoare Industriale' },
        ]}
      />

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Layers className="w-4 h-4" />
          <span>Industry Intelligence Index</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Sectoarele Cheie ale Economiei Românești
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 font-serif max-w-3xl leading-relaxed">
          Dosare aprofundate de cercetare pentru cele 7 industrii strategice din România: dimensiuni de piață oficiale, dinamici anuale, lideri corporativi, matrice de risc și oportunități de alocare a capitalului.
        </p>
      </div>

      {/* Grid of Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryDossiers.map((ind) => (
          <Link
            key={ind.id}
            href={`/business/industries/${ind.slug}`}
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 transition-all space-y-5 block shadow-lg group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  {ind.marketSizeClassification}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  {ind.growthYoY}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>{ind.name}</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
              </h2>
              <p className="text-xs font-serif text-neutral-300 line-clamp-2 leading-relaxed">
                {ind.heroTagline}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800/80 font-mono text-xs space-y-1">
              <div className="text-[10px] text-neutral-400">Dimensiune Piață</div>
              <div className="text-base font-bold text-amber-400">{ind.marketSize}</div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">
                Lideri Monitorizați:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ind.leaders.slice(0, 4).map((l, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-mono"
                  >
                    {l.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-xs text-amber-400 group-hover:text-amber-300 font-semibold">
              <span>Vezi Raportul Complet</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
