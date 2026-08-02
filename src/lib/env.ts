export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://media.aixluxury.com",
} as const;
