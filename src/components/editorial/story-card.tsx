import Link from "next/link";
import Image from "next/image";

import { Overline, Text } from "@/components/common/typography";
import { cn } from "@/lib/utils";

type StoryCardProps = {
  href: string;
  category: string;
  title: string;
  description?: string;
  meta?: string;
  imageUrl?: string;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
};

export function StoryCard({
  href,
  category,
  title,
  description,
  meta,
  imageUrl,
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
        <div className="relative aspect-[4/3] bg-neutral-950 sm:aspect-square overflow-hidden rounded">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-surface" aria-hidden />
          )}
        </div>
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
        "group flex h-full flex-col border border-border bg-surface/40 overflow-hidden",
        variant === "compact" ? "p-4" : "p-6",
        className,
      )}
    >
      <div
        className={cn(
          "relative mb-4 bg-neutral-950 overflow-hidden rounded",
          variant === "compact" ? "aspect-[16/10]" : "aspect-[16/9]",
        )}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-surface" aria-hidden />
        )}
      </div>
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
