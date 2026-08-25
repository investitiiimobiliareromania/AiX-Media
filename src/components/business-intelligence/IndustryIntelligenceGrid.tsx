'use client';

import React, { useState } from 'react';
import { IndustryProfile } from '@/lib/business-intelligence-types';
import { SafeImage } from '@/components/common/SafeImage';
import { Layers, TrendingUp, ShieldCheck } from 'lucide-react';

interface IndustryIntelligenceGridProps {
  industries: IndustryProfile[];
}

export function IndustryIntelligenceGrid({ industries }: IndustryIntelligenceGridProps) {
  const [activeIndustry, setActiveIndustry] = useState<IndustryProfile>(industries[0]!);

  return (
    <section id="industries" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            Industry Intelligence
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Analiza Sectoarelor Economice din România
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {industries.length} Sectoare Industriale &amp; Tehnologice
        </span>
      </div>

      {/* Industry Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {industries.map((ind) => {
          const isActive = activeIndustry.id === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => setActiveIndustry(ind)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 shadow-lg'
                  : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {ind.name}
            </button>
          );
        })}
      </div>

      {/* Selected Industry Main Overview Terminal View */}
      <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Industry Banner Image */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
            <SafeImage
              src={activeIndustry.coverImage}
              slug={activeIndustry.slug}
              alt={activeIndustry.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
              <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-amber-500 text-neutral-950">
                Sector Report
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">{activeIndustry.name}</h3>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-300">
                <span>Creștere: <strong className="text-emerald-400">{activeIndustry.growthRate}</strong></span>
                <span>Investiții: <strong className="text-amber-300">{activeIndustry.investmentsVolume}</strong></span>
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase font-bold text-amber-400">Prezentare Generală Sector</h4>
              <p className="text-sm font-serif text-neutral-200 leading-relaxed">
                {activeIndustry.marketOverview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
                <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tendințe Cheie</span>
                </div>
                <ul className="text-xs font-serif text-neutral-300 list-disc list-inside space-y-1">
                  {activeIndustry.trends.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
                <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lideri de Piață</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs text-neutral-200">
                  {activeIndustry.marketLeaders.map((leader, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                      {leader}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
