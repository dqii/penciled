"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/container";
import { ContentGrid } from "@/components/layout/content-grid";
import { Section } from "@/components/layout/section";
import {
  ContentBadge,
  ContentDescription,
  ContentItems,
  ContentTitle,
} from "@/components/marketing/section-content-animated";
import { fadeInUp, withDelay } from "@/lib/animation-presets";

export function CaseStudy() {
  const eyebrow = (
    <>
      <span className="font-semibold text-primary">
        Renew Physical Therapy,
      </span>{" "}
      5 clinics
    </>
  );
  
  const title = (
    <span className="leading-15">
      Penciled saved our front offices{" "}
      <span className="bg-primary px-2">hundreds of hours</span> every
      month dealing with the waitlist. If you are on WebPT, this is a{" "}
      <span className="bg-primary px-2">no-brainer.</span>
    </span>
  );
  
  const subtitle = (
    <>
      <p>Steve Mongiello, PT</p>
      <p>
        Owner,{" "}
        <span className="font-semibold">Renew Physical Therapy</span>
      </p>
    </>
  );
  
  const imageSrc = "https://framerusercontent.com/images/DBiK7CufeBor7JxkjNotaX4.jpg";
  return (
    <Section>
      <Container>
        <ContentGrid columns="2/1" alignment="center">
          <div>
            <ContentBadge {...fadeInUp}>{eyebrow}</ContentBadge>
            <ContentTitle as="h2" {...withDelay(fadeInUp, 0.1)}>
              {title}
            </ContentTitle>
            <ContentDescription {...withDelay(fadeInUp, 0.2)}>
              {subtitle}
            </ContentDescription>
          </div>

          <motion.div {...withDelay(fadeInUp, 0.1)}>
            <img
              src={imageSrc}
              alt="Renew Physical Therapy case study"
              className="w-full rounded-lg object-cover"
            />
          </motion.div>
        </ContentGrid>
        <ContentItems margin="t">
          <div className="flex justify-between px-8 gap-8 flex-col sm:flex-row">
            {[
              {
                title: "36x ROI",
              },
              {
                title: "150 visits",
                description: "recaptured/month",
              },
              {
                title: "445 hours",
                description: "saved/month",
              },
            ].map((item) => (
              <div className="text-center" key={item.title}>
                <p className="font-semibold text-3xl md:text-4xl lg:text-5xl">
                  {item.title}
                </p>
                <p className="mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </ContentItems>
      </Container>
    </Section>
  );
}

CaseStudy.displayName = "CaseStudy";
