import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import Link from "next/link";
import { H1, H2, H3, H4, P } from "@/components/theme/typography";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------- */
/*                           ContentBadge                              */
/* -------------------------------------------------------------------- */

export const contentBadgeVariants = cva("text-sm font-semibold tracking-wide", {
  variants: {
    variant: {
      text: "group-data-[align=center]:text-center",
      link: "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-muted-foreground transition-colors hover:text-foreground bg-foreground/5 group",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export interface ContentBadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof contentBadgeVariants> {
  children: React.ReactNode | { label: string; href: string };
}

export function ContentBadge({
  className,
  children,
  ...props
}: ContentBadgeProps) {
  const isLink =
    children !== null &&
    typeof children == "object" &&
    "href" in children &&
    "label" in children;

  return (
    <div
      className={cn(
        contentBadgeVariants({ variant: "text" }),
        "mb-3 group-data-[align=center]:flex group-data-[align=center]:justify-center",
        className
      )}
      {...props}
    >
      {isLink ? <Link href={children.href}>{children.label}</Link> : children}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*                           ContentTitle                              */
/* -------------------------------------------------------------------- */

export const contentTitleVariants = cva(
  "max-w-3xl group-data-[align=center]:text-center group-data-[align=center]:mx-auto group-data-[align=right]:text-right group-data-[align=right]:ml-auto"
);

export interface ContentTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof contentTitleVariants> {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
}

export function ContentTitle({
  as = "h2",
  className,
  children,
  ...props
}: ContentTitleProps) {
  const HeadingComp = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
  }[as];

  return (
    <HeadingComp
      className={cn(contentTitleVariants(), "mb-4", className)}
      {...props}
    >
      {children}
    </HeadingComp>
  );
}

/* -------------------------------------------------------------------- */
/*                        ContentDescription                           */
/* -------------------------------------------------------------------- */

export const contentDescriptionVariants = cva(
  "max-w-3xl whitespace-pre-line group-data-[align=center]:text-center group-data-[align=center]:mx-auto group-data-[align=right]:text-right group-data-[align=right]:ml-auto"
);

export interface ContentDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof contentDescriptionVariants> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  margin?: "y" | "t" | "b" | "none";
}

export function ContentDescription({
  size = "md",
  margin = "b",
  className,
  children,
  ...props
}: ContentDescriptionProps) {
  const marginClasses = {
    y: "my-6 md:my-8",
    t: "mt-6 md:mt-8",
    b: "mb-6 md:mb-8",
    none: "",
  }[margin];

  return (
    <P
      size={size}
      className={cn(
        contentDescriptionVariants(),
        marginClasses,
        "last:mb-0",
        className
      )}
      {...props}
    >
      {children}
    </P>
  );
}

/* -------------------------------------------------------------------- */
/*                          ContentActions                             */
/* -------------------------------------------------------------------- */

export const contentActionsVariants = cva(
  "flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-3xl group-data-[align=center]:justify-center group-data-[align=center]:mx-auto group-data-[align=right]:justify-end group-data-[align=right]:ml-auto"
);

export interface ContentActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  margin?: "y" | "t" | "b" | "none";
}

export function ContentActions({
  className,
  children,
  margin = "none",
  ...props
}: ContentActionsProps) {
  const marginClasses = {
    y: "my-6 md:my-8",
    t: "mt-6 md:mt-8",
    b: "mb-6 md:mb-8",
    none: "",
  }[margin];

  return (
    <div
      className={cn(marginClasses, contentActionsVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*                           ContentNote                               */
/* -------------------------------------------------------------------- */

export const contentNoteVariants = cva(
  "whitespace-pre-line group-data-[align=center]:text-center group-data-[align=center]:mx-auto group-data-[align=right]:text-right group-data-[align=right]:ml-auto"
);

export interface ContentNoteProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof contentNoteVariants> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  margin: "t" | "b" | "none";
}

export function ContentNote({
  size = "md",
  margin,
  className,
  children,
  ...props
}: ContentNoteProps) {
  const marginClasses = {
    t: "mt-4",
    b: "mb-4",
    none: "",
  }[margin];

  return (
    <P
      size={size}
      className={cn(
        contentNoteVariants(),
        marginClasses,
        typeof children !== "string" &&
          "flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </P>
  );
}

/* -------------------------------------------------------------------- */
/*                           ContentItems                              */
/* -------------------------------------------------------------------- */

export const contentItemsVariants = cva(
  "w-full group-data-[align=center]:mx-auto",
  {
    variants: {
      layout: {
        stack: "flex flex-col",
        grid: "grid",
        "grid-2": "grid sm:grid-cols-2",
        "grid-3": "grid sm:grid-cols-2 lg:grid-cols-3",
        "grid-4": "grid sm:grid-cols-2 lg:grid-cols-4",
        list: "space-y-0",
      },
      gap: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      layout: "stack",
      gap: "md",
    },
    compoundVariants: [
      {
        layout: "stack",
        gap: "xs",
        class: "gap-2",
      },
      {
        layout: "stack",
        gap: "sm",
        class: "gap-3",
      },
      {
        layout: "stack",
        gap: "md",
        class: "gap-4",
      },
      {
        layout: "stack",
        gap: "lg",
        class: "gap-6",
      },
      {
        layout: ["grid", "grid-2", "grid-3", "grid-4"],
        gap: "xs",
        class: "gap-3",
      },
      {
        layout: ["grid", "grid-2", "grid-3", "grid-4"],
        gap: "sm",
        class: "gap-4",
      },
      {
        layout: ["grid", "grid-2", "grid-3", "grid-4"],
        gap: "md",
        class: "gap-6",
      },
      {
        layout: ["grid", "grid-2", "grid-3", "grid-4"],
        gap: "lg",
        class: "gap-8",
      },
      {
        layout: "list",
        gap: "xs",
        class: "divide-y divide-border",
      },
      {
        layout: "list",
        gap: "sm",
        class: "divide-y divide-border",
      },
      {
        layout: "list",
        gap: "md",
        class: "divide-y divide-border",
      },
      {
        layout: "list",
        gap: "lg",
        class: "divide-y divide-border",
      },
    ],
  }
);

export interface ContentItemsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentItemsVariants> {
  margin: "none" | "t" | "b" | "y";
  children: React.ReactNode;
}

export function ContentItems({
  layout,
  gap,
  margin,
  className,
  children,
  ...props
}: ContentItemsProps) {
  const marginClasses = {
    none: "",
    t: "mt-9 md:mt-12 lg:mt-16",
    b: "mb-9 md:mb-12 lg:mb-16",
    y: "my-9 md:my-12 lg:my-16",
  };

  const marginClass = marginClasses[margin];

  return (
    <div
      className={cn(
        contentItemsVariants({ layout, gap }),
        marginClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
