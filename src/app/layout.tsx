import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { WebsiteSchema, OrganizationSchema } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nakedslope.com"),
  title: {
    default: "NakedSlope — No Fluff. Just Gear.",
    template: "%s | NakedSlope",
  },
  description:
    "Honest gear reviews for skiers, snowboarders, surfers, and overlanders. No sponsored fluff — just what actually works.",
  keywords: [
    'ski gear reviews',
    'snowboard gear',
    'wetsuit reviews',
    'surfboard guides',
    'overlanding gear',
    'outdoor gear reviews',
    'ski helmet reviews',
    'ski length calculator',
    'wetsuit thickness calculator',
  ],
  authors: [{ name: 'NakedSlope' }],
  creator: 'NakedSlope',
  publisher: 'NakedSlope',
  openGraph: {
    siteName: "NakedSlope",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nakedslope",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'UF8XPiM2ttxaKbILVL3gHfP-8jHmJDdvLGTkiuZ2Tgs',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <WebsiteSchema url="https://nakedslope.com" />
        <OrganizationSchema url="https://nakedslope.com" />
      </head>
      <body className="grain min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pb-[calc(56px+env(safe-area-inset-bottom,0px))] md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
