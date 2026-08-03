import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Overline } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

const platformStats = [
  { label: "Editorial Verticals", value: "6" },
  { label: "Intelligence Categories", value: "12+" },
  { label: "Markets Covered", value: "3" },
] as const;

export function HeroSection() {
  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Section spacing="none" aria-labelledby="home-hero-title">
      <div className="relative overflow-hidden border-b border-border">
        {/* Atmospheric background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.11_85/0.08)_0%,transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <div className="grid gap-12 py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20 lg:py-32">

            {/* Left: editorial statement */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-gold flex-shrink-0" aria-hidden />
                <Overline className="text-gold">{siteConfig.tagline}</Overline>
              </div>

              <h1
                id="home-hero-title"
                className="font-display text-balance text-foreground"
                style={{
                  fontSize: "var(--text-display-3xl)",
                  lineHeight: "1.02",
                  letterSpacing: "-0.025em",
                  maxWidth: "14ch",
                }}
              >
                {siteConfig.name}
              </h1>

              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Private intelligence for people making important decisions. Editorial
                coverage across real estate, insurance, investments, and Romania&apos;s
                capital markets.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/real-estate"
                  className="group inline-flex items-center gap-2.5 bg-foreground px-7 py-3.5 text-sm font-semibold tracking-wide text-background transition-colors hover:bg-gold"
                >
                  Explore Intelligence
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
                >
                  Latest Analysis
                </Link>
              </div>
            </div>

            {/* Right: meta information */}
            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <dl className="space-y-6">
                <div>
                  <dt className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    Edition
                  </dt>
                  <dd className="mt-2 font-mono text-sm text-foreground">{today}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    Network
                  </dt>
                  <dd className="mt-2 font-mono text-sm text-foreground">
                    {siteConfig.url.replace("https://", "")}
                  </dd>
                </div>
                <div className="space-y-3 border-t border-border pt-6">
                  {platformStats.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-8">
                      <dt className="text-xs text-muted-foreground/70">{label}</dt>
                      <dd className="font-mono text-sm font-medium text-gold">{value}</dd>
                    </div>
                  ))}
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
