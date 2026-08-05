import React from "react";
import { Article } from "@/lib/media/models/article";
import { ArticleCard } from "./ArticleCard";

interface EditorialGridProps {
  articles: Article[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
}

export function EditorialGrid({
  articles,
  title = "Latest Intelligence Reports",
  description = "In-depth investigative reports, market analysis, and macroeconomic teardowns.",
  columns = 3,
}: EditorialGridProps) {
  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="my-10 space-y-6">
      {(title || description) && (
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h2>
          {description && <p className="text-xs text-neutral-400 mt-1">{description}</p>}
        </div>
      )}

      <div className={`grid gap-6 ${gridClass}`}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
