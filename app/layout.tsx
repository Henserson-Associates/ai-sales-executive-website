import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "../lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LeadNexa.ai | AI Sales Agents for B2B Pipeline Growth",
    template: "%s | LeadNexa.ai"
  },
  description: "Scalable cold email and LinkedIn outreach that helps B2B teams book qualified meetings.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "LeadNexa.ai | AI Sales Agents for B2B Pipeline Growth",
    description: "Scalable cold email and LinkedIn outreach that helps B2B teams book qualified meetings.",
    url: SITE_URL,
    siteName: "LeadNexa.ai",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadNexa.ai | AI Sales Agents for B2B Pipeline Growth",
    description: "Scalable cold email and LinkedIn outreach that helps B2B teams book qualified meetings."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/icon.png"
  },
  other: {
    "trustpilot-one-time-domain-verification-id": "4d8bf565-665f-4c79-8dd9-de8c3a11f4c1"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} bg-ink text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
