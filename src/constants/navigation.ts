export interface NavItem {
  label: string;
  href: string;
  category?: string;
  isBadge?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "News", href: "/news", category: "news" },
  { label: "Markets", href: "/markets", category: "markets" },
  { label: "Business", href: "/business", category: "business" },
  { label: "Real Estate", href: "/real-estate", category: "real-estate" },
  { label: "Investments", href: "/investments", category: "investments" },
  { label: "Finance", href: "/finance", category: "finance" },
  { label: "Companies", href: "/companies", category: "companies" },
  { label: "Calendar", href: "/calendar", category: "calendar" },
  { label: "AiX Radio", href: "/radio", category: "radio", isBadge: "LIVE" },
  { label: "AiX TV", href: "/tv", category: "tv", isBadge: "HD" },
  { label: "Podcasts", href: "/podcasts", category: "podcasts" },
  { label: "Academy", href: "/academy", category: "academy" },
  { label: "Contact", href: "/contact", category: "contact" },
];

export const footerNavigation = {
  media: [
    { label: "Breaking Intelligence", href: "/news" },
    { label: "Market Dashboard", href: "/markets" },
    { label: "AiX Radio", href: "/radio" },
    { label: "AiX TV Broadcasts", href: "/tv" },
    { label: "Executive Podcasts", href: "/podcasts" },
  ],
  intelligence: [
    { label: "Real Estate Analysis", href: "/real-estate" },
    { label: "Investment & Wealth", href: "/investments" },
    { label: "Corporate Business", href: "/business" },
    { label: "Finance & Rates", href: "/finance" },
    { label: "Company Profiles", href: "/companies" },
    { label: "Macro Calendar", href: "/calendar" },
    { label: "Editorial Board", href: "/authors" },
    { label: "Intelligence Academy", href: "/academy" },
    { label: "Contact & Desk", href: "/contact" },
  ],
  company: [
    { label: "About AiX Media", href: "/news" },
    { label: "Editorial Standards", href: "/news" },
    { label: "Executive Briefings", href: "/#newsletter" },
    { label: "AiX Terminal Search", href: "/search" },
    { label: "Contact Us", href: "/contact" },
  ],
};
