"use client";

import { ArrowRight, Lock } from "lucide-react";

import { Overline } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";

interface NewsletterPremiumProps {
  overline?: string;
  headline?: string;
  description?: string;
}

const trustItems = [
  "Weekly intelligence digest",
  "No advertising",
  "Unsubscribe anytime",
] as const;

export function NewsletterPremium({
  overline = "Intelligence Briefing",
  headline = "Receive private intelligence reports.",
  description = "A curated briefing covering Romania's real estate, insurance, and investment markets. Delivered to senior professionals who need signal, not noise.",
}: NewsletterPremiumProps) {
  return (
    <Section spacing="lg" className="border-t border-border">
      <Container size="wide">
        <div className="relative overflow-hidden border border-border bg-surface/40">
          {/* Atmospheric gold gradient — top right */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.11 85 / 0.10) 0%, transparent 65%)",
            }}
            aria-hidden
          />
          {/* Fine grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            aria-hidden
          />

          <div className="relative grid gap-12 p-8 md:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* ── Left: editorial copy ── */}
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-5">
                {/* Gold rule + overline */}
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold flex-shrink-0" aria-hidden />
                  <Overline className="text-gold">{overline}</Overline>
                </div>

                <h2
                  className="font-display font-medium text-balance text-foreground tracking-tight"
                  style={{ fontSize: "clamp(1.75rem, 2vw + 1rem, 2.5rem)", lineHeight: "1.1" }}
                >
                  {headline}
                </h2>

                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-x-7 gap-y-2.5">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-gold flex-shrink-0" aria-hidden />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="flex flex-col justify-center">
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter subscription"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="newsletter-premium-email"
                    className="block text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase"
                  >
                    Email address
                  </label>
                  <input
                    id="newsletter-premium-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full border border-border bg-background/60 px-4 py-4 text-base text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2.5 bg-foreground py-4 text-sm font-semibold text-background transition-colors hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Subscribe to Intelligence
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </button>

                <p className="text-[0.65rem] leading-relaxed text-muted-foreground/50">
                  By subscribing you agree to our{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                  . Data will not be shared with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
