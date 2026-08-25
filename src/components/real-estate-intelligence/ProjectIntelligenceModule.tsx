'use client';

import React from 'react';
import { Layers, ChevronRight } from 'lucide-react';
import { projectItems, RealEstateProjectItem } from '@/lib/real-estate-intelligence-service';

export function ProjectIntelligenceModule() {
  return (
    <section id="projects" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Layers className="w-4 h-4" />
          <span>Project Intelligence Dossiers</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Proiecte Rezidențiale &amp; Mixte de Referință
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectItems.map((p: RealEstateProjectItem) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  {p.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    p.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">{p.name}</h3>
              <div className="text-xs text-amber-400 font-mono font-medium">{p.developer}</div>

              <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-3">{p.description}</p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400">Preț de la</div>
                  <div className="text-sm font-bold text-white mt-0.5">{p.startingPrice}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400">Livrare / Fază</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">{p.deliveryDate}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Facilități:</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.amenities.map((a, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-mono">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{p.sectorOrArea}</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                Fișă Tehnică <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
