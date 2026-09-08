"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, productById } from "@/data/catalog";
import { EmptyState, PageHeader, PageSkeleton } from "@/components/ProductCard";
import { ArrowDoodle, Footnote } from "@/components/Ornaments";
import { useShop } from "@/store/ShopContext";

export default function Cart() {
  const { cart, setQty, removeFromCart, subtotal, hydrated } = useShop();

  if (!hydrated) return <PageSkeleton />;

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your bag is empty."
        body="Good things take up little space. Browse the collection and add the pieces your home has been waiting for."
        cta="Browse the collection"
        href="/products"
      />
    );
  }

  const shipping = subtotal >= 150 ? 0 : 9;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <PageHeader
        kicker="Your selection"
        title="Shopping bag."
        lede="Everything ships plastic-free from our Rotterdam studio within 48 hours."
      />
      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        {/* Lines */}
        <div className="divide-y divide-border border-y border-border">
          {cart.map((line) => {
            const p = productById(line.productId);
            if (!p) return null;
            return (
              <div key={line.productId + (line.color ?? "")} className="flex gap-5 py-6">
                <Link href={`/products/${p.id}`} className="shrink-0 border border-border">
                  <Image src={p.image} alt={p.name} width={128} height={128} className="h-28 w-28 bg-muted object-cover sm:h-32 sm:w-32" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/products/${p.id}`} className="link-underline font-medium">{p.name}</Link>
                      <p className="mt-1 font-mono2 text-[11px] text-muted-foreground">
                        {p.sku}{line.color ? ` · ${line.color}` : ""}
                      </p>
                      {p.stock <= 8 && (
                        <p className="mt-1.5 font-mono2 text-[10px] uppercase tracking-[0.15em] text-destructive">
                          Only {p.stock} left in the studio
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 font-mono2 text-sm">{formatPrice(p.price * line.qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQty(line.productId, line.qty - 1, line.color)}
                        className="flex h-9 w-9 items-center justify-center hover:bg-muted"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center font-mono2 text-sm">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.productId, Math.min(p.stock, line.qty + 1), line.color)}
                        className="flex h-9 w-9 items-center justify-center hover:bg-muted"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(line.productId, line.color)}
                      className="flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-32 border border-border bg-card p-7">
            <p className="label-mono">Order summary</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-mono2">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-mono2">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estimated tax (8%)</dt>
                <dd className="font-mono2">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd className="font-mono2">{formatPrice(total)}</dd>
              </div>
            </dl>
            {shipping > 0 ? (
              <div className="mt-5 border border-border p-3">
                <p className="font-mono2 text-[11px] leading-relaxed text-muted-foreground">
                  Add {formatPrice(150 - subtotal)} more for complimentary shipping.
                </p>
                <div className="mt-2 h-1 bg-border">
                  <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }} />
                </div>
              </div>
            ) : (
              <div className="mt-5 border border-border p-3">
                <p className="flex items-center gap-1.5 font-mono2 text-[11px] leading-relaxed text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-green-600" /> Complimentary shipping unlocked — nicely considered.
                </p>
                <div className="mt-2 h-1 bg-border">
                  <div className="h-full w-full bg-primary transition-all" />
                </div>
              </div>
            )}
            <div aria-hidden className="mt-5 flex items-center justify-end gap-1 pr-1 text-muted-foreground">
              <span className="-rotate-6 font-mono2 text-[10px] uppercase tracking-[0.18em]">this way</span>
              <ArrowDoodle className="h-8 w-9" />
            </div>
            <Link href="/checkout" className="btn-solid-invert mt-2 w-full">
              Proceed to checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="mt-4 block text-center font-mono2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
              Continue shopping
            </Link>
            <Footnote className="mt-6">
              Bags are held for 72 hours — after that, stock goes back on the shelf.
            </Footnote>
          </div>
        </aside>
      </div>
    </div>
  );
}
