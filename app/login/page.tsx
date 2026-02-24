import type { Metadata } from "next";
import LoginClientPage from "./login-client";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your LeadNexa account.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/login"
  }
};

export default function LoginPage() {
  return <LoginClientPage />;
}
