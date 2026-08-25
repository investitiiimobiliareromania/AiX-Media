import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AiX Radio — Emisie & Analize Economice Programate | AiX Media",
  description:
    "Directorul stațiilor radio și emisiunilor de știri economice, analize macroeconomice și dezbateri financiare din România.",
  alternates: {
    canonical: `${siteConfig.url}/radio`,
    languages: {
      "ro-RO": `${siteConfig.url}/radio`,
      "x-default": `${siteConfig.url}/radio`,
    },
  },
  openGraph: {
    title: "AiX Radio — Emisie & Analize Economice Programate | AiX Media",
    description:
      "Directorul stațiilor radio și emisiunilor de știri economice, analize macroeconomice și dezbateri financiare din România.",
    url: `${siteConfig.url}/radio`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RadioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
