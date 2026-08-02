import Link from "next/link";

import { Overline, Text } from "@/components/common/typography";
import { cn } from "@/lib/utils";

type StoryCardProps = {
  href: string;
  category: string;
  title: string;
  description?: string;
  meta?: string;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
};

export function StoryCard({
  href,
  category,
  title,
  description,
  meta,
  variant = "default",
  className,
}: StoryCardProps) {
  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "group grid gap-4 border-b border-border py-6 sm:grid-cols-[7rem_1fr] sm:gap-8",
          className,
        )}
      >
        <div className="aspect-[4/3] bg-surface sm:aspect-square" aria-hidden />
        <div className="flex flex-col justify-center gap-3">
          <StoryCardContent
            href={href}
            category={category}
            title={title}
            description={description}
            meta={meta}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-surface/40",
        variant === "compact" ? "p-4" : "p-6",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 bg-surface",
          variant === "compact" ? "aspect-[16/10]" : "aspect-[16/9]",
        )}
        aria-hidden
      />
      <StoryCardContent
        href={href}
        category={category}
        title={title}
        description={description}
        meta={meta}
        compact={variant === "compact"}
      />
    </article>
  );
}

type StoryCardContentProps = {
  href: string;
  category: string;
  title: string;
  description?: string;
  meta?: string;
  compact?: boolean;
};

function StoryCardContent({
  href,
  category,
  title,
  description,
  meta,
  compact = false,
}: StoryCardContentProps) {
  return (
    <>
      <Overline className="mb-3">{category}</Overline>
      <h3
        className={cn(
          "font-display tracking-tight text-foreground transition-colors group-hover:text-gold",
          compact ? "text-lg leading-snug" : "text-xl leading-snug sm:text-2xl",
        )}
      >
        <Link href={href} className="outline-none focus-visible:text-gold">
          {title}
        </Link>
      </h3>
      {description ? (
        <Text
          size={compact ? "sm" : "base"}
          tone="muted"
          className="mt-3 line-clamp-3"
        >
          {description}
        </Text>
      ) : null}
      {meta ? (
        <Text size="xs" tone="muted" className="mt-auto pt-4 uppercase tracking-wide">
          {meta}
        </Text>
      ) : null}
    </>
  );
}
