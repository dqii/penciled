"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
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

export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
}

export interface FeatureProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "subtitle"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonVariant?: ButtonVariant;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonVariant?: ButtonVariant;
  items: FeatureItem[];
}

function FeatureGrid({
  items,
  className,
}: {
  items: FeatureItem[];
  className?: string;
}) {
  const columnClass =
    items.length > 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={cn("grid gap-x-8 gap-y-12", columnClass, className)}>
      {items.map((item) => (
        <div key={item.title}>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
            <item.icon className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-base font-semibold leading-7">{item.title}</h3>
          <p className="text-base leading-7 text-muted-foreground mt-1.5">
            {item.description}
          </p>
          {item.href && item.linkText && (
            <p className="mt-2">
              <Link
                href={item.href}
                className="text-sm font-semibold leading-6 text-primary hover:text-primary/80"
              >
                {item.linkText} <span aria-hidden="true">→</span>
              </Link>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function Feature({
  eyebrow,
  title,
  subtitle,
  align = "center",
  primaryButtonText,
  primaryButtonHref,
  primaryButtonVariant = "default",
  secondaryButtonText,
  secondaryButtonHref,
  secondaryButtonVariant = "outline",
  items,
  ...props
}: FeatureProps) {
  return (
    <Section {...props}>
      <Container align={align}>
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
        <ContentItems margin="y" {...withDelay(fadeInUp, 0.3)}>
          <FeatureGrid items={items} />
        </ContentItems>
        {(primaryButtonHref || secondaryButtonHref) && (
          <ContentActions {...withDelay(fadeInUp, 0.4)}>
            {primaryButtonHref && (
              <Button variant={primaryButtonVariant} asChild size="lg">
                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
              </Button>
            )}
            {secondaryButtonHref && (
              <Button variant={secondaryButtonVariant} asChild size="lg">
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            )}
          </ContentActions>
        )}
      </Container>
    </Section>
  );
}

Feature.displayName = "Feature";
