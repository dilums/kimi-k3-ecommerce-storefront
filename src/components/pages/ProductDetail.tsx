"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  categoryBySlug,
  formatPrice,
  productById,
  productsByCategory,
  reviewsFor,
  type Product,
} from "@/data/catalog";
import ProductCard, { Stars } from "@/components/ProductCard";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import { Barcode, Footnote } from "@/components/Ornaments";
import { useShop } from "@/store/ShopContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MotionImage = motion.create(Image);

export default function ProductDetail({ productId }: { productId: string }) {
  const product = productById(productId);
  const { addToCart, toggleWishlist, wishlist, recordView, recent } = useShop();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [imgIdx, setImgIdx] = useState(0);

  /* Keep a rolling trail of viewed pieces (this browser only) */
  useEffect(() => {
    if (product) recordView(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const gallery = useMemo(() => {
    if (!product) return [];
    const siblings = productsByCategory(product.category).filter((p) => p.id !== product.id);
    return [product.image, ...siblings.map((s) => s.image)].slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-3xl font-light">This piece has sold out — completely.</p>
        <Link href="/products" className="btn-outline-invert mt-8">Back to the collection</Link>
      </div>
    );
  }

  const cat = categoryBySlug(product.category);
  const reviews = reviewsFor(product.id);
  const related = productsByCategory(product.category).filter((p) => p.id !== product.id);
  const recentOthers = recent
    .filter((id) => id !== product.id)
    .map((id) => productById(id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);
  const wished = wishlist.includes(product.id);
  const low = product.stock <= 8;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-x flex items-center gap-2 py-4 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          <Link href="/products" className="flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Shop
          </Link>
          <span>/</span>
          <Link href={`/categories/${product.category}`} className="hover:text-foreground">{cat?.name}</Link>
          <span>/</span>
          <span className="text-foreground">{product.sku}</span>
        </div>
      </div>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="relative aspect-square overflow-hidden border border-border bg-muted">
            <AnimatePresence mode="popLayout" initial={false}>
              <MotionImage
                key={gallery[imgIdx]}
                src={gallery[imgIdx]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={imgIdx === 0}
                className="object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </AnimatePresence>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  onClick={() => setImgIdx(i)}
                  className={`border transition-colors ${i === imgIdx ? "border-foreground" : "border-border hover:border-foreground/50"}`}
                >
                  <Image src={g} alt="" width={400} height={400} className="aspect-square w-full bg-muted object-cover" />
                </button>
              ))}
            </div>
          )}
          <p className="mt-3 font-mono2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {imgIdx === 0 ? "Studio photograph" : "Shown alongside the collection"}
          </p>
        </motion.div>

        {/* Info */}
        <Stagger inView={false}>
          <StaggerItem>
          <p className="label-mono">{cat?.name} · {product.sku}</p>
          <h1 className="mt-3 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="font-mono2 text-xs text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>
          <p className="mt-6 font-mono2 text-3xl">
            {formatPrice(product.price)}
            {product.compareAt && (
              <span className="ml-3 align-middle text-base text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-foreground/85">{product.description}</p>

          <div className="mt-8 flex items-center gap-4 text-foreground/75">
            <Barcode code={product.sku} className="h-6 w-32" />
            <span className="font-mono2 text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              AUR·{product.sku}
            </span>
          </div>
          </StaggerItem>

          {product.colors && (
            <StaggerItem>
            <div className="mt-7">
              <p className="label-mono mb-3">Finish — {color ?? product.colors[0].name}</p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <motion.button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    title={c.name}
                    whileTap={{ scale: 0.85 }}
                    className={`h-8 w-8 border-2 transition-all ${
                      (color ?? product.colors![0].name) === c.name
                        ? "border-foreground"
                        : "border-transparent hover:border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
            </StaggerItem>
          )}

          {/* Qty + actions */}
          <StaggerItem>
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-full w-11 items-center justify-center hover:bg-muted" aria-label="Decrease quantity">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 overflow-hidden text-center font-mono2 text-sm">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={qty}
                    className="inline-block"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {qty}
                  </motion.span>
                </AnimatePresence>
              </span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="flex h-full w-11 items-center justify-center hover:bg-muted" aria-label="Increase quantity">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => addToCart(product.id, qty, color ?? product.colors?.[0]?.name)}
              className="btn-solid-invert flex-1 py-3.5"
            >
              Add to bag — {formatPrice(product.price * qty)}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="flex w-[52px] items-center justify-center border border-border transition-colors hover:border-foreground"
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-foreground" : ""}`} />
            </motion.button>
          </div>

          <p className={`mt-4 flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.15em] ${low ? "text-destructive" : "text-muted-foreground"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${low ? "bg-destructive" : "bg-green-600"}`} />
            {low ? `Low stock — ${product.stock} remaining` : `In stock — ships within 48 hours`}
          </p>
          </StaggerItem>

          <StaggerItem>
          <div className="mt-8 grid grid-cols-3 divide-x divide-border border border-border">
            {[
              { icon: Truck, t: "Free over $150" },
              { icon: RotateCcw, t: "30-day returns" },
              { icon: ShieldCheck, t: "5-year guarantee" },
            ].map((s) => (
              <div key={s.t} className="flex flex-col items-center gap-2 p-4 text-center">
                <s.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <span className="font-mono2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{s.t}</span>
              </div>
            ))}
          </div>
          <Footnote className="mt-3">
            Repaired free for five years — after that, spare parts forever.
          </Footnote>

          {/* Accordions */}
          <Accordion type="single" collapsible className="mt-8 border-t border-border">
            <AccordionItem value="story" className="border-border">
              <AccordionTrigger className="font-mono2 text-xs uppercase tracking-[0.18em] hover:no-underline">The story</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{product.story}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="specs" className="border-border">
              <AccordionTrigger className="font-mono2 text-xs uppercase tracking-[0.18em] hover:no-underline">Materials & dimensions</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground">Materials — </span>{product.materials}</p>
                <p><span className="text-foreground">Dimensions — </span>{product.dimensions}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care" className="border-border">
              <AccordionTrigger className="font-mono2 text-xs uppercase tracking-[0.18em] hover:no-underline">Care</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{product.care}</AccordionContent>
            </AccordionItem>
          </Accordion>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Reviews */}
      <section className="border-t border-border">
        <div className="container-x grid gap-12 py-14 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="label-mono">Reviews</p>
            <p className="mt-3 font-display text-6xl font-light">{product.rating.toFixed(1)}</p>
            <Stars rating={product.rating} className="mt-2" />
            <p className="mt-2 font-mono2 text-[11px] text-muted-foreground">{product.reviewCount} verified reviews</p>
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((s) => {
                const pct = s === 5 ? 72 : s === 4 ? 21 : s === 3 ? 5 : s === 2 ? 2 : 0;
                return (
                  <div key={s} className="flex items-center gap-3 font-mono2 text-[11px] text-muted-foreground">
                    <span className="w-3">{s}</span>
                    <div className="h-1 flex-1 bg-border">
                      <motion.div
                        className="h-full bg-foreground"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.15 + (5 - s) * 0.08, ease: EASE }}
                      />
                    </div>
                    <span className="w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {reviews.map((r, ri) => (
              <Reveal key={r.id} delay={ri * 0.08} y={18}>
              <article className="py-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Stars rating={r.rating} />
                  <p className="text-sm font-medium">{r.title}</p>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                <p className="mt-3 font-mono2 text-[11px] text-muted-foreground">
                  {r.author} · {r.location} · {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  {r.verified && (
                    <span className="ml-2 inline-flex items-center gap-1 text-foreground">
                      <Check className="h-3 w-3" /> Verified purchase
                    </span>
                  )}
                </p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="container-x py-14">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-3xl font-light tracking-tight">More in {cat?.name}</h2>
              <Link href={`/categories/${product.category}`} className="link-underline font-mono2 text-xs uppercase tracking-[0.18em]">
                View category
              </Link>
            </div>
            <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Recently viewed */}
      {recentOthers.length > 0 && (
        <section className="border-t border-border">
          <div className="container-x py-14">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-light tracking-tight">Recently viewed</h2>
              <span className="shrink-0 font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Kept in this browser only
              </span>
            </div>
            <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-4">
              {recentOthers.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
