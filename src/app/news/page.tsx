import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CategoryHero } from "@/components/editorial/CategoryHero";
import { ArticleGrid } from "@/components/editorial/ArticleGrid";
import { TrendingList } from "@/components/editorial/TrendingList";
import { NewsletterBlock } from "@/components/editorial/NewsletterBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | Cristian Văduva",
  description: "Ultimele știri și analize financiare, imobiliare și de business.",
};

const latestArticles = [
  {
    category: "Macroeconomie",
    title: "Evoluția dobânzilor în 2026: Ce anticipează BNR",
    excerpt: "Analiză detaliată a politicii monetare și impactul asupra creditării.",
    date: "Azi",
    href: "/news/evolutie-dobanzi-2026",
  },
  {
    category: "Real Estate",
    title: "Piața de birouri din București își revine spectaculos",
    excerpt: "Tranzacțiile de închiriere au atins un nou record în trimestrul III.",
    date: "Ieri",
    href: "/news/piata-birouri-bucuresti",
  },
  {
    category: "Asigurări",
    title: "Cum să te protejezi împotriva riscurilor cibernetice",
    excerpt: "Ghid complet pentru IMM-uri privind asigurările de securitate cibernetică.",
    date: "2 Zile Urmă",
    href: "/news/protectie-riscuri-cibernetice",
  },
  {
    category: "Business",
    title: "Noi oportunități de finanțare pentru startup-uri tehnologice",
    excerpt: "Fondurile europene disponibile pentru inovație în 2026.",
    date: "3 Zile Urmă",
    href: "/news/finantare-startup-tehnologice",
  }
];

const trendingArticles = [
  { title: "Top 10 zone rezidențiale de lux în dezvoltare", href: "/news/top-zone-rezidentiale" },
  { title: "Ghidul investitorului imobiliar începător", href: "/news/ghid-investitor-imobiliar" },
  { title: "De ce asigurarea de viață este o investiție", href: "/news/asigurare-viata-investitie" },
  { title: "Impactul AI asupra pieței muncii", href: "/news/impact-ai-piata-muncii" },
];

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <CategoryHero 
          title="Analize și Știri" 
          description="Fii la curent cu cele mai importante evenimente și tendințe din piața financiară, imobiliară și de business." 
          label="Market Pulse"
        />
        
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
               <ArticleGrid title="Cele Mai Recente" articles={latestArticles} />
            </div>
            <aside className="lg:col-span-4">
               <TrendingList articles={trendingArticles} />
               <NewsletterBlock />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
