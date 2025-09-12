"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ContentActionsProps,
  contentActionsVariants,
  ContentBadgeProps,
  contentBadgeVariants,
  ContentDescriptionProps,
  contentDescriptionVariants,
  ContentItemsProps,
  contentItemsVariants,
  ContentNoteProps,
  contentNoteVariants,
  ContentTitleProps,
  contentTitleVariants,
} from "@/components/marketing/section-content";
import { H1, H2, H3, H4, P } from "@/components/theme/typography";
import { separateMotionProps, type MotionProps } from "@/lib/animation-presets";
import { cn } from "@/lib/utils";

type AnimatedProps<T> = T & Omit<MotionProps, "layout" | "children" | "style">;

/* -------------------------------------------------------------------- */
/*                         Animated ContentBadge                       */
/* -------------------------------------------------------------------- */

export function ContentBadge(props: AnimatedProps<ContentBadgeProps>) {
  const [nonMotionProps, motionProps] = separateMotionProps(props);
  const { className, children, ...rest } = nonMotionProps;

  const isLink =
    children !== null &&
    typeof children == "object" &&
    "href" in children &&
    "label" in children;

  return (
    <motion.div
      className="mb-3 group-data-[align=center]:flex group-data-[align=center]:justify-center"
      {...motionProps}
    >
      {isLink ? (
        <Link
          href={children.href}
          className={cn(contentBadgeVariants({ variant: "link" }), className)}
        >
          {children.label}
          <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div
          className={cn(contentBadgeVariants({ variant: "text" }), className)}
          {...rest}
        >
          {children}
        </div>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*                         Animated ContentTitle                       */
/* -------------------------------------------------------------------- */

export function ContentTitle(props: AnimatedProps<ContentTitleProps>) {
  const [nonMotionProps, motionProps] = separateMotionProps(props);
  const { as = "h2", className, children, ...rest } = nonMotionProps;
  const HeadingComp = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
  }[as];
  return (
    <motion.div className="mb-4" {...motionProps}>
      <HeadingComp className={cn(contentTitleVariants(), className)} {...rest}>
        {children}
      </HeadingComp>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*                      Animated ContentDescription                    */
/* -------------------------------------------------------------------- */

export function ContentDescription(
  props: AnimatedProps<ContentDescriptionProps>
) {
  const [nonMotionProps, motionProps] = separateMotionProps(props);
  const {
    size = "md",
    margin = "b",
    className,
    children,
    ...rest
  } = nonMotionProps;

  const marginClasses = {
    y: "my-6 md:my-8",
    t: "mt-6 md:mt-8",
    b: "mb-6 md:mb-8",
    none: "",
  }[margin];

  return (
    <motion.div className={marginClasses} {...motionProps}>
      <P
        size={size}
        className={cn(contentDescriptionVariants(), className)}
        {...rest}
      >
        {children}
      </P>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*                        Animated ContentActions                      */
/* -------------------------------------------------------------------- */

export function ContentActions(props: AnimatedProps<ContentActionsProps>) {
  const [nonMotionProps, motionProps] = separateMotionProps(props);
  const { className, children, margin = "none", ...rest } = nonMotionProps;

  const marginClasses = {
    y: "my-6 md:my-8",
    t: "mt-6 md:mt-8",
    b: "mb-6 md:mb-8",
    none: "",
  }[margin];

  return (
    <motion.div className={marginClasses} {...motionProps}>
      <div className={cn(contentActionsVariants(), className)} {...rest}>
        {children}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*                         Animated ContentNote                        */
/* -------------------------------------------------------------------- */

export function ContentNote(props: AnimatedProps<ContentNoteProps>) {
  const [nonMotionProps, motionProps] = separateMotionProps(props);
  const { size = "md", margin, className, children, ...rest } = nonMotionProps;

  const marginClasses = {
    t: "mt-4",
    b: "mb-4",
    none: "",
  }[margin];

  return (
    <motion.div className={marginClasses} {...motionProps}>
      <P
        size={size}
        className={cn(
          contentNoteVariants(),
          typeof children !== "string" &&
            "flex items-center justify-center gap-2",
          className
        )}
        {...rest}
      >
        {children}
      </P>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/*                         Animated ContentItems                       */
/* -------------------------------------------------------------------- */

export function ContentItems(props: AnimatedProps<ContentItemsProps>) {
  const [nonMotionProps, motionProps] = separateMotionProps(props);
  const { layout, gap, margin, className, children, ...rest } = nonMotionProps;

  const marginClasses = {
    none: "",
    t: "mt-9 md:mt-12 lg:mt-16",
    b: "mb-9 md:mb-12 lg:mb-16",
    y: "my-9 md:my-12 lg:my-16",
  };

  const marginClass = marginClasses[margin];

  return (
    <motion.div className={marginClass} {...motionProps}>
      <div
        className={cn(contentItemsVariants({ layout, gap }), className)}
        {...rest}
      >
        {children}
      </div>
    </motion.div>
  );
}
