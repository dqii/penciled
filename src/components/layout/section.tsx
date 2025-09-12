import { cva } from "class-variance-authority";
import * as React from "react";
import { resolveBgClasses, type Bg } from "@/lib/background";
import { cn } from "@/lib/utils";

interface SectionVariants {
  /** Vertical spacing - uses padding when bg is present, margin otherwise */
  space?: "none" | "sm" | "md" | "lg";
  /** Horizontal gutter */
  px?: "none" | "gutter";
  height?: "auto" | "screen";
  width?: "auto" | "full";
}

// Section props interface
export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    SectionVariants {
  /** The HTML element to render - defaults to 'section' */
  as?: React.ElementType;
  /** Background: token or image */
  bg?: Bg;
}

const sectionVariants = cva("relative", {
  variants: {
    margin: {
      none: "",
      sm: "my-9 md:my-15 lg:my-21",
      md: "my-15 md:my-24 lg:my-30",
      lg: "my-24 md:my-36 lg:my-48",
    },
    padding: {
      none: "",
      sm: "py-6 md:py-10 lg:py-14", // Compact: footers, logos sections
      md: "py-10 md:py-16 lg:py-20", // Standard: CTAs, content sections
      lg: "py-16 md:py-24 lg:py-32", // Spacious: heroes, article layouts, feature showcases
    },
    px: {
      none: "",
      gutter: "px-[5vw]",
    },
    height: {
      auto: "",
      screen: "min-h-screen",
    },
    width: {
      auto: "",
      full: "w-full",
    },
  },
  defaultVariants: {
    margin: "none",
    padding: "none",
    px: "gutter",
    height: "auto",
    width: "auto",
  },
});

export function Section({
  as: Component = "section",
  children,
  space = "md",
  px,
  height,
  width,
  bg,
  className,
  ...props
}: SectionProps) {
  // Intelligently use padding when background is present, margin otherwise
  const hasBackground = bg && bg !== "none";
  const hasImageBg = typeof bg === "object" && bg.src;
  const hasOverlay = typeof bg === "object" && bg.overlay;

  const newClassName = cn(
    sectionVariants({
      ...(hasBackground || Component === "footer"
        ? { margin: "none", padding: space }
        : { margin: space, padding: "none" }),
      px,
      height,
      width,
    }),
    resolveBgClasses(bg),
    className
  );

  // For non-image backgrounds, use the original approach
  if (!hasImageBg) {
    return React.createElement(
      Component,
      {
        className: newClassName,
        ...props,
      },
      children
    );
  }

  // For image backgrounds, render image as a separate element
  return React.createElement(
    Component,
    {
      className: newClassName + " relative",
      ...props,
    },
    <>
      {hasImageBg && (
        <img
          src={bg.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            objectPosition: bg.position ?? "center",
          }}
          aria-hidden="true"
        />
      )}
      {hasOverlay && (
        <div
          className={cn(
            "absolute inset-0 z-10 pointer-events-none",
            bg.overlay
          )}
          aria-hidden="true"
        />
      )}
      <div className="relative z-20">{children}</div>
    </>
  );
}

Section.displayName = "Section";
