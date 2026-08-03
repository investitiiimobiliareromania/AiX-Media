"use client";

import { ArrowRight } from "lucide-react";

import { Heading, Overline, Text } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";

interface EmptyStateProps {
  category: string;
  headline?: string;
  description?: string;
}

export function EmptyState({
  category,
  headline = "Intelligence reports are being prepared.",
  description = "Our editorial intelligence team is analyzing market data and drafting exclusive reports for this category. Register to receive the first dispatch.",
}: EmptyStateProps) {
  return (
    <Section spacing="xl" className="border-t border-border">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Left: editorial statement */}
          <div className="flex flex-col gap-8">
            {/* Animated status indicator */}
            <div className="flex items-center gap-4">
              <div className="relative flex h-5 w-5 items-center justify-center" aria-hidden>
                <span className="absolute h-5 w-5 animate-ping rounded-full bg-gold/20" />
                <span className="relative h-2 w-2 rounded-full bg-gold" />
              </div>
              <Overline className="text-gold">{category} Intelligence</Overline>
            </div>

            <Heading as="h2" level="h2" className="max-w-[22ch] text-balance">
              {headline}
            </Heading>

            <Text
              tone="muted"
              size="lg"
              className="max-w-xl text-pretty"
            >
              {description}
            </Text>

            {/* Trust signals */}
            <div className="flex flex-col gap-3 border-l-2 border-gold/30 pl-6">
              {[
                "First reports expected within 30 days",
                "Exclusive market analysis and intelligence",
                "No spam — unsubscribe at any time",
              ].map((item) => (
                <p key={item} className="text-sm text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Right: newsletter signup */}
          <div className="border border-border bg-surface/40 p-8 md:p-10">
            <Overline className="mb-4 text-gold">Stay informed</Overline>
            <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-foreground">
              Receive the first intelligence report.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enter your email and we&apos;ll notify you the moment the first
              report is published.
            </p>

            <form
              className="mt-8 flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Intelligence alert signup"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="empty-state-email"
                  className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
                >
                  Email address
                </label>
                <input
                  id="empty-state-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="border border-border bg-background/60 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 bg-foreground py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Alert me when published
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </form>

            <p className="mt-4 text-[0.65rem] leading-relaxed text-muted-foreground/50">
              By registering you agree to our{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Privacy Policy
              </a>
              . Data will not be shared with third parties.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
