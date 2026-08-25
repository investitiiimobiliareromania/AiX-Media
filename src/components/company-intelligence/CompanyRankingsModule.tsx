'use client';

import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { BvbCompanyProfile } from '@/lib/bvb-data';

interface CompanyRankingsModuleProps {
  companies: BvbCompanyProfile[];
}

export function CompanyRankingsModule({ companies }: CompanyRankingsModuleProps) {
  const [activeTab, setActiveTab] = useState<'revenue' | 'profit' | 'margin'>('revenue');

  const sortedByRevenue = [...companies].sort(
    (a, b) => (b.revenueValue || 0) - (a.revenueValue || 0)
  );

  const sortedByProfit = [...companies].sort(
    (a, b) => (b.netProfit || 0) - (a.netProfit || 0)
  );

  const sortedByMargin = [...companies].sort((a, b) => {
    const marginA = a.revenueValue && a.netProfit ? (a.netProfit / a.revenueValue) * 100 : 0;
    const marginB = b.revenueValue && b.netProfit ? (b.netProfit / b.revenueValue) * 100 : 0;
    return marginB - marginA;
  });

  const getActiveList = () => {
    if (activeTab === 'revenue') return sortedByRevenue;
    if (activeTab === 'profit') return sortedByProfit;
    return sortedByMargin;
  };

  return (
    <section id="rankings" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>Corporate Leaderboards &amp; Rankings</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Topul Marilor Companii din România
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'revenue'
                ? 'bg-amber-500 text-neutral-950 shadow-lg'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            După Venituri
          </button>
          <button
            onClick={() => setActiveTab('profit')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'profit'
                ? 'bg-amber-500 text-neutral-950 shadow-lg'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            După Profit Net
          </button>
          <button
            onClick={() => setActiveTab('margin')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'margin'
                ? 'bg-amber-500 text-neutral-950 shadow-lg'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            După Marjă Profit (%)
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4"># Rang</th>
                <th className="py-3 px-4">Companie</th>
                <th className="py-3 px-4">Sector / Industrie</th>
                <th className="py-3 px-4 text-right">Cifră Afaceri (FY25)</th>
                <th className="py-3 px-4 text-right">Profit Net (FY25)</th>
                <th className="py-3 px-4 text-right">Marjă Profit Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-200">
              {getActiveList().slice(0, 8).map((comp, idx) => {
                const margin = comp.revenueValue && comp.netProfit
                  ? ((comp.netProfit / comp.revenueValue) * 100).toFixed(1)
                  : 'N/A';

                return (
                  <tr key={comp.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-amber-400">#{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-white text-sm">{comp.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{comp.symbol} • {comp.market}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300">{comp.sector}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-white">
                      {comp.revenueValue ? `${(comp.revenueValue / 1000000000).toFixed(2)} Mld RON` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                      {comp.netProfit ? `${(comp.netProfit / 1000000000).toFixed(2)} Mld RON` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-amber-400">
                      {margin !== 'N/A' ? `${margin}%` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
