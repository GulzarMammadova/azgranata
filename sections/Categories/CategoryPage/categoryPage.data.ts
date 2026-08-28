import { categories } from "../data";

export interface CategoryPageProduct {
  id: string;
  name: string;
  type: string;
  meta: string;
  image: string;
  atmosphereImage: string;
  atmosphereAlt: string;
  headline: string;
  description: string;
  slug: string;
  featured: boolean;
}

export interface CategoryPageData {
  id: string;
  number: string;
  title: string;
  slug: string;
  eyebrow: string;
  tagline: string;
  statement: string;
  description: string;
  editorialText: string;
  accent: string;
  accentLight: string;
  accentText: string;
  heroImage: string;
  heroAlt: string;
  atmosphereImage: string;
  atmosphereAlt: string;
  atmosphereLabels: string[];
  filters: string[];
  products: CategoryPageProduct[];
}

const image = {
  /* =========================
     WINE
  ========================= */

  wineHero: "/images/brands/thumbs/heritage.jpg",
  wineAtmosphere: "/images/journal/vineyard.jpg",
  wineAtmosphere2: "/images/journal/barrels.jpg",

  wine2: "/images/brands/thumbs/icewine.jpg",
  wine3: "/images/brands/thumbs/rubai.jpg",
  wine4: "/images/brands/thumbs/qaragoz.jpg",

  /* =========================
     JUICES / SOFT DRINKS
  ========================= */

  softHero:
    "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=1600&h=1200&fit=crop&auto=format",

  softAtmosphere:
    "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=1800&h=900&fit=crop&auto=format",

  soft2:
    "https://images.unsplash.com/photo-1596460666096-d00f8edbea13?w=900&h=1200&fit=crop&auto=format",

  soft3:
    "https://images.unsplash.com/photo-1574709755254-fcd942d09d5a?w=900&h=1200&fit=crop&auto=format",

  soft4:
    "https://images.unsplash.com/photo-1592187270271-9a4b84faa228?w=900&h=1200&fit=crop&auto=format",

  /* =========================
     SPIRITS
  ========================= */

  spiritsHero:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&h=1200&fit=crop&auto=format",

  spiritsAtmosphere: "/images/journal/barrels.jpg",

  spirits2:
    "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=900&h=1200&fit=crop&auto=format",

  spirits3:
    "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&h=1200&fit=crop&auto=format",

  spirits4:
    "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=900&h=1200&fit=crop&auto=format",
};

const current = new Map(
  categories.map((category) => [category.id, category])
);

const configs: Record<
  string,
  Omit<
    CategoryPageData,
    "id" | "number" | "title" | "slug" | "description"
  >
> = {
  /* =========================================================
     WINE
  ========================================================= */

  wine: {
    eyebrow: "Wine Collection",

    tagline: "Land remembered.",

    statement:
      "Eight thousand years of wine culture.",

    editorialText:
      "AZGRANATA wines bring together the terroir of Azerbaijan, carefully selected varieties and contemporary craftsmanship. Each label is shaped by the vineyard, the vintage and the people behind it.",

    accent: "#6B2A38",

    accentLight: "#F4EAE8",

    accentText: "#4A1A24",

    heroImage: image.wineHero,

    heroAlt: "AZGRANATA Heritage wine",

    atmosphereImage: image.wineAtmosphere,

    atmosphereAlt:
      "Azerbaijani vineyard landscape",

    atmosphereLabels: [
      "Heritage Varieties",
      "Estate Grown",
      "AZGRANATA Cellars",
    ],

    filters: [
      "All",
      "Premium Red Wine",
      "Ice Wine",
      "Reserve Blend",
      "Single Varietal",
    ],

    products: [
      {
        id: "heritage",
        name: "Heritage",
        type: "Premium Red Wine",
        meta: "Reserve collection",
        image: image.wineHero,
        atmosphereImage: image.wineAtmosphere2,
        atmosphereAlt: "Wine barrels in the cellar",
        headline:
          "A heritage written in every vintage.",
        description:
          "A defining AZGRANATA red, rooted in the character of the land and shaped with patient cellar craft.",
        slug: "heritage",
        featured: true,
      },

      {
        id: "icewin",
        name: "Icewin",
        type: "Ice Wine",
        meta: "Late harvest collection",
        image: image.wine2,
        atmosphereImage: image.wineAtmosphere,
        atmosphereAlt: "Vineyard at harvest",
        headline:
          "Frozen on the vine. Refined in the glass.",
        description:
          "An elegant expression of late-harvest fruit, balancing concentrated sweetness with freshness.",
        slug: "icewin",
        featured: true,
      },

      {
        id: "rubai",
        name: "Rübai",
        type: "Reserve Blend",
        meta: "Signature collection",
        image: image.wine3,
        atmosphereImage: image.wineAtmosphere2,
        atmosphereAlt:
          "Traditional wine cellar",
        headline:
          "Ancient varieties. Modern precision.",
        description:
          "A considered blend created to express depth, balance and the distinctive identity of Azerbaijani wine.",
        slug: "rubai",
        featured: true,
      },

      {
        id: "qaragoz",
        name: "Qaragöz",
        type: "Single Varietal",
        meta: "Azerbaijani heritage",
        image: image.wine4,
        atmosphereImage: image.wineAtmosphere,
        atmosphereAlt: "Vineyard rows",
        headline:
          "A rare grape with a story of its own.",
        description:
          "A focused single-varietal expression that lets the grape and its origin speak clearly.",
        slug: "qaragoz",
        featured: false,
      },
    ],
  },

  /* =========================================================
     SPIRITS
  ========================================================= */

  spirits: {
    eyebrow: "Spirits Collection",

    tagline: "Crafted with patience.",

    statement:
      "Tradition, distilled with precision.",

    editorialText:
      "AZGRANATA spirits combine carefully selected ingredients, refined distillation and a mature sense of place. Vodka, brandy and liqueur expressions share the same attention to purity, texture and character.",

    accent: "#8B6A42",

    accentLight: "#F1E9DE",

    accentText: "#5E452B",

    heroImage: image.spiritsHero,

    heroAlt:
      "Premium spirit in warm light",

    atmosphereImage:
      image.spiritsAtmosphere,

    atmosphereAlt:
      "Wooden barrels in a cellar",

    atmosphereLabels: [
      "Refined Distillation",
      "Heritage Craft",
      "AZGRANATA Spirits",
    ],

    filters: [
      "All",
      "Premium Brandy",
      "Vodka",
      "Liqueur",
    ],

    products: [
      {
        id: "tamada",
        name: "Tamada",
        type: "Premium Brandy",
        meta: "Brandy collection",
        image: image.spiritsHero,
        atmosphereImage:
          image.spiritsAtmosphere,
        atmosphereAlt:
          "Barrels and wood textures",
        headline:
          "Heritage, matured with patience.",
        description:
          "A warm, structured spirit built around the depth and character of traditional brandy craftsmanship.",
        slug: "tamada",
        featured: true,
      },

      {
        id: "whitewater",
        name: "White Water",
        type: "Vodka",
        meta: "Vodka collection",
        image: image.spirits2,
        atmosphereImage:
          image.spiritsAtmosphere,
        atmosphereAlt:
          "Spirit cellar",
        headline:
          "Purity with a quiet character.",
        description:
          "A clean, refined vodka expression where clarity and balance take the lead.",
        slug: "whitewater",
        featured: true,
      },

      {
        id: "beliyvolk",
        name: "Belıy Volk",
        type: "Vodka",
        meta: "Vodka collection",
        image: image.spirits3,
        atmosphereImage:
          image.spiritsAtmosphere,
        atmosphereAlt:
          "Wooden barrels",
        headline:
          "A precise expression of strength.",
        description:
          "An assured spirit with a restrained visual language and a focus on clean finish.",
        slug: "beliyvolk",
        featured: true,
      },

      {
        id: "spirits-reserve",
        name: "AZGRANATA Reserve",
        type: "Liqueur",
        meta: "Signature spirits",
        image: image.spirits4,
        atmosphereImage:
          image.spiritsAtmosphere,
        atmosphereAlt:
          "Cellar atmosphere",
        headline:
          "Depth, texture and time.",
        description:
          "A richer expression for the collection, designed around warmth, texture and lingering character.",
        slug: "reserve",
        featured: false,
      },
    ],
  },

  /* =========================================================
     JUICES
  ========================================================= */

  juices: {
    eyebrow: "Soft Drinks Collection",

    tagline:
      "Freshness, thoughtfully made.",

    statement:
      "From nature to every glass.",

    editorialText:
      "AZGRANATA soft drinks bring together juices, nectars, sparkling beverages and functional drinks designed for everyday enjoyment. The category keeps the House's premium visual language while allowing the ingredients to bring the colour.",

    accent: "#B8701E",

    accentLight: "#FBF0E4",

    accentText: "#7A4810",

    heroImage: image.softHero,

    heroAlt:
      "Fresh citrus and juice composition",

    atmosphereImage:
      image.softAtmosphere,

    atmosphereAlt:
      "Fresh citrus arranged in natural light",

    atmosphereLabels: [
      "Natural Ingredients",
      "Authentic Taste",
      "AZGRANATA Quality",
    ],

    filters: [
      "All",
      "Natural Juice",
      "Vitamin Drink",
      "Sparkling Drink",
      "Fruit Drink",
      "Mineral Water",
    ],

    products: [
      {
        id: "more",
        name: "+MORE",
        type: "Natural Juice",
        meta: "Soft drinks collection",
        image: image.soft2,
        atmosphereImage:
          image.softAtmosphere,
        atmosphereAlt:
          "Fresh citrus composition",
        headline:
          "Freshness, without compromise.",
        description:
          "A natural fruit-led expression created for a clean, bright everyday drinking experience.",
        slug: "more",
        featured: true,
      },

      {
        id: "vita1000",
        name: "Vita1000",
        type: "Vitamin Drink",
        meta: "Functional collection",
        image: image.soft3,
        atmosphereImage:
          image.softAtmosphere,
        atmosphereAlt:
          "Fresh fruit and juice",
        headline:
          "A brighter everyday ritual.",
        description:
          "A lively functional drink designed around fruit character and an easy, refreshing finish.",
        slug: "vita1000",
        featured: true,
      },

      {
        id: "bahar",
        name: "Bahar",
        type: "Sparkling Drink",
        meta: "Sparkling collection",
        image: image.soft4,
        atmosphereImage:
          image.softAtmosphere,
        atmosphereAlt:
          "Citrus and water",
        headline:
          "Light, lively, refreshing.",
        description:
          "A sparkling expression with a bright, uncomplicated character for everyday moments.",
        slug: "bahar",
        featured: true,
      },

      {
        id: "frumba",
        name: "Frumba",
        type: "Fruit Drink",
        meta: "Fruit collection",
        image: image.soft2,
        atmosphereImage:
          image.softAtmosphere,
        atmosphereAlt:
          "Fresh fruit",
        headline:
          "Fruit at the centre.",
        description:
          "A fruit-forward drink created to bring colour and freshness to the category.",
        slug: "frumba",
        featured: false,
      },

      {
        id: "vivi",
        name: "Vivi",
        type: "Mineral Water",
        meta: "Water collection",
        image: image.soft4,
        atmosphereImage:
          image.softAtmosphere,
        atmosphereAlt:
          "Fresh water and citrus",
        headline:
          "Pure refreshment.",
        description:
          "A clean, uncomplicated water expression designed around everyday hydration.",
        slug: "vivi",
        featured: false,
      },
    ],
  },
};

export function getCategoryPageData(
  slug: string
): CategoryPageData | undefined {
  const normalizedSlug =
    slug === "softdrinks" ? "juices" : slug;

  const baseId =
    slug === "juices" ? "softdrinks" : slug;

  const base = current.get(baseId);
  const config = configs[normalizedSlug];

  if (!base || !config) {
    return undefined;
  }

  return {
    ...config,

    id: base.id,

    number: base.number,

    title:
      normalizedSlug === "juices"
        ? "Juices"
        : base.title,

    slug: normalizedSlug,

    description: base.description,
  };
}

export const categoryPageSlugs = [
  "juices",
  "wine",
  "spirits",
];