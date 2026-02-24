import type { Metadata } from "next";
import RegisterClientPage from "./register-client";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your LeadNexa account.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/register"
  }
};

export default function RegisterPage() {
  return <RegisterClientPage />;
}
