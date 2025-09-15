"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  ContentBadge,
  ContentTitle,
  ContentItems,
} from "@/components/marketing/section-content-animated";
import { CTA } from "@/components/section/cta-09";

export default function Terms() {
  return (
    <main>
      <Section>
        <Container>
          <ContentBadge>Legal</ContentBadge>
          <ContentTitle as="h1">Terms of Service</ContentTitle>

          <ContentItems margin="t">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Penciled&apos;s AI front desk services,
                you agree to be bound by these Terms of Service and all
                applicable laws and regulations.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Penciled provides an AI-powered front desk assistant for
                physical therapy practices, including automated scheduling,
                reminders, waitlist management, and patient communication
                services integrated with WebPT and other practice management
                systems.
              </p>

              <h2>3. Account Registration</h2>
              <p>To use our services, you must:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
              </ul>

              <h2>4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use the service for any unlawful purpose or in violation of
                  any regulations
                </li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  service
                </li>
                <li>
                  Use the service to transmit any harmful or malicious code
                </li>
              </ul>

              <h2>5. Healthcare Compliance</h2>
              <p>Users acknowledge that:</p>
              <ul>
                <li>
                  Penciled will sign Business Associate Agreements (BAAs) as
                  required under HIPAA
                </li>
                <li>
                  Users remain responsible for their own compliance with
                  healthcare regulations
                </li>
                <li>
                  The service is designed to supplement, not replace, human
                  judgment in healthcare settings
                </li>
              </ul>

              <h2>6. Payment Terms</h2>
              <p>
                Subscription fees are billed monthly or annually in advance. All
                fees are non-refundable except as required by law. We reserve
                the right to modify pricing with 30 days&apos; notice.
              </p>

              <h2>7. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Penciled service
                are owned by Penciled, Inc. and are protected by international
                copyright, trademark, and other intellectual property laws.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Penciled shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use or inability to use the
                service.
              </p>

              <h2>9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Penciled, Inc. and its
                officers, directors, employees, and agents from any claims,
                damages, or expenses arising from your use of the service or
                violation of these terms.
              </p>

              <h2>10. Termination</h2>
              <p>
                Either party may terminate this agreement at any time with
                written notice. Upon termination, your access to the service
                will cease, and you must discontinue all use of the service.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the State of California, without regard to its
                conflict of law provisions.
              </p>

              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                provide notice of material changes via email or through the
                service.
              </p>

              <h2>13. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us
                at:
              </p>
              <p>
                Email: support@penciled.com
                <br />
                Address: Penciled, Inc.
                <br />
                San Francisco, CA
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
