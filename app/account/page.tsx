import type { Metadata } from "next";
import Account from "@/components/pages/Account";

export const metadata: Metadata = {
  title: "Your Account",
  description: "Orders, addresses and settings for your Aurelle account.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Account />;
}
