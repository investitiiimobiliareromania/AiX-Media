"use client";

import React, { useState } from "react";
import { Mail, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface NewsletterBoxProps {
  overline?: string;
  headline?: string;
  description?: string;
}

export function NewsletterBox({
  overline = "AiX Executive Briefing",
  headline = "Abonează-te la Sinteza Economică & Imobiliară",
  description = "Primiți direct pe email rapoartele instituționale, deciziile monetare BNR și analizele din piața imobiliară.",
}: NewsletterBoxProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Abonat Sinteză",
          contact: email,
          message: "Abonare la sinteza periodică AiX Media",
          source: "AiX Media Newsletter Section",
          cta: headline,
          pageUrl: typeof window !== "undefined" ? window.location.href : "N/A",
        }),
      });

      if (res.ok) {
        setSubscribed(true);
      }
    } catch {
      // ignore
    }
  };

  return (
    <section id="newsletter" className="my-10 p-8 md:p-10 rounded-2xl bg-[#111317] border border-[#262932] text-center md:text-left shadow-xl text-neutral-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            {overline}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
            {headline}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed font-serif">
            {description}
          </p>
        </div>

        <div className="w-full md:w-80 shrink-0">
          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
              <div className="font-bold">Abonare confirmată cu succes</div>
              <p className="text-neutral-400 text-[11px]">Veți primi următoarea sinteză oficială AiX Media.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresa.ta@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#171920] border border-[#262932] text-white text-xs placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none transition-colors shadow-xs"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
              >
                <span>ABONEAZĂ-TE LA SINTEZĂ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                <span>Confidențialitate garantată • Dezabonare facilă</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

