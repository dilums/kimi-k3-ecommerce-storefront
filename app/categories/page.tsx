import type { Metadata } from "next";
import Categories from "@/components/pages/Categories";
import JsonLd from "@/components/JsonLd";
import { categories } from "@/data/catalog";
import { collectionJsonLd } from "@/lib/seo";

const title = "Categories";
const description =
  "Twelve departments of considered goods — ceramics, lighting, textiles, kitchen, furniture and more, each from studios that specialise in one thing done well.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/categories" },
  openGraph: { title: `${title} — Aurelle`, description, images: ["/images/products/lantern-lamp.webp"] },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={collectionJsonLd(
          "Shop by Category",
          description,
          "/categories",
          categories.map((c) => ({ name: c.name, url: `/categories/${c.slug}` }))
        )}
      />
      <Categories />
    </>
  );
}
