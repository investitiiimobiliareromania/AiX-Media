import { Heading, Overline, Text } from "@/components/common/typography";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  overline?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
};

export function SectionHeader({
  overline,
  title,
  description,
  action,
  className,
  headingLevel = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        {overline ? <Overline>{overline}</Overline> : null}
        <Heading as={headingLevel} level={headingLevel}>
          {title}
        </Heading>
        {description ? (
          <Text tone="muted" className="max-w-2xl">
            {description}
          </Text>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
