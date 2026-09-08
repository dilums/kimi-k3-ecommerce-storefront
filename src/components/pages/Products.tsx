"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products, type Product } from "@/data/catalog";
import ProductCard, { PageHeader } from "@/components/ProductCard";
import { EASE } from "@/components/motion/motion";
import { Aster, Footnote } from "@/components/Ornaments";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "name";

const MAX_PRICE = 1000;

function Filters({
  selected,
  toggleCategory,
  priceCap,
  setPriceCap,
}: {
  selected: string[];
  toggleCategory: (slug: string) => void;
  priceCap: number;
  setPriceCap: (n: number) => void;
}) {
  return (
    <div className="space-y-10">
      <div>
        <p className="label-mono mb-4">Category</p>
        <ul className="space-y-2.5">
          {categories.map((c) => {
            const active = selected.includes(c.slug);
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <li key={c.slug}>
                <button
                  onClick={() => toggleCategory(c.slug)}
                  className={`flex w-full items-center justify-between text-left text-sm transition-colors ${
                    active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 border transition-colors ${
                        active ? "border-foreground bg-foreground" : "border-border"
                      }`}
                    />
                    {c.name}
                  </span>
                  <span className="font-mono2 text-[10px]">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="label-mono mb-4">Max price — ${priceCap}</p>
        <Slider
          value={[priceCap]}
          onValueChange={([v]) => setPriceCap(v)}
          min={30}
          max={MAX_PRICE}
          step={10}
        />
        <div className="mt-2 flex justify-between font-mono2 text-[10px] text-muted-foreground">
          <span>$30</span>
          <span>$1000</span>
        </div>
      </div>
      <div>
        <p className="label-mono mb-4">Availability</p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Everything listed is in our Rotterdam studio and ships within 48 hours.
        </p>
      </div>
      <Footnote>
        Studio photographs. Handmade pieces vary by a centimetre or two — that's the point.
      </Footnote>
    </div>
  );
}

export default function Products() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [priceCap, setPriceCap] = useState(MAX_PRICE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (slug: string) =>
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const filtered = useMemo(() => {
    let list: Product[] = products.filter(
      (p) =>
        p.price <= priceCap &&
        (selected.length === 0 || selected.includes(p.category)) &&
        (query.trim() === "" ||
          (p.name + " " + p.description + " " + p.sku).toLowerCase().includes(query.toLowerCase()))
    );
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "name": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list = [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return list;
  }, [query, selected, sort, priceCap]);

  return (
    <div>
      <PageHeader
        kicker="The full collection"
        title="Everything, considered."
        lede="Twenty-five objects from twelve categories. Each one handmade, each one chosen to be kept. Filter by what your home actually needs."
      />

      <div className="container-x flex flex-col gap-10 py-10 lg:flex-row">
        {/* Sidebar — desktop */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <Filters selected={selected} toggleCategory={toggleCategory} priceCap={priceCap} setPriceCap={setPriceCap} />
        </aside>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection…"
                className="input-plain pl-10"
              />
            </div>
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <button className="btn-outline-invert lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto border-r border-border bg-background p-6">
                <p className="mb-6 font-display text-xl">Filters</p>
                <Filters selected={selected} toggleCategory={toggleCategory} priceCap={priceCap} setPriceCap={setPriceCap} />
              </SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="w-[190px] rounded-none border-border bg-transparent font-mono2 text-xs uppercase tracking-wider">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: low → high</SelectItem>
                <SelectItem value="price-desc">Price: high → low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="name">Name A–Z</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-auto flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Aster className="h-3 w-3 text-primary" />
              {filtered.length} of {products.length}
            </span>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="border border-dashed border-border py-20 text-center"
              >
                <p className="font-display text-2xl font-light">Nothing matches those filters.</p>
                <p className="mt-3 text-sm text-muted-foreground">Try widening the price range or clearing the search.</p>
                <button
                  onClick={() => { setQuery(""); setSelected([]); setPriceCap(MAX_PRICE); }}
                  className="btn-outline-invert mt-6"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <div key="grid" className="hairline-grid sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
