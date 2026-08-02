"use client";

import * as React from "react"; import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bookmark, ChevronRight, Filter, BookOpen, Clock, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllArticles, categories } from "@/lib/academy-data";

export function AcademyHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toate");
  const [activeDifficulty, setActiveDifficulty] = useState("Toate");
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const allArticles = getAllArticles();

  useEffect(() => {
    const saved = localStorage.getItem("aix_academy_bookmarks");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBookmarkedSlugs(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    const next = bookmarkedSlugs.includes(slug) ? bookmarkedSlugs.filter(s => s !== slug) : [...bookmarkedSlugs, slug];
    setBookmarkedSlugs(next);
    localStorage.setItem("aix_academy_bookmarks", JSON.stringify(next));
  };

  const filteredArticles = allArticles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Toate" || a.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "Toate" || a.difficulty === activeDifficulty;
    const matchesBookmarks = showBookmarksOnly ? bookmarkedSlugs.includes(a.slug) : true;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmarks;
  });

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      
      {/* Search & Filters */}
      <div className="glass p-6 md:p-8 rounded-[3rem] border border-border shadow-sm bg-white relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Caută în academie (ex: 'CASCO', 'Randament')..."
            className="h-16 pl-14 pr-6 rounded-full border-2 bg-slate-50 focus-visible:ring-0 focus-visible:border-slate-300 text-lg shadow-inner"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-end gap-3 flex-wrap">
          <Button 
            variant="outline" 
            className={`h-12 rounded-full font-bold border-border ${showBookmarksOnly ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-white'}`}
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${showBookmarksOnly ? 'fill-amber-500 text-amber-500' : ''}`} /> 
            Salve {bookmarkedSlugs.length > 0 && `(${bookmarkedSlugs.length})`}
          </Button>

          <div className="relative group">
            <Button variant="outline" className="h-12 rounded-full font-bold border-border bg-white group-hover:bg-slate-50">
              <Filter className="w-4 h-4 mr-2" /> Dificultate: {activeDifficulty}
            </Button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
              {["Toate", "Începător", "Intermediar", "Avansat"].map(diff => (
                <button 
                  key={diff} 
                  onClick={() => setActiveDifficulty(diff)}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-medium transition-colors ${activeDifficulty === diff ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Row */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar items-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white border border-border text-slate-600 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-bold font-heading mb-2">Nu am găsit articole</h3>
          <p>Încearcă să schimbi termenii de căutare sau filtrele aplicate.</p>
          <Button variant="outline" className="mt-6 rounded-full" onClick={() => { setSearchTerm(""); setActiveCategory("Toate"); setActiveDifficulty("Toate"); setShowBookmarksOnly(false); }}>
            Resetează filtrele
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group glass bg-white rounded-[2.5rem] border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 relative"
              >
                {/* Visual Category Header */}
                <div className="h-32 bg-slate-50 border-b border-border/50 relative overflow-hidden flex items-end p-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 z-10">{article.category}</span>
                  
                  {/* Bookmark Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(article.slug); }}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-200 transition-colors z-20"
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarkedSlugs.includes(article.slug) ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold font-heading leading-tight mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">
                    <a href={`/academy/${article.slug}`} className="before:absolute before:inset-0">
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6 flex-1 text-sm">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
                      <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> {article.difficulty}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
