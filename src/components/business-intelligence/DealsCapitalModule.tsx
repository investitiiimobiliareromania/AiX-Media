'use client';

import React from 'react';
import { DealItem } from '@/lib/business-intelligence-types';
import { Briefcase, CheckCircle2 } from 'lucide-react';

interface DealsCapitalModuleProps {
  deals: DealItem[];
}

export function DealsCapitalModule({ deals }: DealsCapitalModuleProps) {
  return (
    <section id="deals" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-amber-400" />
            Deals &amp; Capital M&amp;A
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Monitorul Tranzacțiilor Corporative &amp; Achizițiilor
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {deals.length} Tranzacții Majore Înregistrate
        </span>
      </div>

      {/* Deals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  {deal.dealType}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{deal.status}</span>
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-white leading-snug">
                  {deal.company} <span className="text-neutral-500 font-normal">↔</span> {deal.counterparty}
                </h3>
                <div className="text-xs font-mono text-neutral-400">Sector: {deal.sector}</div>
              </div>

              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                {deal.description}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
              <div>
                <div className="text-[10px] uppercase text-neutral-400">Valoare Tranzacție</div>
                <div className="text-lg font-bold text-amber-300">{deal.value}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-neutral-400">Dată Înregistrare</div>
                <div className="text-neutral-300">{deal.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
