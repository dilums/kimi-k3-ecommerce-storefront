import type { Metadata } from "next";
import Support from "@/components/pages/Support";

export const metadata: Metadata = {
  title: "Help Centre",
  description:
    "Order lookup, shipping times, returns and product care — every answer from the Aurelle studio, or a reply within a day.",
  alternates: { canonical: "/support" },
};

export default function Page() {
  return <Support />;
}
