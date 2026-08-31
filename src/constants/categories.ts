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
    label: "News & Macroeconomics",
    name: "News",
    description: "Știri economice, evoluții macroeconomice și decizii de politică monetară.",
    href: "/news",
  },
  {
    slug: "real-estate",
    label: "Real Estate & Property Market",
    name: "Real Estate",
    description: "Informații din piața imobiliară, date ANCPI și construcții.",
    href: "/real-estate",
  },
  {
    slug: "insurance",
    label: "Insurance & Risk Information",
    name: "Insurance",
    description: "Informații despre asigurări, protecția proprietăților și riscuri.",
    href: "/insurance",
  },
  {
    slug: "credits",
    label: "Credit & Financing Information",
    name: "Credits",
    description: "Informații despre creditare, dobânzi, IRCC și finanțarea proprietăților.",
    href: "/credits",
  },
  {
    slug: "markets",
    label: "Capital & Commodity Markets",
    name: "Markets",
    description: "Bursa de Valori București (BVB), curs oficial BNR, ROBOR și indici financiari.",
    href: "/markets",
  },
  {
    slug: "business",
    label: "Business & Enterprise",
    name: "Business",
    description: "Știri din afaceri, rezultate financiare ale marilor emitenți și strategie corporativă.",
    href: "/business",
  },
  {
    slug: "investments",
    label: "Investments & Private Wealth",
    name: "Investments",
    description: "Informații privind fondurile private, titlurile de stat și alocarea capitalului.",
    href: "/investments",
  },
  {
    slug: "finance",
    label: "Finance & Banking",
    name: "Finance",
    description: "Sectorul bancar, politica monetară BNR și cotații de referință.",
    href: "/finance",
  },
  {
    slug: "radio",
    label: "AiX Business Radio",
    name: "AiX Radio",
    description: "Comentarii economice și actualizări monetare BNR.",
    href: "/radio",
  },
  {
    slug: "tv",
    label: "YouTube Channel",
    name: "YouTube Channel",
    description: "Canalul oficial YouTube: materiale video cu proprietăți și perspective cu Cristian Văduva.",
    href: "/tv",
  },
  {
    slug: "academy",
    label: "Academy",
    name: "Academy",
    description: "Sinteze informaționale și cadre de analiză a pieței imobiliare.",
    href: "/academy",
  },
];

export const categoryBySlug: Record<string, CategoryInfo> = categoriesList.reduce((acc, cat) => {
  acc[cat.slug] = cat;
  return acc;
}, {} as Record<string, CategoryInfo>);
