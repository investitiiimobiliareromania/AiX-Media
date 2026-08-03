import { ArticleCard, type ArticleCardData } from "@/components/editorial/ArticleCard";
import { FeaturedStory } from "@/components/editorial/FeaturedStory";
import { Container, Section } from "@/components/layout/container";
import { SectionHeader } from "@/components/editorial/section-header";

interface ArticleGridProps {
  title?: string;
  description?: string;
  articles: ArticleCardData[];
  categorySlug?: string;
}

export function ArticleGrid({
  title = "Latest Analysis",
  description,
  articles,
  categorySlug,
}: ArticleGridProps) {
  if (articles.length === 0) return null;

  const [featured, second, third, ...grid] = articles;

  return (
    <Section
      spacing="lg"
      className="border-t border-border"
      aria-labelledby="article-grid-heading"
    >
      <Container size="wide">
        <SectionHeader
          overline="Editorial"
          title={title}
          description={description}
          headingLevel="h2"
        />

        <div className="mt-10 space-y-8">

          {/* ── Row 1: Featured (large) + sidebar (2 secondary) ── */}
          {featured && (
            <div
              className={
                second
                  ? "grid gap-px bg-border lg:grid-cols-[1.55fr_1fr]"
                  : ""
              }
            >
              {/* Primary featured */}
              <FeaturedStory
                article={featured}
                variant="primary"
                categorySlug={categorySlug}
                className="bg-background"
              />

              {/* Secondary sidebar */}
              {second && (
                <div className="flex flex-col divide-y divide-border bg-surface/30">
                  <FeaturedStory
                    article={second}
                    variant="secondary"
                    categorySlug={categorySlug}
                    className="flex-1 px-7 py-7"
                  />
                  {third && (
                    <FeaturedStory
                      article={third}
                      variant="secondary"
                      categorySlug={categorySlug}
                      className="flex-1 px-7 py-7"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Row 2: 3-col card grid for remaining articles ── */}
          {grid.length > 0 && (
            <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
              {grid.map((article) => (
                <ArticleCard
                  key={article.href}
                  {...article}
                  categorySlug={categorySlug}
                  className="bg-background"
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
