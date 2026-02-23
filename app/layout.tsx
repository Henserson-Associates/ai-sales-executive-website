import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "LeadNexa.ai",
  description: "Scalable cold email + LinkedIn outreach that books B2B meetings.",
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
