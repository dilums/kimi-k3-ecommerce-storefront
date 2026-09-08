"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import { formatPrice, productById } from "@/data/catalog";
import { EmptyState, PageHeader, PageSkeleton } from "@/components/ProductCard";
import { Footnote } from "@/components/Ornaments";
import { useShop } from "@/store/ShopContext";
import { toast } from "sonner";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, hydrated } = useShop();

  if (!hydrated) return <PageSkeleton />;

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="No saved pieces yet."
        body="Tap the heart on any product to keep it here — for paydays, birthdays, or the corner that's still empty."
        cta="Discover the collection"
        href="/products"
      />
    );
  }

  return (
    <div>
      <PageHeader
        kicker={`${wishlist.length} saved ${wishlist.length === 1 ? "piece" : "pieces"}`}
        title="The wishlist."
        lede="Kept safely in this browser until you're ready. Stock levels are live — low-stock pieces won't wait forever."
      />
      <div className="container-x py-12">
        <div className="divide-y divide-border border-y border-border">
          {wishlist.map((id) => {
            const p = productById(id);
            if (!p) return null;
            const low = p.stock <= 8;
            return (
              <div key={id} className="flex items-center gap-5 py-5">
                <Link href={`/products/${p.id}`} className="shrink-0 border border-border">
                  <Image src={p.image} alt={p.name} width={96} height={96} className="h-24 w-24 bg-muted object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${p.id}`} className="link-underline font-medium">{p.name}</Link>
                  <p className="mt-1 font-mono2 text-[11px] text-muted-foreground">{p.sku}</p>
                  <p className={`mt-1 font-mono2 text-[11px] uppercase tracking-[0.12em] ${low ? "text-destructive" : "text-muted-foreground"}`}>
                    {low ? `Only ${p.stock} left` : "In stock"}
                  </p>
                </div>
                <p className="hidden font-mono2 text-sm sm:block">{formatPrice(p.price)}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(p.id, 1, undefined, true);
                      toggleWishlist(p.id);
                      toast.success("Moved to bag", { description: p.name });
                    }}
                    className="btn-outline-invert !px-4 !py-2.5"
                  >
                    <ShoppingBag className="h-4 w-4" /> <span className="hidden sm:inline">Move to bag</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Remove from wishlist"
                    className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-border bg-card p-6">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4" /> Wishlists live in this browser — sign in on any device to sync them (demo).
          </p>
          <Link href="/products" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.18em]">
            Keep browsing
          </Link>
        </div>
        <Footnote className="mt-4">
          Nothing here expires — but stock does.
        </Footnote>
      </div>
    </div>
  );
}
