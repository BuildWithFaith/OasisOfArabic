import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MetaPixel } from "@/components/meta-pixel";
// import FloatingChatbox from "@/components/floating-chatbox";
import { PWAInstall } from "@/components/PWAInstall";
import "./globals.css";
import AnnocementBar from "@/components/annoucement-bar";
import { Suspense } from "react";
import { ImageProtection } from "@/components/image-protection";
import { CartDrawer } from "@/components/cart-drawer";

import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Support multiple domains - uses primary domain for metadata
const primaryDomain =
  process.env.NEXT_PUBLIC_PRIMARY_DOMAIN || "https://oasisofarabic.com";

// Validate URL format - if invalid, use fallback
let metadataBaseUrl: URL;
try {
  metadataBaseUrl = new URL(primaryDomain);
} catch {
  console.warn(
    `Invalid NEXT_PUBLIC_PRIMARY_DOMAIN: "${primaryDomain}". Using fallback.`
  );
  metadataBaseUrl = new URL("https://oasisofarabic.com");
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Oasis of Arabic | Master Arabic Online",
    template: "%s | Oasis of Arabic",
  },
  description: "Learn Arabic online with premium courses and live Zoom classes.",
  keywords: [
    "Arabic",
    "Learn Arabic",
    "Online Arabic Courses",
    "Arabic Grammar",
    "Live Zoom Classes",
    "Oasis of Arabic",
  ],
  authors: [{ name: "Oasis of Arabic" }],
  creator: "Oasis of Arabic",
  publisher: "Oasis of Arabic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: primaryDomain,
    siteName: "Oasis of Arabic",
    title: "Oasis of Arabic | Master Arabic Online",
    description:
      "Learn Arabic online with premium courses and live Zoom classes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oasis of Arabic | Master Arabic Online",
    description: "Learn Arabic online with premium courses and live Zoom classes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oasis of Arabic",
  alternateName: [
    "Oasis Arabic",
    "Oasis of Arabic Learning",
    "Master Arabic"
  ],
  url: "https://oasisofarabic.com",
  logo: "https://oasisofarabic.com/logo.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-304-1117423",
    contactType: "customer service",
    areaServed: "Global",
    availableLanguage: ["en", "ar"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${poppins.variable}`} data-scroll-behavior="smooth">
      <head>
        <MetaPixel />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Transitions removed */}

        {/* Wrap dynamic components in Suspense for PPR */}
        <Suspense fallback={null}>
          <AnnocementBar />
        </Suspense>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="min-h-screen bg-white">
          {/* Children already have their own Suspense boundaries */}
          {children}
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <Toaster position="top-right" />
        </Suspense>
        {/* <Suspense fallback={null}>
          <FloatingChatbox />
        </Suspense> */}
        <Suspense fallback={null}>
          <PWAInstall />
        </Suspense>

        <ImageProtection />
        <CartDrawer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

