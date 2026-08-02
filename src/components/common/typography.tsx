import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-display tracking-tight text-balance", {
  variants: {
    level: {
      h1: "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
      h2: "text-3xl leading-[1.1] sm:text-4xl lg:text-5xl",
      h3: "text-2xl leading-[1.15] sm:text-3xl",
      h4: "text-xl leading-[1.2] sm:text-2xl",
      h5: "text-lg leading-[1.25] sm:text-xl",
      h6: "text-base leading-[1.3] sm:text-lg",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      gold: "text-gold",
    },
  },
  defaultVariants: {
    level: "h2",
    tone: "default",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingLevel;
  };

export function Heading({
  as,
  level,
  tone,
  className,
  ...props
}: HeadingProps) {
  const Component = as ?? level ?? "h2";

  return (
    <Component
      className={cn(
        headingVariants({ level: level ?? (Component as HeadingLevel), tone }),
        className,
      )}
      {...props}
    />
  );
}

const textVariants = cva("text-pretty", {
  variants: {
    size: {
      xs: "text-xs leading-5",
      sm: "text-sm leading-6",
      base: "text-base leading-7",
      lg: "text-lg leading-8",
      xl: "text-xl leading-8",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      gold: "text-gold",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
    weight: "normal",
  },
});

type TextProps = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: ElementType;
  };

export function Text({
  as: Component = "p",
  size,
  tone,
  weight,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size, tone, weight }), className)}
      {...props}
    />
  );
}

type OverlineProps = HTMLAttributes<HTMLSpanElement>;

export function Overline({ className, ...props }: OverlineProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-medium tracking-[0.24em] text-gold uppercase",
        className,
      )}
      {...props}
    />
  );
}
