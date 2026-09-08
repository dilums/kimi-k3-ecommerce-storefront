"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { categories, categoryName, formatPrice, products } from "@/data/catalog";
import { posts } from "@/data/content";
import { EASE } from "@/components/motion/motion";

const pages = [
  { to: "/support", label: "Help centre", hint: "Order lookup & topics" },
  { to: "/support/faq", label: "Frequently asked", hint: "Quick answers" },
  { to: "/support/contact", label: "Contact the studio", hint: "Reply within a day" },
  { to: "/support/returns", label: "Returns", hint: "30-day considered returns" },
  { to: "/account", label: "Account", hint: "Orders & addresses" },
  { to: "/wishlist", label: "Wishlist", hint: "Saved pieces" },
  { to: "/cart", label: "Shopping bag", hint: "Review & checkout" },
  { to: "/content", label: "The Journal", hint: "Notes on living well" },
];

const groupHeading =
  "px-3 pb-1.5 pt-3 font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground";
const itemCls =
  "flex cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-sm transition-colors aria-selected:bg-foreground aria-selected:text-background [&[aria-selected=true]_span]:!text-background/70";

export default function SearchPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Global shortcuts: ⌘K / Ctrl+K toggles, "/" opens, Esc closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        onOpenChange(true);
      } else if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const go = (to: string) => {
    onOpenChange(false);
    router.push(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            aria-label="Close search"
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-foreground/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <div className="container-x pointer-events-none relative flex justify-center pt-[9vh] sm:pt-[12vh]">
            <motion.div
              className="pointer-events-auto w-full max-w-xl"
              initial={{ opacity: 0, y: -18, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Command label="Site search" className="border border-border bg-background shadow-[0_30px_70px_-24px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-3 border-b border-border px-4">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <Command.Input
                    ref={inputRef}
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search products, categories, essays, pages…"
                    className="h-13 w-full bg-transparent py-4 font-mono2 text-sm outline-none placeholder:text-muted-foreground/70"
                  />
                  <kbd className="hidden shrink-0 border border-border px-1.5 py-0.5 font-mono2 text-[9px] uppercase text-muted-foreground sm:block">
                    Esc
                  </kbd>
                </div>
                <Command.List className="max-h-[52vh] overflow-y-auto p-1.5">
                  <Command.Empty className="px-4 py-12 text-center">
                    <p className="font-display text-xl font-light">Nothing matches “{query}”.</p>
                    <p className="mt-2 font-mono2 text-[11px] text-muted-foreground">
                      Try “mug”, “linen” or “lamp” — or browse the full collection.
                    </p>
                  </Command.Empty>

                  <Command.Group heading={`Products — ${products.length}`} className={groupHeading}>
                    {products.map((p) => (
                      <Command.Item
                        key={p.id}
                        value={`${p.name} ${p.sku} ${categoryName(p.category)}`}
                        onSelect={() => go(`/products/${p.id}`)}
                        className={itemCls}
                      >
                        <span className="min-w-0 truncate">{p.name}</span>
                        <span className="shrink-0 font-mono2 text-[11px] text-muted-foreground">
                          {categoryName(p.category)} · {formatPrice(p.price)}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading={`Categories — ${categories.length}`} className={groupHeading}>
                    {categories.map((c) => (
                      <Command.Item
                        key={c.slug}
                        value={`${c.name} ${c.tagline} category`}
                        onSelect={() => go(`/categories/${c.slug}`)}
                        className={itemCls}
                      >
                        <span>{c.name}</span>
                        <span className="shrink-0 font-mono2 text-[11px] text-muted-foreground">{c.tagline}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading={`Journal — ${posts.length}`} className={groupHeading}>
                    {posts.map((p) => (
                      <Command.Item
                        key={p.slug}
                        value={`${p.title} ${p.tag} essay`}
                        onSelect={() => go(`/content/${p.slug}`)}
                        className={itemCls}
                      >
                        <span className="min-w-0 truncate">{p.title}</span>
                        <span className="shrink-0 font-mono2 text-[11px] text-muted-foreground">
                          {p.tag} · {p.readTime} min
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Pages" className={groupHeading}>
                    {pages.map((pg) => (
                      <Command.Item
                        key={pg.to}
                        value={`${pg.label} ${pg.hint}`}
                        onSelect={() => go(pg.to)}
                        className={itemCls}
                      >
                        <span>{pg.label}</span>
                        <span className="shrink-0 font-mono2 text-[11px] text-muted-foreground">{pg.hint}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
                <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  <span>↑↓ to move · ↵ to open</span>
                  <span>Aurelle search</span>
                </div>
              </Command>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
