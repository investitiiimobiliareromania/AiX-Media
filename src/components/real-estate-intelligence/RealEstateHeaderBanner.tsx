'use client';

import React from 'react';
import { Home, TrendingUp, Compass, ArrowDownRight, Layers, Building, Zap } from 'lucide-react';

interface RealEstateHeaderBannerProps {
  totalNeighborhoods: number;
  totalDevelopers: number;
  totalProjects: number;
  totalNews: number;
}

export function RealEstateHeaderBanner({
  totalNeighborhoods,
  totalDevelopers,
  totalProjects,
  totalNews,
}: RealEstateHeaderBannerProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Terminal Header Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/40 p-6 md:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>AiX Real Estate Intelligence Terminal</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
                REAL ESTATE INTELLIGENCE
              </h1>
              <p className="text-lg sm:text-xl font-serif text-amber-300/90 font-medium">
                Romania&apos;s property market, Bucharest neighborhood dossiers &amp; developer intelligence.
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              Platformă instituțională de analiză a pieței imobiliare: indicatori cadastrali ANCPI, autorizații INS, dinamica dobânzilor BNR IRCC, indicii pe mp pe cartiere și profilurile marilor dezvoltatori.
            </p>
          </div>

          {/* Quick Summary Grid Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-80 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <Home className="w-3 h-3 text-amber-400" />
                <span>Preț Mediu BUC</span>
              </div>
              <div className="text-xl font-bold text-white">1,780 €/mp</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>Randament Mediu</span>
              </div>
              <div className="text-xl font-bold text-emerald-400">6.8% Gross</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <Building className="w-3 h-3 text-sky-400" />
                <span>Dezvoltatori</span>
              </div>
              <div className="text-xl font-bold text-white">{totalDevelopers} Lideri</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <Layers className="w-3 h-3 text-purple-400" />
                <span>Cartiere Monitorizate</span>
              </div>
              <div className="text-xl font-bold text-white">{totalNeighborhoods} Zone</div>
            </div>
          </div>
        </div>

        {/* Sticky Terminal Anchor Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-mono uppercase text-neutral-500 mr-2 flex items-center gap-1.5 shrink-0">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Terminal:
            </span>

            {[
              { id: 'overview', label: 'Market Overview' },
              { id: 'neighborhoods', label: 'Bucharest Neighborhoods' },
              { id: 'residential-commercial', label: 'Commercial & Logistics' },
              { id: 'developers', label: 'Developers' },
              { id: 'projects', label: 'Projects' },
              { id: 'financing', label: 'Financing & IRCC' },
              { id: 'reports', label: 'Reports' },
              { id: 'news', label: 'Latest News' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                <span>{tab.label}</span>
                <ArrowDownRight className="w-3 h-3 text-neutral-500 group-hover:text-amber-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
