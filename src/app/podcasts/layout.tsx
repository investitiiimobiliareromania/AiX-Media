import { type Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, createPodcastSeriesJsonLd } from "@/components/common/json-ld";

export const metadata: Metadata = {
  title: "Podcasturi Economice & Emisiuni Audio | AiX Media",
  description:
    "Episoade de analiză macroeconomică, investiții imobiliare, piețe de capital și dialoguri de business realizate de redacția AiX Media.",
  alternates: {
    canonical: `${siteConfig.url}/podcasts`,
    languages: {
      "ro-RO": `${siteConfig.url}/podcasts`,
      "x-default": `${siteConfig.url}/podcasts`,
    },
  },
  openGraph: {
    title: "Podcasturi Economice & Emisiuni Audio | AiX Media",
    description:
      "Episoade de analiză macroeconomică, investiții imobiliare, piețe de capital și dialoguri de business realizate de redacția AiX Media.",
    url: `${siteConfig.url}/podcasts`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function PodcastsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const podcastSeriesSchema = createPodcastSeriesJsonLd(
    "AiX Media Podcasts",
    "Episoade de analiză macroeconomică, investiții imobiliare, piețe de capital și dialoguri de business."
  );

  return (
    <>
      <JsonLd data={podcastSeriesSchema} />
      {children}
    </>
  );
}
