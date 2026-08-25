'use client';

import React from 'react';
import { Article } from '@/lib/media/models/article';
import { EditorialGrid } from '@/components/media/EditorialGrid';
import { Newspaper } from 'lucide-react';

interface LatestBusinessNewsModuleProps {
  articles: Article[];
}

export function LatestBusinessNewsModule({ articles }: LatestBusinessNewsModuleProps) {
  return (
    <section id="latest-news" className="space-y-6 pt-6 border-t border-neutral-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest flex items-center gap-1.5">
            <Newspaper className="w-4 h-4 text-amber-400" />
            Latest Business News &amp; Ingestion
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Fluxul de Știri &amp; Rapoarte Corporative Reale ({articles.length})
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Alimentat automat din Ingestia Supabase DB
        </span>
      </div>

      <EditorialGrid articles={articles} columns={3} />
    </section>
  );
}
