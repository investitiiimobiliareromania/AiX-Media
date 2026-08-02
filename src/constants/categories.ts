import type { SiteCategory } from "@/config/site";

export type CategoryDefinition = {
  slug: SiteCategory;
  label: string;
  description: string;
};

export const categories: CategoryDefinition[] = [
  {
    slug: "real-estate",
    label: "Real Estate",
    description: "Premium property markets, development, and luxury living.",
  },
  {
    slug: "insurance",
    label: "Insurance",
    description: "Coverage, risk, and protection for modern wealth.",
  },
  {
    slug: "credit",
    label: "Credit",
    description: "Lending, financing, and credit intelligence.",
  },
  {
    slug: "investments",
    label: "Investments",
    description: "Markets, portfolios, and capital strategy.",
  },
  {
    slug: "business",
    label: "Business",
    description: "Enterprise, leadership, and economic insight.",
  },
  {
    slug: "luxury",
    label: "Luxury",
    description: "Refined lifestyle, culture, and exceptional assets.",
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<SiteCategory, CategoryDefinition>;
