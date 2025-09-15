"use client";

import { CTA } from "@/components/section/cta-09";
import { CaseStudy } from "@/components/section/case-study";
import { Container } from "@/components/layout/container";
import {
  ContentTitle,
  ContentDescription,
  ContentItems,
} from "@/components/marketing/section-content";
import { Section } from "@/components/layout/section";
import { SingleInputForm } from "@/components/marketing/single-input-form-01";
import { SavingsCalculator } from "@/components/calculator/savings-calculator";
import { Calculator } from "lucide-react";

export default function Results() {
  return (
    <main>
      {/* Header Section */}
      <Section>
        <Container align="center">
          <ContentTitle as="h1">See the Revenue Impact</ContentTitle>
          <ContentDescription>
            Discover how Penciled transforms your practice's efficiency and
            bottom line. Calculate your potential savings and see real results
            from clinics just like yours.
          </ContentDescription>
        </Container>
      </Section>

      {/* Savings Calculator Section */}
      <Section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <ContentTitle>Calculate your savings</ContentTitle>
              <ContentDescription>
                See how much time and money you can save by automating your
                front office operations
              </ContentDescription>
            </div>
            <div className="hidden sm:block">
              <div className="size-24 bg-primary/10 rounded-xl flex items-center justify-center">
                <Calculator className="size-12 text-primary" />
              </div>
            </div>
          </div>
          <ContentItems margin="t">
            <SavingsCalculator />
          </ContentItems>
        </Container>
      </Section>

      {/* Cost Savings Report Section */}
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
