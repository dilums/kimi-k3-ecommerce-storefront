"use client";

import Link from "next/link";
import { Stamp } from "@/components/Ornaments";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-28 text-center">
      <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-muted-foreground">Error 404</p>
      <h1 className="mt-6 font-display text-6xl font-light tracking-tight sm:text-7xl">Lost &amp; not found.</h1>
      <Stamp
        text="Lost property · Aurelle Studio · "
        className="mt-10 h-20 w-20 -rotate-6 text-muted-foreground/60"
      />
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        The page you're looking for was moved, renamed, or never made. The collection, however,
        is exactly where you left it.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-solid-invert">Back home</Link>
        <Link href="/products" className="btn-outline-invert">Browse the collection</Link>
      </div>
    </div>
  );
}
