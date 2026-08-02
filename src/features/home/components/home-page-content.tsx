import { BreakingNewsTicker } from "@/features/home/components/breaking-news-ticker";
import { CategoriesSection } from "@/features/home/components/categories-section";
import { FeaturedStoryHero } from "@/features/home/components/featured-story-hero";
import { HeroSection } from "@/features/home/components/hero-section";
import { LatestNewsGrid } from "@/features/home/components/latest-news-grid";
import { MarketsOverview } from "@/features/home/components/markets-overview";
import { NewsletterSection } from "@/features/home/components/newsletter-section";

export function HomePageContent() {
  return (
    <>
      <BreakingNewsTicker />
      <HeroSection />
      <FeaturedStoryHero />
      <LatestNewsGrid />
      <CategoriesSection />
      <MarketsOverview />
      <NewsletterSection />
    </>
  );
}
