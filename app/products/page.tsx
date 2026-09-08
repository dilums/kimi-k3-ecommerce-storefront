import type { Metadata } from "next";
import Products from "@/components/pages/Products";
import JsonLd from "@/components/JsonLd";
import { products } from "@/data/catalog";
import { collectionJsonLd } from "@/lib/seo";

const title = "Shop All Objects";
const description =
  "The full Aurelle collection — ceramics, textiles, lighting, furniture and more, made slowly by independent studios and kept for decades.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title: `${title} — Aurelle`, description, images: ["/images/products/vase-01.webp"] },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={collectionJsonLd(
          title,
          description,
          "/products",
          products.map((p) => ({ name: p.name, url: `/products/${p.id}` }))
        )}
      />
      <Products />
    </>
  );
}
