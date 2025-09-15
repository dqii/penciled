"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  ContentBadge,
  ContentTitle,
  ContentItems,
} from "@/components/marketing/section-content-animated";
import { CTA } from "@/components/section/cta-09";

export default function Privacy() {
  return (
    <main>
      <Section>
        <Container>
          <ContentBadge>Legal</ContentBadge>
          <ContentTitle as="h1">Privacy Policy</ContentTitle>
          
          <ContentItems margin="t">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                Penciled collects information to provide and improve our AI front desk services for physical therapy practices.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
              </ul>

              <h2>3. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2>4. HIPAA Compliance</h2>
              <p>
                As a service provider to healthcare practices, Penciled maintains HIPAA compliance and enters into Business Associate Agreements (BAAs) with our clients as required.
              </p>

              <h2>5. Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy.
              </p>

              <h2>6. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>

              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: support@penciled.com<br />
                Address: Penciled, Inc.<br />
                San Francisco, CA
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
              </p>

              <p className="text-sm text-muted-foreground mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </ContentItems>
        </Container>
      </Section>

      <CTA />
    </main>
  );
}