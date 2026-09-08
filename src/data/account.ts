export interface OrderItem {
  productId: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In transit" | "Processing" | "Returned";
  items: OrderItem[];
  shipping: number;
  address: string;
}

export const orders: Order[] = [
  {
    id: "AUR-1042", date: "2026-08-06", status: "In transit", shipping: 0,
    address: "Vesterbrogade 44, 3tv, 1620 Copenhagen, Denmark",
    items: [
      { productId: "embers-cedar-candle", qty: 2, price: 52 },
      { productId: "oat-merino-throw", qty: 1, price: 145 },
    ],
  },
  {
    id: "AUR-1037", date: "2026-07-22", status: "Delivered", shipping: 9,
    address: "Vesterbrogade 44, 3tv, 1620 Copenhagen, Denmark",
    items: [
      { productId: "walnut-serving-board", qty: 1, price: 72 },
      { productId: "matte-black-cutlery", qty: 1, price: 140 },
    ],
  },
  {
    id: "AUR-1028", date: "2026-06-14", status: "Delivered", shipping: 49,
    address: "Vesterbrogade 44, 3tv, 1620 Copenhagen, Denmark",
    items: [{ productId: "boucle-lounge-chair", qty: 1, price: 890 }],
  },
  {
    id: "AUR-1011", date: "2026-05-02", status: "Delivered", shipping: 0,
    address: "Vesterbrogade 44, 3tv, 1620 Copenhagen, Denmark",
    items: [
      { productId: "terra-vessel-vase", qty: 1, price: 86 },
      { productId: "mouthblown-wine-glasses", qty: 1, price: 76 },
      { productId: "kiln-speckle-mugs", qty: 2, price: 48 },
    ],
  },
  {
    id: "AUR-0993", date: "2026-03-18", status: "Returned", shipping: 9,
    address: "Vesterbrogade 44, 3tv, 1620 Copenhagen, Denmark",
    items: [{ productId: "sage-linen-cushion", qty: 2, price: 58 }],
  },
];

export interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export const addresses: Address[] = [
  { id: "addr-1", label: "Home", name: "Astrid Vestergaard", street: "Vesterbrogade 44, 3tv", city: "1620 Copenhagen", country: "Denmark", phone: "+45 31 44 20 18", isDefault: true },
  { id: "addr-2", label: "Studio", name: "Astrid Vestergaard", street: "Gothersgade 21, st", city: "1123 Copenhagen", country: "Denmark", phone: "+45 31 44 20 18", isDefault: false },
  { id: "addr-3", label: "Summer house", name: "Astrid & Mads Vestergaard", street: "Strandvejen 7", city: "8400 Ebeltoft", country: "Denmark", phone: "+45 28 90 11 42", isDefault: false },
];

export const accountProfile = {
  name: "Astrid Vestergaard",
  email: "astrid.vester@example.com",
  phone: "+45 31 44 20 18",
  joined: "March 2023",
  tier: "Circle member",
};

export function orderTotal(o: Order): number {
  return o.items.reduce((s, i) => s + i.price * i.qty, 0) + o.shipping;
}
