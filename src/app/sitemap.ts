import type { MetadataRoute } from "next";
import { categoriesList } from "@/constants/categories";
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

  const additionalStaticRoutes: MetadataRoute.Sitemap = [
    "/companies",
    "/calendar",
    "/authors",
    "/search",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categoriesList.map((category) => ({
    url: `${siteConfig.url}${category.href}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...additionalStaticRoutes, ...categoryRoutes];
}
