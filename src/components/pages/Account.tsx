"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut, MapPin, Moon, Package, Settings, Sun, User } from "lucide-react";
import { accountProfile, addresses, orders, orderTotal } from "@/data/account";
import { formatPrice, productById, type Product } from "@/data/catalog";
import { PageHeader } from "@/components/ProductCard";
import { Footnote } from "@/components/Ornaments";
import { useTheme } from "@/store/ThemeContext";
import { useShop } from "@/store/ShopContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const statusStyle: Record<string, string> = {
  Delivered: "bg-green-700/10 text-green-700 dark:text-green-400",
  "In transit": "bg-primary/10 text-primary",
  Processing: "bg-amber-600/10 text-amber-700 dark:text-amber-400",
  Returned: "bg-muted text-muted-foreground",
};

function Orders() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="divide-y divide-border border-y border-border">
      {orders.map((o) => (
        <div key={o.id}>
          <button
            onClick={() => setOpen(open === o.id ? null : o.id)}
            className="grid w-full grid-cols-2 items-center gap-3 py-5 text-left sm:grid-cols-[1fr_1fr_1fr_auto_auto]"
          >
            <span className="font-mono2 text-sm font-medium">{o.id}</span>
            <span className="font-mono2 text-xs text-muted-foreground">
              {new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className={`hidden w-fit px-2.5 py-1 font-mono2 text-[10px] uppercase tracking-[0.15em] sm:inline-block ${statusStyle[o.status]}`}>
              {o.status}
            </span>
            <span className="justify-self-end font-mono2 text-sm sm:justify-self-start">{formatPrice(orderTotal(o))}</span>
            <ChevronDown className={`h-4 w-4 justify-self-end text-muted-foreground transition-transform ${open === o.id ? "rotate-180" : ""}`} />
          </button>
          {open === o.id && (
            <div className="border-t border-border bg-card/50 px-1 py-6 sm:px-5">
              <ul className="space-y-3">
                {o.items.map((i) => {
                  const p = productById(i.productId);
                  if (!p) return null;
                  return (
                    <li key={i.productId} className="flex items-center gap-4">
                      <Image src={p.image} alt="" width={48} height={48} className="h-12 w-12 border border-border bg-muted object-cover" />
                      <Link href={`/products/${p.id}`} className="link-underline flex-1 text-sm">{p.name}</Link>
                      <span className="font-mono2 text-xs text-muted-foreground">× {i.qty}</span>
                      <span className="font-mono2 text-sm">{formatPrice(i.price * i.qty)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <p className="font-mono2 text-[11px] text-muted-foreground">
                  <MapPin className="mr-1 inline h-3 w-3" /> {o.address}
                </p>
                <div className="flex gap-4">
                  {o.status === "In transit" && (
                    <button onClick={() => toast.info("Tracking", { description: "Parcel is in transit — expected Thursday." })} className="link-underline font-mono2 text-[11px] uppercase tracking-[0.15em]">
                      Track parcel
                    </button>
                  )}
                  <Link href="/support/returns" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.15em]">
                    Start a return
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Account() {
  const { theme, toggle } = useTheme();
  const { recent } = useShop();
  const [profile, setProfile] = useState({ name: accountProfile.name, email: accountProfile.email, phone: accountProfile.phone });
  const [prefs, setPrefs] = useState({ newsletter: true, orderUpdates: true, earlyAccess: false });
  const recentProducts = recent
    .map((id) => productById(id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 6);

  return (
    <div>
      <PageHeader
        kicker={`${accountProfile.tier} · since ${accountProfile.joined}`}
        title={`Good evening, ${accountProfile.name.split(" ")[0]}.`}
        lede="Your orders, addresses and preferences — all in one calm place."
      />
      {recentProducts.length > 0 && (
        <div className="border-b border-border">
          <div className="container-x py-8">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <p className="label-mono">Recently viewed</p>
              <span className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                This browser only
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex w-40 shrink-0 flex-col border border-border bg-background transition-colors hover:bg-card"
                >
                  <Image src={p.image} alt={p.name} width={400} height={400} className="aspect-square w-full bg-muted object-cover" />
                  <span className="flex flex-1 flex-col justify-between gap-1.5 p-3">
                    <span className="link-underline text-[13px] font-medium leading-snug">{p.name}</span>
                    <span className="font-mono2 text-[11px] text-muted-foreground">{formatPrice(p.price)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="container-x py-12">
        <Tabs defaultValue="orders">
          <TabsList className="h-auto w-full justify-start gap-0 rounded-none border border-border bg-transparent p-0">
            {[
              { v: "orders", label: "Orders", icon: Package },
              { v: "profile", label: "Profile", icon: User },
              { v: "addresses", label: "Addresses", icon: MapPin },
              { v: "preferences", label: "Preferences", icon: Settings },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="flex-1 gap-2 rounded-none border-r border-border py-3.5 font-mono2 text-[11px] uppercase tracking-[0.15em] last:border-r-0 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
              >
                <t.icon className="hidden h-3.5 w-3.5 sm:block" /> {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="orders" className="mt-8">
            <Orders />
            <Footnote className="mt-6">
              Order history is kept for seven years — for warranty and repairs, not for marketing.
            </Footnote>
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <form
              className="max-w-xl space-y-5"
              onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}
            >
              <div>
                <label className="label-mono mb-2 block">Full name</label>
                <input className="input-plain" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <label className="label-mono mb-2 block">Email</label>
                <input className="input-plain" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div>
                <label className="label-mono mb-2 block">Phone</label>
                <input className="input-plain" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-solid-invert">Save changes</button>
                <button type="button" onClick={() => toast("Signed out", { description: "This is a demo — see you soon." })} className="btn-outline-invert">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="addresses" className="mt-8">
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {addresses.map((a) => (
                <div key={a.id} className="bg-background p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono2 text-[11px] uppercase tracking-[0.18em]">{a.label}</p>
                    {a.isDefault && (
                      <span className="bg-foreground px-2 py-0.5 font-mono2 text-[9px] uppercase tracking-[0.15em] text-background">Default</span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-medium">{a.name}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {a.street}<br />{a.city}<br />{a.country}<br />{a.phone}
                  </p>
                  <button onClick={() => toast.info("Edit address", { description: "Address editing is disabled in this demo." })} className="link-underline mt-4 font-mono2 text-[11px] uppercase tracking-[0.15em]">
                    Edit
                  </button>
                </div>
              ))}
              <button
                onClick={() => toast.info("New address", { description: "Address creation is disabled in this demo." })}
                className="flex min-h-[180px] flex-col items-center justify-center gap-2 bg-background p-6 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <span className="font-display text-3xl font-light">+</span>
                <span className="font-mono2 text-[11px] uppercase tracking-[0.18em]">Add address</span>
              </button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-8">
            <div className="max-w-xl divide-y divide-border border-y border-border">
              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-sm font-medium">Appearance</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">Currently viewing in {theme} mode.</p>
                </div>
                <button onClick={toggle} className="btn-outline-invert !px-4 !py-2.5">
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {theme === "light" ? "Dark" : "Light"}
                </button>
              </div>
              {(
                [
                  ["newsletter", "The Considered Post", "A monthly letter — new makers, care guides."],
                  ["orderUpdates", "Order updates", "Dispatch, tracking and delivery notices."],
                  ["earlyAccess", "Early access", "First look at studio drops and restocks."],
                ] as const
              ).map(([key, title, body]) => (
                <div key={key} className="flex items-center justify-between py-5">
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{body}</p>
                  </div>
                  <Switch
                    checked={prefs[key]}
                    onCheckedChange={(v) => { setPrefs({ ...prefs, [key]: v }); toast.success("Preference updated"); }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
