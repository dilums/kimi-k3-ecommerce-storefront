import type { Metadata } from "next";
import ContentHub from "@/components/pages/ContentHub";
import JsonLd from "@/components/JsonLd";
import { posts } from "@/data/content";
import { collectionJsonLd } from "@/lib/seo";

const title = "The Journal";
const description =
  "Notes on living well — guides, rituals and material stories from the Aurelle studio and the makers behind the collection.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/content" },
  openGraph: { title: `${title} — Aurelle`, description, images: ["/images/posts/slow-home.webp"] },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={collectionJsonLd(
          title,
          description,
          "/content",
          posts.map((p) => ({ name: p.title, url: `/content/${p.slug}` }))
        )}
      />
      <ContentHub />
    </>
  );
}
