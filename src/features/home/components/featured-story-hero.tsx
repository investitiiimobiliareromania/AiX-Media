import Link from "next/link";

import { Heading, Overline, Text } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { categories } from "@/constants/categories";

export function FeaturedStoryHero() {
  const leadCategory =
    categories.find((category) => category.slug === "business") ?? categories[0]!;


  return (
    <Section spacing="none" aria-labelledby="featured-story-title">
      <Container size="wide">
        <div className="grid border-b border-border lg:grid-cols-[1.4fr_1fr]">
          <article className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <Overline>Featured Editorial Focus</Overline>
            <Heading
              as="h2"
              level="h2"
              id="featured-story-title"
              className="mt-4 max-w-3xl"
            >
              {siteConfig.tagline}
            </Heading>
            <Text tone="muted" className="mt-6 max-w-2xl">
              {siteConfig.description}
            </Text>
            <Link
              href={`/${leadCategory.slug}`}
              className="mt-8 inline-flex text-sm font-medium tracking-wide text-foreground transition-colors hover:text-gold"
            >
              Explore {leadCategory.label}
            </Link>
          </article>

          <aside className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Editorial Verticals
            </p>
            <ul className="mt-6 divide-y divide-border">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="group flex items-start justify-between gap-4 py-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground transition-colors group-hover:text-gold">
                        {category.label}
                      </p>
                      <Text size="sm" tone="muted" className="line-clamp-2">
                        {category.description}
                      </Text>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-gold"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
