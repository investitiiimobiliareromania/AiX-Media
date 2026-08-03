import React from "react";

interface CategoryHeroProps {
  title: string;
  description: string;
  label?: string;
}

export function CategoryHero({ title, description, label }: CategoryHeroProps) {
  return (
    <section className="bg-foreground text-background pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border transition-colors duration-300" aria-labelledby="category-hero-title">
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-4xl">
          {label && (
            <div className="mb-8 inline-flex items-center gap-2 border border-white/30 px-3 py-1 bg-white/10 text-xs font-bold uppercase tracking-widest text-white/80">
              <span className="w-2 h-2 bg-white rounded-full" />
              {label}
            </div>
          )}
          <h1 id="category-hero-title" className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter text-balance leading-[0.95] mb-8">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium text-pretty leading-relaxed max-w-2xl">
            {description}
          </p>
        </header>
      </div>
    </section>
  );
}
