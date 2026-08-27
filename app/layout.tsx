import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import SiteChrome from "@/components/layout/SiteChrome/SiteChrome";

import { SITE } from "@/constants/site";

import "@styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SiteChrome />

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}