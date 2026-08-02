import type { SiteCategory } from "@/config/site";

export type { SiteCategory };

export type BaseEntity = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type SeoFields = {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
};

export type LayoutVariant = "default" | "wide" | "narrow" | "full";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
