"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { essayProducts, postBySlug, posts } from "@/data/content";
import { productById, type Product } from "@/data/catalog";
import { EASE, Reveal } from "@/components/motion/motion";
import FadeImage from "@/components/FadeImage";
import ProductCard from "@/components/ProductCard";
import { Asterism, EndMark, MarginNote } from "@/components/Ornaments";
import { useImageLoaded } from "@/hooks/use-image-loaded";

const MotionImage = motion.create(Image);

export default function PostDetail({ postId }: { postId: string }) {
  const post = postBySlug(postId);
  const { loaded: heroLoaded, ref: heroRef, onLoad: heroOnLoad } = useImageLoaded();

  if (!post) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-3xl font-light">That essay has been archived.</p>
        <Link href="/content" className="btn-outline-invert mt-8">Back to the Journal</Link>
      </div>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug && p.tag === post.tag).slice(0, 2);
  const more = related.length === 2 ? related : [...related, ...posts.filter((p) => p.slug !== post.slug && p.tag !== post.tag)].slice(0, 2);
  const pieces = (essayProducts[post.slug] ?? [])
    .map((id) => productById(id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);

  return (
    <article>
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-x max-w-4xl py-12 sm:py-16">
          <Link href="/content" className="inline-flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> The Journal
          </Link>
          <p className="label-mono mt-8">{post.tag}</p>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {post.author.name}, {post.author.role} ·{" "}
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readTime} min read
          </p>
        </div>
      </div>

      {/* Hero image */}
      <div className="container-x max-w-5xl py-10">
        <motion.div
          className="relative aspect-[16/9] overflow-hidden border border-border bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {!heroLoaded && <div aria-hidden className="absolute inset-0 z-10 animate-pulse bg-muted" />}
          <MotionImage
            ref={heroRef}
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            onLoad={heroOnLoad}
            className="object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={heroLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </motion.div>
      </div>

      {/* Body */}
      <div className="container-x relative max-w-2xl pb-16 pt-4">
        <MarginNote className="absolute -right-20 top-2">
          Aurelle Journal · Nº {String(posts.indexOf(post) + 1).padStart(2, "0")}
        </MarginNote>
        <div className="prose-body text-[16px]">
          <p className="mb-5 font-display text-xl leading-relaxed text-foreground">{post.excerpt}</p>
          {post.body.slice(0, 2).map((para, i) => <p key={i} className={i === 0 ? "dropcap" : undefined}>{para}</p>)}
        </div>
        <Asterism className="my-10" />
        <Reveal>
          <blockquote className="my-10 border-l-2 border-primary pl-6">
            <p className="font-display text-2xl font-light leading-snug">“{post.pullQuote}”</p>
          </blockquote>
        </Reveal>
        <div className="prose-body text-[16px]">
          {post.body.slice(2).map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <EndMark className="mt-8" />

        {/* Author */}
        <div className="mt-14 flex items-center gap-5 border border-border bg-card p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-foreground font-display text-xl">
            {post.author.name.split(" ").map((n) => n[0]).join("")}
          </span>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="mt-0.5 font-mono2 text-[11px] text-muted-foreground">{post.author.role}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Writing for the Aurelle Journal on craft, materials and the long life of good objects.
            </p>
          </div>
        </div>
      </div>

      {/* Shop the story */}
      {pieces.length > 0 && (
        <div className="border-t border-border">
          <div className="container-x py-14">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="label-mono">Shop the story</p>
                <h2 className="mt-3 font-display text-3xl font-light tracking-tight">Pieces from this essay</h2>
              </div>
              <Link href="/products" className="link-underline hidden shrink-0 font-mono2 text-xs uppercase tracking-[0.18em] sm:inline-flex">
                All products
              </Link>
            </div>
            <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-3">
              {pieces.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related */}
      <div className="border-t border-border">
        <div className="container-x py-14">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl font-light tracking-tight">Keep reading</h2>
            <Link href="/content" className="link-underline font-mono2 text-xs uppercase tracking-[0.18em]">
              All essays
            </Link>
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/content/${p.slug}`} className="group flex bg-background">
                <FadeImage
                  src={p.image}
                  alt={p.title}
                  className="w-40 shrink-0 sm:w-48"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="label-mono">{p.tag}</p>
                  <p className="mt-2 font-display text-lg font-normal leading-snug group-hover:underline">{p.title}</p>
                  <p className="mt-auto flex items-center gap-1 pt-4 font-mono2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Read <ArrowUpRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
