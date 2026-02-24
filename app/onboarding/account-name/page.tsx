import type { Metadata } from "next";
import AccountNameClientPage from "./account-name-client";

export const metadata: Metadata = {
  title: "Set Account Name",
  description: "Complete your account setup by setting an account name.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/onboarding/account-name"
  }
};

export default function AccountNameOnboardingPage() {
  return <AccountNameClientPage />;
}
