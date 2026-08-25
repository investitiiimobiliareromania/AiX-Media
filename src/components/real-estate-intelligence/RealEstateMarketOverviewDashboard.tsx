'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
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
    </section>
  );
}
