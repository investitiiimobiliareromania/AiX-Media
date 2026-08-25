'use client';

import React from 'react';
import { Newspaper } from 'lucide-react';
import { Article } from '@/lib/media/models/article';
import { ArticleCard } from '@/components/media/ArticleCard';

interface MarketsNewsModuleProps {
  newsArticles: Article[];
}

export function MarketsNewsModule({ newsArticles }: MarketsNewsModuleProps) {
  return (
    <section id="news" className="space-y-6 pt-6 border-t border-neutral-800">
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          <Newspaper className="w-4 h-4" />
          <span>Markets &amp; Financial News Connection</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Știri &amp; Analize de Piață
        </h2>
      </div>

      {newsArticles && newsArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center font-serif text-neutral-400 text-sm">
          Nicio știre de piață recentă.
        </div>
      )}
    </section>
  );
}
