import { type Metadata } from "next";
import { siteConfig } from "@/config/site";
import { JsonLd, createItemListJsonLd } from "@/components/common/json-ld";
import { verifiedVideos } from "@/config/youtube";

export const metadata: Metadata = {
  title: "AiX TV — Analize Video & Prezentări Oficiale | AiX Media",
  description:
    "Producții video, investigații economice și prezentări verificate realizate de Cristian Văduva pe canalul oficial YouTube.",
  alternates: {
    canonical: `${siteConfig.url}/tv`,
    languages: {
      "ro-RO": `${siteConfig.url}/tv`,
      "x-default": `${siteConfig.url}/tv`,
    },
  },
  openGraph: {
    title: "AiX TV — Analize Video & Prezentări Oficiale | AiX Media",
    description:
      "Producții video, investigații economice și prezentări verificate realizate de Cristian Văduva pe canalul oficial YouTube.",
    url: `${siteConfig.url}/tv`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function TvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemListSchema = createItemListJsonLd(
    "AiX TV — Video Intelligence Productions",
    "Analize video, investigații economice și prezentări oficiale de pe canalul YouTube AiX Media.",
    verifiedVideos.map((v, idx) => ({
      position: idx + 1,
      name: v.title,
      url: `/video/${v.slug || v.id}`,
    }))
  );

  return (
    <>
      <JsonLd data={itemListSchema} />
      {children}
    </>
  );
}
