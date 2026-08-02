"use client";

import * as React from "react"; import { useEffect, useState } from "react";
import { Clock, Zap, ChevronLeft, Bookmark, Share2, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Article } from "@/lib/academy-data";
import ReactMarkdown from "react-markdown";

interface ArticleContentProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleContent({ article, relatedArticles }: ArticleContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    const saved = localStorage.getItem("aix_academy_bookmarks");
    if (saved) {
      const parsed: string[] = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBookmarked(parsed.includes(article.slug));
    }
  }, [article.slug]);

  const toggleBookmark = () => {
    const saved = localStorage.getItem("aix_academy_bookmarks");
    let parsed: string[] = saved ? JSON.parse(saved) : [];
    
    if (parsed.includes(article.slug)) {
      parsed = parsed.filter(s => s !== article.slug);
      setIsBookmarked(false);
    } else {
      parsed.push(article.slug);
      setIsBookmarked(true);
    }
    localStorage.setItem("aix_academy_bookmarks", JSON.stringify(parsed));
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiat în clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-24 selection:bg-slate-900 selection:text-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-[72px] md:top-[85px] z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 mb-12">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/academy" className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Înapoi la Academie
          </Link>
          <div className="flex gap-2">
            <button onClick={async () => {
              const { generateGenericPDF } = await import('@/lib/pdf-generator');
              generateGenericPDF(
                article.title, 
                article.excerpt, 
                article.pdfSummary || "Sumar nespecificat.", 
                `AiX-Academy-${article.slug}`
              );
            }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors" title="Descarcă PDF">
              Descarcă PDF
            </button>
            <button onClick={handleShare} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
            {mounted && (
              <button onClick={toggleBookmark} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isBookmarked ? 'bg-amber-50 text-amber-500 border border-amber-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-200'}`} title="Bookmark">
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 max-w-7xl">
        {/* Main Content Area */}
        <article className="w-full lg:w-8/12">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              <span className="text-blue-600">{article.category}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> {article.difficulty}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
              {article.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
              {article.excerpt}
            </p>
          </header>

          {/* Table of Contents */}
          <div className="p-6 md:p-8 bg-slate-50 rounded-lg border border-slate-100 mb-12">
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" /> Cuprinsul Articolului
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Acest ghid extins (aprox. 1500+ cuvinte) acoperă definițiile fundamentale, calculele matematice ascunse, sfaturi pentru negociere cu asiguratorul/banca și pașii critici în caz de daună. Citește-l integral pentru o perspectivă de nivel expert.
            </p>
          </div>

          {/* HTML Rendered Content */}
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-xl">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Acțiune Recomandată</p>
              <h4 className="text-2xl font-bold text-slate-900">Aplică teoria în practică</h4>
            </div>
            <Button className="h-14 rounded-full bg-slate-900 text-white font-bold px-8 text-lg w-full md:w-auto hover:bg-blue-600 transition-all duration-300" asChild>
              <a href="/advisor">Deschide Recomandă-mi Asigurarea Potrivită</a>
            </Button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-full lg:w-4/12 flex flex-col gap-8">
          {/* Author Card */}
          <div className="glass p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-100 mb-6 overflow-hidden">
              <Image src="/cv-hero.png" alt="Cristian Văduva" width={500} height={500} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold font-heading text-xl text-slate-900 mb-1">Cristian Văduva</h3>
            <p className="text-sm text-blue-600 font-bold mb-4 uppercase tracking-wider">Expert Consultant</p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">Autorul acestui ghid. Cu o experiență vastă în asset protection și real estate, Cristian traduce conceptele financiare complexe în strategii clare.</p>
            <Button variant="outline" className="w-full rounded-full border-slate-200" asChild>
              <a href="/contact">Programează o discuție</a>
            </Button>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="glass p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm">
              <h3 className="font-bold font-heading text-lg text-slate-900 mb-6 uppercase tracking-wider">Articole Similare</h3>
              <div className="flex flex-col gap-6">
                {relatedArticles.map(rel => (
                  <Link key={rel.slug} href={`/academy/${rel.slug}`} className="group block">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">{rel.category}</span>
                    <h4 className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{rel.title}</h4>
                    <span className="text-xs text-slate-500 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" /> {rel.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="glass p-8 rounded-[2.5rem] bg-blue-600 text-white border border-blue-500 shadow-xl overflow-hidden relative">
            <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
              <Zap className="w-40 h-40" />
            </div>
            <h3 className="font-bold font-heading text-2xl mb-4 relative z-10">AiX Life Simulator</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-8 relative z-10">Nu doar citi despre planificare, testeaz-o. Simulează impactul achiziției unei case sau apariției unui copil asupra scorului tău de protecție.</p>
            <Button className="w-full rounded-full bg-white text-blue-600 font-bold hover:bg-slate-50 relative z-10" asChild>
              <a href="/simulator">Deschide Simulatorul <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
