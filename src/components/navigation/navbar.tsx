"use client";

import * as React from "react";
import {
  NavbarDesktop,
  type NavbarProps as NavbarDesktopProps,
} from "@/components/navigation/navbar-desktop";
import {
  NavbarMobile,
  type NavbarMobileProps,
  type NavItem,
} from "@/components/navigation/navbar-mobile";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

export interface NavbarProps
  extends Omit<NavbarDesktopProps, "links">,
    Pick<
      NavbarMobileProps,
      "headerActions" | "sheetActionsPlacement" | "slideFrom"
    > {
  // Desktop navigation
  links?: NavbarDesktopProps["links"];

  // Mobile navigation (optional override)
  mobileLinks?: NavItem[];
}

// ────────────────────────────────────────────────────────────────────
// Utilities
// ────────────────────────────────────────────────────────────────────

// Convert desktop links to mobile items (basic conversion)
function convertToMobileLinks(
  desktopLinks?: NavbarDesktopProps["links"]
): NavItem[] {
  if (!desktopLinks) return [];

  return desktopLinks
    .map((link) => {
      // Skip items without href and dropdown (these are dropdown-only triggers)
      if (!link.href && link.dropdown) {
        // Convert dropdown to mobile items
        const dropdownItems =
          link.dropdown.links?.map((dropdownLink) => ({
            label: dropdownLink.label,
            href: dropdownLink.href,
            external: dropdownLink.external,
          })) || [];

        // If dropdown has sections, flatten them
        if (link.dropdown.sections) {
          link.dropdown.sections.forEach((section) => {
            dropdownItems.push(
              ...section.links.map((sectionLink) => ({
                label: sectionLink.label,
                href: sectionLink.href,
                external: sectionLink.external,
              }))
            );
          });
        }

        return {
          label: link.label,
          href: "#",
          items: dropdownItems,
        };
      }

      // Regular link
      return {
        label: link.label,
        href: link.href || "#",
        external: link.external,
      };
    })
    .filter(Boolean) as NavItem[];
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export function Navbar({
  // Shared props
  logo,
  companyName,
  companyUrl,
  actions,
  sticky,
  className,

  // Desktop props
  links,
  dropdownMode,
  maxWidth,

  // Mobile props
  mobileLinks,
  headerActions,
  sheetActionsPlacement,
  slideFrom,

  ...props
}: NavbarProps) {
  // Convert desktop links to mobile format if mobileLinks not provided
  const effectiveMobileLinks = mobileLinks || convertToMobileLinks(links);

  return (
    <>
      <NavbarMobile
        logo={logo}
        companyName={companyName}
        companyUrl={companyUrl}
        items={effectiveMobileLinks}
        headerActions={headerActions || actions}
        sheetActions={actions}
        sheetActionsPlacement={sheetActionsPlacement}
        sticky={sticky}
        slideFrom={slideFrom}
        className={cn("lg:hidden", className)}
        {...props}
      />
      <NavbarDesktop
        logo={logo}
        companyName={companyName}
        companyUrl={companyUrl}
        links={links}
        actions={actions}
        sticky={sticky}
        dropdownMode={dropdownMode}
        maxWidth={maxWidth}
        className={cn("hidden lg:block", className)}
        {...props}
      />
    </>
  );
}

Navbar.displayName = "Navbar";

// Re-export types for convenience
export type { NavItem } from "@/components/navigation/navbar-mobile";
export type { NavLink } from "@/components/navigation/navbar-desktop";
