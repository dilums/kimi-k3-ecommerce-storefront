import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryDetail from "@/components/pages/CategoryDetail";
import JsonLd from "@/components/JsonLd";
import { categories, categoryBySlug, productsByCategory } from "@/data/catalog";
import { breadcrumbJsonLd, collectionJsonLd } from "@/lib/seo";

type Params = Promise<{ categoryId: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ categoryId: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categoryId } = await params;
  const category = categoryBySlug(categoryId);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: `${category.name} — Aurelle`,
      description: category.description,
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = categoryBySlug(categoryId);
  if (!category) notFound();

  const items = productsByCategory(category.slug);
  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd(
            category.name,
            category.description,
            `/categories/${category.slug}`,
            items.map((p) => ({ name: p.name, url: `/products/${p.id}` }))
          ),
          breadcrumbJsonLd([
            { name: "Categories", path: "/categories" },
            { name: category.name, path: `/categories/${category.slug}` },
          ]),
        ]}
      />
      <CategoryDetail categoryId={category.slug} />
    </>
  );
}
