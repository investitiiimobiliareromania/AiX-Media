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
    <section id="newsletter" className="my-10 p-8 md:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 text-center md:text-left shadow-xs">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2.5 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-mono font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-amber-700" />
            {overline}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 leading-tight">
            {headline}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="w-full md:w-80 shrink-0">
          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
              <div className="font-bold">Abonare confirmată cu succes</div>
              <p className="text-neutral-600 text-[11px]">Veți primi următoarea sinteză oficială AiX Media.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresa.ta@email.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-300 text-neutral-900 text-xs placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none transition-colors shadow-xs"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>ABONEAZĂ-TE LA SINTEZĂ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3 h-3 text-neutral-400" />
                <span>Confidențialitate garantată • Dezabonare facilă</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
