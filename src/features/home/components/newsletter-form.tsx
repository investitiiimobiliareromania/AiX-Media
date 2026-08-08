"use client";

import { ArrowRight } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (!emailInput?.value) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Executive Subscriber",
          contact: emailInput.value,
          message: "Abonat din Homepage Newsletter Form",
          source: "AiX Media Homepage",
          cta: "Homepage Newsletter Form",
          pageUrl: typeof window !== "undefined" ? window.location.href : "N/A",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // ignore
    }
  }

  if (submitted) {
    return (
      <p
        role="status"
        className="border border-border bg-background px-4 py-3 text-center text-sm text-emerald-400 font-mono"
      >
        Mulțumim. Abonarea la Executive Briefing a fost înregistrată.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
      aria-label="Newsletter subscription"
    >
      <Input
        type="email"
        name="email"
        required
        placeholder="Email address"
        aria-label="Email address"
        autoComplete="email"
        className="h-11 flex-1 border-border bg-background px-4"
      />
      <Button type="submit" className="h-11 px-5">
        Subscribe
        <ArrowRight data-icon="inline-end" />
      </Button>
    </form>
  );
}
