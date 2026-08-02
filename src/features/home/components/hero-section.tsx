import { Heading, Overline, Text } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format";

export function HeroSection() {
  const today = formatDate(new Date(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Section spacing="lg" aria-labelledby="home-hero-title">
      <Container size="wide">
        <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:pb-16">
          <div className="space-y-6">
            <Overline>AiXLuxury Media Division</Overline>
            <Heading as="h1" level="h1" id="home-hero-title">
              {siteConfig.name}
            </Heading>
            <Text size="lg" tone="muted" className="max-w-2xl">
              {siteConfig.tagline}. Editorial coverage across the forces shaping
              Romania&apos;s economy, capital markets, and luxury landscape.
            </Text>
          </div>

          <div className="border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <dl className="space-y-4">
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
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
