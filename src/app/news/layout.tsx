import { type Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  JsonLd,
  createCollectionPageJsonLd,
  createBreadcrumbJsonLd,
} from "@/components/common/json-ld";

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
  const collectionSchema = createCollectionPageJsonLd({
    name: "Știri Economice & Analize Financiare",
    description:
      "Flux de știri economice, analize de politică monetară, evoluția piețelor de capital și statistici imobiliare verificate din România și CEE.",
    slug: "/news",
  });

  const breadcrumbSchema = createBreadcrumbJsonLd(
    [
      { label: "AiX Media", href: "/" },
      { label: "Știri Economice & Analize", href: "/news" },
    ],
    `${siteConfig.url}/news`
  );

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}

