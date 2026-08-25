import Link from "next/link";
import { Clock, User } from "lucide-react";
import { SafeImage } from "@/components/common/SafeImage";

import { Overline } from "@/components/common/typography";
import { cn } from "@/lib/utils";

export interface ArticleCardData {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  author?: string;
  readTime?: string;
  imageUrl?: string;
}

interface ArticleCardProps extends ArticleCardData {
  categorySlug?: string;
  variant?: "default" | "compact" | "featured";
  className?: string;
  /** @deprecated Use `variant` instead */
  isLarge?: boolean;
}

// Premium gradient definitions per category
const categoryGradients: Record<string, string> = {
  "real-estate": "from-[#0c1018] via-[#111825] to-[#0a0d14]",
  "insurance": "from-[#0a0a18] via-[#0d0d1e] to-[#0a0a14]",
  "investments": "from-[#060f09] via-[#0a1510] to-[#070d09]",
};

const fallbackGradient = categoryGradients["real-estate"];

const placeholderPatterns: Record<string, string> = {
  "real-estate": "repeating-linear-gradient(55deg,oklch(1 0 0/3%) 0,oklch(1 0 0/3%) 1px,transparent 0,transparent 40px),repeating-linear-gradient(125deg,oklch(1 0 0/2%) 0,oklch(1 0 0/2%) 1px,transparent 0,transparent 40px)",
  "insurance": "radial-gradient(circle at 35% 55%,oklch(0.78 0.11 85/8%) 0%,transparent 55%),repeating-linear-gradient(45deg,oklch(1 0 0/2%) 0,oklch(1 0 0/2%) 1px,transparent 0,transparent 36px)",
  "investments": "repeating-linear-gradient(90deg,oklch(0.78 0.11 85/4%) 0,oklch(0.78 0.11 85/4%) 1px,transparent 0,transparent 56px),repeating-linear-gradient(0deg,oklch(1 0 0/2%) 0,oklch(1 0 0/2%) 1px,transparent 0,transparent 40px)"
};
const fallbackPattern = placeholderPatterns["real-estate"];

export function ArticleCard({
  category,
  title,
  excerpt,
  date,
  href,
  author,
  readTime,
  imageUrl,
  categorySlug,
  variant = "default",
  isLarge,
  className,
}: ArticleCardProps) {
  const resolvedVariant = isLarge ? "featured" : variant;
  const gradient = (categorySlug && categoryGradients[categorySlug]) ?? fallbackGradient;

  const titleId = `article-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-border bg-surface/20 transition-colors hover:bg-surface/50",
        className
      )}
    >
      {/* Cover image / placeholder */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br",
          gradient,
          resolvedVariant === "featured" ? "aspect-[16/9]" : "aspect-[4/3]",
          resolvedVariant === "compact" ? "aspect-[16/10]" : ""
        )}
      >
        <SafeImage
          src={imageUrl}
          slug={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          alt={title}
          fill
          priority={resolvedVariant === "featured"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={resolvedVariant === "featured" ? "eager" : "lazy"}
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface/80 to-transparent" />
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-1 flex-col",
        resolvedVariant === "compact" ? "p-4" : "p-5 md:p-6"
      )}>
        <div className="mb-4 h-px w-7 bg-gold" aria-hidden="true" />
        <Overline className="mb-3 text-gold" aria-label={`Article category: ${category}`}>
          {category}
        </Overline>
        <Link href={href} className="focus-visible:outline-none" aria-describedby={titleId}>
          <h3
            id={titleId}
            className={cn(
              "font-display font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-gold",
              resolvedVariant === "featured" ? "text-2xl md:text-3xl" : resolvedVariant === "compact" ? "text-base" : "text-lg md:text-xl"
            )}
          >
            {title}
          </h3>
        </Link>
        {excerpt && resolvedVariant !== "compact" && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground/70" aria-label="Article metadata">
          {date && <time dateTime={date}>{date}</time>}
          {author && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" aria-hidden="true" />
              {author}
            </span>
          )}
          {readTime && (
            <span className="ml-auto flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {readTime}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
