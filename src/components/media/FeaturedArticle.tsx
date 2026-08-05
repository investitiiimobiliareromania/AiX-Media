import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/media/models/article";
import { ArrowUpRight, Clock, Flame, TrendingUp } from "lucide-react";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group relative block w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 shadow-2xl"
    >
      <div className="relative min-h-[440px] md:min-h-[500px] w-full flex flex-col justify-end p-6 md:p-10">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-amber-500 text-black text-xs font-mono font-bold uppercase tracking-wider">
              Featured Investigation
            </span>
            <span className="px-2.5 py-1 rounded bg-black/60 border border-neutral-700 text-amber-300 text-xs font-mono">
              {article.categoryLabel}
            </span>
            {article.breaking && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                Breaking Intelligence
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-amber-400 transition-colors leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          <p className="text-sm md:text-base text-neutral-300 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                {article.authorName[0]}
              </div>
              <span className="text-white font-medium">{article.authorName}</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {article.readTime}
            </span>
            <span className="ml-auto hidden sm:flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Read Deep Dive</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
