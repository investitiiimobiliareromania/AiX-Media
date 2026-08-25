import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Căutare Inteligență Economică, Companii & Rapoarte | AiX Media",
  description:
    "Motorul de căutare AiX Media: articole economice, dosare corporative BVB, emisiuni video și indicatori imobiliari din surse oficiale verificate.",
  alternates: {
    canonical: `${siteConfig.url}/search`,
    languages: {
      "ro-RO": `${siteConfig.url}/search`,
      "x-default": `${siteConfig.url}/search`,
    },
  },
  openGraph: {
    title: "Căutare Inteligență Economică, Companii & Rapoarte | AiX Media",
    description:
      "Motorul de căutare AiX Media: articole economice, dosare corporative BVB, emisiuni video și indicatori imobiliari din surse oficiale verificate.",
    url: `${siteConfig.url}/search`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
