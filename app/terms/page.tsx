import type { Metadata } from "next";
import TermsClientPage from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms for using LeadNexa services.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return <TermsClientPage />;
}
