import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArticleGrid } from "@/components/editorial/ArticleGrid";
import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    title: `Profil Autor | Cristian Văduva`,
    description: `Articole și analize scrise de autor.`,
    alternates: {
      canonical: `${domain}/authors/${slug}`,
    },
  };
}

const authorArticles = [
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
];

export default function AuthorPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px]">
        {/* Author Profile Header */}
        <section className="bg-foreground text-background pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl flex flex-col md:flex-row items-start gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full border-2 border-white/20 flex items-center justify-center font-heading font-black text-3xl md:text-5xl text-white">
                CV
              </div>
              <div>
                <div className="mb-4 inline-flex items-center gap-2 border border-white/20 px-3 py-1 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/60">
                  Senior Editorial Analyst
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4">
                  Cristian Văduva
                </h1>
                <p className="text-lg md:text-xl text-white/60 font-medium text-pretty leading-relaxed mb-6 max-w-2xl">
                  Fondator AiX OS. Expert în asigurări premium Generali, analize imobiliare de lux și optimizarea riscurilor financiare corporate.
                </p>
                <div className="flex items-center gap-4 text-white/60">
                  <a href="#" className="hover:text-white transition-colors p-2"><FaLinkedin className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition-colors p-2"><FaTwitter className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-white transition-colors p-2"><FaGlobe className="w-5 h-5" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author Articles */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <ArticleGrid title="Articole Scrise de Cristian Văduva" articles={authorArticles} />
        </div>
      </main>
      <Footer />
    </>
  );
}
