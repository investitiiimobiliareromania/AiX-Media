import { type Metadata } from "next";
import { PremiumHero } from "@/components/media/PremiumHero";
import { NewsletterBox } from "@/components/media/NewsletterBox";
import { DataDisclaimer } from "@/components/common/DataDisclaimer";
import { getAllEducationalArticles } from "@/lib/education/education-service";
import { AcademyHubOverview } from "@/components/education/AcademyHubOverview";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: "Academy & Bază de Cunoștințe Decizionale | AiX Media",
  },
  description:
    "Ghiduri educaționale complete, analize comparative (Why Yes / Why Not) și metodologii de evaluare pentru imobiliare, credite, asigurări, burse și afaceri.",
  alternates: {
    canonical: `${siteConfig.url}/academy`,
    languages: {
      "ro-RO": `${siteConfig.url}/academy`,
      "x-default": `${siteConfig.url}/academy`,
    },
  },
  openGraph: {
    title: "Academy & Bază de Cunoștințe Decizionale | AiX Media",
    description:
      "Ghiduri educaționale complete, analize comparative (Why Yes / Why Not) și metodologii de evaluare pentru imobiliare, credite, asigurări, burse și afaceri.",
    url: `${siteConfig.url}/academy`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy & Bază de Cunoștințe Decizionale | AiX Media",
    description:
      "Ghiduri educaționale complete, analize comparative (Why Yes / Why Not) și metodologii de evaluare pentru imobiliare, credite, asigurări, burse și afaceri.",
  },
};

export default function AcademyPage() {
  const articles = getAllEducationalArticles();

  return (
    <div className="space-y-12 pb-20 pt-4 text-neutral-100 max-w-7xl mx-auto px-4 sm:px-6">
      <PremiumHero
        eyebrow="AiX Academy • Bază Permanentă de Cunoștințe"
        headline="Educație Financiară, Ghiduri Tehnice &amp; Suport Decizional"
        description="Ghiduri practice verificate, concepte explicate în limbaj clar și analize obiective (De Ce Da / De Ce Nu / De Ce Acum) pentru decizii patrimoniale informate."
        ctaLabel="Explorează Ghidurile"
        ctaHref="#library"
      />

      <section id="library">
        <AcademyHubOverview initialArticles={articles} />
      </section>

      <DataDisclaimer type="general" />
      <NewsletterBox />
    </div>
  );
}
