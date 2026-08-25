'use client';

import React from 'react';
import { BarChart3, Calculator, TrendingUp } from 'lucide-react';
import { SourceBadge } from '@/components/common/SourceBadge';

export function RealEstateMarketOverviewDashboard() {
  const kpis = [
    {
      label: 'Preț Mediu București',
      value: '1,780 €/mp',
      subtext: '+8.4% YoY comparativ cu 2025. Segmentul rezidențial vechi vs nou.',
      source: 'Imobiliare.ro Index & Cadastru',
      period: 'Iulie 2026',
    },
    {
      label: 'Tranzacții Naționale ANCPI',
      value: '51,808 imobile',
      subtext: 'Total vânzări înregistrate oficial la nivel național în cartea funciară.',
      source: 'ANCPI',
      period: 'Iunie 2026',
    },
    {
      label: 'Tranzacții București ANCPI',
      value: '10,420 imobile',
      subtext: 'Volumul lunar de unități individuale și terenuri înregistrate în Capitală.',
      source: 'ANCPI',
      period: 'Iunie 2026',
    },
    {
      label: 'Autorizații Construire INS',
      value: '3,124 clădiri',
      subtext: 'Autorizații eliberate pentru clădiri rezidențiale la nivel național.',
      source: 'INS',
      period: 'Mai 2026',
    },
    {
      label: 'Sold Credite Ipotecare BNR',
      value: '108.4 Mld RON',
      subtext: 'Soldul agregat al creditelor pentru locuințe acordate populației.',
      source: 'BNR',
      period: 'Mai 2026',
    },
    {
      label: 'Indicele IRCC Trimestrial',
      value: '5.86%',
      subtext: 'Indicele de referință reglementat de BNR pentru creditele acordate populației.',
      source: 'BNR',
      period: 'T3 2026',
    },
  ];

  return (
    <section id="overview" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            <span>Real Estate Market Overview</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Macro Tabloul Imobiliar Național &amp; București
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Surse Oficiale: ANCPI • INS • BNR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-xs text-neutral-400 font-mono font-semibold uppercase">{kpi.label}</div>
              <div className="text-3xl font-extrabold text-white font-mono">{kpi.value}</div>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">{kpi.subtext}</p>
            </div>

            <div className="pt-3 border-t border-neutral-800">
              <SourceBadge source={kpi.source} referencePeriod={kpi.period} />
            </div>
          </div>
        ))}
      </div>

      {/* Yield Methodology & Affordability Framework Box */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-white">
            Metodologie de Calcul: Randament Investițional (Gross Rental Yield) &amp; Accesibilitate
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-amber-400 font-bold uppercase flex items-center gap-1.5 text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Formula Gross Rental Yield</span>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs">
              Randament Brut (%) = (Chirie Lunară × 12 / Valoare Achiziție Imobil) × 100
            </div>
            <p className="text-neutral-300 font-serif text-[11px] leading-relaxed">
              În București, randamentul brut mediu variază între 6.2% și 7.4% în funcție de cartier, proximitatea de metrou și anul finalizării construcției.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="text-emerald-400 font-bold uppercase flex items-center gap-1.5 text-[11px]">
              <Calculator className="w-3.5 h-3.5" />
              <span>Indicele de Accesibilitate (Price-to-Income)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs">
              Accesibilitate = Preț Apartament 2 Camere (55 mp) / Salariu Net Mediu Anual
            </div>
            <p className="text-neutral-300 font-serif text-[11px] leading-relaxed">
              Raportul mediu în București este de ~6.5 ani de salarii medii nete (INS), plasând Capitala printre cele mai accesibile piețe rezidențiale din Uniunea Europeană comparativ cu Praga sau Varșovia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
