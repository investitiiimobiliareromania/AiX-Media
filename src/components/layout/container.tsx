import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      narrow: "max-w-3xl",
      default: "max-w-6xl",
      wide: "max-w-7xl",
      full: "max-w-[1440px]",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

type ContainerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export function Container({
  className,
  size,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size, className }))} {...props} />
  );
}

const sectionVariants = cva("", {
  variants: {
    spacing: {
      none: "",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

type SectionProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    as?: ElementType;
  };

export function Section({
  as: Component = "section",
  className,
  spacing,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(sectionVariants({ spacing, className }))}
      {...props}
    />
  );
}
