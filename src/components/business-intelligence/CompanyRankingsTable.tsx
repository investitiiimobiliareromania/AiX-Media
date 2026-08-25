'use client';

import React, { useState } from 'react';
import { CompanyProfile } from '@/lib/business-intelligence-types';
import { SafeImage } from '@/components/common/SafeImage';
import { Trophy, ArrowUpDown, Filter } from 'lucide-react';

interface CompanyRankingsTableProps {
  companies: CompanyProfile[];
}

type SortField = 'revenueValue' | 'profitValue' | 'assetsValue' | 'employees';

export function CompanyRankingsTable({ companies }: CompanyRankingsTableProps) {
  const [sortField, setSortField] = useState<SortField>('revenueValue');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');

  const industries = Array.from(new Set(companies.map((c) => c.industry)));

  const filteredCompanies = companies.filter((c) => {
    if (selectedIndustry !== 'ALL' && c.industry !== selectedIndustry) {
      return false;
    }
    return true;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const valA = a[sortField] || 0;
    const valB = b[sortField] || 0;
    return valB - valA;
  });

  return (
    <section id="rankings" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            Romania&apos;s Business Rankings
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Topul Corporațiilor din România
          </h2>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-neutral-300">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Sector:</span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-neutral-900 text-white">Toate Sectoarele</option>
              {industries.map((ind) => (
                <option key={ind} value={ind} className="bg-neutral-900 text-white">
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-neutral-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span>Sortează:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer"
            >
              <option value="revenueValue" className="bg-neutral-900 text-white">Cifră Afaceri (Venituri)</option>
              <option value="profitValue" className="bg-neutral-900 text-white">Profit Net</option>
              <option value="assetsValue" className="bg-neutral-900 text-white">Active Totale</option>
              <option value="employees" className="bg-neutral-900 text-white">Număr Angajați</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rankings Data Table */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/80 font-mono text-[11px] uppercase text-neutral-400">
                <th className="py-4 px-4 text-center w-16">Rank</th>
                <th className="py-4 px-4">Companie</th>
                <th className="py-4 px-4">Sector / Industrie</th>
                <th className="py-4 px-4 text-right">Venituri (Cifră Afaceri)</th>
                <th className="py-4 px-4 text-right">Profit Net</th>
                <th className="py-4 px-4 text-right">Active Totale</th>
                <th className="py-4 px-4 text-right">Angajați</th>
                <th className="py-4 px-4 text-right">Creștere</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-serif text-sm">
              {sortedCompanies.map((c, index) => {
                const rank = index + 1;
                return (
                  <tr
                    key={c.id}
                    className="hover:bg-neutral-800/40 transition-colors group"
                  >
                    <td className="py-4 px-4 text-center font-mono font-bold text-neutral-400 group-hover:text-amber-400">
                      #{rank}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0">
                          <SafeImage
                            src={c.logo}
                            slug={c.slug}
                            alt={c.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                            <span>{c.name}</span>
                            {c.symbol && (
                              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 rounded">
                                {c.symbol}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-neutral-400 font-mono">CEO: {c.ceo}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-mono text-neutral-300">
                      {c.industry}
                    </td>

                    <td className="py-4 px-4 text-right font-mono font-bold text-white">
                      {c.revenue}
                    </td>

                    <td className="py-4 px-4 text-right font-mono font-bold text-emerald-400">
                      {c.profit}
                    </td>

                    <td className="py-4 px-4 text-right font-mono text-neutral-300">
                      {c.assets || 'N/A'}
                    </td>

                    <td className="py-4 px-4 text-right font-mono text-neutral-300">
                      {c.employees.toLocaleString()}
                    </td>

                    <td className="py-4 px-4 text-right font-mono font-bold text-amber-400">
                      {c.growth}
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
