"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, productsByCategory } from "@/data/catalog";
import { PageHeader } from "@/components/ProductCard";
import { CellIn } from "@/components/motion/motion";
import FadeImage from "@/components/FadeImage";
import { Footnote } from "@/components/Ornaments";

export default function Categories() {
  return (
    <div>
      <PageHeader
        kicker="Twelve departments"
        title="The category index."
        lede="Every object we sell belongs to one of twelve departments. Each is curated by a single buyer with deep expertise in that craft — no algorithms involved."
      />
      <div className="container-x py-14">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const count = productsByCategory(c.slug).length;
            return (
              <div key={c.slug} className="bg-background transition-colors duration-300 hover:bg-card">
                <CellIn index={i} className="h-full">
                <Link href={`/categories/${c.slug}`} className="group block h-full">
                  <div className="relative">
                    <FadeImage
                      src={c.image}
                      alt={c.name}
                      className="aspect-[3/2]"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 bg-background px-2.5 py-1 font-mono2 text-[10px] tracking-[0.15em] text-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div>
                      <p className="font-display text-2xl font-normal">{c.name}</p>
                      <p className="mt-1.5 text-[13px] text-muted-foreground">
                        {c.tagline} · {count} {count === 1 ? "piece" : "pieces"}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </div>
                </Link>
                </CellIn>
              </div>
            );
          })}
        </div>
        <Footnote className="mt-8">
          New departments open when the right maker appears — never before.
        </Footnote>
      </div>
    </div>
  );
}
