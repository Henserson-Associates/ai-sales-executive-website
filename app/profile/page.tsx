import type { Metadata } from "next";
import ProfileClientPage from "./profile-client";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your LeadNexa account profile and subscription.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/profile"
  }
};

export default function ProfilePage() {
  return <ProfileClientPage />;
}
