import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Sales Executive",
  description: "Scalable LinkedIn outreach that books B2B meetings."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-ink text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}

