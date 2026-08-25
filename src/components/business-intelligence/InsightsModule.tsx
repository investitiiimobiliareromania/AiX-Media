'use client';

import React from 'react';
import { BusinessInsightItem } from '@/lib/business-intelligence-types';
import { SafeImage } from '@/components/common/SafeImage';
import { BookOpen, Clock, User } from 'lucide-react';

interface InsightsModuleProps {
  insights: BusinessInsightItem[];
}

export function InsightsModule({ insights }: InsightsModuleProps) {
  return (
    <section id="insights" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Business Insights
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Analize Aprofundate &amp; Strategie Corporativă
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Analiză Instituțională &amp; Cercetare de Piață
        </span>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((ins) => (
          <div
            key={ins.id}
            className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl flex flex-col group hover:border-amber-500/50 transition-all"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <SafeImage
                src={ins.coverImage}
                slug={ins.slug}
                alt={ins.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-amber-500 text-neutral-950">
                {ins.category}
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between -mt-10 relative z-10 bg-gradient-to-t from-neutral-900 via-neutral-900 to-transparent pt-10">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {ins.title}
                </h3>
                <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                  {ins.excerpt}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Why it matters</div>
                  <ul className="text-xs font-serif text-neutral-300 list-disc list-inside space-y-1">
                    {ins.whyItMatters.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ins.authorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{ins.publishedAt}</span>
                    <span>•</span>
                    <span>{ins.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
