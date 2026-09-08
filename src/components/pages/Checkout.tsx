"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, PackageCheck } from "lucide-react";
import { Barcode, Stamp } from "@/components/Ornaments";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice, productById } from "@/data/catalog";
import { PageHeader, PageSkeleton } from "@/components/ProductCard";
import { EASE } from "@/components/motion/motion";
import { useShop } from "@/store/ShopContext";
import { toast } from "sonner";

const steps = ["Information", "Delivery", "Payment", "Review"] as const;

interface Form {
  email: string; first: string; last: string; street: string; city: string; zip: string; country: string;
  delivery: string; card: string; expiry: string; cvc: string; nameOnCard: string; gift: boolean; notes: string;
}

const initial: Form = {
  email: "", first: "", last: "", street: "", city: "", zip: "", country: "Denmark",
  delivery: "standard", card: "", expiry: "", cvc: "", nameOnCard: "", gift: false, notes: "",
};

const deliveryOptions = [
  { id: "standard", name: "Standard courier", eta: "3–5 business days", price: 0 },
  { id: "express", name: "Express courier", eta: "1–2 business days", price: 14 },
  { id: "whiteglove", name: "White-glove (furniture)", eta: "Scheduled with you", price: 49 },
];

export default function Checkout() {
  const { cart, subtotal, clearCart, hydrated } = useShop();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);
  const [placed, setPlaced] = useState<string | null>(null);

  const delivery = deliveryOptions.find((d) => d.id === form.delivery)!;
  const shipping = cart.length === 0 ? 0 : subtotal >= 150 && delivery.id !== "whiteglove" ? delivery.price : delivery.price + (subtotal >= 150 ? 0 : 9);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const canContinue = useMemo(() => {
    if (step === 0) return form.email.includes("@") && form.first && form.last && form.street && form.city && form.zip;
    if (step === 2) return form.card.replace(/\s/g, "").length >= 12 && form.expiry.length >= 4 && form.cvc.length >= 3 && form.nameOnCard;
    return true;
  }, [step, form]);

  if (placed) {
    return (
      <div className="container-x relative flex flex-col items-center py-24 text-center">
        <Stamp
          text="Received · Aurelle Studio · Rotterdam · "
          className="absolute right-2 top-4 h-20 w-20 rotate-12 text-muted-foreground/50 sm:right-10"
        />
        <motion.span
          className="flex h-16 w-16 items-center justify-center border border-foreground"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <PackageCheck className="h-7 w-7" strokeWidth={1.5} />
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="flex flex-col items-center"
        >
        <p className="label-mono mt-8">Order confirmed</p>
        <h1 className="mt-4 font-display text-4xl font-light sm:text-5xl">Thank you, {form.first}.</h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Order <span className="font-mono2 text-foreground">{placed}</span> is being wrapped in Rotterdam.
          A confirmation is on its way to <span className="text-foreground">{form.email}</span>, and tracking
          will follow within 48 hours.
        </p>
        <div className="mt-8 flex flex-col items-center gap-2 text-foreground/70">
          <Barcode code={placed} className="h-8 w-44" />
          <span className="font-mono2 text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            {placed} · wrapped in Rotterdam
          </span>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/account" className="btn-solid-invert">Track in your account</Link>
          <Link href="/products" className="btn-outline-invert">Keep browsing</Link>
        </div>
        </motion.div>
      </div>
    );
  }

  if (!hydrated) return <PageSkeleton rows={2} />;

  if (cart.length === 0) {
    return (
      <div className="container-x flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-3xl font-light">Nothing to check out yet.</h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">Your bag is empty. Add a few considered pieces first.</p>
        <Link href="/products" className="btn-outline-invert mt-8">Browse the collection</Link>
      </div>
    );
  }

  const placeOrder = () => {
    const id = `AUR-${Math.floor(1043 + Math.random() * 800)}`;
    clearCart();
    setPlaced(id);
    toast.success("Order placed", { description: `Order ${id} confirmed.` });
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <PageHeader kicker="Secure checkout" title="Almost home." />
      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        <div>
          {/* Stepper */}
          <ol className="mb-10 grid grid-cols-4 border border-border">
            {steps.map((s, i) => (
              <li
                key={s}
                className={`flex items-center justify-center gap-2 border-r border-border px-2 py-3 font-mono2 text-[10px] uppercase tracking-[0.12em] last:border-r-0 sm:text-[11px] ${
                  i === step ? "bg-foreground text-background" : i < step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : <span>{i + 1}.</span>}
                <span className="hidden sm:inline">{s}</span>
              </li>
            ))}
          </ol>

          {/* Step 0: information */}
          <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
          {step === 0 && (
            <div className="space-y-8">
              <div>
                <p className="label-mono mb-4">Contact</p>
                <input type="email" value={form.email} onChange={set("email")} placeholder="Email address" className="input-plain" />
              </div>
              <div>
                <p className="label-mono mb-4">Shipping address</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={form.first} onChange={set("first")} placeholder="First name" className="input-plain" />
                  <input value={form.last} onChange={set("last")} placeholder="Last name" className="input-plain" />
                  <input value={form.street} onChange={set("street")} placeholder="Street & number" className="input-plain sm:col-span-2" />
                  <input value={form.city} onChange={set("city")} placeholder="City" className="input-plain" />
                  <input value={form.zip} onChange={set("zip")} placeholder="Postal code" className="input-plain" />
                  <select value={form.country} onChange={set("country")} className="input-plain sm:col-span-2">
                    {["Denmark", "Germany", "France", "Netherlands", "Sweden", "United Kingdom", "United States", "Canada", "Japan", "Australia"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3 border border-border p-4">
                <input
                  type="checkbox"
                  checked={form.gift}
                  onChange={(e) => setForm((f) => ({ ...f, gift: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 accent-current"
                />
                <span>
                  <span className="block text-sm font-medium">This is a gift</span>
                  <span className="block text-[13px] text-muted-foreground">Complimentary kraft & linen wrap, handwritten note, no prices on the slip.</span>
                </span>
              </label>
            </div>
          )}

          {/* Step 1: delivery */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="label-mono mb-2">Delivery method</p>
              {deliveryOptions.map((d) => (
                <label
                  key={d.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 border p-5 transition-colors ${
                    form.delivery === d.id ? "border-foreground bg-card" : "border-border hover:border-foreground/50"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.delivery === d.id}
                      onChange={() => setForm((f) => ({ ...f, delivery: d.id }))}
                      className="h-4 w-4 accent-current"
                    />
                    <span>
                      <span className="block text-sm font-medium">{d.name}</span>
                      <span className="block font-mono2 text-[11px] text-muted-foreground">{d.eta}</span>
                    </span>
                  </span>
                  <span className="font-mono2 text-sm">{d.price === 0 ? (subtotal >= 150 ? "Free" : "$9.00") : formatPrice(d.price)}</span>
                </label>
              ))}
              <textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Delivery notes (optional) — gate codes, floor, 'leave with neighbour'…"
                rows={3}
                className="input-plain mt-2"
              />
            </div>
          )}

          {/* Step 2: payment (mock) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border border-border bg-card p-4">
                <Lock className="h-4 w-4 text-primary" />
                <p className="font-mono2 text-[11px] text-muted-foreground">
                  Demo checkout — no real payment is processed. Use any test card number.
                </p>
              </div>
              <div>
                <p className="label-mono mb-4 flex items-center gap-2"><CreditCard className="h-3.5 w-3.5" /> Card details</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={form.card}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setForm((f) => ({ ...f, card: digits.replace(/(.{4})/g, "$1 ").trim() }));
                    }}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    className="input-plain font-mono2 sm:col-span-2"
                  />
                  <input
                    value={form.expiry}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setForm((f) => ({ ...f, expiry: d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d }));
                    }}
                    placeholder="MM/YY"
                    inputMode="numeric"
                    className="input-plain font-mono2"
                  />
                  <input
                    value={form.cvc}
                    onChange={(e) => setForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    placeholder="CVC"
                    inputMode="numeric"
                    className="input-plain font-mono2"
                  />
                  <input value={form.nameOnCard} onChange={set("nameOnCard")} placeholder="Name on card" className="input-plain sm:col-span-2" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: review */}
          {step === 3 && (
            <div className="space-y-6">
              {[
                { label: "Contact", value: form.email },
                { label: "Ship to", value: `${form.first} ${form.last}, ${form.street}, ${form.zip} ${form.city}, ${form.country}` },
                { label: "Delivery", value: `${delivery.name} — ${delivery.eta}` },
                { label: "Payment", value: `Card ending ${form.card.replace(/\s/g, "").slice(-4) || "····"}` },
                ...(form.gift ? [{ label: "Gift wrap", value: "Kraft & linen, with handwritten note" }] : []),
              ].map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-6 border-b border-border pb-4">
                  <p className="label-mono pt-0.5">{r.label}</p>
                  <p className="text-right text-sm">{r.value}</p>
                </div>
              ))}
              <div className="border border-border bg-card p-5">
                <p className="label-mono mb-4">Items</p>
                <ul className="space-y-3">
                  {cart.map((l) => {
                    const p = productById(l.productId);
                    if (!p) return null;
                    return (
                      <li key={l.productId + (l.color ?? "")} className="flex items-center justify-between gap-4 text-sm">
                        <span className="flex items-center gap-3">
                          <Image src={p.image} alt="" width={44} height={44} className="h-11 w-11 border border-border bg-muted object-cover" />
                          <span>{p.name} <span className="font-mono2 text-[11px] text-muted-foreground">× {l.qty}</span></span>
                        </span>
                        <span className="font-mono2">{formatPrice(p.price * l.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-10 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-outline-invert">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <Link href="/cart" className="btn-outline-invert">
                <ArrowLeft className="h-4 w-4" /> Back to bag
              </Link>
            )}
            {step < 3 ? (
              <button
                onClick={() => (canContinue ? setStep((s) => s + 1) : toast.error("Please complete the required fields"))}
                className="btn-solid-invert"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={placeOrder} className="btn-solid-invert">
                <Lock className="h-4 w-4" /> Place order — {formatPrice(total)}
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-32 border border-border bg-card p-7">
            <p className="label-mono">Summary</p>
            <ul className="mt-5 space-y-4">
              {cart.map((l) => {
                const p = productById(l.productId);
                if (!p) return null;
                return (
                  <li key={l.productId + (l.color ?? "")} className="flex items-center gap-3">
                    <span className="relative shrink-0">
                      <Image src={p.image} alt="" width={56} height={56} className="h-14 w-14 border border-border bg-muted object-cover" />
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-foreground font-mono2 text-[10px] text-background">
                        {l.qty}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm">{p.name}</span>
                    <span className="font-mono2 text-sm">{formatPrice(p.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-6 space-y-2.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-mono2">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="font-mono2">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tax (8%)</dt><dd className="font-mono2">{formatPrice(tax)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 font-medium"><dt>Total</dt><dd className="font-mono2">{formatPrice(total)}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
