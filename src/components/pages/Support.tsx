"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Package, Phone, RotateCcw, CircleHelp } from "lucide-react";
import { PageHeader } from "@/components/ProductCard";
import { Asterism } from "@/components/Ornaments";
import { orders, orderTotal } from "@/data/account";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

const tiles = [
  {
    to: "/support/faq", icon: CircleHelp, title: "FAQ",
    body: "Shipping times, payment methods, care guides — the twelve questions we hear most, answered properly.",
  },
  {
    to: "/support/contact", icon: MessageCircle, title: "Contact us",
    body: "A real person, typically within one business day. For orders, products, or just advice on glazes.",
  },
  {
    to: "/support/returns", icon: RotateCcw, title: "Returns & exchanges",
    body: "Thirty days to decide, free return shipping in the EU, refunds within five business days.",
  },
];

export default function Support() {
  const [orderNo, setOrderNo] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    const o = orders.find((x) => x.id.toLowerCase() === orderNo.trim().toLowerCase());
    if (o) {
      setResult(`${o.id} — ${o.status}. ${o.items.length} item${o.items.length > 1 ? "s" : ""}, total ${formatPrice(orderTotal(o))}, shipping to ${o.address}.`);
    } else {
      setResult(null);
      toast.error("Order not found", { description: "Try AUR-1042 for the demo." });
    }
  };

  return (
    <div>
      <PageHeader
        kicker="Help centre"
        title="How can we help?"
        lede="Small store, real humans. Most questions are answered below; everything else reaches our Copenhagen studio within a day."
      />

      <div className="container-x py-14">
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {tiles.map((t) => (
            <Link key={t.to} href={t.to} className="group bg-background p-8 transition-colors duration-300 hover:bg-card">
              <t.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <p className="mt-5 flex items-center gap-2 font-display text-2xl font-normal">
                {t.title}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t.body}</p>
            </Link>
          ))}
        </div>

        <Asterism className="mt-14" />

        {/* Order lookup */}
        <div className="mt-12 grid gap-10 border border-border p-8 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="label-mono flex items-center gap-2"><Package className="h-3.5 w-3.5" /> Order status</p>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight">Where's my parcel?</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Enter your order number (it starts with AUR-) for an instant status. For the demo, try{" "}
              <button className="font-mono2 text-foreground underline" onClick={() => setOrderNo("AUR-1042")}>AUR-1042</button>.
            </p>
            <form onSubmit={lookup} className="mt-6 flex max-w-sm">
              <input
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                placeholder="AUR-0000"
                className="input-plain flex-1 border-r-0 font-mono2"
              />
              <button type="submit" className="btn-solid-invert shrink-0">Look up</button>
            </form>
            {result && (
              <p className="mt-5 border border-border bg-card p-4 font-mono2 text-xs leading-relaxed">{result}</p>
            )}
          </div>

          <div className="grid content-start gap-px border border-border bg-border sm:grid-cols-2">
            {[
              { icon: Mail, l: "Email", v: "hello@aurelle.example", s: "Replies within 1 business day" },
              { icon: Phone, l: "Phone", v: "+45 33 12 40 90", s: "Mon–Fri, 9:00–17:00 CET" },
              { icon: MapPin, l: "Showroom", v: "Gothersgade 21, Copenhagen", s: "Thu–Sat, 10:00–18:00" },
              { icon: Clock, l: "Response pledge", v: "< 24 hours", s: "Every message, every channel" },
            ].map((c) => (
              <div key={c.l} className="bg-background p-6">
                <c.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <p className="label-mono mt-3">{c.l}</p>
                <p className="mt-2 text-sm font-medium">{c.v}</p>
                <p className="mt-1 font-mono2 text-[10px] text-muted-foreground">{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
