import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { resolveBgClasses, type Bg } from "@/lib/background";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full group", {
  variants: {
    maxW: {
      none: "max-w-none",
      xs: "max-w-3xl",
      sm: "max-w-4xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
    },
    p: {
      none: "",
      xs: "p-[min(3rem,5vw)]",
      sm: "px-[min(3rem,5vw)] py-6 md:py-10 lg:py-14",
      md: "px-[min(3rem,5vw)] py-10 md:py-16 lg:py-20",
      lg: "px-[min(3rem,5vw)] py-16 md:py-24 lg:py-32",
    },
  },
  defaultVariants: {
    maxW: "lg",
    p: "none",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  /** The HTML element to render - defaults to 'div' */
  as?: React.ElementType;
  /** Alignment for child content components */
  align?: "left" | "center" | "right";
  /** Background: token or image */
  bg?: Bg;
}

export function Container({
  as: Component = "div",
  children,
  maxW,
  p,
  bg,
  align = "left",
  className,
  ...props
}: ContainerProps) {
  const isCard = typeof bg === "string" ? bg === "card" : bg?.token === "card";
  const hasImageBg = typeof bg === "object" && bg.src;
  const hasOverlay = typeof bg === "object" && bg.overlay;

  const newClassName = cn(
    containerVariants({ maxW, p }),
    resolveBgClasses(bg),
    isCard ? "border border-border rounded-lg shadow-sm" : "",
    className
  );

  // For non-image backgrounds, use the original approach
  if (!hasImageBg) {
    return React.createElement(
      Component as React.ElementType,
      {
        "data-align": align,
        className: newClassName,
        ...props,
      },
      children
    );
  }

  // For image backgrounds, render image as a separate element
  return React.createElement(
    Component as React.ElementType,
    {
      "data-align": align,
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

Container.displayName = "Container";
