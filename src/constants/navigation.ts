export interface NavItem {
  label: string;
  href: string;
  category?: string;
  isBadge?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "News", href: "/news", category: "news" },
  { label: "Real Estate", href: "/real-estate", category: "real-estate" },
  { label: "Markets", href: "/markets", category: "markets" },
  { label: "Companies", href: "/companies", category: "companies" },
  { label: "Business", href: "/business", category: "business" },
  { label: "Podcasts", href: "/podcasts", category: "podcasts" },
  { label: "YouTube Channel", href: "/tv", category: "tv" },
  { label: "Radio", href: "/radio", category: "radio" },
  { label: "Search", href: "/search", category: "search" },
];

export const footerNavigation = {
  intelligence: [
    { label: "News & Macro Intelligence", href: "/news" },
    { label: "Real Estate Intelligence", href: "/real-estate" },
    { label: "Capital Markets & BNR Rates", href: "/markets" },
    { label: "BVB Company Profiles", href: "/companies" },
    { label: "Business & Enterprise", href: "/business" },
    { label: "Macroeconomic Calendar", href: "/calendar" },
  ],
  media: [
    { label: "Executive Podcasts", href: "/podcasts" },
    { label: "YouTube Channel", href: "/tv" },
    { label: "AiX Business Radio", href: "/radio" },
    { label: "Intelligence Academy", href: "/academy" },
    { label: "AiX Terminal Search", href: "/search" },
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
