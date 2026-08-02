import Link from "next/link";

import { SectionHeader } from "@/components/editorial/section-header";
import { StoryCard } from "@/components/editorial/story-card";
import { Container, Section } from "@/components/layout/container";
import { categories } from "@/constants/categories";

export function LatestNewsGrid() {
  return (
    <Section spacing="lg" aria-labelledby="latest-news-title">
      <Container size="wide">
        <SectionHeader
          overline="Latest"
          title="News Grid"
          description="Editorial card system for section-driven coverage across every AiX Media vertical."
          action={
            <Link
              href="/business"
              className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-gold"
            >
              View all sections
            </Link>
          }
          headingLevel="h2"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <StoryCard
              key={category.slug}
              href={`/${category.slug}`}
              category={category.label}
              title={category.label}
              description={category.description}
              meta="Section"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
