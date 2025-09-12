import * as React from "react";
import { cn } from "@/lib/utils";

type ParagraphSize = "sm" | "md" | "lg";
type HeadingSize = "sm" | "md" | "lg";
type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";

const weights: Record<FontWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

// Size-based mappings for each heading level
const HEADING_SIZES: Record<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  Record<HeadingSize, string>
> = {
  h1: {
    sm: "text-4xl md:text-5xl",
    md: "text-5xl md:text-6xl",
    lg: "text-6xl md:text-7xl",
  },
  h2: {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
  },
  h3: {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
  },
  h4: {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  },
  h5: {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
  },
  h6: {
    sm: "text-base md:text-lg",
    md: "text-lg md:text-xl",
    lg: "text-xl md:text-2xl",
  },
};

function createHeading(
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  defaultWeight: FontWeight
) {
  const Comp = ({
    weight = defaultWeight,
    size = "md",
    className,
    ...props
  }: {
    weight?: FontWeight;
    size?: HeadingSize;
  } & React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <Tag
        className={cn(
          "scroll-m-20 tracking-tight",
          HEADING_SIZES[Tag][size],
          weights[weight],
          className
        )}
        {...props}
      />
    );
  };
  Comp.displayName = Tag.toUpperCase();
  return Comp;
}

export const H1 = createHeading("h1", "semibold");
export const H2 = createHeading("h2", "semibold");
export const H3 = createHeading("h3", "semibold");
export const H4 = createHeading("h4", "semibold");
export const H5 = createHeading("h5", "semibold");
export const H6 = createHeading("h6", "semibold");

const P_SIZES: Record<ParagraphSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const P = ({
  size = "md",
  className,
  ...props
}: { size?: ParagraphSize } & React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(P_SIZES[size], "leading-7", className)} {...props} />
);
P.displayName = "p";

export const Blockquote = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote className={cn("italic", className)} {...props} />
);
Blockquote.displayName = "blockquote";

export const Code = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      "font-mono text-sm font-semibold py-0.5 px-1 rounded-sm",
      className
    )}
    {...props}
  />
);
Code.displayName = "code";
