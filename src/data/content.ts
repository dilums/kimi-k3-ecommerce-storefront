export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: number;
  image: string;
  author: { name: string; role: string };
  pullQuote: string;
  body: string[];
}

export const postTags = ["All", "Living", "Guides", "Rituals", "Materials", "Gifting"];

export const posts: Post[] = [
  {
    slug: "the-slow-home",
    title: "The Slow Home: Buying Less, But Better",
    excerpt: "Why the most sustainable room is the one you never have to refurnish — and how to build one, object by object.",
    tag: "Living", date: "2026-08-02", readTime: 6, image: "/images/posts/slow-home.webp",
    author: { name: "Elena Marsh", role: "Editor-at-Large" },
    pullQuote: "A room assembled slowly, with intention, will outlast every trend cycle thrown at it.",
    body: [
      "There is a particular exhaustion that comes from rooms that never feel finished. The flat-pack bookshelf sags, gets replaced, sags again. The trend-coloured cushion fades, and its replacement is already fading. The slow home is the refusal of this cycle — not through minimalism as austerity, but through a different relationship with the objects themselves.",
      "The principle is simple: buy once, buy well, and let the object earn its keep over decades rather than seasons. A solid oak table costs more than a veneered one, but amortised over thirty years of dinners, homework and arguments, it is the cheapest table you will ever own. The maths of quality is almost always on your side; it is the psychology of waiting that is hard.",
      "Start with the things your hands touch daily — the mug, the throw, the lamp switch. These are the objects whose quality you feel a hundred times a day. A hand-thrown mug turns a routine coffee into a small ceremony. That ceremony, repeated, is what a home actually is.",
      "The slow home is never finished, and that is its mercy. A shelf waits empty for six months until the right object appears. The room breathes. And one day you look around and realise everything in sight has a story, a maker, and a future — and nothing needs replacing at all.",
    ],
  },
  {
    slug: "caring-for-ceramics",
    title: "Caring for Ceramics: A Maker's Guide",
    excerpt: "Handmade stoneware can outlive you — if you treat it right. A studio potter shares the rules that actually matter.",
    tag: "Guides", date: "2026-07-24", readTime: 5, image: "/images/posts/ceramics-care.webp",
    author: { name: "Rui Almeida", role: "Studio Potter" },
    pullQuote: "Stoneware is tougher than it looks and more fragile than you think — usually at the same moment.",
    body: [
      "The first rule of handmade ceramics is also the least intuitive: the dishwasher is fine, but the sink is dangerous. Most breakages happen not in machines but in soapy water, where wet hands lose grip and plates knock against pots. Wash pieces one at a time, with a rubber mat in the basin.",
      "Thermal shock is the silent killer. Never take a piece from a cold shelf and fill it with boiling water; let it come to room temperature first, or warm it with tap water. The crack you hear three months later was born in that instant.",
      "Matte glazes — like the ones on our Terra vessels — mark more easily with cutlery. Those grey lines are metal deposits, not damage. A paste of baking soda and a soft cloth lifts them in seconds.",
      "Finally, storage: stack bowls with a square of linen or paper between them. Glaze against glaze, over years, will micro-scratch both surfaces. It is the kind of damage you only notice when it's too late — which is precisely why the best collections never show it.",
    ],
  },
  {
    slug: "lighting-in-layers",
    title: "Lighting in Layers: The Three-Light Rule",
    excerpt: "One overhead light is an interrogation, not an interior. How to layer ambient, task and accent light like a set designer.",
    tag: "Guides", date: "2026-07-15", readTime: 7, image: "/images/posts/lighting-layers.webp",
    author: { name: "Elena Marsh", role: "Editor-at-Large" },
    pullQuote: "You don't light a room. You light the moments that happen inside it.",
    body: [
      "Walk into any room that feels instantly calm and you will find the same trick: no single light source is doing all the work. Set designers have known this for a century — a scene lit from one angle feels flat and anxious, while layered light creates depth the eye reads as comfort.",
      "The formula is three layers. Ambient light is the base: soft, indirect, often bounced off walls or filtered through paper. A washi lantern in the corner does more for a room's mood than any ceiling fixture. Task light is the second layer — focused pools where life happens: the reading chair, the chopping board, the desk.",
      "The third layer is accent, and it is the one everyone skips: a small lamp on a bookshelf, a candle on the sideboard, light that exists purely to please. It is the difference between a lit room and a composed one.",
      "Practical matters: keep everything at 2700K or warmer, put dimmers on anything that takes them, and place light sources at varied heights. Three lamps at three levels will always beat one bright ceiling light — and your evening self, eyes unstrained and shoulders lowered, will know why.",
    ],
  },
  {
    slug: "material-guide-linen",
    title: "Material Guide: Linen, From Flax to Fold",
    excerpt: "Why linen wrinkles, why that's a virtue, and how to tell a fifty-euro cushion from a five-hundred-euro education.",
    tag: "Materials", date: "2026-07-06", readTime: 5, image: "/images/posts/linen-guide.webp",
    author: { name: "Camille Roy", role: "Textile Researcher" },
    pullQuote: "Linen doesn't wrinkle because it's cheap. It wrinkles because it's honest.",
    body: [
      "Linen begins as flax, a blue-flowered crop that asks almost nothing of the land — no irrigation, few pesticides, a four-month sprint from seed to harvest. The fibres are pulled from the stalk, not cut, which is why linen thread can run a metre long and why the fabric lasts generations.",
      "The wrinkle is the point. Linen's long fibres don't spring back like cotton's short ones, so creases set in and stay. But that same structure gives linen its cool hand, its subtle lustre, and a tensile strength twice that of cotton. A linen sheet is not fragile; it is simply unbothered by your need for smoothness.",
      "Quality shows in three places. First, weight: good linen for upholstery or cushions runs 300gsm and up. Second, the wash: stonewashing softens the cloth mechanically rather than chemically, so it arrives broken-in and only improves. Third, the slub — those slight thickenings in the thread. Uniformity is the signature of blends; honest variation is pure linen.",
      "Care is counterintuitively easy: machine wash, line dry, skip the iron. Linen is the rare material that rewards neglect and punishes fuss. Buy it well, wash it often, and let it wrinkle — it will still be beautiful when the sofa underneath it has been replaced twice.",
    ],
  },
  {
    slug: "small-spaces-considered",
    title: "Small Spaces, Considered: The 40m² Manifesto",
    excerpt: "Constraint is a design tool. Six principles for making a small home feel edited rather than cramped.",
    tag: "Living", date: "2026-06-27", readTime: 6, image: "/images/posts/small-spaces.webp",
    author: { name: "Jonas Lindqvist", role: "Contributing Writer" },
    pullQuote: "A small room forces the question a big room lets you dodge: does this object deserve to exist here?",
    body: [
      "The small home has one unfair advantage: every decision matters, so every decision gets made properly. In forty square metres there is no room for the maybe-someday purchase, the filler furniture, the decorative panic buy. What remains is the considered life, edited to its essence.",
      "Principle one: choose pieces that work twice. A bench that seats guests and stores blankets. A wall shelf that displays ceramics above and hooks bags below. In a small space, single-purpose objects are a luxury you can't afford.",
      "Principle two: keep the floor visible. Leggy furniture — raised sofas, tripod tables — lets light and sightlines travel under it, and a room you can see through feels larger than a room you can't. The eye measures space in uninterrupted lines.",
      "Principles three through six, briefly: hang storage on walls, not floors; let one material (oak, say) repeat through the space for calm coherence; keep a strict one-in-one-out rule; and remember that empty surface is not wasted space — it is the margin that makes the text readable. A small home, edited well, doesn't feel small. It feels exact.",
    ],
  },
  {
    slug: "the-wellness-bathroom",
    title: "The Wellness Bathroom, Minus the Renovation",
    excerpt: "No demolition required. How wood, cotton and steam can turn a rental bathroom into a bathing practice.",
    tag: "Rituals", date: "2026-06-18", readTime: 4, image: "/images/posts/bathroom-rituals.webp",
    author: { name: "Camille Roy", role: "Textile Researcher" },
    pullQuote: "The bath stool is not furniture. It's permission to stay a while.",
    body: [
      "The Japanese bathing tradition starts from a premise the West is only now importing: the bathroom is not a utility closet but a place of restoration. The good news is that achieving this requires no contractor — only a shift in materials and tempo.",
      "Begin with wood. A hinoki stool beside the bath or shower changes the room's register instantly. Hinoki cypress releases a soft, resinous scent when wet, resists mould with its own natural oils, and asks only to be rinsed and aired. It is the single highest-impact object you can add to a bathroom.",
      "Next, the textiles. Waffle-weave cotton dries fast enough to stay fresh in humid rooms, and its texture against skin after hot water is a small daily luxury. Three towels — bath, hand, face — in one calm tone will do more than a trolley of products.",
      "Finally, tempo. Keep a stool, a carafe of water, and fifteen unhurried minutes. The wellness industry sells transformation; the bathing tradition offers something cheaper and better: a room that returns you to yourself, nightly, one slow ritual at a time.",
    ],
  },
  {
    slug: "setting-the-table",
    title: "Setting the Table Like You Mean It",
    excerpt: "The weeknight table deserves the same respect as the feast. A short course in composition, height and restraint.",
    tag: "Rituals", date: "2026-06-09", readTime: 5, image: "/images/posts/table-setting.webp",
    author: { name: "Elena Marsh", role: "Editor-at-Large" },
    pullQuote: "A set table is a small promise: for the next hour, this is where life happens.",
    body: [
      "Somewhere between the formal dining rooms of our grandparents and the eat-over-the-sink present, the table got lost. This is a plea for its return — not the starched version, but a composed one: three elements, five minutes, every night.",
      "Start with a base. A bare wood table is a fine canvas, but a linen cloth or runner softens acoustics and signals intent. Then the plates: mismatched is charming, but matched-by-tone is calmer. Reactive glazes in one earth palette let every plate differ while the table holds together.",
      "Height is the amateur's blind spot. A table where everything sits at plate level feels flat. One tall element — a carafe, a branch in a vase, even a glass of stems upturned — lifts the whole composition. Candles count double: height plus warmth.",
      "And restraint: three elements per person, one centrepiece, done. The goal is not impressiveness but presence. A table set with care tells everyone sitting at it — including you, alone on a Tuesday — that the meal matters. Repeated nightly, that message becomes the room's entire atmosphere.",
    ],
  },
  {
    slug: "scent-and-memory",
    title: "Scent & Memory: Why Your Home Needs a Signature",
    excerpt: "Smell is the fastest route to memory. How to choose, layer and rotate a home fragrance with intention.",
    tag: "Rituals", date: "2026-05-30", readTime: 4, image: "/images/posts/scent-memory.webp",
    author: { name: "Jonas Lindqvist", role: "Contributing Writer" },
    pullQuote: "Guests will forget your sofa. They will not forget how your home smelled.",
    body: [
      "Of the five senses, smell is the only one wired directly to the brain's memory centres. A room's fragrance is remembered years after its furniture is forgotten — which makes it strange that we choose scent last and casually, when it is doing the deepest work.",
      "The case for a signature: one scent, used consistently, becomes the smell of your home — the thing returning guests recognise at the threshold and the thing you will someday be nostalgia-struck by in a hotel corridor. Cedar, fig, rain on stone: choose the note you want to be remembered by.",
      "Layering keeps a signature from going flat. A candle for evenings (flame, warmth, occasion), a diffuser for constancy (it works while you sleep). Same family, different intensities. Rotate seasonally within your family — greener in spring, smokier in winter — and the scent stays alive without losing its identity.",
      "Two practical rules: ventilate before you scent, because fragrance over stale air reads as cover-up; and burn a new candle long enough on first lighting for the wax pool to reach the edge, or it will tunnel forever. Scent is memory, and memory rewards the deliberate.",
    ],
  },
  {
    slug: "workspace-rituals",
    title: "Workspace Rituals for the Distracted Age",
    excerpt: "Your desk is a state of mind. Building a physical practice — notebook, pen, boundaries — that protects deep work.",
    tag: "Living", date: "2026-05-21", readTime: 6, image: "/images/posts/workspace.webp",
    author: { name: "Elena Marsh", role: "Editor-at-Large" },
    pullQuote: "The notebook on the desk is not stationery. It's a doorway the day keeps walking through.",
    body: [
      "Attention is the rarest material in the modern home, and the desk is where it is most often burgled. The tools on it either defend your focus or conspire against it — there is no neutral object.",
      "The analog anchor is the oldest defence. A paper notebook beside the keyboard catches the thoughts that would otherwise become browser tabs: the errand, the idea, the name to look up later. Write it, stay in flow, return to it after. A heavy brass pen makes the catching feel ceremonial, which is not nothing — ritual is how the brain knows the mode has changed.",
      "Boundaries are physical. A desk lamp with a warm, narrow pool of light defines the work zone better than any app blocker: inside the circle is the task; outside is everything that can wait. When the lamp goes off, the workday ends. Objects as switches.",
      "And clear the desk nightly. Not minimalism — maintenance. Thirty seconds of resetting means tomorrow begins at a threshold instead of in a residue. The desk, like the mind, works best when yesterday has been put away.",
    ],
  },
  {
    slug: "the-balcony-garden",
    title: "The Balcony Garden: Green Without a Garden",
    excerpt: "Three pots, one watering can, twenty minutes a week. The smallest viable garden is still a garden.",
    tag: "Guides", date: "2026-05-12", readTime: 5, image: "/images/posts/balcony-garden.webp",
    author: { name: "Freya Nygård", role: "Horticultural Writer" },
    pullQuote: "Nobody ever regretted the herbs. Everyone regrets the seventeenth pot they bought in April.",
    body: [
      "The balcony garden fails in one predictable way: ambition. April enthusiasm buys a dozen pots; July reality waters none of them. The fix is to start smaller than feels reasonable — three pots, planted well, tended briefly but consistently.",
      "Terracotta first. Unglazed clay breathes, wicking excess moisture from soil and forgiving the over-enthusiastic waterer. Its white mineral bloom is not dirt but the pot doing its job. Graduated sizes let herbs spread as they grow: basil in the small one, rosemary in the large, something trailing in between.",
      "Choose plants for neglect, not for show. Rosemary, thyme and sage survive missed waterings and poor light; they also happen to be the herbs a kitchen actually uses. One olive sapling or bay adds height and the smug pleasure of a tree on the fourth floor.",
      "The practice is twenty minutes a week: a slow watering until it drains, a pinch of deadheads, a turn of each pot so growth stays even. That is the whole garden. What it returns — scent on warm evenings, green in your sightline, the small dignity of keeping something alive — is wildly disproportionate to the effort.",
    ],
  },
  {
    slug: "the-art-of-storage",
    title: "The Art of Storage: Display What You Keep",
    excerpt: "Storage isn't hiding things. It's deciding what your eyes meet every day. Notes on baskets, shelves and honesty.",
    tag: "Living", date: "2026-05-03", readTime: 5, image: "/images/posts/art-of-storage.webp",
    author: { name: "Jonas Lindqvist", role: "Contributing Writer" },
    pullQuote: "Everything you own is on display — if only in the museum of your own attention.",
    body: [
      "Storage advice usually starts with boxes and ends with shame. Begin instead with a harder question: which of your belongings deserve to be seen daily? The answer reorganises a home faster than any container system.",
      "The open-shelf method is honesty as design. When storage is visible — ceramics on oak, linens folded in a basket — curation happens naturally. You keep the plates you love because those are the ones on display. The rest quietly migrate to the donation box, as they should.",
      "Baskets are the workhorse: woven seagrass swallows the category of things too useful to banish and too ugly to display — cables, kindling, the dog's entire wardrobe. One texture, repeated, reads as calm even when the contents are chaos.",
      "The final rule is maintenance, not purchase: fifteen minutes weekly, returning objects to their assigned homes. Storage fails not from lack of furniture but from drift. A shelf reset weekly stays a still life; ignored for a month, it becomes a landscape. The art is in the returning.",
    ],
  },
  {
    slug: "the-considered-gift-guide",
    title: "The Considered Gift Guide: Twelve Objects, Zero Panic",
    excerpt: "Gifts chosen by the only metric that matters: will this still be loved in five years? An editor's shortlist.",
    tag: "Gifting", date: "2026-04-24", readTime: 7, image: "/images/posts/gift-guide.webp",
    author: { name: "Elena Marsh", role: "Editor-at-Large" },
    pullQuote: "The best gift says: I noticed how you live, and I wanted to make it slightly better.",
    body: [
      "The panic gift — bought late, wrapped in haste, forgotten by February — has one cause: shopping by occasion instead of by person. The considered gift starts with observation. How do they spend their mornings? What in their home is worn from use? The answer is the gift.",
      "For the coffee ritualist: hand-thrown espresso mugs, a pair, because ritual is shared. For the reader: travertine bookends — geology holding up literature, and heavy enough to mean it. For the new apartment: a waffle towel set, the upgrade nobody buys themselves.",
      "For the host: mouth-blown wine glasses, thin-stemmed and slightly irregular, which say more about attention than any decanter. For the desk-bound: a brass pen with real heft, turning signatures into ceremonies. For the one who has everything: a candle with sixty hours of cedar and embers — consumable, luxurious, and never clutter.",
      "Wrap it in kraft paper, tie it with linen ribbon, tuck in a sprig of something dried. The wrap costs four minutes and signals the entire philosophy: this was chosen, not grabbed. Which is, in the end, all a good gift needs to say.",
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export interface Faq {
  q: string;
  a: string;
  group: string;
}

export const faqGroups = ["Shipping & Delivery", "Orders & Payment", "Returns & Exchanges", "Product Care"];

export const faqs: Faq[] = [
  { group: "Shipping & Delivery", q: "How long does delivery take?", a: "Orders are dispatched within 1–2 business days from our Rotterdam studio. Standard delivery takes 3–5 business days within the EU, 5–8 days to the UK and North America, and 7–12 days elsewhere. You'll receive tracking the moment your parcel leaves us." },
  { group: "Shipping & Delivery", q: "How much does shipping cost?", a: "Shipping is a flat $9 for orders under $150 and complimentary above that. Furniture pieces (like the Boucle Lounge Chair) ship via white-glove courier at a flat $49, which includes room-of-choice placement and packaging removal." },
  { group: "Shipping & Delivery", q: "Do you ship internationally?", a: "Yes — we ship to 42 countries. Duties and taxes are calculated and prepaid at checkout for most destinations, so the price you see is the price you pay, with no surprise fees at the door." },
  { group: "Shipping & Delivery", q: "How are fragile items packed?", a: "Ceramics and glass travel in moulded recycled-pulp cradles inside double-walled boxes — no plastic foam. Our breakage rate is under 0.4%, and if anything arrives damaged, a photo is all we need to send a replacement immediately." },
  { group: "Orders & Payment", q: "Which payment methods do you accept?", a: "Visa, Mastercard, American Express, PayPal, Apple Pay and Google Pay. All transactions are processed over encrypted connections; we never store full card numbers on our servers." },
  { group: "Orders & Payment", q: "Can I change or cancel my order?", a: "You have 90 minutes after ordering to cancel or modify from your account page — after that, orders enter the packing queue. If it's too late to change, you can always use the 30-day return once it arrives." },
  { group: "Orders & Payment", q: "Do you offer gift wrapping?", a: "Yes, and it's complimentary. Select the gift option at checkout and we'll wrap in kraft paper with linen ribbon, include a handwritten note, and omit prices from the packing slip." },
  { group: "Orders & Payment", q: "Will I receive an invoice?", a: "A PDF invoice is emailed automatically with your shipping confirmation, and all past invoices live in your account under Orders. Business customers can add a VAT number at checkout for a full VAT invoice." },
  { group: "Returns & Exchanges", q: "What is your return policy?", a: "You have 30 days from delivery to return any unused item in its original condition for a full refund. Returns are free within the EU; elsewhere we deduct a $9 return label fee. Refunds land within 5 business days of the parcel reaching us." },
  { group: "Returns & Exchanges", q: "How do I start a return?", a: "From your account's Orders page, select the order and choose 'Start a return' — or use the returns page with your order number and email. We'll email a prepaid label; drop the parcel at any carrier point. Furniture returns are collected from your home, free." },
  { group: "Returns & Exchanges", q: "Can I exchange instead of refund?", a: "Absolutely. Choose 'exchange' when starting your return and tell us the item and colour you'd like. We ship the replacement as soon as the carrier scans your return — you don't wait for it to reach us first." },
  { group: "Product Care", q: "How do I care for handmade ceramics?", a: "Hand-wash where possible (the sink, not the machine, is where most breakages happen), avoid sudden temperature shocks, and lift cutlery marks from matte glazes with a baking-soda paste. Full guide in our Journal under 'Caring for Ceramics'." },
  { group: "Product Care", q: "Will the brass and leather items change over time?", a: "Yes — deliberately. Unlacquered brass deepens to a warm brown and vegetable-tanned leather darkens with sun and touch. If you prefer the original shine, a brass cloth restores it in minutes; if you love the patina, do nothing at all." },
  { group: "Product Care", q: "Are your textiles machine washable?", a: "Linen and cotton pieces are — cold wash, line dry, no softener (it coats fibres and kills absorbency). The merino throw prefers a spot clean or gentle wool cycle. Every product page lists care specific to that piece." },
];

/** Products woven into each essay — powers the "Pieces from this essay" strip. */
export const essayProducts: Record<string, string[]> = {
  "the-slow-home": ["tripod-oak-side-table", "boucle-lounge-chair", "oat-merino-throw"],
  "caring-for-ceramics": ["terra-vessel-vase", "kiln-speckle-mugs", "reactive-dinner-plates"],
  "lighting-in-layers": ["kumo-lantern-lamp", "dome-brass-lamp", "embers-cedar-candle"],
  "material-guide-linen": ["sage-linen-cushion", "oat-merino-throw", "waffle-towel-set"],
  "small-spaces-considered": ["modular-oak-shelf", "seagrass-basket-pair", "kumo-lantern-lamp"],
  "the-wellness-bathroom": ["hinoki-bath-stool", "waffle-towel-set", "amber-reed-diffuser"],
  "setting-the-table": ["reactive-dinner-plates", "matte-black-cutlery", "mouthblown-wine-glasses"],
  "scent-and-memory": ["embers-cedar-candle", "amber-reed-diffuser", "smoked-amber-vase"],
  "workspace-rituals": ["linen-notebook-trio", "brass-pen-tray", "dome-brass-lamp"],
  "the-balcony-garden": ["terracotta-planter-trio", "steel-watering-can", "seagrass-basket-pair"],
  "the-art-of-storage": ["seagrass-basket-pair", "modular-oak-shelf", "travertine-bookends"],
  "the-considered-gift-guide": ["travertine-bookends", "linen-notebook-trio", "smoked-amber-vase"],
};
