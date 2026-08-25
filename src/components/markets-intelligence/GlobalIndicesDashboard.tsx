'use client';

import React, { useState } from 'react';
import { Activity, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { globalIndices, MarketIndexItem } from '@/lib/markets-intelligence-service';

export function GlobalIndicesDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', 'Romania', 'USA', 'Europe', 'Asia', 'Global'];

  const filtered = selectedRegion === 'all'
    ? globalIndices
    : globalIndices.filter((i) => i.region === selectedRegion);

  return (
    <section id="global-indices" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Activity className="w-4 h-4" />
            <span>Global &amp; BVB Market Indices</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Tablou Indici Bursieri Naționali &amp; Internaționali
          </h2>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          <Globe className="w-4 h-4 text-neutral-500 shrink-0" />
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedRegion === region
                  ? 'bg-amber-500 text-neutral-950 shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {region === 'all' ? 'Toate Piețele' : region}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item: MarketIndexItem) => (
          <div
            key={item.symbol}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold uppercase">
                  {item.region}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">{item.timestamp}</span>
              </div>

              <div className="font-serif font-bold text-xl text-white">{item.name}</div>
              <div className="text-2xl font-extrabold text-white font-mono">{item.price.toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800 font-mono text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400">Variație 1D</div>
                <div
                  className={`text-sm font-bold flex items-center gap-0.5 mt-0.5 ${
                    item.change1D >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.change1D >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{item.change1D >= 0 ? `+${item.change1D}%` : `${item.change1D}%`}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400">Variație YTD</div>
                <div
                  className={`text-sm font-bold flex items-center gap-0.5 mt-0.5 ${
                    item.changeYTD >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  <span>{item.changeYTD >= 0 ? `+${item.changeYTD}%` : `${item.changeYTD}%`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
