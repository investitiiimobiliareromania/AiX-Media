'use client';

import React from 'react';
import { Landmark, Percent } from 'lucide-react';
import { centralBankRates, romaniaBondYields, CentralBankRateItem, BondYieldItem } from '@/lib/markets-intelligence-service';

export function CentralBanksBondYieldsModule() {
  return (
    <section id="central-banks" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Landmark className="w-4 h-4" />
          <span>Central Banks &amp; Romanian Bond Yields</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Bănci Centrale, Dobânzi de Referință &amp; Titluri de Stat
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Central Banks Cards */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Percent className="w-5 h-5 text-amber-400" />
            <span>Rate de Dobândă Bănci Centrale</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {centralBankRates.map((cb: CentralBankRateItem) => (
              <div
                key={cb.bank}
                className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 hover:border-amber-500/40 transition-all font-mono text-xs"
              >
                <div className="flex items-center justify-between text-neutral-400 uppercase text-[10px]">
                  <span className="font-bold text-white text-sm">{cb.bank}</span>
                  <span>Prev: {cb.previousRate}</span>
                </div>

                <div className="text-3xl font-extrabold text-amber-400">{cb.currentRate}</div>
                <div className="text-[11px] text-neutral-300 font-serif leading-tight">{cb.outlook}</div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Ședință: {cb.latestDecisionDate}</span>
                  <span>Următoarea: {cb.nextMeetingDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bond Yields Table */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-400" />
            <span>Curba de Randament Titluri de Stat România</span>
          </h3>

          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 font-mono text-xs shadow-xl">
            <div className="text-xs text-neutral-400 font-serif">
              Randamentele titlurilor de stat emise de Ministerul Finanțelor pe piața secundară (RON).
            </div>

            <div className="space-y-3">
              {romaniaBondYields.map((bond: BondYieldItem) => (
                <div
                  key={bond.tenor}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-bold text-sm">Titlu Stat {bond.tenor}</div>
                    <div className="text-[10px] text-neutral-400">Piața Secundară BNR / MinFin</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-400">{bond.yieldPct}%</div>
                    <div className="text-[10px] text-neutral-400">1D: {bond.change1D}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
