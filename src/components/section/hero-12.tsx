"use client";

import { motion } from "motion/react";
import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ContentGrid } from "@/components/layout/content-grid";
import { Section } from "@/components/layout/section";
import {
  ContentActions,
  ContentBadge,
  ContentDescription,
  ContentTitle,
} from "@/components/marketing/section-content-animated";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { fadeInUp, withDelay } from "@/lib/animation-presets";

export interface HeroProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "subtitle"> {
  eyebrow?: React.ReactNode;
  align?: "left" | "center" | "right";
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonVariant?: ButtonVariant;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonVariant?: ButtonVariant;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoPoster?: string;
  videoAutoPlay?: boolean;
  videoControls?: boolean;
  className?: string;
}

export function Hero({
  eyebrow,
  align = "left",
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  primaryButtonVariant = "default",
  secondaryButtonText,
  secondaryButtonHref,
  secondaryButtonVariant = "outline",
  imageUrl,
  imageAlt,
  videoUrl,
  videoPoster,
  videoAutoPlay = false,
  videoControls = true,
  className,
  ...props
}: HeroProps) {
  const mediaContent = videoUrl ? (
    <video
      src={videoUrl}
      poster={videoPoster}
      autoPlay={videoAutoPlay}
      loop={videoAutoPlay}
      muted={videoAutoPlay}
      controls={videoControls}
      playsInline
      preload="none"
      className="w-full h-full rounded-md object-cover aspect-video"
    >
      Sorry, your browser doesn‘t support embedded videos.
    </video>
  ) : imageUrl ? (
    <img
      src={imageUrl}
      alt={imageAlt}
      className="rounded-md w-full h-auto object-cover"
    />
  ) : null;

  return (
    <Section className={className} {...props}>
      <Container align={align}>
        <ContentGrid columns={2}>
          <div>
            {eyebrow && <ContentBadge {...fadeInUp}>{eyebrow}</ContentBadge>}
            {title && (
              <ContentTitle as="h1" {...withDelay(fadeInUp, 0.1)}>
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
                  <Button variant={primaryButtonVariant} asChild size="lg">
                    <Link href={primaryButtonHref}>{primaryButtonText}</Link>
                  </Button>
                )}
                {secondaryButtonHref && (
                  <Button variant={secondaryButtonVariant} asChild size="lg">
                    <Link href={secondaryButtonHref}>
                      {secondaryButtonText}
                    </Link>
                  </Button>
                )}
              </ContentActions>
            )}
          </div>
          {mediaContent && (
            <motion.div {...withDelay(fadeInUp, 0.1)}>
              {mediaContent}
            </motion.div>
          )}
        </ContentGrid>
      </Container>
    </Section>
  );
}

Hero.displayName = "Hero";
