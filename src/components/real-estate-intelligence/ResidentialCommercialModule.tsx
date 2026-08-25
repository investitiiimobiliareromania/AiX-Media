'use client';

import React from 'react';
import { Building } from 'lucide-react';
import { commercialMetrics, CommercialSegmentMetric } from '@/lib/real-estate-intelligence-service';

export function ResidentialCommercialModule() {
  return (
    <section id="residential-commercial" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Building className="w-4 h-4" />
          <span>Commercial &amp; Logistics Real Estate Intelligence</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Sectorul Comercial, Birouri, Logistică &amp; Terenuri
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-serif mt-1">
          Analiză instituțională privind stocul de birouri clasa A, rata de neocupare și randamentele comerciale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {commercialMetrics.map((m: CommercialSegmentMetric, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white">{m.segment}</h3>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
                Yield {m.primeYield}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400">Stoc Total</div>
                <div className="text-base font-bold text-white mt-0.5">{m.stock}</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400">Neocupare</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">{m.vacancyRate}</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400">Chirie Prime</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{m.primeRent}</div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Driveri de Piață:</div>
              <ul className="space-y-1 text-xs font-serif text-neutral-300">
                {m.keyDrivers.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
