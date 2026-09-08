"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { faqs, faqGroups } from "@/data/content";
import { Aster } from "@/components/Ornaments";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return faqs.filter((f) => (f.q + " " + f.a).toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <div className="border-b border-border">
        <div className="container-x py-12 sm:py-16">
          <Link href="/support" className="inline-flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Help centre
          </Link>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl">Frequently asked.</h1>
          <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
            Twelve answers covering 90% of what lands in our inbox. The other 10% — write to us.
          </p>
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the answers…"
              className="input-plain pl-10"
            />
          </div>
        </div>
      </div>

      <div className="container-x max-w-4xl py-12">
        {filtered ? (
          filtered.length === 0 ? (
            <div className="border border-dashed border-border py-16 text-center">
              <p className="font-display text-2xl font-light">No answer matches "{query}".</p>
              <p className="mt-3 text-sm text-muted-foreground">Try another word, or ask us directly.</p>
              <Link href="/support/contact" className="btn-outline-invert mt-6">Contact support</Link>
            </div>
          ) : (
            <Accordion type="single" collapsible className="border-t border-border">
              {filtered.map((f, i) => (
                <AccordionItem key={i} value={`s-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )
        ) : (
          faqGroups.map((g) => (
            <div key={g} className="mb-12">
              <p className="label-mono mb-4">{g}</p>
              <Accordion type="single" collapsible className="border-t border-border">
                {faqs.filter((f) => f.group === g).map((f, i) => (
                  <AccordionItem key={i} value={`${g}-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        )}

        <div className="mt-14 border border-border bg-card p-8 text-center">
          <Aster className="mx-auto mb-4 h-4 w-4 text-primary" />
          <p className="font-display text-2xl font-light">Still stuck?</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            A real person reads every message. We reply within one business day, usually faster.
          </p>
          <Link href="/support/contact" className="btn-solid-invert mt-6">Write to us</Link>
        </div>
      </div>
    </div>
  );
}
