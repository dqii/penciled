import React from "react";
import { Ticker, TickerContent, TickerItem } from "@/components/layout/ticker";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-6 md:h-7",
  md: "h-7 md:h-8",
  lg: "h-8 md:h-10",
};

export interface LogoItem {
  name?: string;
  href: string;
}

export interface LogosTickerProps
  extends Omit<React.ComponentProps<typeof Ticker>, "direction"> {
  items: LogoItem[];
  direction?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "grayscale" | "color" | "monochrome";
  theme?: "light" | "dark" | "auto" | "auto-inverse";
  inverse?: boolean;
}

function getFilterClasses(
  variant: "color" | "grayscale" | "monochrome" = "color",
  theme: "light" | "dark" | "auto" | "auto-inverse" = "auto",
  inverse = false
): string {
  if (inverse) {
    if (theme === "auto") theme = "auto-inverse";
    if (theme === "light") theme = "dark";
    if (theme === "dark") theme = "light";
  }

  if (variant === "color") return "";

  if (variant === "grayscale") {
    if (theme === "light") return "grayscale opacity-70";
    if (theme === "dark") return "grayscale invert opacity-70";
    if (theme === "auto-inverse")
      return "grayscale invert opacity-70 dark:invert-0";
    return "grayscale opacity-70 dark:invert";
  }

  if (variant === "monochrome") {
    if (theme === "light") return "grayscale contrast-200 brightness-0";
    if (theme === "dark") return "grayscale invert contrast-200 brightness-0";
    if (theme === "auto-inverse")
      return "grayscale invert contrast-200 brightness-0 dark:contrast-200 dark:brightness-0 dark:invert-0";
    return "grayscale contrast-200 brightness-0 dark:invert dark:contrast-200 dark:brightness-0";
  }

  return "";
}

export function LogosTicker({
  items,
  size = "md",
  variant = "grayscale",
  theme = "auto",
  inverse = false,
  ...props
}: LogosTickerProps) {
  const filterClasses = getFilterClasses(variant, theme, inverse);

  return (
    <Ticker {...props} role="region" aria-label="Logo carousel">
      <TickerContent className="gap-12 md:gap-16 lg:gap-20">
        {items.map((item, i) => (
          <TickerItem key={item.href}>
            <img
              src={item.href}
              alt={item.name ?? `Logo ${i + 1}`}
              className={cn(
                "w-auto object-contain rounded-full",
                sizes[size],
                filterClasses
              )}
              loading="lazy"
            />
          </TickerItem>
        ))}
      </TickerContent>
    </Ticker>
  );
}

LogosTicker.displayName = "LogosTicker";
