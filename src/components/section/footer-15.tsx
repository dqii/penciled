import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SocialMediaIcons } from "@/components/marketing/social-media-icons";
import type { SocialMediaLink } from "@/components/marketing/social-media-icons";
import type { BaseLink } from "@/lib/component-types";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional brand mark component. Rendered at a small size on the left with menu links. */
  logo?: React.FC<{ className?: string }>;
  /** Simple horizontal link row rendered next to the logo on the left. */
  menuLinks?: BaseLink[];
  /** Social icons row rendered on the right side of row 1. */
  socialLinks?: SocialMediaLink[];
  /** Copyright text rendered right-aligned on row 2. */
  copyright?: string;
}

/**
 * Minimal two-row footer with brand and navigation links grouped on the left,
 * social icons on the right, and copyright text below. Creates a clean hierarchy
 * with primary navigation alongside the brand identity, social connections in a
 * secondary position, and legal text subtly placed at the bottom.
 */
export const Footer = ({
  logo,
  menuLinks,
  socialLinks,
  copyright,
  className,
  ...props
}: FooterProps) => {
  return (
    <Section as="footer" space="sm" className={className} {...props}>
      <Container>
        <div className="flex flex-col gap-3">
          {/* Row 1: left brand/navigation, right social icons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-col lg:flex-row items-center lg:justify-start gap-3 lg:gap-8">
              {logo && React.createElement(logo, { className: "h-6 w-auto" })}
              {menuLinks && menuLinks.length > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  {menuLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center h-10 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {socialLinks && socialLinks.length > 0 && (
              <SocialMediaIcons
                links={socialLinks}
                iconSize={18}
                className="justify-center lg:justify-end gap-4"
              />
            )}
          </div>

          {/* Row 2: right-aligned copyright text */}
          {copyright && (
            <div className="flex justify-center lg:justify-end">
              <p className="text-sm text-muted-foreground">{copyright}</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

Footer.displayName = "Footer";
