export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  story: string;
  materials: string;
  dimensions: string;
  care: string;
  stock: number;
  badge?: "New" | "Bestseller" | "Low stock" | "Sale";
  colors?: { name: string; hex: string }[];
  featured?: boolean;
}

export const categories: Category[] = [
  { slug: "ceramics", name: "Ceramics", tagline: "Hand-thrown & glazed", description: "Small-batch stoneware and porcelain from independent studios. Each piece carries the maker's fingerprints — slight variations in glaze and form are the signature of the hand.", image: "/images/products/vase-01.webp" },
  { slug: "lighting", name: "Lighting", tagline: "Warmth, layered", description: "Sculptural lamps and lanterns that treat light as a material. Paper, brass and opal glass — built to cast the kind of glow you want to come home to.", image: "/images/products/lantern-lamp.webp" },
  { slug: "textiles", name: "Textiles", tagline: "Natural fibres only", description: "Merino, linen and organic cotton, woven by mills that have done nothing else for generations. Soft goods that soften further with every wash.", image: "/images/products/wool-throw.webp" },
  { slug: "kitchen", name: "Kitchen", tagline: "Tools for daily ritual", description: "Boards, plates and vessels designed for the everyday ceremony of cooking and eating. Weighted, balanced, and meant to age alongside you.", image: "/images/products/walnut-board.webp" },
  { slug: "furniture", name: "Furniture", tagline: "Built for decades", description: "Solid oak, honest joinery, no veneer. Furniture made to be repaired rather than replaced — the slow answer to fast rooms.", image: "/images/products/oak-side-table.webp" },
  { slug: "decor", name: "Decor", tagline: "Quiet objects", description: "Stone, glass and wood objects that earn their place on the shelf. Nothing shouts; everything holds.", image: "/images/products/bookends.webp" },
  { slug: "bath", name: "Bath & Body", tagline: "The daily spa", description: "Hinoki wood, waffle cotton and cold-pressed soaps. Turn the smallest room into the most restorative one.", image: "/images/products/bath-stool.webp" },
  { slug: "fragrance", name: "Fragrance", tagline: "Scent as memory", description: "Candles and diffusers blended in small runs — cedar, amber, fig and rain. Fragrance that marks a room the way a song marks a summer.", image: "/images/products/candle.webp" },
  { slug: "stationery", name: "Stationery", tagline: "Paper that matters", description: "Linen-bound notebooks, brass instruments and desk objects for people who still think with their hands.", image: "/images/products/notebooks.webp" },
  { slug: "garden", name: "Garden", tagline: "Small-scale green", description: "Terracotta, steel and tools for balconies, sills and tiny plots. Proof that a garden is a practice, not a postcode.", image: "/images/products/planters.webp" },
  { slug: "storage", name: "Storage", tagline: "Order, beautifully", description: "Woven baskets and modular shelving that make putting things away feel like arranging a still life.", image: "/images/products/baskets.webp" },
  { slug: "tableware", name: "Tableware", tagline: "Set the table properly", description: "Cutlery and glassware with genuine heft. Mouth-blown stems, hand-finished tines — details your guests will notice without knowing why.", image: "/images/products/wine-glasses.webp" },
];

export const products: Product[] = [
  {
    id: "terra-vessel-vase", sku: "CER-001", name: "Terra Vessel Vase", category: "ceramics",
    price: 86, rating: 4.8, reviewCount: 34, image: "/images/products/vase-01.webp",
    description: "A hand-thrown stoneware vase with a soft matte glaze in warm off-white. The gently asymmetric belly catches light the way only wheel-thrown forms can.",
    story: "Thrown in a Lisbon studio by a two-person team, each Terra vessel is fired twice and sanded by hand between glazes.",
    materials: "High-fired stoneware, matte mineral glaze", dimensions: "H 24cm × Ø 16cm", care: "Wipe with a damp cloth. Watertight; suitable for fresh flowers.",
    stock: 14, badge: "Bestseller", featured: true,
    colors: [{ name: "Bone", hex: "#e9e4d8" }, { name: "Clay", hex: "#b98a68" }, { name: "Slate", hex: "#6d7178" }],
  },
  {
    id: "kiln-speckle-mugs", sku: "CER-002", name: "Kiln Speckle Espresso Mugs, Pair", category: "ceramics",
    price: 48, rating: 4.9, reviewCount: 57, image: "/images/products/mugs.webp",
    description: "A pair of speckled stoneware espresso mugs in sand and clay. Small enough for a proper ristretto, sturdy enough for every single morning.",
    story: "The speckle comes from iron-bearing clay dug forty kilometres from the kiln — no two mugs pattern alike.",
    materials: "Speckled ironstone clay, food-safe glaze", dimensions: "H 6.5cm × Ø 6cm, 110ml each", care: "Dishwasher safe, though hand-washing preserves the glaze longer.",
    stock: 22, badge: "Bestseller", featured: true,
    colors: [{ name: "Sand", hex: "#d6c3a5" }, { name: "Clay", hex: "#a9785b" }],
  },
  {
    id: "kumo-lantern-lamp", sku: "LGT-001", name: "Kumo Paper Lantern Floor Lamp", category: "lighting",
    price: 240, compareAt: 290, rating: 4.7, reviewCount: 21, image: "/images/products/lantern-lamp.webp",
    description: "A sculptural washi paper globe on a slender blackened-steel stand. Lit, it reads like a small moon parked in the corner of the room.",
    story: "The shade is stretched by hand over a bamboo rib, a technique unchanged for three centuries.",
    materials: "Washi paper, bamboo rib, blackened steel", dimensions: "H 118cm × Ø 45cm", care: "Dust with a dry cloth. E27 bulb, max 9W LED, included.",
    stock: 6, badge: "Sale", featured: true,
  },
  {
    id: "dome-brass-lamp", sku: "LGT-002", name: "Dome Brass Table Lamp", category: "lighting",
    price: 185, rating: 4.6, reviewCount: 18, image: "/images/products/brass-lamp.webp",
    description: "A mushroom-domed table lamp in brushed brass. The shade throws light downward in a warm pool — ideal on a sideboard or desk.",
    story: "Spun from a single disc of brass and left unlacquered, so it develops a living patina with touch and time.",
    materials: "Brushed solid brass, unlacquered", dimensions: "H 38cm × Ø 28cm", care: "Let patina develop, or polish with brass cloth. E14 bulb included.",
    stock: 11, badge: "New",
  },
  {
    id: "oat-merino-throw", sku: "TEX-001", name: "Oat Merino Throw", category: "textiles",
    price: 145, rating: 4.9, reviewCount: 63, image: "/images/products/wool-throw.webp",
    description: "A chunky hand-knit merino throw in undyed oatmeal. Heavy in the lap, light on the eye — the blanket that ends arguments over the sofa.",
    story: "Knitted from 100% undyed merino lambswool spun in a fourth-generation Yorkshire mill.",
    materials: "100% undyed merino lambswool", dimensions: "130cm × 180cm", care: "Spot clean or gentle wool-cycle wash. Dry flat.",
    stock: 9, badge: "Bestseller", featured: true,
    colors: [{ name: "Oat", hex: "#d9cbb2" }, { name: "Moss", hex: "#7c8262" }, { name: "Charcoal", hex: "#4a4a45" }],
  },
  {
    id: "sage-linen-cushion", sku: "TEX-002", name: "Sage Stonewashed Linen Cushion", category: "textiles",
    price: 58, rating: 4.5, reviewCount: 12, image: "/images/products/linen-cushion.webp",
    description: "Stonewashed European linen in a muted sage, filled with a plump feather insert. Arrives soft; only gets softer.",
    story: "The flax is grown in Normandy and stonewashed with pumice, which gives the cloth its broken-in hand.",
    materials: "100% European linen, duck-feather insert", dimensions: "50cm × 50cm", care: "Machine wash cold, line dry. Iron optional — wrinkles are the point.",
    stock: 30,
    colors: [{ name: "Sage", hex: "#9aa48a" }, { name: "Natural", hex: "#d8cfbc" }, { name: "Terracotta", hex: "#b7704f" }],
  },
  {
    id: "walnut-serving-board", sku: "KIT-001", name: "Walnut Serving Board", category: "kitchen",
    price: 72, rating: 4.8, reviewCount: 41, image: "/images/products/walnut-board.webp",
    description: "A solid American walnut board with a rounded handle and leather strap. For cheese, bread, or simply leaning against the backsplash looking serious.",
    story: "Cut from a single plank — the grain runs uninterrupted from handle to tip.",
    materials: "Solid American black walnut, vegetable-tanned leather", dimensions: "45cm × 20cm × 2cm", care: "Hand wash, dry upright, oil monthly with food-safe mineral oil.",
    stock: 17, featured: true,
  },
  {
    id: "reactive-dinner-plates", sku: "KIT-002", name: "Reactive Glaze Dinner Plates, Set of 4", category: "kitchen",
    price: 120, rating: 4.7, reviewCount: 29, image: "/images/products/dinner-plates.webp",
    description: "Four dinner plates in layered reactive glazes — no two surfaces alike, each firing a small experiment in chemistry.",
    story: "Reactive glazes are mixed with metal oxides that bloom unpredictably in the kiln. The set is matched by tone, never by pattern.",
    materials: "Stoneware, reactive mineral glaze", dimensions: "Ø 27cm each", care: "Dishwasher and microwave safe.",
    stock: 13, badge: "New",
  },
  {
    id: "glass-bedside-carafe", sku: "KIT-003", name: "Glass Bedside Carafe & Tumbler", category: "kitchen",
    price: 58, rating: 4.6, reviewCount: 15, image: "/images/products/carafe.webp",
    description: "A one-litre carafe whose tumbler doubles as its lid. Nightstand water, solved elegantly since 1903 — now in clearer glass.",
    story: "Mouth-blown from recycled glass; tiny seed bubbles in the wall are the mark of the furnace.",
    materials: "Mouth-blown recycled glass", dimensions: "Carafe H 21cm, 1L; tumbler 250ml", care: "Hand wash recommended.",
    stock: 25,
  },
  {
    id: "tripod-oak-side-table", sku: "FRN-001", name: "Tripod Oak Side Table", category: "furniture",
    price: 310, rating: 4.8, reviewCount: 19, image: "/images/products/oak-side-table.webp",
    description: "A round-topped side table in solid white oak on three splayed legs. Holds a lamp, a book, a glass — asks for nothing else.",
    story: "Joined with wedged through-tenons you can see from below — the construction is the decoration.",
    materials: "Solid white oak, natural oil finish", dimensions: "H 52cm × Ø 40cm", care: "Re-oil annually. Coasters recommended but not enforced.",
    stock: 7, badge: "Low stock", featured: true,
  },
  {
    id: "boucle-lounge-chair", sku: "FRN-002", name: "Boucle Lounge Chair", category: "furniture",
    price: 890, compareAt: 1050, rating: 4.9, reviewCount: 26, image: "/images/products/boucle-chair.webp",
    description: "A deep, curved lounge chair upholstered in cream boucle over solid beech legs. The kind of chair people photograph before they sit in.",
    story: "The boucle is woven in Belgium with a looped yarn that resists pilling; the frame is guaranteed for ten years.",
    materials: "Belgian boucle (wool blend), solid beech frame", dimensions: "H 74cm × W 78cm × D 80cm", care: "Vacuum with upholstery attachment. Professional clean for stains.",
    stock: 4, badge: "Sale", featured: true,
    colors: [{ name: "Cream", hex: "#ece5d8" }, { name: "Taupe", hex: "#a89a86" }],
  },
  {
    id: "travertine-bookends", sku: "DEC-001", name: "Travertine Bookends, Pair", category: "decor",
    price: 95, rating: 4.7, reviewCount: 16, image: "/images/products/bookends.webp",
    description: "A pair of honed travertine bookends, each cut so the stone's ancient sediment lines run vertical — geology holding up literature.",
    story: "Quarried in Tivoli, outside Rome, from the same stone beds that built the Colosseum.",
    materials: "Honed Roman travertine", dimensions: "Each 15cm × 10cm × 10cm, 2.4kg", care: "Wipe dry. Avoid acids (lemon, wine) on the surface.",
    stock: 12, badge: "New",
  },
  {
    id: "smoked-amber-vase", sku: "DEC-002", name: "Smoked Amber Glass Vase", category: "decor",
    price: 110, rating: 4.6, reviewCount: 11, image: "/images/products/amber-vase.webp",
    description: "A mouth-blown vase in smoked amber with a gentle ribbed texture. Empty, it's sculpture; filled, it's a sunset.",
    story: "Blown into a ridged mould, then tooled by hand so the ribs wander slightly — deliberate imperfection.",
    materials: "Mouth-blown soda-lime glass", dimensions: "H 28cm × Ø 15cm", care: "Hand wash with warm water and a bottle brush.",
    stock: 8,
  },
  {
    id: "hinoki-bath-stool", sku: "BTH-001", name: "Hinoki Bath Stool", category: "bath",
    price: 165, rating: 4.9, reviewCount: 22, image: "/images/products/bath-stool.webp",
    description: "A traditional hinoki cypress bath stool with a slatted top. It smells faintly of a forest after rain, because that's what hinoki does.",
    story: "Hinoki's natural oils resist water and mould — Japanese bathhouses have trusted it for a thousand years.",
    materials: "Solid hinoki cypress, unfinished", dimensions: "H 30cm × W 44cm × D 28cm", care: "Rinse after use, dry in ventilation. Never seal or varnish.",
    stock: 10, badge: "Bestseller",
  },
  {
    id: "waffle-towel-set", sku: "BTH-002", name: "Waffle Weave Towels, Set of 3", category: "bath",
    price: 78, rating: 4.7, reviewCount: 38, image: "/images/products/waffle-towels.webp",
    description: "Three organic-cotton waffle towels — bath, hand and face. The honeycomb weave dries fast and packs flat, like a towel designed by an engineer who naps.",
    story: "Woven on slow looms in Imabari, Japan's towel capital, then washed in soft mountain water.",
    materials: "100% GOTS-certified organic cotton", dimensions: "Bath 140×70cm, hand 80×40cm, face 34×34cm", care: "Machine wash warm, tumble low. No fabric softener — it kills absorbency.",
    stock: 19, featured: true,
  },
  {
    id: "embers-cedar-candle", sku: "FRG-001", name: "Embers & Cedar Candle", category: "fragrance",
    price: 52, rating: 4.8, reviewCount: 71, image: "/images/products/candle.webp",
    description: "Cedarwood, birch tar and a low note of ember — poured into a handmade ceramic vessel you'll keep long after the last burn.",
    story: "Sixty hours of burn time; the vessel is thrown by the same studio that makes our Terra vases.",
    materials: "Soy-coconut wax, cotton wick, ceramic vessel", dimensions: "220g, approx. 60 hours", care: "Trim wick to 5mm. First burn: let the pool reach the edge.",
    stock: 28, badge: "Bestseller", featured: true,
  },
  {
    id: "amber-reed-diffuser", sku: "FRG-002", name: "Amber Reed Diffuser", category: "fragrance",
    price: 64, rating: 4.5, reviewCount: 14, image: "/images/products/diffuser.webp",
    description: "Amber, labdanum and dried fig in an apothecary bottle with black rattan reeds. Three months of scent with zero flame.",
    story: "Blended in Grasse, France; the base is a sugar-derived carrier rather than alcohol, so the scent releases slowly.",
    materials: "Amber glass, natural rattan reeds, alcohol-free base", dimensions: "200ml, lasts approx. 12 weeks", care: "Flip reeds weekly. Keep off polished wood.",
    stock: 16,
  },
  {
    id: "linen-notebook-trio", sku: "STA-001", name: "Linen-Bound Notebooks, Set of 3", category: "stationery",
    price: 36, rating: 4.6, reviewCount: 25, image: "/images/products/notebooks.webp",
    description: "Three pocket notebooks bound in book linen — clay, olive and sand. One for lists, one for ideas, one you'll refuse to write in.",
    story: "The paper is 100gsm, fountain-pen friendly, and milled from recycled cotton rags.",
    materials: "Recycled cotton paper, book linen, thread-sewn", dimensions: "A6, 64 pages each, dot grid", care: "Keep dry. Patina of pocket wear is encouraged.",
    stock: 40,
  },
  {
    id: "brass-pen-tray", sku: "STA-002", name: "Solid Brass Pen & Leather Tray", category: "stationery",
    price: 88, rating: 4.7, reviewCount: 9, image: "/images/products/brass-pen.webp",
    description: "A solid brass pen with real heft, resting on a vegetable-tanned leather tray. For signatures that deserve a small ceremony.",
    story: "The pen is lathe-turned from a brass bar and takes standard G2 refills — built to outlive its owner.",
    materials: "Solid brass, vegetable-tanned leather", dimensions: "Pen 14cm; tray 20×8cm", care: "Polish brass or let it darken. Condition leather yearly.",
    stock: 15, badge: "New",
  },
  {
    id: "terracotta-planter-trio", sku: "GRD-001", name: "Terracotta Planter Trio", category: "garden",
    price: 54, rating: 4.6, reviewCount: 31, image: "/images/products/planters.webp",
    description: "Three graduated terracotta pots with drainage and saucers. The white mineral bloom they develop isn't a flaw — it's the pot breathing.",
    story: "Fired from Tuscan clay that's frost-resistant to -10°C, so they can live outside year-round.",
    materials: "Unglazed Tuscan terracotta", dimensions: "Ø 12, 16 & 20cm", care: "Soak before first planting. Bring under cover in hard frost.",
    stock: 21, badge: "Bestseller",
  },
  {
    id: "steel-watering-can", sku: "GRD-002", name: "Steel Indoor Watering Can", category: "garden",
    price: 62, rating: 4.7, reviewCount: 18, image: "/images/products/watering-can.webp",
    description: "A brushed-steel can with a long slender spout that reaches the back row of a shelf without baptising the front row.",
    story: "The spout is hand-soldered at a 34° angle — measured, apparently, with a protractor and strong opinions.",
    materials: "Brushed stainless steel", dimensions: "1L capacity, spout 22cm", care: "Empty after use to avoid water spots.",
    stock: 13,
  },
  {
    id: "seagrass-basket-pair", sku: "STR-001", name: "Seagrass Baskets, Set of 2", category: "storage",
    price: 70, rating: 4.5, reviewCount: 20, image: "/images/products/baskets.webp",
    description: "Two handwoven seagrass baskets with sturdy handles. Throws, toys, kindling, the general entropy of a household — all of it, suddenly charming.",
    story: "Woven by a women's cooperative in Vietnam; each basket takes a full day of weaving.",
    materials: "Handwoven natural seagrass", dimensions: "Ø 40×35cm and Ø 32×28cm", care: "Keep dry. Reshape by steaming if squashed in transit.",
    stock: 18,
  },
  {
    id: "modular-oak-shelf", sku: "STR-002", name: "Modular Oak Wall Shelf", category: "storage",
    price: 135, rating: 4.8, reviewCount: 13, image: "/images/products/wall-shelf.webp",
    description: "A single solid-oak shelf with hidden brass fixings. Buy one for a moment of display; buy three and you have a system.",
    story: "The bracket is machined brass rated to 25kg — engineered for books, not just succulents.",
    materials: "Solid oak, machined brass bracket", dimensions: "60cm × 18cm × 3cm", care: "Fixings included for masonry and stud walls.",
    stock: 9, badge: "Low stock",
  },
  {
    id: "matte-black-cutlery", sku: "TBW-001", name: "Matte Black Cutlery, 16 Pieces", category: "tableware",
    price: 140, rating: 4.6, reviewCount: 24, image: "/images/products/cutlery.webp",
    description: "Sixteen pieces of matte-black 18/10 stainless cutlery — four knives, forks, tablespoons and teaspoons. Dinner, but make it cinema.",
    story: "The black finish is PVD-coated rather than painted, so it survives the dishwasher without flaking.",
    materials: "18/10 stainless steel, PVD matte black coating", dimensions: "Full 16-piece service for four", care: "Dishwasher safe. Avoid prolonged soaking.",
    stock: 12, badge: "New", featured: true,
  },
  {
    id: "mouthblown-wine-glasses", sku: "TBW-002", name: "Mouth-Blown Wine Glasses, Pair", category: "tableware",
    price: 76, rating: 4.9, reviewCount: 33, image: "/images/products/wine-glasses.webp",
    description: "A pair of featherweight wine glasses with a slight organic waviness in the stem. Thin enough to make a Tuesday bottle taste like a decision.",
    story: "Each glass is pulled and shaped by a two-person team; the seam-free stem is the tell of hand work.",
    materials: "Mouth-blown lead-free crystal", dimensions: "H 22cm, 420ml", care: "Hand wash, polish with linen.",
    stock: 15, badge: "Bestseller",
  },
];

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

const reviewPool: Review[] = [
  { id: "r01", author: "Maren K.", location: "Copenhagen", rating: 5, date: "2026-07-28", title: "Exceeded every expectation", body: "The weight, the finish, the packaging — everything signals care. This is the third piece I've bought from Aurelle and the quality has never wavered.", verified: true },
  { id: "r02", author: "Daniel O.", location: "Melbourne", rating: 5, date: "2026-07-19", title: "Better in person", body: "Photos don't do it justice. The texture and colour depth are something you only get in real life. Shipping was faster than promised, too.", verified: true },
  { id: "r03", author: "Sofia L.", location: "Barcelona", rating: 4, date: "2026-07-11", title: "Lovely, slight variation", body: "Beautiful piece. Mine is slightly darker than the product photo, which I actually prefer — but worth knowing each one is unique.", verified: true },
  { id: "r04", author: "James T.", location: "London", rating: 5, date: "2026-06-30", title: "The comment magnet", body: "Every guest asks where it's from. It has quietly become the focal point of the room. Would buy again without hesitation.", verified: true },
  { id: "r05", author: "Aisha R.", location: "Toronto", rating: 4, date: "2026-06-22", title: "Slow ship, great product", body: "Took nine days to arrive, which tested my patience — but the moment I unboxed it I forgave everything. Genuinely well made.", verified: true },
  { id: "r06", author: "Henrik B.", location: "Oslo", rating: 5, date: "2026-06-15", title: "Heirloom territory", body: "This feels like something I'll hand down. The materials are honest and the construction is flawless. Aurelle's care guide was a thoughtful touch.", verified: true },
  { id: "r07", author: "Yuki M.", location: "Kyoto", rating: 5, date: "2026-06-08", title: "Quietly perfect", body: "No branding, no noise — just a beautifully resolved object. It sits in my home like it was always meant to be there.", verified: true },
  { id: "r08", author: "Clara W.", location: "New York", rating: 4, date: "2026-05-29", title: "Great, wish I'd bought two", body: "Quality is superb for the price. My only regret is ordering one — I'm already back for a second. The wishlist feature came in handy.", verified: true },
  { id: "r09", author: "Tomás E.", location: "Lisbon", rating: 5, date: "2026-05-20", title: "Craft you can feel", body: "You can tell within seconds of handling it that a person made this. Slight irregularities in the finish are, to me, the whole point.", verified: true },
  { id: "r10", author: "Ingrid S.", location: "Stockholm", rating: 5, date: "2026-05-12", title: "Worth every cent", body: "I compared a dozen alternatives before choosing this. None matched the materials at this price. Delivery was tracked the whole way.", verified: true },
  { id: "r11", author: "Oliver P.", location: "Dublin", rating: 3, date: "2026-05-03", title: "Good, not flawless", body: "Lovely object overall, though mine arrived with a tiny mark on the underside. Support responded within a day and made it right — impressive service.", verified: true },
  { id: "r12", author: "Leila H.", location: "Beirut", rating: 5, date: "2026-04-25", title: "Gifted, then kept", body: "Bought as a gift and nearly kept it for myself. The unboxing alone is an experience — recycled packaging, a handwritten care card. Class.", verified: true },
  { id: "r13", author: "Marcus D.", location: "Berlin", rating: 4, date: "2026-04-17", title: "Solid daily companion", body: "Three months of daily use and it looks better now than on day one. The patina developing on the surface is gorgeous.", verified: true },
  { id: "r14", author: "Naomi F.", location: "Cape Town", rating: 5, date: "2026-04-09", title: "Exactly as described", body: "Rare these days: a product that is precisely what the listing claims. Dimensions, colour, weight — all true. Highly recommended.", verified: true },
  { id: "r15", author: "Ravi N.", location: "Mumbai", rating: 4, date: "2026-03-31", title: "Beautiful, handle with care", body: "Stunning craftsmanship. It is more delicate than it looks, so treat it gently — the care instructions are worth reading, not skimming.", verified: true },
  { id: "r16", author: "Elise V.", location: "Paris", rating: 5, date: "2026-03-22", title: "A small daily luxury", body: "It's the object I reach for most often, and the one that gives me the most quiet pleasure. That, to me, is the entire point of good design.", verified: true },
];

/** Deterministically assign 3 reviews to each product from the pool. */
export function reviewsFor(productId: string): Review[] {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) hash = (hash * 31 + productId.charCodeAt(i)) % 997;
  const out: Review[] = [];
  for (let k = 0; k < 3; k++) {
    out.push(reviewPool[(hash + k * 5) % reviewPool.length]);
  }
  return out;
}

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function categoryName(slug: string): string {
  return categoryBySlug(slug)?.name ?? slug;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
