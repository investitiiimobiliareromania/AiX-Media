import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

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
  return children;
}
