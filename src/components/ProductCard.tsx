"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { categoryName, formatPrice, type Product } from "@/data/catalog";
import { useShop } from "@/store/ShopContext";
import { EASE } from "@/components/motion/motion";
import FadeImage from "@/components/FadeImage";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < Math.round(rating) ? "fill-foreground text-foreground" : "text-border"}`}
        />
      ))}
    </span>
  );
}

export default function ProductCard({ product, index }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const wished = wishlist.includes(product.id);

  return (
    <motion.div
      layout
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="hairline-cell group relative transition-colors duration-300 hover:bg-card"
    >
      {/* The cell frame (borders) stays static — only the content inside animates */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px 80px 0px" }}
        transition={{ duration: 0.7, delay: Math.min((index ?? 0) * 0.045, 0.35), ease: EASE }}
        className="flex h-full flex-col p-5"
      >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="label-mono">{categoryName(product.category)}</p>
          <Link href={`/products/${product.id}`} className="mt-1.5 block">
            <span className="link-underline text-sm font-medium leading-snug">{product.name}</span>
          </Link>
        </div>
        {typeof index === "number" && (
          <span className="font-mono2 text-[10px] text-muted-foreground">{String(index + 1).padStart(3, "0")}</span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="font-mono2 text-sm">
          {formatPrice(product.price)}
          {product.compareAt && (
            <span className="ml-2 text-xs text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
          )}
        </span>
        <span className="font-mono2 text-[10px] uppercase tracking-wider text-muted-foreground">{product.sku}</span>
      </div>

      <Link href={`/products/${product.id}`} className="relative mt-4 block flex-1">
        <FadeImage
          src={product.image}
          alt={product.name}
          className="aspect-square"
          imgClassName="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span
            className={`absolute left-0 top-0 px-2 py-1 font-mono2 text-[9px] uppercase tracking-[0.15em] ${
              product.badge === "Sale"
                ? "bg-destructive text-destructive-foreground"
                : "bg-foreground text-background"
            }`}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => addToCart(product.id, 1)}
          className="flex-1 border border-foreground py-2 font-mono2 text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background"
        >
          Add to bag
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-foreground"
        >
          <motion.span
            key={String(wished)}
            initial={{ scale: wished ? 0.4 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
            className="flex"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-foreground" : ""}`} />
          </motion.span>
        </motion.button>
      </div>
      </motion.div>
    </motion.div>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-border">
      <div className="container-x py-12 sm:py-16">
        <motion.p
          className="label-mono"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        >
          {kicker}
        </motion.p>
        <div className="mt-3 max-w-3xl overflow-hidden pb-[0.2em] -mb-[0.2em]">
          <motion.h1
            className="font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ y: "125%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
          >
            {title}
          </motion.h1>
        </div>
        {lede && (
          <motion.p
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            {lede}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  cta,
  href,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="flex flex-col items-center"
      >
        <p className="label-mono">Nothing here yet</p>
        <h2 className="mt-4 font-display text-3xl font-light sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
        <Link href={href} className="btn-outline-invert mt-8">
          {cta}
        </Link>
      </motion.div>
    </div>
  );
}

/** Quiet skeleton shown while the persisted bag/wishlist hydrates — keeps
 *  server-rendered HTML and the first client render identical. */
export function PageSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="container-x py-16" aria-hidden>
      <div className="h-4 w-32 animate-pulse bg-muted" />
      <div className="mt-4 h-10 w-72 animate-pulse bg-muted" />
      <div className="mt-12 space-y-6 border-t border-border pt-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-5">
            <div className="h-28 w-28 shrink-0 animate-pulse border border-border bg-muted sm:h-32 sm:w-32" />
            <div className="flex-1 space-y-3 py-2">
              <div className="h-4 w-1/3 animate-pulse bg-muted" />
              <div className="h-3 w-1/4 animate-pulse bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
