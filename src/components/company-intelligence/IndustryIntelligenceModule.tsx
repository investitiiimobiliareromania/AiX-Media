'use client';

import React from 'react';
import { Layers, ChevronRight } from 'lucide-react';

export interface IndustryOverviewItem {
  id: string;
  name: string;
  marketSize: string;
  leaderCompanies: string[];
  growthYoY: string;
  keyDrivers: string[];
  risks: string[];
}

export const industryOverviews: IndustryOverviewItem[] = [
  {
    id: 'ind-energy',
    name: 'Energie & Utilități',
    marketSize: '~65 Miliarde RON',
    leaderCompanies: ['Hidroelectrica', 'OMV Petrom', 'Romgaz', 'Nuclearelectrica', 'Electrica'],
    growthYoY: '+4.8%',
    keyDrivers: ['Proiectul Neptun Deep', 'Centrala Nuclerară Cernavodă 3 & 4', 'Tranziția spre regenerabile (solare/eoliene)'],
    risks: ['Capacele de preț reglementate', 'Taxa pe supraprofit', 'Fluctuațiile hidrologice'],
  },
  {
    id: 'ind-banking',
    name: 'Bănci & Servicii Financiare',
    marketSize: '~950 Miliarde RON Active',
    leaderCompanies: ['Banca Transilvania', 'BCR', 'BRD', 'UniCredit Bank', 'ING Bank'],
    growthYoY: '+11.2%',
    keyDrivers: ['Marginile de dobândă (NIM) ridicate', 'Digitalizarea creditării ipotecare & de consum', 'Consolidarea M&A'],
    risks: ['Taxa pe cifra de afaceri bancară (2%)', 'Creșterea ratei NPL'],
  },
  {
    id: 'ind-automotive',
    name: 'Automotive & Componente',
    marketSize: '~38 Miliarde EUR',
    leaderCompanies: ['Automobile Dacia', 'Continental Romania', 'Ford Otosan', 'Autoliv', 'Bosch'],
    growthYoY: '+3.5%',
    keyDrivers: ['Producția modelelor hibride Duster & Bigster', 'Electrificarea componentelor la Continental'],
    risks: ['Costul energiei industriale', 'Tranziția europeană spre EV'],
  },
  {
    id: 'ind-retail',
    name: 'Retail FMCG & Bricolaj',
    marketSize: '~120 Miliarde RON',
    leaderCompanies: ['Kaufland', 'Lidl', 'Dedeman', 'Carrefour', 'Profim'],
    growthYoY: '+6.2%',
    keyDrivers: ['Expansiunea rețelelor de hipermarketuri & parcuri de retail', 'Consumul casnic rezilient'],
    risks: ['Inflația alimentară', 'Creșterea salariului minim'],
  },
  {
    id: 'ind-realestate',
    name: 'Dezvoltare Imobiliară & Construcții',
    marketSize: '~45 Miliarde RON',
    leaderCompanies: ['One United Properties', 'Skanska', 'Vastint', 'Dedeman Real Estate', 'Speedwell'],
    growthYoY: '+7.4%',
    keyDrivers: ['Cererea pentru clădiri verzi LEED Platinum', 'Prețurile pe mp rezidențiale crescute'],
    risks: ['TVA 19% la achiziții peste 600,000 RON', 'Blocajele de autorizare urbanistică (PUG/PUZ)'],
  },
  {
    id: 'ind-tech',
    name: 'Tehnologie, Software & AI',
    marketSize: '~9 Miliarde EUR',
    leaderCompanies: ['UiPath', 'Bitdefender', 'Endava', 'Cognizant Softvision', 'Luxoft'],
    growthYoY: '+12.5%',
    keyDrivers: ['Adopția Enterprise AI & Automatizare', 'Huburile R&D din București, Cluj, Iași'],
    risks: ['Eliminarea facilităților fiscale IT în România'],
  },
];

export function IndustryIntelligenceModule() {
  return (
    <section id="industries" className="space-y-6">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Layers className="w-4 h-4" />
          <span>Industry Intelligence &amp; Sector Research</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Sectoarele Cheie ale Economiei Românești
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-serif mt-1">
          Analiza dimensiunii pieței, liderilor corporativi și tendințelor strategice din principalele industrii.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryOverviews.map((ind: IndustryOverviewItem) => (
          <div
            key={ind.id}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-white">{ind.name}</h3>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  {ind.growthYoY} YoY
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs">
                <div className="text-[10px] text-neutral-400">Dimensiune Piață Estimată</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">{ind.marketSize}</div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Companii Lider:</div>
                <div className="flex flex-wrap gap-1.5">
                  {ind.leaderCompanies.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Driveri de Piață:</div>
                <ul className="space-y-1 text-xs font-serif text-neutral-300">
                  {ind.keyDrivers.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Sector Research</span>
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                Detalii Industrie <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
