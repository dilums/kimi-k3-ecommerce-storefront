import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/pages/ProductDetail";
import JsonLd from "@/components/JsonLd";
import { categoryBySlug, productById, products } from "@/data/catalog";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

type Params = Promise<{ productId: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { productId } = await params;
  const product = productById(productId);
  if (!product) return { title: "Piece Not Found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} — Aurelle`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { productId } = await params;
  const product = productById(productId);
  if (!product) notFound();

  const cat = categoryBySlug(product.category);
  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: "Shop", path: "/products" },
            { name: cat?.name ?? product.category, path: `/categories/${product.category}` },
            { name: product.name, path: `/products/${product.id}` },
          ]),
        ]}
      />
      <ProductDetail productId={product.id} />
    </>
  );
}
