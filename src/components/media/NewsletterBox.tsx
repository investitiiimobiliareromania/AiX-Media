"use client";

import React, { useState } from "react";
import { Mail, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface NewsletterBoxProps {
  overline?: string;
  headline?: string;
  description?: string;
}

export function NewsletterBox({
  overline = "AiX Executive Intelligence",
  headline = "Subscribe to the Daily Macro & Capital Briefing",
  description = "Delivered every weekday at 07:00 AM before European markets open. Signal, not noise.",
}: NewsletterBoxProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section id="newsletter" className="my-14 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0f0e0a] via-[#090909] to-[#040404] border border-amber-500/30 shadow-2xl relative overflow-hidden text-center md:text-left">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            {overline}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {headline}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="w-full md:w-80 shrink-0">
          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
              <div className="font-bold">Subscription Confirmed</div>
              <p className="text-neutral-400 text-[11px]">Check your inbox for tomorrow&apos;s executive briefing.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="executive@company.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>GET EXECUTIVE BRIEFING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Zero spam • Unsubscribe anytime</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
