import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  title?: string;
  articles: Array<{
    category: string;
    title: string;
    excerpt: string;
    date: string;
    href: string;
    author?: string;
    readTime?: string;
  }>;
}

export function ArticleGrid({ title, articles }: ArticleGridProps) {
  return (
    <section className="py-16 md:py-24 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-12 border-b-2 border-foreground pb-4 inline-block pr-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {articles.map((article, i) => (
            <ArticleCard key={i} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
