"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/store/ThemeContext";
import { useShop } from "@/store/ShopContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchPalette from "@/components/SearchPalette";

/** Number that rolls/pops whenever its value changes. */
function RollingCount({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

const nav = [
  { to: "/products", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/content", label: "Journal" },
  { to: "/support", label: "Support" },
];

export default function Header() {
  const { theme, toggle } = useTheme();
  const { cartCount, wishlist } = useShop();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="border-b border-border">
        <p className="container-x py-1.5 text-center font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Complimentary shipping on orders over $150 · 30-day considered returns
        </p>
      </div>
      <div className="container-x flex items-center justify-between gap-6 py-4">
        <div className="flex items-end gap-5">
          <Link href="/" className="font-display text-3xl font-medium tracking-tight">
            Aurelle<span className="text-primary">.</span>
          </Link>
          <p className="mb-1 hidden max-w-[220px] font-mono2 text-[10px] leading-relaxed text-muted-foreground lg:block">
            Considered goods for modern living — made slowly, kept for decades.
          </p>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => {
            const isActive = pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                href={n.to}
                className={`link-underline font-mono2 text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            title="Search — press / or ⌘K"
            className="flex h-10 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground sm:border sm:border-border sm:px-3"
          >
            <Search className="h-[18px] w-[18px]" />
            <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.15em] lg:inline">Search</span>
            <kbd className="hidden border border-border px-1 py-0.5 font-mono2 text-[9px] text-muted-foreground lg:inline">⌘K</kbd>
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "light" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center overflow-hidden bg-primary font-mono2 text-[9px] text-primary-foreground">
                <RollingCount value={wishlist.length} />
              </span>
            )}
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className={`hidden h-10 w-10 items-center justify-center transition-colors sm:flex ${
              pathname === "/account" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="relative flex h-10 items-center gap-2 border border-border px-3 text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <ShoppingBag className="h-[16px] w-[16px]" />
            <span className="overflow-hidden font-mono2 text-xs">
              <RollingCount value={cartCount} />
            </span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Menu" className="flex h-10 w-10 items-center justify-center md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background p-0">
              <div className="flex items-center justify-between border-b border-border p-5">
                <span className="font-display text-xl">Aurelle.</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col">
                <button
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-2 border-b border-border px-5 py-4 text-left font-mono2 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-muted"
                >
                  <Search className="h-3.5 w-3.5" /> Search
                </button>
                {[...nav, { to: "/account", label: "Account" }, { to: "/wishlist", label: "Wishlist" }, { to: "/cart", label: "Bag" }].map((n) => (
                  <Link
                    key={n.to}
                    href={n.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border px-5 py-4 font-mono2 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
