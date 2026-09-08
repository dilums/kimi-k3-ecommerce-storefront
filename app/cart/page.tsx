import type { Metadata } from "next";
import Cart from "@/components/pages/Cart";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the pieces in your Aurelle bag and check out — complimentary shipping over $150.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Cart />;
}
