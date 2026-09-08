import type { Metadata } from "next";
import Contact from "@/components/pages/Contact";

export const metadata: Metadata = {
  title: "Contact the Studio",
  description:
    "Questions about an order, a piece, or a trade enquiry — write to the Aurelle studio in Copenhagen and expect a reply within a day.",
  alternates: { canonical: "/support/contact" },
};

export default function Page() {
  return <Contact />;
}
