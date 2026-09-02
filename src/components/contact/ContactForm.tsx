"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { trackLeadConversion } from "@/lib/analytics";

interface ContactFormProps {
  ctaLabel?: string;
  sourceContext?: string;
  className?: string;
  compact?: boolean;
}

export function ContactForm({
  ctaLabel = "Trimite Solicitarea",
  sourceContext = "AiX Media General Inquiry",
  className = "",
  compact = false,
}: ContactFormProps) {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [gdprConsent, setGdprConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setStatus(null);

    if (!gdprConsent) {
      setStatus({ type: "error", text: "Trebuie să acceptați politica de confidențialitate." });
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setStatus({ type: "error", text: "Vă rugăm să introduceți un nume valabil." });
      return;
    }

    if (!contact.trim() || contact.trim().length < 3) {
      setStatus({ type: "error", text: "Vă rugăm să introduceți un telefon sau email valabil." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          message: message.trim(),
          source: "AiX Media",
          cta: sourceContext,
          pageUrl: pathname || typeof window !== "undefined" ? window.location.href : "N/A",
          website: honeypot,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        trackLeadConversion(sourceContext, pathname || "Contact Form");
        setStatus({
          type: "success",
          text: data.message || "Mulțumim. Am primit solicitarea și vom reveni în cel mai scurt timp.",
        });
        setName("");
        setContact("");
        setMessage("");
        setGdprConsent(false);
      } else {
        setStatus({
          type: "error",
          text: data?.error || "Eroare la trimiterea solicitării. Vă rugăm încercați din nou.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Eroare de conexiune la server. Vă rugăm încercați din nou.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-6 md:p-8 shadow-xl ${className}`}>
      {status?.type === "success" ? (
        <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
          <h4 className="font-serif text-lg font-bold text-white">Solicitare Înregistrată</h4>
          <p className="text-xs font-mono text-neutral-300 max-w-md mx-auto leading-relaxed">
            {status.text}
          </p>
          <button
            onClick={() => setStatus(null)}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-elevated)] text-white text-xs font-mono font-semibold transition-colors border border-[var(--border)]"
          >
            Trimite o nouă solicitare
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="hidden">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status?.type === "error" && (
            <div
              aria-live="polite"
              className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{status.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Nume complet <span className="text-amber-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex. Nume Prenume"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-white text-xs placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none transition-colors font-mono shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-info" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Telefon sau Email <span className="text-amber-500">*</span>
              </label>
              <input
                id="contact-info"
                type="text"
                required
                autoComplete="email tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="07xx xxx xxx sau email@domeniu.ro"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-white text-xs placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none transition-colors font-mono shadow-xs"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  className="w-4 h-4 text-amber-600 bg-[var(--surface-elevated)] border border-[var(--border)] rounded focus:ring-amber-500"
                />
                <label htmlFor="gdpr-consent" className="ml-2 text-xs text-neutral-400">
                  Sunt de acord cu <Link href="/privacy" className="text-amber-400 hover:underline font-medium">Politica de confidențialitate</Link>
                </label>
              </div>
            </div>
          </div>

          {!compact && (
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Mesaj / Detalii solicitare (opțional)
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Descrieți scurt proiectul sau întrebarea dvs..."
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-white text-xs placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none transition-colors font-mono resize-none shadow-xs"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[var(--surface-elevated)] hover:bg-neutral-200 disabled:opacity-50 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[44px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Se procesează...</span>
              </>
            ) : (
              <>
                <span>{ctaLabel}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

