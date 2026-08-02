"use client";


import { ArrowRight } from "lucide-react";

interface NewsletterBlockProps {
  title?: string;
  description?: string;
}

export function NewsletterBlock({ 
  title = "Informații Esențiale, Săptămânal.", 
  description = "Abonează-te la newsletter-ul nostru pentru a primi cele mai recente analize financiare și imobiliare." 
}: NewsletterBlockProps) {
  return (
    <div className="bg-[#0a0a0a] text-white p-8 md:p-12 border-t border-border mt-12 mb-12">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
          {title}
        </h3>
        <p className="text-white/60 mb-8 text-sm md:text-base leading-relaxed">
          {description}
        </p>
        <form className="w-full relative flex items-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Adresa de email" 
            className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors text-base"
            required
          />
          <button 
            type="submit" 
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors p-2"
            aria-label="Abonează-te"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
