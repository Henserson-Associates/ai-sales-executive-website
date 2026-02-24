import type { Metadata } from "next";
import HomePageClient from "./home-page-client";
import { absoluteUrl } from "../lib/seo";

export const metadata: Metadata = {
  title: "LeadNexa.ai - AI Sales Agents for Scalable B2B Lead Generation",
  description:
    "LeadNexa.ai helps B2B teams scale pipeline with AI sales agents running cold email and LinkedIn outreach end-to-end.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LeadNexa.ai",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    sameAs: ["https://www.linkedin.com/company/leadnexa-ai/"]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LeadNexa.ai",
    url: absoluteUrl("/")
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <HomePageClient />
    </>
  );
}
