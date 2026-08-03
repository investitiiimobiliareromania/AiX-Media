import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User } from "lucide-react";

import { Overline } from "@/components/common/typography";
import { cn } from "@/lib/utils";

export interface FeaturedStoryArticle {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  author?: string;
  readTime?: string;
  imageUrl?: string;
}

type Placeholder = { bg: string; pattern: string };

const categoryPlaceholders: { [key: string]: Placeholder } = {
  "real-estate": {
    bg: "from-[#0c1018] via-[#111825] to-[#0a0d14]",
    pattern: "repeating-linear-gradient(60deg, oklch(1 0 0 / 3%) 0, oklch(1 0 0 / 3%) 1px, transparent 0, transparent 50%), repeating-linear-gradient(120deg, oklch(1 0 0 / 2%) 0, oklch(1 0 0 / 2%) 1px, transparent 0, transparent 50%)",
  },
  "insurance": {
    bg: "from-[#0a0a18] via-[#0e0e22] to-[#0a0a14]",
    pattern: "radial-gradient(circle at 30% 50%, oklch(0.78 0.11 85 / 8%) 0%, transparent 60%), repeating-linear-gradient(45deg, oklch(1 0 0 / 2%) 0, oklch(1 0 0 / 2%) 1px, transparent 0, transparent 40px)",
  },
  "investments": {
    bg: "from-[#060e0a] via-[#091510] to-[#080d09]",
    pattern: "repeating-linear-gradient(90deg, oklch(0.78 0.11 85 / 4%) 0, oklch(0.78 0.11 85 / 4%) 1px, transparent 0, transparent 60px), repeating-linear-gradient(0deg, oklch(1 0 0 / 2%) 0, oklch(1 0 0 / 2%) 1px, transparent 0, transparent 40px)",
  },
};

const fallbackPlaceholder: Placeholder = {
  bg: "from-[#0c1018] via-[#111825] to-[#0a0d14]",
  pattern: "repeating-linear-gradient(60deg, oklch(1 0 0 / 3%) 0, oklch(1 0 0 / 3%) 1px, transparent 0, transparent 50%)",
};

function getPlaceholder(slug?: string): Placeholder {
  if (slug !== undefined && slug in categoryPlaceholders) {
    return categoryPlaceholders[slug] as Placeholder;
  }
  return fallbackPlaceholder;
}

interface FeaturedStoryProps {
  article: FeaturedStoryArticle;
  variant?: "primary" | "secondary";
  categorySlug?: string;
  className?: string;
}

export function FeaturedStory({
  article,
  variant = "primary",
  categorySlug,
  className,
}: FeaturedStoryProps) {
const resolvedSlug = categorySlug ?? "real-estate";
  const placeholder = getPlaceholder(resolvedSlug);

  if (variant === "primary") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden border border-border bg-surface/30 transition-colors hover:border-border/60",
          className,
        )}
      >
        {/* Cover image / editorial placeholder */}
        <div
          className={cn(
            "relative aspect-[16/8] overflow-hidden bg-gradient-to-br lg:aspect-[16/6]",
            placeholder.bg,
          )}
        >
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundImage: placeholder.pattern }}
              aria-hidden
            />
          )}

          {/* Gradient curtain */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />

          {/* Category badge */}
          <div className="absolute left-6 top-6">
            <Overline className="border border-gold/30 bg-background/50 px-3 py-1 text-gold backdrop-blur-sm">
              {article.category}
            </Overline>
          </div>

          {/* Decorative gold rule at top */}
          <div className="absolute inset-x-0 top-0 h-px bg-gold/20" aria-hidden />
        </div>

        {/* Content */}
        <div className="p-7 md:p-10 lg:p-12">
          <Link href={article.href} className="block focus-visible:outline-none">
            <h2
              className="font-display font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-gold"
              style={{ fontSize: "clamp(1.5rem, 2vw + 1rem, 2.5rem)" }}
            >
              {article.title}
            </h2>
          </Link>

          {article.excerpt && (
            <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              {article.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">
            {article.date && <time dateTime={article.date}>{article.date}</time>}
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="h-3 w-3" aria-hidden />
                {article.author}
              </span>
            )}
            {article.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" aria-hidden />
                {article.readTime}
              </span>
            )}
          </div>

          <Link
            href={article.href}
            className="group/link mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:text-gold"
          >
            Read analysis
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </article>
    );
  }

  // ── Secondary / compact variant ──
  return (
    <article
      className={cn(
        "group border-b border-border py-7 last:border-b-0 first:pt-0",
        className,
      )}
    >
      <div className="grid grid-cols-[1fr_auto] items-start gap-5">
        <div className="flex flex-col gap-2.5">
          <Overline className="text-gold">{article.category}</Overline>
          <Link
            href={article.href}
            className="focus-visible:outline-none"
          >
            <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold">
              {article.title}
            </h3>
          </Link>
          {article.excerpt && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground/60">
            {article.date && <time dateTime={article.date}>{article.date}</time>}
            {article.readTime && <span>{article.readTime}</span>}
          </div>
        </div>

        {/* Thumbnail placeholder */}
        <div
          className={cn(
            "h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-gradient-to-br",
            placeholder.bg,
          )}
          aria-hidden
        >
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt=""
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </article>
  );
}
