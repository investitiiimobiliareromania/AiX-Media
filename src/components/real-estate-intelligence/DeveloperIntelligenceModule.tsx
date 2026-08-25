'use client';

import React from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { developerProfiles, DeveloperInstitutionalProfile } from '@/lib/real-estate-intelligence-service';

export function DeveloperIntelligenceModule() {
  return (
    <section id="developers" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Briefcase className="w-4 h-4" />
          <span>Developer Institutional Profiles</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Liderii Sectorului de Dezvoltare Imobiliară
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-serif mt-1">
          Dosare de research corporativ pentru marile companii de dezvoltare din România.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {developerProfiles.map((d: DeveloperInstitutionalProfile) => (
          <div
            key={d.id}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  {d.segment}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">Fondat {d.founded}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">{d.name}</h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-3">{d.description}</p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400">Venituri (FY25)</div>
                  <div className="text-sm font-bold text-white mt-0.5">{d.revenue}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400">Unități Livrate</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">{d.deliveredUnits}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Proiecte Emblematic:</div>
                <div className="flex flex-wrap gap-1.5">
                  {d.keyProjects.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{d.activeProjectsCount} Proiecte Active</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                Dossier Corporativ <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
