'use client';

import React from 'react';
import { Flag, TrendingUp, TrendingDown, Info, Building2 } from 'lucide-react';
import { romaniaMacroIndicators, MacroIndicatorItem } from '@/lib/markets-intelligence-service';
import { SourceBadge } from '@/components/common/SourceBadge';

export function RomaniaMacroDashboard() {
  return (
    <section id="romania-macro" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Flag className="w-4 h-4" />
          <span>Romania Macroeconomic Intelligence</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Tabloul Macroeconomic al României
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-serif mt-1">
          Date verificate emise de Institutul Național de Statistică (INS), BNR și Ministerul Finanțelor, cu analize de impact pentru economie și piețe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {romaniaMacroIndicators.map((macro: MacroIndicatorItem) => (
          <div
            key={macro.id}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 uppercase">
                <span className="font-bold text-amber-400">{macro.label}</span>
                <span className="text-neutral-500">{macro.period}</span>
              </div>

              <div className="text-3xl font-extrabold text-white font-mono">{macro.currentValue}</div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-neutral-400">Anterior: {macro.previousValue}</span>
                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    macro.trend === 'down' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {macro.trend === 'down' ? (
                    <TrendingDown className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5" />
                  )}
                  <span>{macro.change}</span>
                </span>
              </div>

              {/* Economic & Market Impact Context */}
              <div className="space-y-2 pt-2 border-t border-neutral-800/80 font-serif text-xs">
                <div className="space-y-1 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <div className="font-mono text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>Ce înseamnă pentru economie</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-[11px]">
                    {macro.economyMeaning}
                  </p>
                </div>

                <div className="space-y-1 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <div className="font-mono text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>Impact companii &amp; investiții</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-[11px]">
                    {macro.impactSummary}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800">
              <SourceBadge source={macro.source} referencePeriod={macro.lastUpdated} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
