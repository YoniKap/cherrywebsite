import type { Metadata, Viewport } from "next";
import { Archivo, Courier_Prime, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SITE } from "@/lib/site";
import "./globals.css";

// Body text.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Headlines, nicknames, pull quotes. SOFT + WONK axes give the 70s
// Windsor/Souvenir feel (see type-display / type-poster in globals.css).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

// Typewriter labels: dates, credits, nav.
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s — ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  themeColor: "#0d0907",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${courierPrime.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        {/* Wrap in <MotionProvider> once the first m.* component lands. */}
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
