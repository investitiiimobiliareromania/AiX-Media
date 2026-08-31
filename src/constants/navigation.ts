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
    { label: "News & Macro Intelligence", href: "/news" },
    { label: "Real Estate Intelligence", href: "/real-estate" },
    { label: "Insurance Intelligence", href: "/insurance" },
    { label: "Credit & Financing Intelligence", href: "/credits" },
    { label: "Capital Markets & BNR Rates", href: "/markets" },
    { label: "BVB Company Profiles", href: "/companies" },
    { label: "Macroeconomic Calendar", href: "/calendar" },
  ],
  services: [
    { label: "HomeFind — Real Estate", href: "https://homefind.cristianvaduva.com" },
    { label: "Insurance Analysis — Protection", href: "https://insurance.cristianvaduva.com" },
    { label: "Credit Advisory — Financing", href: "https://credite.cristianvaduva.com" },
    { label: "YouTube — Video Tours", href: "/tv" },
    { label: "Intelligence Academy", href: "/academy" },
  ],
  legalAndAbout: [
    { label: "About AiX Media", href: "/news" },
    { label: "Contact & Editorial Desk", href: "/contact" },
    { label: "Legal Notice", href: "/legal" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "GDPR Information", href: "/gdpr" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
