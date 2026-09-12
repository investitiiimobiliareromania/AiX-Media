import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const CANONICAL_SITE_TITLE = "AiX Media — Știri și Informații despre Business, Piețe, Imobiliare și Finanțe";

export function createMetadata(overrides: Metadata = {}): Metadata {
  const defaultTitle = CANONICAL_SITE_TITLE;
  const title = overrides.title ?? defaultTitle;
  const titleString = typeof title === "string" ? title : (title && "default" in title ? (title.default as string) : defaultTitle);
  const description =
    (typeof overrides.description === "string"
      ? overrides.description
      : undefined) ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: defaultTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: titleString,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: titleString,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
      languages: {
        "ro-RO": siteConfig.url,
        "x-default": siteConfig.url,
      },
      types: {
        "application/rss+xml": `${siteConfig.url}/feed.xml`,
      },
    },
    ...overrides,
  };
}

export const rootMetadata = createMetadata();
