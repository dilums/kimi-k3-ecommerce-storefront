"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Mail, MapPin, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowDoodle, Squiggle } from "@/components/Ornaments";

const topics = ["An existing order", "Product advice", "Returns & exchanges", "Press & wholesale", "Something else"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", order: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.topic || form.message.length < 10) {
      toast.error("Please complete all required fields", { description: "Message needs at least 10 characters." });
      return;
    }
    setSent(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <div className="border-b border-border">
        <div className="container-x py-12 sm:py-16">
          <Link href="/support" className="inline-flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Help centre
          </Link>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl">
            <span className="relative inline-block">
              Write to the studio.
              <Squiggle className="absolute -bottom-2 left-0 h-2.5 w-2/3 text-primary/70" delay={0.4} />
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
            Order questions, product advice, wholesale, press — one inbox, real humans, one business day.
          </p>
        </div>
      </div>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
        {sent ? (
          <div className="flex flex-col items-start border border-border bg-card p-10">
            <span className="flex h-12 w-12 items-center justify-center border border-foreground">
              <Check className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-light">Message received.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Thank you, {form.name.split(" ")[0]}. Your note is in the studio inbox — expect a reply at{" "}
              <span className="text-foreground">{form.email}</span> within one business day.
              Reference: <span className="font-mono2 text-foreground">MSG-{Math.floor(1000 + Math.random() * 9000)}</span>
            </p>
            <Link href="/products" className="btn-outline-invert mt-8">Continue browsing</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-mono mb-2 block">Name *</label>
                <input className="input-plain" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div>
                <label className="label-mono mb-2 block">Email *</label>
                <input className="input-plain" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-mono mb-2 block">Topic *</label>
                <Select value={form.topic} onValueChange={(v) => setForm({ ...form, topic: v })}>
                  <SelectTrigger className="w-full rounded-none border-border bg-transparent">
                    <SelectValue placeholder="Choose a topic" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {topics.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="label-mono mb-2 block">Order number (optional)</label>
                <input className="input-plain font-mono2" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} placeholder="AUR-0000" />
              </div>
            </div>
            <div>
              <label className="label-mono mb-2 block">Message *</label>
              <textarea
                rows={7}
                className="input-plain"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us everything — the more detail, the better the answer."
              />
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" className="btn-solid-invert">Send message</button>
              <div aria-hidden className="flex items-center gap-1 text-muted-foreground">
                <ArrowDoodle className="h-8 w-9 -scale-x-100" />
                <span className="rotate-3 font-mono2 text-[10px] uppercase tracking-[0.15em]">we read everything</span>
              </div>
            </div>
            <p className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              We never share your details. Ever.
            </p>
          </form>
        )}

        <aside className="space-y-px border border-border bg-border lg:self-start">
          {[
            { icon: Mail, l: "Email", v: "hello@aurelle.example", s: "Replies within 1 business day" },
            { icon: Phone, l: "Phone", v: "+45 33 12 40 90", s: "Mon–Fri, 9:00–17:00 CET" },
            { icon: MapPin, l: "Studio & showroom", v: "Gothersgade 21, 1123 Copenhagen", s: "Thu–Sat, 10:00–18:00 — coffee included" },
          ].map((c) => (
            <div key={c.l} className="bg-background p-6">
              <c.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <p className="label-mono mt-3">{c.l}</p>
              <p className="mt-2 text-sm font-medium">{c.v}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{c.s}</p>
            </div>
          ))}
          <div className="bg-foreground p-6 text-background">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.18em]">Faster than email</p>
            <p className="mt-2 text-sm leading-relaxed opacity-80">
              80% of order questions are answered instantly in the <Link href="/support/faq" className="underline">FAQ</Link> —
              shipping, returns and care are all covered there.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
