import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/section/footer-15";
import { Button } from "@/components/ui/button";
import { PenciledWordmark } from "@/components/icons/penciled-wordmark";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar
            logo={<PenciledWordmark className="h-7 w-auto" />}
            companyUrl="/"
            links={[
              { label: "Features", href: "/features" },
              { label: "Results", href: "/results" },
              { label: "Blog", href: "/blog" },
            ]}
            actions={
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/#demo">Book a Demo</Link>
                </Button>
              </>
            }
          />
          {children}
          <Footer
            logo={PenciledWordmark}
            menuLinks={[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ]}
            copyright={`© ${new Date().getFullYear()} Penciled. All rights reserved.`}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
