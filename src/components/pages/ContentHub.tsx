"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { posts, postTags } from "@/data/content";
import { PageHeader } from "@/components/ProductCard";
import { CellIn, EASE } from "@/components/motion/motion";
import FadeImage from "@/components/FadeImage";
import { Footnote } from "@/components/Ornaments";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function ContentHub() {
  const [tag, setTag] = useState("All");
  const sorted = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), []);
  const list = tag === "All" ? sorted : sorted.filter((p) => p.tag === tag);
  const [featured, ...rest] = list;

  return (
    <div>
      <PageHeader
        kicker="The Journal"
        title="Notes on living well."
        lede="Essays, guides and rituals from our editors and makers — published when there's something worth saying, not on a content calendar."
      />

      {/* Tag filter */}
      <div className="border-b border-border">
        <div className="container-x flex flex-wrap gap-2 py-5">
          {postTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`border px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                tag === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="container-x py-12">
        {list.length === 0 ? (
          <p className="py-20 text-center font-display text-2xl font-light">Nothing filed under "{tag}" yet.</p>
        ) : (
          <>
            {/* Featured */}
            <AnimatePresence mode="wait">
            {featured && (
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
              <Link href={`/content/${featured.slug}`} className="group grid gap-px border border-border bg-border lg:grid-cols-2">
                <div className="bg-background">
                  <FadeImage
                    src={featured.image}
                    alt={featured.title}
                    className="aspect-[3/2] h-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center bg-background p-8 sm:p-12">
                  <p className="label-mono">Latest · {featured.tag}</p>
                  <h2 className="mt-4 font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  <p className="mt-6 font-mono2 text-[11px] text-muted-foreground">
                    {featured.author.name} · {formatDate(featured.date)} · {featured.readTime} min
                  </p>
                  <span className="link-underline mt-6 inline-flex w-fit items-center gap-1.5 font-mono2 text-xs uppercase tracking-[0.18em]">
                    Read the essay <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Grid */}
            <div className="mt-px grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <div key={p.slug} className="bg-background transition-colors hover:bg-card">
                  <CellIn index={i} className="h-full">
                  <Link href={`/content/${p.slug}`} className="group flex h-full flex-col">
                    <FadeImage
                      src={p.image}
                      alt={p.title}
                      className="aspect-[3/2]"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="label-mono">{p.tag}</p>
                      <p className="mt-3 font-display text-xl font-normal leading-snug group-hover:underline">{p.title}</p>
                      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{p.excerpt}</p>
                      <p className="mt-auto pt-5 font-mono2 text-[10px] text-muted-foreground">
                        {formatDate(p.date)} · {p.readTime} min read
                      </p>
                    </div>
                  </Link>
                  </CellIn>
                </div>
              ))}
            </div>
            <Footnote className="mt-10">
              Back issues are archived, never deleted — the journal goes back to 2019.
            </Footnote>
          </>
        )}
      </div>
    </div>
  );
}
