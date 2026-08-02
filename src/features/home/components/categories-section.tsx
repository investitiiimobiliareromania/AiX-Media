import Link from "next/link";

import { Text } from "@/components/common/typography";
import { SectionHeader } from "@/components/editorial/section-header";
import { Container, Section } from "@/components/layout/container";
import { categories } from "@/constants/categories";

export function CategoriesSection() {
  return (
    <Section spacing="lg" aria-labelledby="categories-title">
      <Container size="wide">
        <SectionHeader
          overline="Coverage"
          title="Categories"
          description="Six editorial verticals engineered for Romania's business, finance, and luxury audience."
          headingLevel="h2"
        />

        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group flex min-h-48 flex-col justify-between bg-background p-6 sm:p-8"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-gold sm:text-3xl">
                  {category.label}
                </h3>
                <Text size="sm" tone="muted">
                  {category.description}
                </Text>
              </div>
              <span className="mt-8 text-sm font-medium tracking-wide text-muted-foreground transition-colors group-hover:text-gold">
                Enter section
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
