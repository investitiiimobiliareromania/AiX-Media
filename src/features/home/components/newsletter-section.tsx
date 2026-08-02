import { Heading, Overline, Text } from "@/components/common/typography";
import { Container, Section } from "@/components/layout/container";
import { NewsletterForm } from "@/features/home/components/newsletter-form";

export function NewsletterSection() {
  return (
    <Section spacing="lg" aria-labelledby="newsletter-title">
      <Container size="narrow">
        <div className="border border-border bg-surface/40 px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-xl space-y-4 text-center">
            <Overline>Newsletter</Overline>
            <Heading as="h2" level="h3" id="newsletter-title">
              The AiX Briefing
            </Heading>
            <Text tone="muted">
              A concise morning digest for Romania&apos;s business leaders.
              Subscribe to receive editorial updates when publishing begins.
            </Text>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
