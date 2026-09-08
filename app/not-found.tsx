import type { Metadata } from "next";
import NotFound from "@/components/pages/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound />;
}
