"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, Menu } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  items?: NavItem[];
}

// ────────────────────────────────────────────────────────────────────
// NavbarMobile Component
// ────────────────────────────────────────────────────────────────────

export interface NavbarMobileProps extends React.HTMLAttributes<HTMLElement> {
  // Brand
  logo?: string | React.ReactNode;
  companyName?: string;
  companyUrl?: string;

  // Navigation
  items?: NavItem[];

  // Actions
  headerActions?: React.ReactNode;
  sheetActions?: React.ReactNode;
  sheetActionsPlacement?: "fixed" | "inline";

  // Layout
  slideFrom?: "left" | "right";
  containerProps?: React.ComponentProps<typeof Container>;
  sectionProps?: React.ComponentProps<typeof Section>;

  // Sticky
  sticky?: boolean;
}

export function NavbarMobile({
  className,
  sticky,
  logo,
  companyName,
  companyUrl = "/",
  items = [],
  headerActions,
  sheetActions,
  sheetActionsPlacement = "fixed",
  slideFrom = "right",
  containerProps,
  sectionProps,
  style,
  ...props
}: NavbarMobileProps) {
  const [open, setOpen] = React.useState(false);

  const hasSheetContent = items.length > 0 || sheetActions;

  const handleItemClick = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <nav
      className={cn(
        "w-full bg-background border-b",
        sticky && "sticky top-0 z-50",
        className
      )}
      style={style}
      {...props}
    >
      <Section as="nav" space="none" {...sectionProps}>
        <Container {...containerProps}>
          <div className="flex items-center h-14">
            {/* Brand */}
            {logo && (
              <div className="flex items-center">
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

            {/* Header Actions & Menu Toggle */}
            <div className="ml-auto flex items-center gap-2">
              {headerActions}
              {hasSheetContent && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(!open)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Sheet Drawer */}
      {hasSheetContent && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side={slideFrom}
            className={cn(
              "w-full sm:w-3/4 sm:max-w-sm p-0 flex flex-col",
              slideFrom === "left" && "border-r border-l-0",
              slideFrom === "right" && "border-l border-r-0"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Logo at top of sheet */}
              {logo && (
                <div className="px-6 pt-6 pb-4 border-b">
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
              <div
                className={cn(
                  "px-6 pt-6 pb-6 overflow-y-auto",
                  sheetActionsPlacement === "fixed" ? "flex-1" : ""
                )}
              >
                <nav className="flex flex-col text-lg space-y-1">
                  {items.map((item) => (
                    <NavItem
                      key={item.href || item.label}
                      item={item}
                      onItemClick={handleItemClick}
                    />
                  ))}
                </nav>

                {/* Inline Actions */}
                {sheetActionsPlacement === "inline" && sheetActions && (
                  <div className="mt-8">
                    <div className="flex flex-col gap-4">{sheetActions}</div>
                  </div>
                )}
              </div>
              {/* Fixed Actions */}
              {sheetActionsPlacement === "fixed" && sheetActions && (
                <div className="border-t px-6 py-4">
                  <div className="flex flex-col gap-4">{sheetActions}</div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
}

NavbarMobile.displayName = "NavbarMobile";

// ────────────────────────────────────────────────────────────────────
// Internal Navigation Item Component
// ────────────────────────────────────────────────────────────────────

interface NavItemProps {
  item: NavItem;
  onItemClick: () => void;
}

function NavItem({ item, onItemClick }: NavItemProps) {
  if (item.items && item.items.length > 0) {
    return (
      <SubMenu
        label={item.label}
        items={item.items}
        onItemClick={onItemClick}
      />
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onItemClick}
      className={cn(
        "text-lg font-medium text-muted-foreground transition-colors hover:text-foreground py-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      )}
      {...(item.external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {item.label}
    </Link>
  );
}

// ────────────────────────────────────────────────────────────────────
// Internal Sub-menu Component
// ────────────────────────────────────────────────────────────────────

interface SubMenuProps {
  label: string;
  items: NavItem[];
  onItemClick: () => void;
}

function SubMenu({ label, items, onItemClick }: SubMenuProps) {
  const id = React.useId();

  return (
    <Accordion.Root type="single" collapsible className="w-full">
      <Accordion.Item value={id} className="border-none">
        <Accordion.Trigger className="flex w-full items-center justify-between py-2 text-lg font-medium text-muted-foreground hover:text-foreground">
          {label}
          <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
        </Accordion.Trigger>
        <Accordion.Content className="pl-4 flex flex-col space-y-1">
          {items.map((item) => (
            <NavItem
              key={item.href || item.label}
              item={item}
              onItemClick={onItemClick}
            />
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
