'use client';

import React from 'react';
import { RadarItem, RadarTag } from '@/lib/business-intelligence-types';
import { Radio } from 'lucide-react';

interface BusinessRadarModuleProps {
  radarItems: RadarItem[];
}

export function BusinessRadarModule({ radarItems }: BusinessRadarModuleProps) {
  const getTagColor = (tag: RadarTag) => {
    switch (tag) {
      case 'WATCH':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'GROWING':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'EXPANDING':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'ACQUIRING':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'INVESTING':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'DISTRESSED':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'EMERGING':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <section id="radar" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            BUSINESS RADAR
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Monitorul Mișcărilor Strategice de Piață
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Clasificarea Alertelor &amp; Evenimentelor Corporative
        </span>
      </div>

      {/* Radar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {radarItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${getTagColor(item.tag)}`}>
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">{item.date}</span>
              </div>

              <h3 className="font-serif text-base font-bold text-white leading-snug">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-neutral-400">
                Entitate: <strong className="text-neutral-200">{item.entity}</strong>
              </div>

              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-amber-300">
              Impact: {item.impact}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
