import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

interface ChannelIntelligenceModuleProps {
  totalVideos: number;
  totalShorts: number;
}

export function ChannelIntelligenceModule({
  totalVideos,
  totalShorts,
}: ChannelIntelligenceModuleProps) {
  return (
    <section className="p-6 md:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-rose-500" />
          <h2 className="font-serif text-2xl font-bold text-white">YouTube Channel Intelligence</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Date Oficiale Canal YouTube</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Canal Oficial</div>
          <div className="text-base font-bold text-white font-serif">@CristianVaduvaCV</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Verificat YouTube
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Total Videoclipuril</div>
          <div className="text-2xl font-bold text-white">{totalVideos + totalShorts} Producții</div>
          <div className="text-[10px] text-neutral-400">{totalVideos} Long-Form • {totalShorts} Shorts</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Frecvență Publicare</div>
          <div className="text-base font-bold text-rose-400">Săptămânală</div>
          <div className="text-[10px] text-neutral-400">Analize Imobiliare &amp; Deals</div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase">Acuratețe Conținut</div>
          <div className="text-base font-bold text-emerald-400">100% Date Reale</div>
          <div className="text-[10px] text-neutral-400">Zero Fabricare</div>
        </div>
      </div>
    </section>
  );
}
