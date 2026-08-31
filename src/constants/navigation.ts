export interface NavItem {
  label: string;
  href: string;
  category?: string;
  isBadge?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "News", href: "/news", category: "news" },
  { label: "Real Estate", href: "/real-estate", category: "real-estate" },
  { label: "Insurance", href: "/insurance", category: "insurance" },
  { label: "Credits", href: "/credits", category: "credits" },
  { label: "Markets", href: "/markets", category: "markets" },
  { label: "Companies", href: "/companies", category: "companies" },
  { label: "Business", href: "/business", category: "business" },
  { label: "Video", href: "/tv", category: "tv" },
  { label: "Search", href: "/search", category: "search" },
];

export const footerNavigation = {
  intelligence: [
    { label: "Știri &amp; Macroeconomie", href: "/news" },
    { label: "Piața Imobiliară", href: "/real-estate" },
    { label: "Asigurări &amp; Risc", href: "/insurance" },
    { label: "Credite &amp; Finanțare", href: "/credits" },
    { label: "Piețe Financiare &amp; BNR", href: "/markets" },
    { label: "Companii BVB", href: "/companies" },
    { label: "Calendar Macroeconomic", href: "/calendar" },
  ],
  services: [
    { label: "HomeFind — Real Estate", href: "https://homefind.cristianvaduva.com" },
    { label: "Insurance Analysis — Protection", href: "https://insurance.cristianvaduva.com" },
    { label: "Credit Advisory — Financing", href: "https://credite.cristianvaduva.com" },
    { label: "YouTube — Canal Video", href: "/tv" },
    { label: "Academy", href: "/academy" },
  ],
  legalAndAbout: [
    { label: "Despre AiX Media", href: "/news" },
    { label: "Contact &amp; Redacție", href: "/contact" },
    { label: "Notă Legală", href: "/legal" },
    { label: "Politica de Confidențialitate", href: "/privacy" },
    { label: "Informații GDPR", href: "/gdpr" },
    { label: "Politica de Cookie-uri", href: "/cookies" },
    { label: "Termeni de Utilizare", href: "/terms" },
  ],
};
