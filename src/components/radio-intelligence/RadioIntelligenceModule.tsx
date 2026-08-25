'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

interface RadioIntelligenceModuleProps {
  totalStations: number;
}

export function RadioIntelligenceModule({ totalStations }: RadioIntelligenceModuleProps) {
  return (
    <section className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="font-serif text-2xl font-bold text-white">Radio Intelligence &amp; Audio Infrastructure</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Date Oficiale Fluxuri Audio</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Stații Verificate</div>
          <div className="text-xl font-bold text-white">{totalStations} Radio Naționale</div>
          <div className="text-[10px] text-amber-400 font-semibold">Europa FM, RRA, Digi FM, Rock FM</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Status Flux Audio</div>
          <div className="text-2xl font-bold text-emerald-400">100% Verificat</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Stream-uri Active Live
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Calitate Sunet</div>
          <div className="text-base font-bold text-white">HQ 128 - 320 kbps</div>
          <div className="text-[10px] text-neutral-400">Low Latency Audio Dock</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Integritate Date</div>
          <div className="text-base font-bold text-amber-400">Zero Fabricare</div>
          <div className="text-[10px] text-neutral-400">Conținut Factual 100%</div>
        </div>
      </div>
    </section>
  );
}
