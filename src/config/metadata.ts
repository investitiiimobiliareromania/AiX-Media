import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export function createMetadata(overrides: Metadata = {}): Metadata {
  const title = overrides.title ?? siteConfig.name;
  const description =
    (typeof overrides.description === "string"
      ? overrides.description
      : undefined) ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
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
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: typeof title === "string" ? title : siteConfig.name,
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
    },
    ...overrides,
  };
}

export const rootMetadata = createMetadata();
