'use client';

import React from 'react';
import { BusinessMetricItem } from '@/lib/business-intelligence-types';
import { Binary, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface TheNumbersModuleProps {
  metrics: BusinessMetricItem[];
}

export function TheNumbersModule({ metrics }: TheNumbersModuleProps) {
  return (
    <section id="the-numbers" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Binary className="w-4 h-4 text-amber-400" />
            THE NUMBERS
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Snapshot Macroeconomic &amp; Indicatori Corporativi ai României
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Date Agregate din Surse Oficiale (BNR, ANCPI, BVB, ONRC)
        </span>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const isUp = m.trend === 'up';
          const isDown = m.trend === 'down';
          return (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 shadow-lg hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="uppercase font-bold text-amber-400">{m.category}</span>
                <span>Sursă: {m.source}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-neutral-300 font-serif">{m.label}</div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-mono font-bold text-white">
                    {m.current}{' '}
                    <span className="text-xs font-normal text-neutral-400">{m.unit}</span>
                  </div>
                  <div
                    className={`flex items-center font-mono font-bold text-sm ${
                      isUp ? 'text-emerald-400' : isDown ? 'text-emerald-400' : 'text-neutral-400'
                    }`}
                  >
                    {isUp && <ArrowUpRight className="w-4 h-4 mr-0.5" />}
                    {isDown && <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                    {m.trend === 'neutral' && <Minus className="w-4 h-4 mr-0.5" />}
                    <span>{m.yoy} YoY</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>Anterior: <strong className="text-neutral-200">{m.previous}</strong></span>
                <span>Actualizat: {m.updatedAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
