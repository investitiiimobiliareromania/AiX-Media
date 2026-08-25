import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Știri Economice & Analize Financiare | AiX Media",
  description:
    "Flux de știri economice, analize de politică monetară, evoluția piețelor de capital și statistici imobiliare verificate din România și CEE.",
  alternates: {
    canonical: `${siteConfig.url}/news`,
    languages: {
      "ro-RO": `${siteConfig.url}/news`,
      "x-default": `${siteConfig.url}/news`,
    },
  },
  openGraph: {
    title: "Știri Economice & Analize Financiare | AiX Media",
    description:
      "Flux de știri economice, analize de politică monetară, evoluția piețelor de capital și statistici imobiliare verificate din România și CEE.",
    url: `${siteConfig.url}/news`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
