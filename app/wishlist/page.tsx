import type { Metadata } from "next";
import Wishlist from "@/components/pages/Wishlist";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "The pieces you've saved for later — kept safely in this browser.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Wishlist />;
}
