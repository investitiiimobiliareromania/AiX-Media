export const siteConfig = {
  name: "AiX Media",
  shortName: "AiX",
  tagline: "Platformă Editorială & Știri: Real Estate, Asigurări, Credite & Piețe",
  description:
    "Platformă editorială de analiză macroeconomică, date imobiliare ANCPI, indicatori BNR, companii BVB și știri din afaceri.",
  url: "https://aixmedia.cristianvaduva.com",
  locale: "ro_RO",
  language: "ro",
  author: "Cristian Văduva",
  categories: [
    "news",
    "real-estate",
    "insurance",
    "credits",
    "markets",
    "business",
    "investments",
    "finance",
    "radio",
    "tv",
    "academy",
  ] as const,
} as const;

export type SiteCategory = (typeof siteConfig.categories)[number];
