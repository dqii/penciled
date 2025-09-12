"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  ContentActions,
  ContentBadge,
  ContentDescription,
  ContentNote,
  ContentTitle,
} from "@/components/marketing/section-content-animated";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { fadeInUp, withDelay } from "@/lib/animation-presets";
import { cn } from "@/lib/utils";

export interface SplitMediaProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "subtitle"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  primaryButtonVariant?: ButtonVariant;
  secondaryButtonVariant?: ButtonVariant;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  videoUrl?: string;
  videoTitle?: string;
  note?: string;
}

export function SplitMedia({
  eyebrow,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  primaryButtonVariant = "default",
  secondaryButtonVariant = "outline",
  imageSrc,
  imageAlt,
  imageClassName,
  videoUrl,
  videoTitle,
  note,
  className,
  ...props
}: SplitMediaProps) {
  // Convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };
  return (
    <Section className={className} {...props}>
      <Container align="center">
        {eyebrow && <ContentBadge {...fadeInUp}>{eyebrow}</ContentBadge>}
        <ContentTitle as="h2" {...withDelay(fadeInUp, 0.1)}>
          {title}
        </ContentTitle>
        {subtitle && (
          <ContentDescription {...withDelay(fadeInUp, 0.2)}>
            {subtitle}
          </ContentDescription>
        )}

        {(primaryButtonHref || secondaryButtonHref) && (
          <ContentActions {...withDelay(fadeInUp, 0.3)}>
            {primaryButtonHref && (
              <Button asChild variant={primaryButtonVariant} size="lg">
                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
              </Button>
            )}
            {secondaryButtonHref && (
              <Button asChild variant={secondaryButtonVariant} size="lg">
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            )}
          </ContentActions>
        )}

        {note && (
          <ContentNote margin="t" {...withDelay(fadeInUp, 0.4)}>
            {note}
          </ContentNote>
        )}

        {/* Media below content */}
        {videoUrl ? (
          <motion.div
            className="w-full mt-12 aspect-video rounded-lg overflow-hidden bg-muted"
            {...withDelay(fadeInUp, 0.5)}
          >
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              title={videoTitle || "Video"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        ) : imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={imageAlt || ""}
            className={cn("w-full rounded-lg object-cover mt-12", imageClassName)}
            {...withDelay(fadeInUp, 0.5)}
          />
        ) : null}
      </Container>
    </Section>
  );
}

SplitMedia.displayName = "SplitMedia";
