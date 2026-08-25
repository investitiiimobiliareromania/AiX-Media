'use client';

import React, { useState } from 'react';
import { MapPin, Filter, ChevronRight } from 'lucide-react';
import { neighborhoodProfiles, NeighborhoodProfile } from '@/lib/real-estate-intelligence-service';

export function BucharestNeighborhoodsModule() {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = ['all', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6'];

  const filtered = selectedSector === 'all'
    ? neighborhoodProfiles
    : neighborhoodProfiles.filter((n) => n.sector.includes(selectedSector));

  return (
    <section id="neighborhoods" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Bucharest Market Intelligence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Analiză pe Zone &amp; Cartiere București
          </h2>
        </div>

        {/* Filter Dropdown / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedSector === sector
                  ? 'bg-amber-500 text-neutral-950 shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {sector === 'all' ? 'Toate Sectoarele' : sector}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((n: NeighborhoodProfile) => (
          <div
            key={n.id}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  {n.sector}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    n.riskLevel === 'Low'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  Risc {n.riskLevel}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white">{n.name}</h3>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400">Preț Mediu / mp</div>
                  <div className="text-lg font-bold text-white mt-0.5">{n.avgPriceSqm} €</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">{n.yoYChange} YoY</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-400">Randament Chirie</div>
                  <div className="text-lg font-bold text-amber-400 mt-0.5">{n.grossYield}</div>
                  <div className="text-[10px] text-neutral-400">{n.rentalAvgSqm} €/mp/lună</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Elemente Cheie:</div>
                <ul className="space-y-1 text-xs font-serif text-neutral-300">
                  {n.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{n.activeProjectsCount} Proiecte Active</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                Intelligence Dossier <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
