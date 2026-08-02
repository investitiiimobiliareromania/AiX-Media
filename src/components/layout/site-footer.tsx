import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { Overline, Text } from "@/components/common/typography";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { categories } from "@/constants/categories";
import { footerNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("mt-auto border-t border-border bg-surface/40", className)}>
      <Container size="wide">
        <div className="grid gap-12 py-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:py-16">
          <div className="space-y-6 lg:col-span-1">
            <Logo showTagline />
            <Text size="sm" tone="muted" className="max-w-sm">
              {siteConfig.description}
            </Text>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-gold"
            >
              <Mail className="size-4" />
              Contact editorial
            </Link>
          </div>

          {footerNavigation.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <Overline className="text-[0.65rem]">{section.title}</Overline>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border" />

        <div className="grid gap-6 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-gold"
              >
                {category.label}
              </Link>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            {siteConfig.url.replace("https://", "")}
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.author}. All rights reserved.
          </p>
          <p className="text-xs tracking-wide uppercase">
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
