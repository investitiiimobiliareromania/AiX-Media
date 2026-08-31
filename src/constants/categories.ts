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
    slug: "real-estate",
    label: "Real Estate Intelligence",
    name: "Real Estate",
    description: "Institutional real estate analysis, yield trends, development capital, and market dynamics.",
    href: "/real-estate",
  },
  {
    slug: "insurance",
    label: "Insurance Intelligence & Risk Protection",
    name: "Insurance",
    description: "Analize de risc, protecția patrimoniului, asigurări imobiliare și corporate risk management.",
    href: "/insurance",
  },
  {
    slug: "credits",
    label: "Credit Intelligence & Financial Optimization",
    name: "Credits",
    description: "Credite ipotecare, analiză dobânzi IRCC/BNR, refinanțare și strategii de creditare.",
    href: "/credits",
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
    description: "Comentarii economice, analize de piață și actualizări monetare BNR.",
    href: "/radio",
  },
  {
    slug: "tv",
    label: "YouTube Channel",
    name: "YouTube Channel",
    description: "AiX Media on YouTube: property tours, video talks, deal analysis, and luxury asset management.",
    href: "/tv",
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
