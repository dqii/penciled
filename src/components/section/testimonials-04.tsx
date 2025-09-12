"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Ticker, TickerContent } from "@/components/layout/ticker";
import { ProfileAvatar } from "@/components/marketing/profile-avatar";
import {
  ContentActions,
  ContentBadge,
  ContentDescription,
  ContentItems,
  ContentTitle,
} from "@/components/marketing/section-content-animated";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { fadeInUp, withDelay } from "@/lib/animation-presets";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type Testimonial = {
  id: string;
  image: string;
  content: string;
  name: string;
  source?: "X";
  href?: string;
};

export interface TestimonialsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "subtitle"> {
  testimonials: Testimonial[];
  pauseOnHover?: boolean;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonVariant?: ButtonVariant;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonVariant?: ButtonVariant;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const cardContent = (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow relative",
        testimonial.href && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <ProfileAvatar
          name={testimonial.name}
          image={testimonial.image}
          size="md"
          fallbackType="initials"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm">{testimonial.name}</p>
            {testimonial.source === "X" && (
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="X (formerly Twitter)"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
          </div>
          <p className="mt-2 text-sm break-words">
            {testimonial.content
              .split(/(\*\*.*?\*\*)/)
              .map((part) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={part}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                )
              )}
          </p>
        </div>
      </div>
    </div>
  );

  if (testimonial.href) {
    return (
      <Link
        href={testimonial.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export function Testimonials({
  testimonials,
  pauseOnHover = true,
  className,
  eyebrow,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  primaryButtonVariant = "default",
  secondaryButtonText,
  secondaryButtonHref,
  secondaryButtonVariant = "outline",

  ...props
}: TestimonialsProps) {
  return (
    <Section space="md" {...props}>
      <Container align="center">
        {eyebrow && <ContentBadge {...fadeInUp}>{eyebrow}</ContentBadge>}
        {title && (
          <ContentTitle as="h2" {...withDelay(fadeInUp, 0.1)}>
            {title}
          </ContentTitle>
        )}
        {subtitle && (
          <ContentDescription {...withDelay(fadeInUp, 0.2)}>
            {subtitle}
          </ContentDescription>
        )}
        {(primaryButtonHref || secondaryButtonHref) && (
          <ContentActions {...withDelay(fadeInUp, 0.3)}>
            {primaryButtonHref && (
              <Button variant={primaryButtonVariant} size="lg" asChild>
                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
              </Button>
            )}
            {secondaryButtonHref && (
              <Button variant={secondaryButtonVariant} size="lg" asChild>
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            )}
          </ContentActions>
        )}

        <ContentItems
          margin="t"
          className={cn("overflow-hidden relative", className)}
          {...withDelay(fadeInUp, 0.3)}
        >
          {/* Mobile: Single column */}
          <Ticker
            speed={60}
            pauseOnHover={pauseOnHover}
            className="lg:hidden"
            fade={{ size: 40 }}
          >
            <TickerContent className="gap-4">
              {[...Array(2)].map((_, dupIndex) => (
                <>
                  {testimonials.map((testimonial) => (
                    <TestimonialCard
                      key={`${dupIndex}-${testimonial.id}`}
                      testimonial={testimonial}
                      className="w-[340px]"
                    />
                  ))}
                </>
              ))}
            </TickerContent>
          </Ticker>

          {/* Desktop: Masonry columns */}
          <Ticker
            speed={60}
            pauseOnHover={pauseOnHover}
            className="max-h-[480px] hidden lg:block"
            fade={{ size: 60 }}
          >
            <TickerContent className="gap-4 h-[720px] flex flex-wrap flex-col">
              {[...Array(2)].map((_, dupIndex) =>
                testimonials.map((testimonial) => (
                  <TestimonialCard
                    testimonial={testimonial}
                    key={`${dupIndex}-${testimonial.id}`}
                    className="w-[340px]"
                  />
                ))
              )}
            </TickerContent>
          </Ticker>
          {/* Radial gradient fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{
              background: `radial-gradient(50% 100% at 50% 0%, transparent 0%, transparent 80%, var(--background) 115%)`,
            }}
          />
        </ContentItems>
      </Container>
    </Section>
  );
}

Testimonials.displayName = "Testimonials";
