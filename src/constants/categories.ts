export interface CategoryInfo {
  slug: string;
  label: string;
  name: string;
  description: string;
  href: string;
}

export const categoriesList: CategoryInfo[] = [
  {
    slug: "news",
    label: "Intelligence & News",
    name: "News",
    description: "Breaking business news, macroeconomics, policy impacts, and market updates.",
    href: "/news",
  },
  {
    slug: "markets",
    label: "Capital & Commodity Markets",
    name: "Markets",
    description: "Stock exchanges, BVB, EUR/RON, interest rates, commodities, and macroeconomic indicators.",
    href: "/markets",
  },
  {
    slug: "business",
    label: "Business & Enterprise",
    name: "Business",
    description: "Corporate strategies, founder interviews, M&A, scaleups, and regional industry champions.",
    href: "/business",
  },
  {
    slug: "real-estate",
    label: "Real Estate Intelligence",
    name: "Real Estate",
    description: "Institutional real estate analysis, yield trends, development capital, and market dynamics.",
    href: "/real-estate",
  },
  {
    slug: "investments",
    label: "Investments & Private Wealth",
    name: "Investments",
    description: "Alternative investments, venture capital, private equity, asset allocation, and luxury assets.",
    href: "/investments",
  },
  {
    slug: "finance",
    label: "Finance & Monetary Policy",
    name: "Finance",
    description: "Banking sector trends, rate environments, corporate debt, and mortgage rate analysis.",
    href: "/finance",
  },
  {
    slug: "radio",
    label: "AiX Business Radio",
    name: "AiX Radio",
    description: "Comentarii economice, analize de piață, actualizări BNR și podcasturi executive.",
    href: "/radio",
  },
  {
    slug: "tv",
    label: "AiX Video Journalism",
    name: "AiX TV",
    description: "In-depth video interviews, documentary investigations, and market analysis broadcasts.",
    href: "/tv",
  },
  {
    slug: "podcasts",
    label: "Executive Podcasts",
    name: "Podcasts",
    description: "Deep conversations with market shakers, industry leaders, macroeconomists, and founders.",
    href: "/podcasts",
  },
  {
    slug: "academy",
    label: "Intelligence Academy",
    name: "Academy",
    description: "Executive education, market frameworks, financial literacy, and investment methodologies.",
    href: "/academy",
  },
];

export const categoryBySlug: Record<string, CategoryInfo> = categoriesList.reduce((acc, cat) => {
  acc[cat.slug] = cat;
  return acc;
}, {} as Record<string, CategoryInfo>);
