import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Companii Listate la BVB & Profiluri Corporative | AiX Media",
  description:
    "Profiluri financiare auditate, rapoarte anuale, coduri ISIN/CUI și analize de guvernanță pentru companiile listate la Bursa de Valori București.",
  alternates: {
    canonical: `${siteConfig.url}/companies`,
    languages: {
      "ro-RO": `${siteConfig.url}/companies`,
      "x-default": `${siteConfig.url}/companies`,
    },
  },
  openGraph: {
    title: "Companii Listate la BVB & Profiluri Corporative | AiX Media",
    description:
      "Profiluri financiare auditate, rapoarte anuale, coduri ISIN/CUI și analize de guvernanță pentru companiile listate la Bursa de Valori București.",
    url: `${siteConfig.url}/companies`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
