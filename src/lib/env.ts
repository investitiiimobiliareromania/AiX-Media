export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://media.aixluxury.com",
  NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;
