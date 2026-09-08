"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { categoryBySlug, productsByCategory } from "@/data/catalog";
import ProductCard from "@/components/ProductCard";
import { ImageReveal } from "@/components/motion/motion";
import { Footnote } from "@/components/Ornaments";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export default function CategoryDetail({ categoryId }: { categoryId: string }) {
  const category = categoryBySlug(categoryId);
  const [sort, setSort] = useState<Sort>("featured");

  if (!category) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-3xl font-light">That department doesn't exist.</p>
        <Link href="/categories" className="btn-outline-invert mt-8">All categories</Link>
      </div>
    );
  }

  let items = productsByCategory(category.slug);
  if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "rating") items = [...items].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      {/* Category hero */}
      <div className="border-b border-border">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2">
          <div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> All categories
            </Link>
            <h1 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
              {category.name}
            </h1>
            <p className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.18em] text-primary">{category.tagline}</p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">{category.description}</p>
            <p className="mt-6 font-mono2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {items.length} {items.length === 1 ? "piece" : "pieces"} in the collection
            </p>
            <Footnote className="mt-6">
              Photographed in-studio on the last overcast Tuesday of August.
            </Footnote>
          </div>
          <div className="border border-border">
            <ImageReveal
              src={category.image}
              alt={category.name}
              className="aspect-[3/2]"
              imgClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container-x py-12">
        <div className="mb-8 flex items-center justify-between">
          <p className="label-mono">The collection</p>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger className="w-[190px] rounded-none border-border bg-transparent font-mono2 text-xs uppercase tracking-wider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: low → high</SelectItem>
              <SelectItem value="price-desc">Price: high → low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
          <motion.div layout className="hairline-grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

        <div className="mt-14 border border-border bg-card p-8 text-center sm:p-12">
          <p className="font-display text-2xl font-light">Looking for something we don't stock yet?</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Our buyers take requests seriously. Tell us what your home is missing and we'll look for a maker.
          </p>
          <Link href="/support/contact" className="btn-outline-invert mt-6">Make a request</Link>
        </div>
      </div>
    </div>
  );
}
