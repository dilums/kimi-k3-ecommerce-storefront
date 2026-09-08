"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Leaf, Package, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { categories, products } from "@/data/catalog";
import { posts } from "@/data/content";
import ProductCard from "@/components/ProductCard";
import { CellIn, EASE, ImageReveal, MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/motion";
import FadeImage from "@/components/FadeImage";
import { ArrowDoodle, Asterism, CropMarks, Squiggle, Stamp } from "@/components/Ornaments";
import { useImageLoaded } from "@/hooks/use-image-loaded";
import { toast } from "sonner";

const MotionImage = motion.create(Image);

const values = [
  { icon: Package, title: "Free shipping over $150", body: "Tracked, insured and plastic-free, everywhere we deliver." },
  { icon: RefreshCcw, title: "30-day returns", body: "Live with it first. Send it back free if it isn't right." },
  { icon: Leaf, title: "Small-batch making", body: "38 independent studios. Nothing mass-produced, ever." },
  { icon: ShieldCheck, title: "Built to be repaired", body: "Spare parts and care guides for everything we sell." },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const { loaded: heroLoaded, ref: heroRef, onLoad: heroOnLoad } = useImageLoaded();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <motion.p
              className="label-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Est. 2019 · Copenhagen
            </motion.p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              <MaskReveal delay={0.15}>Objects for a</MaskReveal>
              <MaskReveal delay={0.28}>
                considered{" "}
                <span className="relative inline-block">
                  <em className="not-italic text-primary">home</em>
                  <Squiggle className="absolute bottom-0 left-0 h-2.5 w-full text-primary/80" delay={1.2} />
                </span>
                .
              </MaskReveal>
            </h1>
            <motion.p
              className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              Ceramics, textiles, lighting and furniture from 38 independent studios — chosen
              slowly, made honestly, and guaranteed to be worth keeping.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            >
              <Link href="/products" className="btn-solid-invert">
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/content/the-slow-home" className="btn-outline-invert">
                Our philosophy
              </Link>
            </motion.div>
            <Stagger className="mt-12 flex divide-x divide-border font-mono2 text-[11px]" inView={false}>
              {[
                ["38", "studios"],
                ["25", "products"],
                ["42", "countries"],
              ].map(([n, l]) => (
                <StaggerItem key={l} className="pr-6 pl-6 first:pl-0">
                  <p className="text-2xl font-medium">{n}</p>
                  <p className="mt-1 uppercase tracking-[0.18em] text-muted-foreground">{l}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CropMarks />
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted">
              {!heroLoaded && <div aria-hidden className="absolute inset-0 z-10 animate-pulse bg-muted" />}
              <MotionImage
                ref={heroRef}
                src="/images/hero/hero-main.webp"
                alt="A warm, curated living space with boucle chair, ceramics and a paper lantern"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onLoad={heroOnLoad}
                className="object-cover"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={heroLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.15 }}
                transition={{ duration: 1.6, delay: 0.15, ease: EASE }}
              />
            </div>
            <motion.div
              className="absolute -bottom-px -left-px flex items-center gap-3 border border-border bg-background px-4 py-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <p className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                The Autumn Edit — now live
              </p>
            </motion.div>
            <div aria-hidden className="absolute -left-3 bottom-16 hidden items-end gap-1.5 text-muted-foreground lg:flex">
              <span className="mb-2 -rotate-6 font-mono2 text-[10px] uppercase tracking-[0.18em]">just in</span>
              <ArrowDoodle className="h-9 w-9" delay={1.7} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Categories index ─────────────────────────────── */}
      <section className="border-b border-border">
        <div className="container-x py-16">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="label-mono">Index</p>
                <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-4xl">
                  Browse by category
                </h2>
              </div>
              <Link href="/categories" className="link-underline hidden shrink-0 font-mono2 text-xs uppercase tracking-[0.18em] sm:inline-flex">
                All categories <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="hairline-grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="hairline-cell group block h-full transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                <CellIn index={i} y={16} className="flex h-full min-h-[120px] flex-col justify-between p-4">
                  <span className="font-mono2 text-[10px] text-muted-foreground transition-colors group-hover:text-background/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-tight">{c.name}</p>
                    <p className="mt-1 font-mono2 text-[10px] text-muted-foreground transition-colors group-hover:text-background/60">
                      {c.tagline}
                    </p>
                  </div>
                </CellIn>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────── */}
      <section className="border-b border-border">
        <div className="container-x py-16">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="label-mono">Selected</p>
                <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-4xl">
                  Featured this season
                </h2>
              </div>
              <Link href="/products" className="link-underline shrink-0 font-mono2 text-xs uppercase tracking-[0.18em]">
                View all 25 <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial split ──────────────────────────────── */}
      <section className="border-b border-border">
        <div className="grid lg:grid-cols-2">
          <div className="relative border-b border-border lg:border-b-0 lg:border-r">
            <ImageReveal
              src="/images/posts/slow-home.webp"
              alt="A sunlit, minimal living room"
              className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:max-h-[560px]"
              imgClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Stamp
              text="Made slowly · Est. 2019 · Copenhagen · "
              spin
              className="absolute bottom-6 right-6 z-10 h-20 w-20 -rotate-6 rounded-full bg-background/85 p-1 text-foreground/75 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-20">
            <Reveal>
              <p className="label-mono">Our philosophy</p>
              <h2 className="mt-4 font-display text-3xl font-light leading-[1.1] tracking-tight sm:text-4xl">
                Buy once. Buy well.<br />Keep for decades.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Every object in this store is chosen against a single question: will it still be
                loved — and repairable — in twenty years? If the answer is anything short of yes,
                it doesn't make the shelf.
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-3 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {["Natural materials only", "Maker's name on every piece", "Spare parts, forever"].map((t) => (
                <StaggerItem key={t}>
                  <span className="flex items-center gap-3">
                    <span className="h-px w-6 bg-primary" /> {t}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <Link href="/content/the-slow-home" className="btn-outline-invert mt-10 w-fit">
                Read the manifesto <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="hairline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className="hairline-cell h-full">
              <CellIn index={i} className="p-7">
                <v.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <p className="mt-4 text-sm font-medium">{v.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{v.body}</p>
              </CellIn>
            </div>
          ))}
        </div>
      </section>

      {/* ── Journal preview ──────────────────────────────── */}
      <section className="border-b border-border">
        <div className="container-x py-16">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="label-mono">Journal</p>
                <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-4xl">
                  Notes on living well
                </h2>
              </div>
              <Link href="/content" className="link-underline shrink-0 font-mono2 text-xs uppercase tracking-[0.18em]">
                All writing <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {latestPosts.map((p, i) => (
              <div key={p.slug} className="bg-background">
                <CellIn index={i} className="h-full">
                  <Link href={`/content/${p.slug}`} className="group block h-full">
                    <FadeImage
                      src={p.image}
                      alt={p.title}
                      className="aspect-[3/2]"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="p-6">
                      <p className="label-mono">{p.tag} · {p.readTime} min read</p>
                      <p className="mt-3 font-display text-xl font-normal leading-snug group-hover:underline">
                        {p.title}
                      </p>
                      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    </div>
                  </Link>
                </CellIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────── */}
      <section>
        <div className="container-x flex flex-col items-center py-20 text-center">
          <Reveal className="flex flex-col items-center">
            <Asterism className="mb-6" />
            <p className="label-mono">The Considered Post</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
              One letter a month. New makers, care guides, nothing else.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex w-full max-w-md flex-col items-center">
            <form
              className="mt-8 flex w-full"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast.error("Please enter a valid email address");
                toast.success("Welcome to the list", { description: "First letter arrives on the 1st." });
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-plain flex-1 border-r-0"
              />
              <button type="submit" className="btn-solid-invert shrink-0">
                Subscribe
              </button>
            </form>
            <p className="mt-4 font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              No noise. Unsubscribe anytime.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
