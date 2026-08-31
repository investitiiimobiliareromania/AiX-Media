import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { articleService } from "@/services/article.service";
import { institutionalDossiers } from "@/lib/institutional-company-dossiers";
import { bvbCompanies } from "@/lib/bvb-data";
import { verifiedVideos } from "@/config/youtube";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // 1. Core Homepage & Intelligence Verticals
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/real-estate`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insurance`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/credits`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/markets`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/finance`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/investments`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tv`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/radio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/academy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Legal & Compliance Routes
  const legalRoutes: MetadataRoute.Sitemap = [
    "/legal",
    "/privacy",
    "/gdpr",
    "/cookies",
    "/terms",
    "/terms-of-use",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // 3. Dynamic Published Articles
  const publishedArticles = await articleService.getPublishedArticles(500);
  const articleRoutes: MetadataRoute.Sitemap = publishedArticles.map((article) => {
    let articleDate = now;
    if (article.publishedAt) {
      const parsed = new Date(article.publishedAt);
      if (!isNaN(parsed.getTime())) {
        articleDate = parsed;
      }
    }

    return {
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: articleDate,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  // 4. Dynamic Company Profiles
  const companySlugs = Array.from(
    new Set([
      ...institutionalDossiers.map((d) => d.slug),
      ...bvbCompanies.map((c) => c.slug),
    ])
  );

  const companyRoutes: MetadataRoute.Sitemap = companySlugs.map((slug) => ({
    url: `${baseUrl}/companies/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Dynamic Video Routes
  const videoRoutes: MetadataRoute.Sitemap = verifiedVideos.map((video) => ({
    url: `${baseUrl}/video/${video.slug || video.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...legalRoutes,
    ...articleRoutes,
    ...companyRoutes,
    ...videoRoutes,
  ];
}
