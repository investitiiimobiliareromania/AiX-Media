import type { SiteCategory } from "@/config/site";

export type NavItem = {
  label: string;
  href: string;
  category?: SiteCategory;
};

export const primaryNavigation: NavItem[] = [
  { label: "Real Estate", href: "/real-estate", category: "real-estate" },
  { label: "Insurance", href: "/insurance", category: "insurance" },
  { label: "Credit", href: "/credit", category: "credit" },
  { label: "Investments", href: "/investments", category: "investments" },
  { label: "Business", href: "/business", category: "business" },
  { label: "Luxury", href: "/luxury", category: "luxury" },
];

export const footerNavigation = {
  sections: [
    {
      title: "Sections",
      items: primaryNavigation,
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Advertise", href: "/advertise" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ],
} as const;
