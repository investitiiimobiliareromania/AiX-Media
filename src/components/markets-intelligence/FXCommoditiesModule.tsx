'use client';

import React from 'react';
import { DollarSign, Flame } from 'lucide-react';
import { fxQuotes, commoditiesQuotes, FXQuoteItem, CommodityItem } from '@/lib/markets-intelligence-service';

export function FXCommoditiesModule() {
  return (
    <section id="fx-commodities" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <DollarSign className="w-4 h-4" />
          <span>FX &amp; Commodities Intelligence</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Piețe Valutare (FX) &amp; Mărfuri Strategice (Commodities)
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FX Quotes Section */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <span>Cotații Valutare FX</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {fxQuotes.map((fx: FXQuoteItem) => (
              <div
                key={fx.pair}
                className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 hover:border-amber-500/40 transition-all"
              >
                <div className="text-neutral-400 font-bold uppercase">{fx.pair}</div>
                <div className="text-2xl font-bold text-white">{fx.rate.toFixed(4)}</div>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800 pt-2">
                  <span>1D: {fx.change1D >= 0 ? `+${fx.change1D}%` : `${fx.change1D}%`}</span>
                  <span>Range: {fx.low52W} - {fx.high52W}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commodities Quotes Section */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Mărfuri Strategice &amp; Energie</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {commoditiesQuotes.map((com: CommodityItem) => (
              <div
                key={com.symbol}
                className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-400 font-bold uppercase">{com.name}</span>
                  <span className="text-neutral-500">{com.unit}</span>
                </div>

                <div className="text-2xl font-bold text-white">${com.price.toLocaleString()}</div>
                <div className="flex items-center justify-between text-[11px] border-t border-neutral-800 pt-2">
                  <span className={com.change1D >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    1D: {com.change1D >= 0 ? `+${com.change1D}%` : `${com.change1D}%`}
                  </span>
                  <span className="text-neutral-400">YTD: {com.changeYTD >= 0 ? `+${com.changeYTD}%` : `${com.changeYTD}%`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
