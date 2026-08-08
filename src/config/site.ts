export const siteConfig = {
  name: "AiX Media",
  shortName: "AiX",
  tagline: "Romania's Next Generation Business & Intelligence Media Platform",
  description:
    "Institutional intelligence, business journalism, real estate dynamics, capital markets analysis, radio and video insights for leaders in Romania and CEE.",
  url: "https://aixmedia.cristianvaduva.com",
  locale: "ro_RO",
  language: "ro",
  author: "Cristian Văduva",
  twitterHandle: "@aixmedia",
  categories: [
    "news",
    "markets",
    "business",
    "real-estate",
    "investments",
    "finance",
    "radio",
    "tv",
    "podcasts",
    "academy",
  ] as const,
} as const;

export type SiteCategory = (typeof siteConfig.categories)[number];
