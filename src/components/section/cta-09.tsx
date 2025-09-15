"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  ContentActions,
  ContentDescription,
  ContentTitle,
} from "@/components/marketing/section-content-animated";
import { Button } from "@/components/ui/button";
import { fadeInUp, withDelay } from "@/lib/animation-presets";

export function CTA() {
  const title = "See how you can grow your practice";
  const subtitle = "Find out if your practice could benefit from an AI front office assistant.";
  const primaryButtonText = "Book a Demo";
  const primaryButtonHref = "#demo";
  return (
    <Section space="sm">
      <Container className="bg-primary/10" p="lg" align="center">
        <ContentTitle as="h2" {...withDelay(fadeInUp, 0.1)}>
          {title}
        </ContentTitle>

        <ContentDescription {...withDelay(fadeInUp, 0.2)}>
          {subtitle}
        </ContentDescription>

        <ContentActions {...withDelay(fadeInUp, 0.3)}>
          <Button asChild variant="default" size="lg">
            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
          </Button>
        </ContentActions>
      </Container>
    </Section>
  );
}

CTA.displayName = "CTA";
