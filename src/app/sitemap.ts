import type { MetadataRoute } from "next";

import { categories } from "@/constants/categories";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/${category.slug}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
