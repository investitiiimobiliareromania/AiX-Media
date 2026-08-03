import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Overline, Text } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";
import { categories } from "@/constants/categories";

// Curated static intelligence brief — shown until real articles exist
const featuredBrief = {
  eyebrow: "Intelligence Brief",
  headline: "Private intelligence for people making important decisions.",
  excerpt:
    "AiX Media covers Romania's most consequential financial markets — real estate, insurance, and investments — with the rigor and editorial standard that decision-makers require. Our analysts provide context where data alone is insufficient.",
  cta: { label: "Explore Real Estate", href: "/real-estate" },
};

export function FeaturedStoryHero() {
  return (
    <Section spacing="none" aria-labelledby="featured-story-title">
      <Container size="wide">
        <div className="grid border-b border-border lg:grid-cols-[1.4fr_1fr]">

          {/* ── Left: featured editorial brief ── */}
          <article className="flex flex-col justify-between gap-8 border-b border-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            {/* Gold accent rule */}
            <div className="h-px w-10 bg-gold" aria-hidden />

            <div className="space-y-5">
              <Overline className="text-gold">{featuredBrief.eyebrow}</Overline>
              <h2
                id="featured-story-title"
                className="font-display font-medium text-balance text-foreground tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 2vw + 1rem, 2.25rem)", lineHeight: "1.1" }}
              >
                {featuredBrief.headline}
              </h2>
              <Text tone="muted" className="max-w-xl leading-relaxed">
                {featuredBrief.excerpt}
              </Text>
            </div>

            <Link
              href={featuredBrief.cta.href}
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-foreground/70 transition-colors hover:text-gold"
            >
              {featuredBrief.cta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </article>

          {/* ── Right: editorial verticals directory ── */}
          <aside className="p-7 sm:p-10 lg:p-12">
            <p className="text-xs tracking-[0.18em] text-muted-foreground/70 uppercase mb-6">
              Editorial Verticals
            </p>
            <ul className="divide-y divide-border">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="text-sm font-medium text-foreground transition-colors group-hover:text-gold">
                        {cat.label}
                      </p>
                      <Text size="sm" tone="muted" className="line-clamp-1 text-xs">
                        {cat.description}
                      </Text>
                    </div>
                    <ArrowRight
                      className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gold"
                      aria-hidden
                    />
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
