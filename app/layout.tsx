import type { Metadata, Viewport } from "next";
import { Geist, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SITE } from "@/lib/site";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.creator.name, url: SITE.creator.url }],
  creator: SITE.creator.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/assets/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/favicon_io/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "LamediYah Hebrew touch typing app with on-screen Hebrew keyboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  verification: {
    google: "RxxsYUzsD5Bo9K3_QBulJaMSJArRRs-Fx9XJWL7hL50",
  },
};

export const viewport: Viewport = {
  themeColor: "#2e1065",
};

// 🔎 Structured data: tells search engines this is a free educational web app
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any (web browser with a physical keyboard)",
  inLanguage: ["en", "he"],
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  educationalUse: "practice",
  teaches: ["Hebrew touch typing", "Hebrew keyboard layout", "Biblical Hebrew roots"],
  image: `${SITE.url}${SITE.ogImage}`,
  creator: {
    "@type": "Person",
    name: SITE.creator.name,
    url: SITE.creator.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark notranslate" translate="no">
      <body className={`${geistSans.variable} ${frankRuhl.variable} antialiased font-sans bg-purple-950`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
