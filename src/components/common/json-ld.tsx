import { siteConfig } from "@/config/site";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [
    "https://www.youtube.com/@CristianVaduvaCV",
  ],
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/icon`,
    width: 512,
    height: 512,
  },
  publishingPrinciples: `${siteConfig.url}/legal`,
  correctionsPolicy: `${siteConfig.url}/legal`,
} as const;

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ro-RO",
  publisher: {
    "@type": "NewsMediaOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;
