import { SectionHeader } from "@/components/editorial/section-header";
import { MarketRow } from "@/components/editorial/market-row";
import { Container, Section } from "@/components/layout/container";
import { marketGroups } from "@/constants/markets";

export function MarketsOverview() {
  return (
    <Section spacing="lg" aria-labelledby="markets-title">
      <Container size="wide">
        <SectionHeader
          overline="Markets"
          title="Markets Overview"
          description="Live market interface for indices, currencies, and commodities. Data integration arrives in a later phase."
          headingLevel="h2"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {marketGroups.map((group) => (
            <div
              key={group.title}
              className="border border-border bg-surface/40 p-6"
            >
              <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  {group.title}
                </h3>
                <div className="hidden font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:grid sm:grid-cols-2 sm:gap-4">
                  <span>Last</span>
                  <span className="text-right">Chg</span>
                </div>
              </div>

              <div>
                {group.instruments.map((instrument) => (
                  <MarketRow key={instrument.symbol} instrument={instrument} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
