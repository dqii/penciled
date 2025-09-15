"use client";

import { CTA } from "@/components/section/cta-09";
import { CaseStudy } from "@/components/section/case-study";
import { MediaSplit } from "@/components/section/media-split-01";
import { Feature } from "@/components/section/feature-13";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  ContentTitle,
  ContentDescription,
} from "@/components/marketing/section-content";
import {
  RefreshCw,
  DollarSign,
  Ban,
  Calendar,
  Star,
  Zap,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <main>
      {/* Header Section */}
      <Section>
        <Container align="center">
          <ContentTitle as="h1">How Penciled Works</ContentTitle>
          <ContentDescription>
            Connect your WebPT account and Penciled does the rest. Our AI automatically manages your schedule, fills cancellations, and keeps patients engaged — all integrated directly with WebPT.
          </ContentDescription>
        </Container>
      </Section>

      {/* Plan of Care Section */}
      <MediaSplit
        eyebrow="PLAN OF CARE"
        title="Schedule out visits for every case study."
        subtitle={
          <>
            <p>Leverage AI to analyze plan of care reports and contact patients who are missing visits.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Extracts plan of care documents from WebPT SOAP I and II</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Messages patients to schedule missing visits</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Calculate plan of care completion across all patients by provider</span>
              </li>
            </ul>
            <p className="mt-4">
              <a href="#" className="text-primary hover:underline">Learn more about plan of care</a>
            </p>
          </>
        }
        imageSrc="https://framerusercontent.com/images/ygFRuFXXp8lJHiJkeAYw16WkM.png"
        imageAlt="Plan of care messaging interface"
      />

      {/* Reminders Section */}
      <MediaSplit
        eyebrow="REMINDERS"
        title="Eliminate no-shows."
        subtitle={
          <>
            <p>Penciled sends intentional reminder messages and handles cancellation requests, at no extra charge.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Sends reminder texts at preferred times before visits</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Handles cancellation requests and processes late cancel fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Track patient replies and AI responses in real time</span>
              </li>
            </ul>
            <p className="mt-4">
              <a href="#" className="text-primary hover:underline">Learn more about reminders</a>
            </p>
          </>
        }
        imageSrc="https://framerusercontent.com/images/ygFRuFXXp8lJHiJkeAYw16WkM.png"
        imageAlt="Reminders messaging interface"
      />

      {/* Waitlist Section */}
      <MediaSplit
        eyebrow="WAITLIST"
        title="Fill 10X more cancellations."
        subtitle={
          <>
            <p>Message waitlist patients immediately after a cancellation occurs to get it filled in fast.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Automatically detects cancellations in WebPT</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Scans the waitlist to find patients waiting for slots</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Schedules the patient with the quickest response</span>
              </li>
            </ul>
            <p className="mt-4">
              <a href="#" className="text-primary hover:underline">Learn more about waitlist</a>
            </p>
          </>
        }
        imageSrc="https://framerusercontent.com/images/ygFRuFXXp8lJHiJkeAYw16WkM.png"
        imageAlt="Waitlist messaging interface"
      />

      {/* And More Section */}
      <Feature
        title="And so much more"
        subtitle="Penciled automates processes designed to drive revenue for your practice."
        items={[
          {
            icon: RefreshCw,
            title: "Rescheduling",
            description: "Let patients reschedule instantly so they don't miss visits.",
          },
          {
            icon: DollarSign,
            title: "Cancellation fees",
            description: "Require fee payment within 24 hour cancellation window.",
          },
          {
            icon: Ban,
            title: "No show fees",
            description: "Request no show fees with no awkward human interactions.",
          },
          {
            icon: Calendar,
            title: "Calendar Invites",
            description: "Get your visits onto patients' calendars- front and center.",
          },
          {
            icon: Star,
            title: "Google reviews",
            description: "Collect reviews automatically to grow your practice.",
          },
          {
            icon: Zap,
            title: "Automatic",
            description: "Penciled runs in the background so you can focus on your patients.",
          },
        ]}
      />

      <CaseStudy />
      <CTA />
    </main>
  );
}
