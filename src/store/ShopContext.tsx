"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { productById, formatPrice } from "@/data/catalog";

export interface CartLine {
  productId: string;
  qty: number;
  color?: string;
}

interface ShopCtx {
  cart: CartLine[];
  wishlist: string[];
  recent: string[];
  /** False during SSR/first paint; true once localStorage has been read. */
  hydrated: boolean;
  addToCart: (productId: string, qty?: number, color?: string, silent?: boolean) => void;
  removeFromCart: (productId: string, color?: string) => void;
  setQty: (productId: string, qty: number, color?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  recordView: (productId: string) => void;
  cartCount: number;
  subtotal: number;
}

const Ctx = createContext<ShopCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  /* Start empty so server-rendered HTML and the first client render match;
     the persisted bag/wishlist/trail hydrate immediately after mount. */
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setCart(load("aurelle-cart", []));
    setWishlist(load("aurelle-wishlist", []));
    setRecent(load("aurelle-recent", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelle-cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelle-wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("aurelle-recent", JSON.stringify(recent));
  }, [recent, hydrated]);

  const recordView = (productId: string) =>
    setRecent((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 6));

  const addToCart: ShopCtx["addToCart"] = (productId, qty = 1, color, silent) => {
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId && l.color === color);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(next[idx].qty + qty, 99) };
        return next;
      }
      return [...prev, { productId, qty, color }];
    });
    if (!silent) {
      const p = productById(productId);
      toast.success("Added to bag", {
        description: `${p?.name ?? "Item"} — ${formatPrice(p?.price ?? 0)}`,
      });
    }
  };

  const removeFromCart: ShopCtx["removeFromCart"] = (productId, color) =>
    setCart((prev) => prev.filter((l) => !(l.productId === productId && l.color === color)));

  const setQty: ShopCtx["setQty"] = (productId, qty, color) => {
    if (qty <= 0) return removeFromCart(productId, color);
    setCart((prev) =>
      prev.map((l) => (l.productId === productId && l.color === color ? { ...l, qty } : l))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist: ShopCtx["toggleWishlist"] = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const p = productById(productId);
      toast(exists ? "Removed from wishlist" : "Saved to wishlist", {
        description: p?.name,
      });
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((s, l) => s + (productById(l.productId)?.price ?? 0) * l.qty, 0),
    [cart]
  );

  return (
    <Ctx.Provider
      value={{ cart, wishlist, recent, hydrated, addToCart, removeFromCart, setQty, clearCart, toggleWishlist, recordView, cartCount, subtotal }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
