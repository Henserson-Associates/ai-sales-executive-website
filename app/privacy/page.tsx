import type { Metadata } from "next";
import PrivacyClientPage from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how LeadNexa collects, uses, and protects data.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return <PrivacyClientPage />;
}
