import type { Metadata } from "next";
import Returns from "@/components/pages/Returns";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "30-day considered returns — free within the EU, collected from your home for furniture. Start a return with your order number.",
  alternates: { canonical: "/support/returns" },
};

export default function Page() {
  return <Returns />;
}
