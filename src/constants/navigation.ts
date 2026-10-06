export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  isBadge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  category?: string;
  isBadge?: string;
  items?: NavSubItem[];
}

/** Primary Desktop Navigation Bar Hierarchy */
export const primaryNavigation: NavItem[] = [
  {
    label: "News",
    href: "/news",
    category: "news",
  },
  {
    label: "Intelligence",
    href: "/data",
    category: "intelligence",
    items: [
      {
        label: "AiX Intelligence",
        href: "/news",
        description: "Analize macroeconomice, sinteze decizionale și rapoarte de fond.",
      },
      {
        label: "AiX Data & Indicatori",
        href: "/data",
        description: "Tablou de bord oficial: dobânzi, curs valutar, tranzacții și energie.",
      },
      {
        label: "What to Watch",
        href: "/what-to-watch",
        description: "Calendarul evenimentelor cheie și indicatorilor iminenți.",
      },
      {
        label: "AiX Academy",
        href: "/academy",
        description: "Ghiduri practice, concepte explicate și analize comparative.",
      },
      {
        label: "De Ce AiX Media",
        href: "/why-aix",
        description: "Metodologia editorială, surse primare și integritatea datelor.",
      },
    ],
  },
  {
    label: "Markets",
    href: "/markets",
    category: "markets",
    items: [
      {
        label: "Piețe & Indicele BET",
        href: "/markets",
        description: "Evoluția pieței de capital de la București și cotațiile BET.",
      },
      {
        label: "Companii BVB",
        href: "/companies",
        description: "Dosare financiare complete și indicatori de evaluare bursieră.",
      },
      {
        label: "Finanțe Publice",
        href: "/finance",
        description: "Execuția bugetară, deficitul și emisiunile de titluri de stat.",
      },
      {
        label: "Investiții & Fidelis",
        href: "/investments",
        description: "Titluri de stat pentru populație și instrumente cu venit fix.",
      },
      {
        label: "Calendar Macroeconomic",
        href: "/calendar",
        description: "Ședințele BNR, rapoartele INS și datele statistice oficiale.",
      },
    ],
  },
  {
    label: "Real Estate",
    href: "/real-estate",
    category: "real-estate",
    items: [
      {
        label: "Piața Imobiliară & ANCPI",
        href: "/real-estate",
        description: "Tranzacții cadastrale naționale, prețuri și autorizații de construire.",
      },
      {
        label: "Dubai Property Intelligence",
        href: "/dubai",
        description: "Investiții internaționale, randamente și analiza proiectelor off-plan.",
      },
      {
        label: "Ghid Due Diligence Imobiliar",
        href: "/academy/ce-trebuie-sa-verifici-inainte-de-cumpararea-unui-imobil",
        description: "Checklist juridic și verificarea cărților funciare înainte de achiziție.",
      },
      {
        label: "Randament Brut vs. Net",
        href: "/academy/randament-brut-vs-randament-net-investitii-imobiliare",
        description: "Calculul rentabilității reale a proprietăților după taxe și costuri.",
      },
    ],
  },
  {
    label: "Business",
    href: "/business",
    category: "business",
    items: [
      {
        label: "Companii & Corporate",
        href: "/business",
        description: "Știri economice, fuziuni, achiziții și rezultate corporative.",
      },
      {
        label: "Industrii & Energie",
        href: "/business/industries",
        description: "Energie regenerabilă, petrol & gaze, sectorul bancar și IT.",
      },
      {
        label: "Credite & Finanțare",
        href: "/credits",
        description: "Creditare ipotecară, indicele IRCC și dobânzi fixe vs variabile.",
      },
      {
        label: "Asigurări & Risc",
        href: "/insurance",
        description: "Protecția activelor, CASCO, RCA, sănătate și riscuri cibernetice.",
      },
    ],
  },
  {
    label: "More",
    href: "/academy",
    category: "more",
    items: [
      {
        label: "Asigurări & Protecție",
        href: "/insurance",
        description: "RCA, CASCO, locuință PAD, sănătate și răspundere profesională.",
      },
      {
        label: "Credite & Finanțare",
        href: "/credits",
        description: "Dobânzi bancare, calcule IRCC și strategii de refinanțare.",
      },
      {
        label: "Dubai Real Estate",
        href: "/dubai",
        description: "Ghidul investitorului în Dubai și randamente nete de închiriere.",
      },
      {
        label: "AiX Academy",
        href: "/academy",
        description: "Biblioteca permanentă de ghiduri decizionale și educație.",
      },
      {
        label: "De Ce AiX Media",
        href: "/why-aix",
        description: "Standardul editorial și principiul verificării surselor primare.",
      },
      {
        label: "Video & Emisiuni",
        href: "/tv",
        description: "Analize video, interviuri și tururi imobiliare premium.",
      },
      {
        label: "Radio & Podcast",
        href: "/radio",
        description: "Emisiuni audio economice și transmisiuni informative.",
      },
    ],
  },
];

/** Flat array for general site compatibility and automated link auditing */
export const mainNavigation: NavItem[] = [
  { label: "News", href: "/news", category: "news" },
  { label: "Data", href: "/data", category: "data" },
  { label: "Real Estate", href: "/real-estate", category: "real-estate" },
  { label: "Dubai", href: "/dubai", category: "dubai" },
  { label: "Insurance", href: "/insurance", category: "insurance" },
  { label: "Credits", href: "/credits", category: "credits" },
  { label: "Markets", href: "/markets", category: "markets" },
  { label: "Companies", href: "/companies", category: "companies" },
  { label: "Business", href: "/business", category: "business" },
  { label: "Academy", href: "/academy", category: "academy" },
  { label: "Why AiX", href: "/why-aix", category: "why-aix" },
  { label: "Video", href: "/tv", category: "tv" },
  { label: "Search", href: "/search", category: "search" },
];

/** Structured Mobile Menu Sections */
export const mobileNavigationSections = [
  {
    title: "News & Analize",
    items: [
      { label: "Știri Recente", href: "/news" },
      { label: "Piața Imobiliară", href: "/real-estate" },
      { label: "Piețe & BVB", href: "/markets" },
      { label: "Companii & Business", href: "/business" },
      { label: "Asigurări & Risc", href: "/insurance" },
    ],
  },
  {
    title: "Intelligence & Data",
    items: [
      { label: "AiX Data • Indicatori", href: "/data" },
      { label: "What to Watch", href: "/what-to-watch" },
      { label: "AiX Academy • Ghiduri", href: "/academy" },
      { label: "De Ce AiX Media", href: "/why-aix" },
      { label: "Calendar Macroeconomic", href: "/calendar" },
    ],
  },
  {
    title: "Verticale Specializate",
    items: [
      { label: "Credite & Dobânzi", href: "/credits" },
      { label: "Dubai Real Estate", href: "/dubai" },
      { label: "Companii Listate BVB", href: "/companies" },
      { label: "Finanțe Publice", href: "/finance" },
      { label: "Investiții & Fidelis", href: "/investments" },
      { label: "Video & Emisiuni TV", href: "/tv" },
      { label: "Radio & Podcast", href: "/radio" },
    ],
  },
];

export const footerNavigation = {
  intelligence: [
    { label: "Știri &amp; Macroeconomie", href: "/news" },
    { label: "AiX Data • Indicatori", href: "/data" },
    { label: "Piața Imobiliară", href: "/real-estate" },
    { label: "Dubai Property Intelligence", href: "/dubai" },
    { label: "Asigurări &amp; Risc", href: "/insurance" },
    { label: "Credite &amp; Finanțare", href: "/credits" },
    { label: "Piețe Financiare &amp; BNR", href: "/markets" },
    { label: "Companii BVB", href: "/companies" },
    { label: "Academy &amp; Ghiduri", href: "/academy" },
    { label: "Calendar Macroeconomic", href: "/calendar" },
  ],
  services: [
    { label: "HomeFind — Real Estate", href: "https://homefind.cristianvaduva.com" },
    { label: "Insurance Analysis — Protection", href: "https://insurance.cristianvaduva.com" },
    { label: "Credit Advisory — Financing", href: "https://credite.cristianvaduva.com" },
    { label: "AIR — Aviation Platform", href: "https://fly.cristianvaduva.com" },
    { label: "Dubai — Property Investment", href: "https://dubai.cristianvaduva.com" },
    { label: "CONSTRUCTIONS by AiXLuxury", href: "https://constructions.cristianvaduva.com" },
    { label: "YouTube — Canal Video", href: "/tv" },
    { label: "Academy", href: "/academy" },
  ],
  legalAndAbout: [
    { label: "De Ce AiX Media", href: "/why-aix" },
    { label: "Despre AiX Media", href: "/news" },
    { label: "Contact &amp; Redacție", href: "/contact" },
    { label: "Notă Legală", href: "/legal" },
    { label: "Politica de Confidențialitate", href: "/privacy" },
    { label: "Informații GDPR", href: "/gdpr" },
    { label: "Politica de Cookie-uri", href: "/cookies" },
    { label: "Termeni de Utilizare", href: "/terms" },
  ],
};
