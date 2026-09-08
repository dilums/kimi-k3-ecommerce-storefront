import type { Category, Product } from "@/data/catalog";
import type { Post } from "@/data/content";
import { categoryName } from "@/data/catalog";

/** Public origin used for canonical URLs, Open Graph and JSON-LD.
 *  Swap for the real domain when the shop goes live. */
export const SITE_URL = "https://aurelle.shop";
export const SITE_NAME = "Aurelle";
export const SITE_DESCRIPTION =
  "Ceramics, textiles, lighting and furniture from 38 independent studios — chosen slowly, made honestly, and guaranteed to be worth keeping.";

export const abs = (path: string) => `${SITE_URL}${path}`;

/* ── JSON-LD builders ────────────────────────────────────────────────── */

export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gothersgade 21",
        addressLocality: "Copenhagen",
        addressCountry: "DK",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  ];
}

export function productJsonLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: abs(p.image),
    sku: p.sku,
    category: categoryName(p.category),
    brand: { "@type": "Brand", name: SITE_NAME },
    url: abs(`/products/${p.id}`),
    offers: {
      "@type": "Offer",
      url: abs(`/products/${p.id}`),
      priceCurrency: "USD",
      price: p.price,
      availability:
        p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      reviewCount: p.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: abs(post.image),
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: abs(`/content/${post.slug}`),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function collectionJsonLd(
  title: string,
  description: string,
  path: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: abs(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: abs(it.url),
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export type JsonLdData = Record<string, unknown> | Record<string, unknown>[];
