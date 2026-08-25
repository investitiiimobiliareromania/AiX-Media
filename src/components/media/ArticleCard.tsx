import React from "react";
import Link from "next/link";
import { Article } from "@/lib/media/models/article";
import { Clock } from "lucide-react";
import { SafeImage } from "@/components/common/SafeImage";

interface ArticleCardProps {
  article: Article;
  variant?: "standard" | "compact" | "horizontal";
}

export function ArticleCard({ article, variant = "standard" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/${article.category}/${article.slug}`}
        className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 transition-all hover:bg-[var(--surface-elevated)] shadow-sm"
      >
        <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-[var(--surface-elevated)]">
          <SafeImage
            src={article.coverImage}
            slug={article.slug}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[var(--surface-elevated)]/90 text-amber-400 border border-[var(--border)] shadow-xs">
            {article.categoryLabel}
          </span>
        </div>
        <div className="flex flex-col justify-between flex-1 space-y-2">
          <div>
            <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-xs text-neutral-400 font-serif line-clamp-2 mt-1.5 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono">
            <span>{article.authorName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" />
              {article.readTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/${article.category}/${article.slug}`}
        className="group block p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 transition-all hover:bg-[var(--surface-elevated)] shadow-xs"
      >
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
          <span className="text-amber-500 uppercase font-bold">{article.categoryLabel}</span>
          <span>{article.readTime}</span>
        </div>
        <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
      </Link>
    );
  }

  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="group flex flex-col min-w-0 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-amber-500/50 transition-all overflow-hidden shadow-lg hover:shadow-2xl"
    >
      <div className="relative w-full h-48 bg-[var(--surface-elevated)] overflow-hidden">
        <SafeImage
          src={article.coverImage}
          slug={article.slug}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-[var(--surface-elevated)]/90 text-amber-400 border border-[var(--border)] shadow-xs">
          {article.categoryLabel}
        </span>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 space-y-4 bg-[var(--surface-elevated)]">
        <div>
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs text-neutral-400 font-serif line-clamp-3 mt-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-neutral-300 font-semibold">{article.authorName}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-neutral-500" />
            {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

