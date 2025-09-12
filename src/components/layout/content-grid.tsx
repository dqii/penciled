import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const contentGridVariants = cva("grid grid-cols-1 gap-12 md:gap-16 lg:gap-20", {
  variants: {
    columns: {
      1: "",
      2: "lg:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      "1/2": "lg:grid-cols-[1fr_2fr]",
      "2/1": "lg:grid-cols-[2fr_1fr]",
      "2/3": "lg:grid-cols-[2fr_3fr]",
      "3/2": "lg:grid-cols-[3fr_2fr]",
    },
    alignment: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    columns: 2,
    alignment: "center",
  },
});

export interface ContentGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentGridVariants> {
  /** Whether to reverse the order on mobile (content first) */
  reversed?: boolean;
}

export function ContentGrid({
  children,
  className,
  columns,
  alignment,
  reversed = false,
  ...props
}: ContentGridProps) {
  return (
    <div
      className={cn(
        contentGridVariants({ columns, alignment }),
        reversed && "flex flex-col-reverse md:grid",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

ContentGrid.displayName = "ContentGrid";
