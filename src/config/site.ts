export const siteConfig = {
  name: "AiX Media",
  shortName: "AiX",
  tagline: "Romania's Business Media Network",
  description:
    "Premium digital media covering real estate, insurance, credit, investments, business, and luxury across Romania.",
  url: "https://media.aixluxury.com",
  locale: "ro_RO",
  language: "ro",
  author: "AiXLuxury",
  twitterHandle: "@aixluxury",
  categories: [
    "real-estate",
    "insurance",
    "credit",
    "investments",
    "business",
    "luxury",
  ] as const,
} as const;

export type SiteCategory = (typeof siteConfig.categories)[number];
