import type { MotionProps as OriginalMotionProps } from "motion/react";

/**
 * Standardized animation presets for consistent motion across components
 */

// Subset of motion/react's MotionProps that we use
export type MotionProps = Pick<
  OriginalMotionProps,
  "initial" | "viewport" | "transition" | "animate" | "variants"
>;

// Splits combined props into a tuple of [non-motion props, motion props]
export function separateMotionProps<T>(
  props: T
): [Omit<T, keyof MotionProps>, MotionProps] {
  const { initial, viewport, transition, animate, variants, ...otherProps } =
    props as T & MotionProps;
  const motionProps: MotionProps = {
    initial,
    viewport,
    transition,
    animate,
    variants,
  };
  return [otherProps as Omit<T, keyof MotionProps>, motionProps];
}

// Base animation configurations
export const animationDuration = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.9,
} as const;

export const animationEasing = {
  smooth: "easeOut",
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: [0.175, 0.885, 0.32, 1.275],
} as const;

// Fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: animationDuration.medium,
    ease: animationEasing.smooth,
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: animationDuration.medium,
    ease: animationEasing.smooth,
  },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: animationDuration.medium,
    ease: animationEasing.smooth,
  },
};

// Scale animations
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: animationDuration.medium,
    ease: animationEasing.smooth,
  },
};

// Blur animations
export const blurIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: {
    duration: animationDuration.medium,
    ease: animationEasing.smooth,
  },
};

export const blurInUp = {
  initial: { opacity: 0, y: 10, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: {
    duration: animationDuration.medium,
    ease: animationEasing.smooth,
  },
};

// Stagger animations for groups
export const staggerContainer = {
  initial: "hidden",
  animate: "visible",
  variants: {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

export const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationDuration.medium,
        ease: animationEasing.smooth,
      },
    },
  },
};

// Helper function to create delayed animations
export function withDelay(animation: MotionProps, delay: number): MotionProps {
  return {
    ...animation,
    transition: {
      ...animation.transition,
      delay,
    },
  };
}

// Helper function to create custom duration animations
export function withDuration(
  animation: Omit<MotionProps, "layout">,
  duration: number
): Omit<MotionProps, "layout"> {
  return {
    ...animation,
    transition: {
      ...animation.transition,
      duration,
    },
  };
}

// Helper function to combine multiple animation presets
export function combineAnimations(...animations: MotionProps[]): MotionProps {
  return animations.reduce((acc, animation) => {
    const result: MotionProps = { ...acc, ...animation };

    if (acc.initial || animation.initial) {
      result.initial = Object.assign({}, acc.initial, animation.initial);
    }
    if (acc.animate || animation.animate) {
      result.animate = Object.assign({}, acc.animate, animation.animate);
    }
    if (acc.transition || animation.transition) {
      result.transition = Object.assign(
        {},
        acc.transition,
        animation.transition
      );
    }

    return result;
  }, {} as MotionProps);
}
