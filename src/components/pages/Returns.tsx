"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, RotateCcw, Truck, Package, FileText } from "lucide-react";
import { toast } from "sonner";
import { Footnote, Stamp } from "@/components/Ornaments";

const steps = [
  { icon: FileText, title: "1 · Request", body: "Start your return below or from your account. We'll email a prepaid label within the hour." },
  { icon: Package, title: "2 · Pack", body: "Original condition, any sturdy box. Reuse our packaging if you kept it — it's built for a second trip." },
  { icon: Truck, title: "3 · Send", body: "Drop at any carrier point. Furniture is collected from your home on a day you choose." },
  { icon: RotateCcw, title: "4 · Refunded", body: "Within 5 business days of arrival, back to your original payment method. We'll email when it lands." },
];

const policies = [
  { t: "30 days to decide", d: "Live with the piece. If it isn't right, send it back within 30 days of delivery — unused, in original condition." },
  { t: "Free returns in the EU", d: "Prepaid labels for all EU returns. Outside the EU, a $9 label fee is deducted from your refund." },
  { t: "Exchanges ship first", d: "Ask for an exchange and the replacement leaves us as soon as the carrier scans your return — no waiting for it to arrive." },
  { t: "Damaged on arrival?", d: "One photo to hello@aurelle.example and a replacement ships within 48 hours. Keep or recycle the packaging; we'll handle the rest." },
  { t: "Furniture & large items", d: "White-glove items are collected free from your home. Our courier will call to arrange a two-hour window." },
  { t: "What can't come back", d: "For hygiene, used candles and opened diffusers are final sale — unless faulty, in which case they're replaced immediately." },
];

export default function Returns() {
  const [form, setForm] = useState({ order: "", email: "", reason: "Changed my mind" });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.order.trim().toUpperCase().startsWith("AUR-") || !form.email.includes("@")) {
      toast.error("Check your details", { description: "Order numbers start with AUR- and email must be valid." });
      return;
    }
    setDone(true);
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
            Returns, without the dread.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] text-muted-foreground">
            Considered buying means considered returning. Thirty days, free EU labels, five-day refunds.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="border-b border-border">
        <div className="hairline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="hairline-cell p-7">
              <s.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <p className="mt-4 font-mono2 text-xs uppercase tracking-[0.18em]">{s.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-14 py-14 lg:grid-cols-2">
        {/* Policy */}
        <div>
          <p className="label-mono mb-6">The policy, in plain language</p>
          <dl className="divide-y divide-border border-y border-border">
            {policies.map((p) => (
              <div key={p.t} className="py-5">
                <dt className="text-[15px] font-medium">{p.t}</dt>
                <dd className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{p.d}</dd>
              </div>
            ))}
          </dl>
          <Footnote className="mt-6">
            Last revised for the autumn collection — changes are always in your favour.
          </Footnote>
        </div>

        {/* Start a return */}
        <div className="lg:pl-8">
          <div className="sticky top-32 border border-border bg-card p-8">
            {done ? (
              <div className="relative">
                <Stamp
                  text="Label sent · Aurelle Studio · "
                  className="absolute -top-4 right-0 h-16 w-16 rotate-12 text-muted-foreground/70"
                />
                <span className="flex h-12 w-12 items-center justify-center border border-foreground">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-light">Return started.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A prepaid label for <span className="font-mono2 text-foreground">{form.order.toUpperCase()}</span> is
                  on its way to <span className="text-foreground">{form.email}</span>. Reason noted:{" "}
                  <span className="text-foreground">{form.reason}</span>. Refund lands within 5 business days of arrival.
                </p>
              </div>
            ) : (
              <>
                <p className="label-mono">Start a return</p>
                <h2 className="mt-3 font-display text-2xl font-light">Two fields, one minute.</h2>
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div>
                    <label className="label-mono mb-2 block">Order number</label>
                    <input
                      className="input-plain font-mono2"
                      placeholder="AUR-1042"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-2 block">Email used at checkout</label>
                    <input
                      type="email"
                      className="input-plain"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-2 block">Reason</label>
                    <select
                      className="input-plain"
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    >
                      {["Changed my mind", "Doesn't fit the space", "Arrived damaged", "Not as described", "Ordered the wrong item", "Prefer an exchange"].map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn-solid-invert w-full">Email me a return label</button>
                  <p className="text-center font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Prefer to talk? +45 33 12 40 90
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
