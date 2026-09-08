import type { Metadata } from "next";
import Checkout from "@/components/pages/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout — encrypted payment, gift wrapping on request, and tracked delivery.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Checkout />;
}
