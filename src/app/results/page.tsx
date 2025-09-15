"use client";

import { CTA } from "@/components/section/cta-09";
import { CaseStudy } from "@/components/section/case-study";
import { Container } from "@/components/layout/container";
import {
  ContentTitle,
  ContentDescription,
} from "@/components/marketing/section-content";
import { Section } from "@/components/layout/section";
import { SingleInputForm } from "@/components/marketing/single-input-form-01";

export default function Results() {
  return (
    <main>
      {/* TODO: Add Results content here */}

      <Section>
        <Container align="center">
          <ContentTitle>Get your cost savings report</ContentTitle>
          <ContentDescription>
            Get a custom report of your cost savings with Penciled.
          </ContentDescription>
          <SingleInputForm
            placeholder="Enter your email"
            type="email"
            submitLabel="Get Report"
            submit={async (value) => {
              // TODO: Implement form submission
              console.log("Email submitted:", value);
              return { success: true, data: { value } };
            }}
            className="mx-auto"
          />
        </Container>
      </Section>

      <CaseStudy />

      <CTA />
    </main>
  );
}
