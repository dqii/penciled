"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: string | React.ReactNode;
  companyName?: string;
  companyUrl?: string;
  links?: NavLink[];
  actions?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "none";
  sticky?: boolean;
  dropdownMode?: "trigger" | "container" | "fullscreen";
}

export interface NavLink {
  label: string;
  href?: string;
  external?: boolean;
  dropdown?: DropdownConfig;
}

export interface DropdownConfig {
  links?: DropdownLink[];
  sections?: DropdownSection[];
  cols?: 1 | 2 | 3 | 4;
  cta?: {
    title: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
  };
}

// Supporting types
export interface DropdownLink {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  external?: boolean;
}

export interface DropdownSection {
  title?: string;
  links: DropdownLink[];
}

// ────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────

export function NavbarDesktop({
  className,
  logo,
  companyName,
  companyUrl = "/",
  links = [],
  actions,
  maxWidth,
  sticky = true,
  dropdownMode = "trigger",
  ...props
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "w-full transition-all duration-300 bg-background border-b",
        sticky && "sticky top-0 z-50",
        className
      )}
      {...props}
    >
      <Section as="div" space="none">
        <Container maxW={maxWidth}>
          <NavigationMenu.Root className="relative flex h-14 items-center">
            {/* Logo */}
            {logo && (
              <div className="mr-8 flex-shrink-0">
                <Link href={companyUrl} className="flex items-center">
                  {typeof logo === "string" ? (
                    <img
                      src={logo}
                      alt={companyName || "Company logo"}
                      className="h-8 w-auto"
                    />
                  ) : (
                    logo
                  )}
                </Link>
              </div>
            )}

            {/* Navigation Links */}
            {links.length > 0 && (
              <NavigationMenu.List className="flex items-center gap-1">
                {links.map((link) => (
                  <NavItem
                    key={link.href || link.label}
                    link={link}
                    dropdownMode={dropdownMode}
                    maxWidth={maxWidth}
                  />
                ))}
              </NavigationMenu.List>
            )}

            {/* Actions */}
            {actions && (
              <div className="ml-auto flex items-center gap-2">{actions}</div>
            )}

            {/* Viewport for container-aligned dropdowns */}
            {dropdownMode === "container" && (
              <NavigationMenu.Viewport
                className={cn(
                  "absolute left-0 top-full z-50 mt-2",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                )}
              />
            )}
          </NavigationMenu.Root>
        </Container>
      </Section>
    </nav>
  );
}

NavbarDesktop.displayName = "NavbarDesktop";

// ────────────────────────────────────────────────────────────────────
// Navigation Item Component
// ────────────────────────────────────────────────────────────────────

function NavItem({
  link,
  dropdownMode,
  maxWidth,
}: {
  link: NavLink;
  dropdownMode: "trigger" | "container" | "fullscreen";
  maxWidth?: NavbarProps["maxWidth"];
}) {
  if (link.dropdown) {
    return (
      <NavItemWithDropdown
        link={link}
        dropdownMode={dropdownMode}
        maxWidth={maxWidth}
      />
    );
  }

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Link
          href={link.href || "#"}
          className={cn(
            "inline-flex h-9 items-center justify-center rounded-md px-3",
            "text-sm font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground focus:outline-none"
          )}
          {...(link.external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {link.label}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

// ────────────────────────────────────────────────────────────────────
// Navigation Item with Dropdown
// ────────────────────────────────────────────────────────────────────

function NavItemWithDropdown({
  link,
  dropdownMode,
  maxWidth,
}: {
  link: NavLink;
  dropdownMode: "trigger" | "container" | "fullscreen";
  maxWidth?: NavbarProps["maxWidth"];
}) {
  const dropdown = link.dropdown!;

  return (
    <NavigationMenu.Item
      className={dropdownMode === "trigger" ? "relative" : ""}
    >
      <NavigationMenu.Trigger
        className={cn(
          "group inline-flex h-9 items-center justify-center rounded-md px-3 gap-1",
          "text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          "data-[state=open]:bg-accent/50"
        )}
      >
        {link.label}
        <ChevronDownIcon
          className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenu.Trigger>

      {dropdownMode === "fullscreen" ? (
        <NavigationMenu.Content className="data-[state=open]:animate-none">
          <div className="fixed inset-x-0 top-[calc(theme(spacing.14)+1px)] z-50 w-full border-b bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <Section as="div" space="none" px="gutter">
              <Container maxW={maxWidth}>
                <DropdownContent dropdown={dropdown} fullscreen />
              </Container>
            </Section>
          </div>
        </NavigationMenu.Content>
      ) : dropdownMode === "trigger" ? (
        <NavigationMenu.Content
          className={cn(
            "absolute top-full left-0 mt-2",
            "overflow-hidden rounded-lg border bg-popover shadow-lg"
          )}
        >
          <DropdownContent dropdown={dropdown} />
        </NavigationMenu.Content>
      ) : (
        <NavigationMenu.Content
          className={cn(
            "overflow-hidden rounded-lg border bg-popover shadow-lg"
          )}
        >
          <DropdownContent dropdown={dropdown} />
        </NavigationMenu.Content>
      )}
    </NavigationMenu.Item>
  );
}

// ────────────────────────────────────────────────────────────────────
// Dropdown Content
// ────────────────────────────────────────────────────────────────────

function DropdownContent({
  dropdown,
  fullscreen = false,
}: {
  dropdown: DropdownConfig;
  fullscreen?: boolean;
}) {
  const gridClasses = {
    1: "",
    2: "grid grid-cols-2 gap-4",
    3: "grid grid-cols-3 gap-4",
    4: "grid grid-cols-4 gap-4",
  };

  const minWidthClasses = {
    1: "min-w-[200px]",
    2: "min-w-[400px]",
    3: "min-w-[600px]",
    4: "min-w-[800px]",
  };

  const cols = dropdown.cols || (dropdown.sections ? 3 : 1);

  if (fullscreen) {
    return (
      <div className="py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className={gridClasses[cols]}>
            {dropdown.sections
              ? dropdown.sections.map((section, index) => (
                  <div key={section.title || `section-${index}`}>
                    {section.title && (
                      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-2">
                      {section.links.map((link) => (
                        <DropdownLinkItem
                          key={link.href}
                          link={link}
                          showDescription
                        />
                      ))}
                    </div>
                  </div>
                ))
              : dropdown.links
              ? dropdown.links.map((link) => (
                  <DropdownLinkItem
                    key={link.href}
                    link={link}
                    showDescription
                  />
                ))
              : null}
          </div>

          {/* CTA section */}
          {dropdown.cta && (
            <div className="rounded-lg bg-muted/50 p-6">
              <h3 className="mb-2 text-lg font-semibold">
                {dropdown.cta.title}
              </h3>
              {dropdown.cta.description && (
                <p className="mb-4 text-sm text-muted-foreground">
                  {dropdown.cta.description}
                </p>
              )}
              <div className="space-y-2">
                {dropdown.cta.primaryButtonText &&
                  dropdown.cta.primaryButtonHref && (
                    <Button asChild className="w-full">
                      <Link href={dropdown.cta.primaryButtonHref}>
                        {dropdown.cta.primaryButtonText}
                      </Link>
                    </Button>
                  )}
                {dropdown.cta.secondaryButtonText &&
                  dropdown.cta.secondaryButtonHref && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href={dropdown.cta.secondaryButtonHref}>
                        {dropdown.cta.secondaryButtonText}
                      </Link>
                    </Button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular dropdown
  return (
    <div className={cn("p-4", minWidthClasses[cols])}>
      <div className={gridClasses[cols]}>
        {dropdown.links &&
          dropdown.links.map((link) => (
            <DropdownLinkItem key={link.href} link={link} />
          ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Dropdown Link Item
// ────────────────────────────────────────────────────────────────────

function DropdownLinkItem({
  link,
  showDescription = false,
}: {
  link: DropdownLink;
  showDescription?: boolean;
}) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-start gap-3 rounded-md p-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground focus:outline-none"
      )}
      {...(link.external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {Icon && <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{link.label}</span>
          {link.badge && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {link.badge}
            </span>
          )}
        </div>
        {showDescription && link.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {link.description}
          </p>
        )}
      </div>
    </Link>
  );
}
