import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
};

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Home`}
      className={cn("group inline-flex flex-col gap-1", className)}
    >
      <span className="font-display text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-2xl">
        {siteConfig.name}
      </span>
      {showTagline ? (
        <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {siteConfig.tagline}
        </span>
      ) : null}
    </Link>
  );
}
