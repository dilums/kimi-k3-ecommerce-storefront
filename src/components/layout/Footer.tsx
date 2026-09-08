import Link from "next/link";

const cols = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All products" },
      { to: "/categories", label: "Categories" },
      { to: "/categories/ceramics", label: "Ceramics" },
      { to: "/categories/furniture", label: "Furniture" },
      { to: "/categories/fragrance", label: "Fragrance" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/support", label: "Help centre" },
      { to: "/support/faq", label: "FAQ" },
      { to: "/support/contact", label: "Contact us" },
      { to: "/support/returns", label: "Returns" },
    ],
  },
  {
    title: "Studio",
    links: [
      { to: "/content", label: "Journal" },
      { to: "/content/the-slow-home", label: "The Slow Home" },
      { to: "/account", label: "Account" },
      { to: "/wishlist", label: "Wishlist" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-medium">Aurelle.</p>
          <p className="mt-3 max-w-xs font-mono2 text-[11px] leading-relaxed text-muted-foreground">
            Considered goods for modern living. Made slowly in small batches by independent
            studios, kept by you for decades.
          </p>
          <p className="mt-6 font-mono2 text-[11px] text-muted-foreground">
            Studio & showroom — Gothersgade 21, Copenhagen
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="label-mono mb-4">{c.title}</p>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.to} className="link-underline text-sm text-foreground/80 hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            © 2026 Aurelle Studio ApS
          </p>
          <p className="order-first font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 sm:order-none">
            Set in Fraunces & IBM Plex Mono — printed in the browser
          </p>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Terms · Privacy · Cookies
          </p>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border py-4" aria-hidden>
        <p className="whitespace-nowrap text-center font-display text-[13vw] font-light leading-none tracking-tight text-foreground/[0.05] select-none">
          AURELLE
        </p>
      </div>
    </footer>
  );
}
