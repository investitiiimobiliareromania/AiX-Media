'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

interface PodcastIntelligenceModuleProps {
  totalEpisodes: number;
  totalShows: number;
}

export function PodcastIntelligenceModule({
  totalEpisodes,
  totalShows,
}: PodcastIntelligenceModuleProps) {
  return (
    <section className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="font-serif text-2xl font-bold text-white">Podcast Intelligence &amp; Distribution</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Date Verificate AiX Media</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Emisiuni Active</div>
          <div className="text-xl font-bold text-white">{totalShows} Shows Executive</div>
          <div className="text-[10px] text-amber-400 font-semibold">Real Estate, Markets, Policy, Wealth</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Episoade Publicate</div>
          <div className="text-2xl font-bold text-white">{totalEpisodes} Episoade</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Audio &amp; Show Notes Full
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Platforme Distribuție</div>
          <div className="text-base font-bold text-emerald-400">Spotify &amp; Apple</div>
          <div className="text-[10px] text-neutral-400">Distribuție Globală RSS</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Acuratețe Date</div>
          <div className="text-base font-bold text-amber-400">100% Verificat</div>
          <div className="text-[10px] text-neutral-400">Conținut Factual Redacțional</div>
        </div>
      </div>
    </section>
  );
}
