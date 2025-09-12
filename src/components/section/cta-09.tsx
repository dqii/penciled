"use client";

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

export interface CTAProps
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
  note?: string;
}

export function CTA({
  eyebrow,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  primaryButtonVariant = "default",
  secondaryButtonVariant = "outline",
  note,

  ...props
}: CTAProps) {
  return (
    <Section space="sm" {...props}>
      <Container className="bg-primary/20" p="lg" align="center">
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
      </Container>
    </Section>
  );
}

CTA.displayName = "CTA";
