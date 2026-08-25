export const siteConfig = {
  name: "AiX Media",
  shortName: "AiX",
  tagline: "Platformă de Inteligență Economică, Piețe Financiare și Imobiliare",
  description:
    "Platformă premium de analiză macroeconomică, date imobiliare oficiale ANCPI, indicatori BNR, companii listate la BVB și intelligence de business pentru liderii din România și CEE.",
  url: "https://aixmedia.cristianvaduva.com",
  locale: "ro_RO",
  language: "ro",
  author: "Cristian Văduva",
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
