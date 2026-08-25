'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Article } from '@/lib/media/models/article';
import { SafeImage } from '@/components/common/SafeImage';

interface NewsTerminalFeaturedHeroProps {
  featuredArticle: Article;
  spotlightArticles: Article[];
}

export function NewsTerminalFeaturedHero({
  featuredArticle,
  spotlightArticles,
}: NewsTerminalFeaturedHeroProps) {
  if (!featuredArticle) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h2 className="font-serif text-2xl font-bold text-white tracking-tight">Top Editorial Stories</h2>
        <span className="text-xs font-mono text-neutral-400">Publicat Live</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Large Hero Story */}
        <div className="lg:col-span-8 space-y-4">
          <Link
            href={`/news/${featuredArticle.slug}`}
            className="group block space-y-4 rounded-3xl bg-neutral-900 border border-neutral-800 p-6 hover:border-amber-500/50 transition-all shadow-xl"
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <SafeImage
                src={featuredArticle.coverImage}
                slug={featuredArticle.slug}
                alt={featuredArticle.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-neutral-950/90 text-amber-400 border border-neutral-800 text-xs font-mono font-bold uppercase">
                  {featuredArticle.categoryLabel}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-tight">
                {featuredArticle.title}
              </h3>
              <p className="text-neutral-300 font-serif text-sm sm:text-base leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{featuredArticle.authorName}</span>
                  <span>•</span>
                  <span>{featuredArticle.publishedAt}</span>
                </div>
                <span className="text-amber-400 flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                  Citește Articolul Complet <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Spotlight Stories Column */}
        <div className="lg:col-span-4 space-y-6">
          {spotlightArticles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group block p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-3 shadow-md"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <SafeImage
                  src={article.coverImage}
                  slug={article.slug}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  {article.categoryLabel}
                </span>
                <h4 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <div className="text-[10px] font-mono text-neutral-500 flex items-center gap-2 pt-1">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
