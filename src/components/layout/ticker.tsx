"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ===========================================================
// Styles
// ===========================================================

// Inject keyframes into the document
if (typeof window !== "undefined") {
  const styleId = "ticker-keyframes";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes ticker-scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes ticker-scroll-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      @keyframes ticker-scroll-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      @keyframes ticker-scroll-down {
        0% { transform: translateY(-50%); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===========================================================
// Types
// ===========================================================

export interface TickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Duration in seconds for one full scroll cycle. Lower = faster. Default: 20
   */
  speed?: number;
  /**
   * Whether the ticker should pause when the user hovers or focuses it. Default: true
   */
  pauseOnHover?: boolean;
  /**
   * Scroll direction. Determines horizontal or vertical flow and specific animation.
   * Default: "left" (traditional right-to-left horizontal scroll)
   */
  direction?: "left" | "right" | "up" | "down";
  /** Adds a gradient mask at the leading / trailing edges */
  fade?: boolean | { size?: number };
}

interface TickerContextValue {
  speed: number;
  isPaused: boolean;
  setPaused: (paused: boolean) => void;
  direction: "left" | "right" | "up" | "down";
}

const TickerContext = React.createContext<TickerContextValue | null>(null);

function useTicker() {
  const ctx = React.useContext(TickerContext);
  if (!ctx) throw new Error("useTicker must be used within a <Ticker />");
  return ctx;
}

// ===========================================================
// Components
// ===========================================================

/**
 * Root ticker component. Duplicates its children internally to create a seamless loop.
 *
 * Example:
 * ```tsx
 * <Ticker direction="left" speed={15} className="bg-muted py-4">
 *   <TickerContent>
 *     <TickerItem>Logo 1</TickerItem>
 *     <TickerItem>Logo 2</TickerItem>
 *   </TickerContent>
 * </Ticker>
 * ```
 */
const Ticker = ({
  speed = 60,
  pauseOnHover = true,
  direction = "right",
  fade,
  className,
  children,
  ref,
  ...props
}: TickerProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const [isPaused, setPaused] = React.useState(false);

  const handlePause = React.useCallback(() => {
    if (pauseOnHover) setPaused(true);
  }, [pauseOnHover]);

  const handleResume = React.useCallback(() => {
    if (pauseOnHover) setPaused(false);
  }, [pauseOnHover]);

  const fadeSize = typeof fade === "object" && fade.size ? fade.size : 40;

  // Build fade mask styles
  const getFadeMaskImage = () => {
    if (!fade) return undefined;

    const isVertical = direction === "up" || direction === "down";
    const gradientDirection = isVertical ? "to bottom" : "to right";

    return `linear-gradient(${gradientDirection}, transparent 0, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%)`;
  };

  const maskImage = getFadeMaskImage();

  return (
    <TickerContext.Provider value={{ speed, isPaused, setPaused, direction }}>
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={{
          ...(maskImage && {
            maskImage,
            WebkitMaskImage: maskImage,
          }),
        }}
        data-direction={direction}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        {...props}
      >
        {children}
      </div>
    </TickerContext.Provider>
  );
};
Ticker.displayName = "Ticker";

// ---------------------------------------------------------------------------
// TickerContent
// ---------------------------------------------------------------------------

type TickerContentProps = React.HTMLAttributes<HTMLDivElement>;

function TickerContent({ className, children, ...props }: TickerContentProps) {
  const { speed, isPaused, direction } = useTicker();

  const childArray = React.Children.toArray(children);
  const duplicated = React.useMemo(
    () => [...childArray, ...childArray],
    [childArray]
  );

  let animationName = "ticker-scroll-left";
  let flexDirectionClass = "flex-row";

  if (direction === "right") {
    animationName = "ticker-scroll-right";
    flexDirectionClass = "flex-row";
  } else if (direction === "up") {
    animationName = "ticker-scroll-up";
    flexDirectionClass = "flex-col";
  } else if (direction === "down") {
    animationName = "ticker-scroll-down";
    flexDirectionClass = "flex-col";
  }

  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    // Delay to ensure CSS is loaded
    const timer = setTimeout(() => setIsReady(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="list"
      className={cn("flex w-max gap-8", flexDirectionClass, className)}
      style={{
        animationName: isReady ? animationName : "none",
        animationDuration: `${speed}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationPlayState: isPaused ? "paused" : "running",
      }}
      data-slot="ticker-content"
      aria-live="off"
      {...props}
    >
      {duplicated.map((child, i) => {
        const isDuplicate = i >= childArray.length;

        // If element, clone to add aria-hidden when duplicated
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<{ "aria-hidden"?: string }>,
            {
              // Include aria-hidden on duplicates to prevent double announcement
              "aria-hidden": isDuplicate ? "true" : undefined,
              key: i,
            }
          );
        }
        // Fallback for non-elements (string/number)
        return (
          <span aria-hidden={isDuplicate ? "true" : undefined} key={i}>
            {child as React.ReactNode}
          </span>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TickerItem
// ---------------------------------------------------------------------------

const TickerItem = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      role="listitem"
      className={cn("min-w-0 shrink-0 grow-0 basis-auto", className)}
      data-slot="ticker-item"
      {...props}
    />
  );
};
TickerItem.displayName = "TickerItem";

export { Ticker, TickerContent, TickerItem };
