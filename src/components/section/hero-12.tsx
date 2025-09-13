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
import { LogosTicker } from "@/components/marketing/logos-ticker";

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

        {/* Logos ticker section */}
        <div className="mt-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Penciled books thousands of appointments per month for physical
            therapists
          </p>
          <LogosTicker
            items={[
              {
                name: "Clinic 1",
                href: "https://framerusercontent.com/images/Ue2mZ7nCLhRjnc5tL4woLYYM8s.png",
              },
              {
                name: "Clinic 2",
                href: "https://framerusercontent.com/images/lcmjTsA4M1NXrOabhOXpv3uh8uM.png",
              },
              {
                name: "Clinic 3",
                href: "https://framerusercontent.com/images/C4UYaklWkT5jzClthVUfSisadI.png",
              },
              {
                name: "Clinic 4",
                href: "https://framerusercontent.com/images/5g3t8tGbcB1EZDPohwFVBks.png",
              },
              {
                name: "Clinic 5",
                href: "https://framerusercontent.com/images/umXo434eW8l6fdb7JnIQ0624w.png",
              },
              {
                name: "Clinic 6",
                href: "https://framerusercontent.com/images/TUQZzDw8QzIiBP3JQ8gDSeNOrU.png",
              },
              {
                name: "Clinic 7",
                href: "https://framerusercontent.com/images/H5jpWxnwZ6eKSaAUOwOVBKng.png",
              },
              {
                name: "Clinic 8",
                href: "https://framerusercontent.com/images/o3LYl1D63wVSiC6l2tbpRNtjdE.png",
              },
              {
                name: "Clinic 9",
                href: "https://framerusercontent.com/images/JKHSjDOVgTzPlnd6lMP4VMx5i5g.png",
              },
              {
                name: "Clinic 10",
                href: "https://framerusercontent.com/images/KOlTjBq0x2elOmE9zVWfK9bwVk.png",
              },
              {
                name: "Clinic 11",
                href: "https://framerusercontent.com/images/tnRd1AItTV5onVerDONpLNDlIy0.png",
              },
              {
                name: "Clinic 12",
                href: "https://framerusercontent.com/images/oOdQdNqJL0AyxyUlTczlUeWFE.png",
              },
              {
                name: "Clinic 13",
                href: "https://framerusercontent.com/images/FUZETHrAWuJVUKNebTSZiQ1Tg.png",
              },
            ]}
            size="md"
            variant="color"
          />
        </div>
      </Container>
    </Section>
  );
}

Hero.displayName = "Hero";
