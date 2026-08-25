'use client';

import React from 'react';
import { Layers, ShieldAlert, ShieldCheck } from 'lucide-react';
import { sectorPerformances, SectorPerformanceItem } from '@/lib/markets-intelligence-service';

export function SectorRiskMonitorModule() {
  return (
    <section id="sectors-risk" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>Sector Intelligence &amp; Market Risk Monitor</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Performanță Sectoare &amp; Monitorul de Risc Financiar
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sectors Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Performanța Sectoarelor BVB</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectorPerformances.map((sec: SectorPerformanceItem) => (
              <div
                key={sec.name}
                className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 hover:border-amber-500/40 transition-all font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm font-serif">{sec.name}</span>
                  <span className="text-emerald-400 font-bold">+{sec.changeYTD}% YTD</span>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">Multiplu P/E Sector</span>
                  <span className="text-white font-bold">{sec.peRatio}x</span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-neutral-400 uppercase">Companii Top:</div>
                  <div className="flex flex-wrap gap-1">
                    {sec.leadingStocks.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-neutral-800 text-amber-400 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Monitor Card */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Market Risk Monitor</span>
          </h3>

          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 uppercase text-[10px]">Statut Risc Piață</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase text-[10px]">
                LOW / MODERATE RISK
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase">Indice Volatilitate (VIX)</div>
                <div className="text-xl font-bold text-white mt-0.5">15.40 (Volatilitate Scăzută)</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase">Panta Curbei de Randament</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">Normală (Spread 10Y-2Y: +0.50%)</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase">Lichiditate Piață BVB</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">Ridicită (Rulaje zilnice ~50M RON)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
