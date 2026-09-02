"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Abonat Footer",
          contact: email,
          message: "Abonat din footer la sinteza AiX Media",
          source: "AiX Media Footer",
          pageUrl: typeof window !== "undefined" ? window.location.href : "N/A",
        }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // ignore
    }
  };

  if (subscribed) {
    return (
      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
        Abonare confirmată!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="space-y-2">
      <input
        id="footer-newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        aria-label="Adresa de email pentru abonare la sinteza AiX Media"
        placeholder="adresa@email.com"
        className="w-full px-3.5 py-2.5 text-xs bg-[var(--surface-editorial)] border border-[var(--border)] rounded-xl focus:border-amber-500 focus:outline-none text-[var(--foreground)] placeholder:text-neutral-500 shadow-xs"
      />
      <button type="submit" className="w-full py-2.5 bg-[var(--surface-editorial)] hover:bg-[var(--surface)] text-[var(--foreground)] font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
        <span>Abonează-te</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
