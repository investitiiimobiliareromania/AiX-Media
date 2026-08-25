'use client';

import React from 'react';
import { ExecutiveProfile } from '@/lib/business-intelligence-types';
import { SafeImage } from '@/components/common/SafeImage';
import { UserCheck, Quote } from 'lucide-react';

interface ExecutiveIntelligenceGridProps {
  executives: ExecutiveProfile[];
}

export function ExecutiveIntelligenceGrid({ executives }: ExecutiveIntelligenceGridProps) {
  return (
    <section id="executives" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-amber-400" />
            Executive Intelligence
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Lideri de Business, CEOs &amp; Fondatori
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {executives.length} Profiluri Verificate de Executivi
        </span>
      </div>

      {/* Executives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executives.map((exec) => (
          <div
            key={exec.id}
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0 shadow-md">
                  <SafeImage
                    src={exec.avatar}
                    slug={exec.slug}
                    alt={exec.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">{exec.name}</h3>
                  <div className="text-xs font-mono text-amber-400 font-semibold">{exec.currentRole}</div>
                  <div className="text-xs font-serif text-neutral-400">{exec.company}</div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-3">
                {exec.background}
              </p>

              {exec.quote && (
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1 relative">
                  <Quote className="w-4 h-4 text-amber-500/40 absolute top-2 right-2" />
                  <p className="text-xs text-neutral-200 font-serif italic pr-4">
                    &ldquo;{exec.quote}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400 space-y-1">
              <div>
                Rolu Precedente: <span className="text-neutral-200">{exec.previousRoles.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
