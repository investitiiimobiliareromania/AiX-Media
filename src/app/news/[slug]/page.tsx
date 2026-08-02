import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArticleGrid } from "@/components/editorial/ArticleGrid";
import { NewsletterBlock } from "@/components/editorial/NewsletterBlock";
import { TableOfContents } from "@/components/editorial/TableOfContents";
import { generateNewsArticleSchema, estimateReadTime } from "@/lib/seo-helpers";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evoluția dobânzilor în 2026: Ce anticipează analiștii | Cristian Văduva",
  description: "O analiză detaliată a politicii monetare globale și a impactului acesteia asupra piețelor locale de creditare și real estate.",
  alternates: {
    canonical: "https://cristianvaduva.com/news/evolutia-dobanzilor-2026",
  },
  openGraph: {
    title: "Evoluția dobânzilor în 2026",
    description: "Analiză macroeconomică detaliată.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evoluția dobânzilor în 2026",
    description: "Analiză macroeconomică detaliată.",
  },
};

const articleBody = `Piața financiară globală traversează o perioadă de transformare profundă. După ani de politici monetare expansioniste, băncile centrale au recalibrat agresiv ratele dobânzilor pentru a tempera inflația. Acum, în 2026, ne aflăm într-un punct de inflexiune.

## Ce spun cifrele?
Indicatorii macroeconomici sugerează o stabilizare. ROBOR și IRCC reflectă aceste schimbări, impactând direct costul finanțării pentru companii și persoane fizice. Este esențial ca investitorii să înțeleagă dinamica acestor indicatori pentru a-și optimiza portofoliile.

> "Nu poți controla direcția vântului, dar poți ajusta pânzele." – Principiu fundamental în managementul riscului.

În sectorul imobiliar, costul ridicat al creditării a determinat o migrare către achizițiile cash în segmentul de lux, unde randamentele din chirii rămân atractive.

## Concluzii pentru investitori
Adaptabilitatea este cheia. Diversificarea portofoliului, utilizarea instrumentelor de hedging (cum ar fi asigurările financiare) și monitorizarea atentă a deciziilor de politică monetară sunt pași critici în acest mediu economic.`;

const jsonLd = generateNewsArticleSchema({
  title: "Evoluția dobânzilor în 2026: Ce anticipează analiștii și cum te poți pregăti.",
  description: "O analiză detaliată a politicii monetare globale și a impactului acesteia asupra piețelor locale de creditare și real estate.",
  slug: "evolutia-dobanzilor-2026",
  authorName: "Cristian Văduva",
  categoryName: "Macroeconomie",
});

const relatedArticles = [
  {
    category: "Investiții",
    title: "Cum să îți diversifici portofoliul în 2026",
    excerpt: "Strategii eficiente pentru minimizarea riscului.",
    date: "Azi",
    href: "/news/diversificare-portofoliu-2026",
  },
  {
    category: "Real Estate",
    title: "Noile tendințe în arhitectura rezidențială",
    excerpt: "Sustenabilitate și integrare tehnologică.",
    date: "Ieri",
    href: "/news/tendinte-arhitectura-rezidentiala",
  },
];

export default function ArticlePage() {
  const readTime = estimateReadTime(articleBody);

  return (
    <>
      {/* Schema.org NewsArticle JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main className="flex-1 pt-[72px]">
        {/* Article Hero */}
        <article>
          <header className="container mx-auto px-4 md:px-6 py-12 md:py-24 max-w-4xl">
            <div className="mb-6 text-sm font-bold uppercase tracking-widest text-red-600">
              Macroeconomie
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-balance leading-[1.1] mb-6 text-foreground">
              Evoluția dobânzilor în 2026: Ce anticipează analiștii și cum te poți pregăti.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-8 leading-relaxed font-medium">
              O analiză detaliată a politicii monetare globale și a impactului acesteia asupra piețelor locale de creditare și real estate.
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-border gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-foreground rounded-full" />
                <div>
                  <div className="font-bold text-foreground">Cristian Văduva</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    23 Iulie 2026 • {readTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="hover:text-foreground transition-colors p-2"><FaFacebook className="w-5 h-5" /></button>
                <button className="hover:text-foreground transition-colors p-2"><FaTwitter className="w-5 h-5" /></button>
                <button className="hover:text-foreground transition-colors p-2"><FaLinkedin className="w-5 h-5" /></button>
                <button className="hover:text-foreground transition-colors p-2"><FaLink className="w-5 h-5" /></button>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="w-full aspect-[21/9] bg-muted flex items-center justify-center border-y border-border overflow-hidden">
             <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-white/10 font-heading font-black text-9xl tracking-tighter">
               DATA
             </div>
          </div>

          {/* Article Body */}
          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-prose mx-auto">
              {/* Dynamic Table of Contents */}
              <TableOfContents content={articleBody} />

              <div className="prose prose-lg md:prose-xl prose-headings:font-heading prose-headings:font-bold prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                <p>
                  Piața financiară globală traversează o perioadă de transformare profundă. După ani de politici monetare expansioniste, băncile centrale au recalibrat agresiv ratele dobânzilor pentru a tempera inflația. Acum, în 2026, ne aflăm într-un punct de inflexiune.
                </p>
                <h2 id="ce-spun-cifrele">Ce spun cifrele?</h2>
                <p>
                  Indicatorii macroeconomici sugerează o stabilizare. ROBOR și IRCC reflectă aceste schimbări, impactând direct costul finanțării pentru companii și persoane fizice. Este esențial ca investitorii să înțeleagă dinamica acestor indicatori pentru a-și optimiza portofoliile.
                </p>
                <blockquote>
                  “Nu poți controla direcția vântului, dar poți ajusta pânzele.” – Principiu fundamental în managementul riscului.
                </blockquote>
                <p>
                  În sectorul imobiliar, costul ridicat al creditării a determinat o migrare către achizițiile cash în segmentul de lux, unde randamentele din chirii rămân atractive.
                </p>
                <h2 id="concluzii-pentru-investitori">Concluzii pentru investitori</h2>
                <p>
                  Adaptabilitatea este cheia. Diversificarea portofoliului, utilizarea instrumentelor de hedging (cum ar fi asigurările financiare) și monitorizarea atentă a deciziilor de politică monetară sunt pași critici în acest mediu economic.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Stories & Newsletter */}
        <div className="bg-muted/30 border-t border-border">
          <ArticleGrid title="Articole Recomandate" articles={relatedArticles} />
          <div className="container mx-auto px-4 md:px-6 pb-24">
             <NewsletterBlock />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
