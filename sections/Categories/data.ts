export interface Brand {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface Category {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  brands: Brand[];
}

export const categories: Category[] = [
  {
    id: "wine",
    number: "01",
    title: "Wine",
    subtitle: "The Ancient Art of Azerbaijani Wine",
    description:
      "From our estate vineyards in Shirvan and Ganja, our wines express the unique terroir of Azerbaijan, combining centuries-old traditions with uncompromising craftsmanship.",

    brands: [
      {
        id: "heritage",
        name: "Heritage",
        category: "Premium Red Wine",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "icewin",
        name: "Icewin",
        category: "Ice Wine",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "rubai",
        name: "Rübai",
        category: "Reserve Blend",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "qaragoz",
        name: "Qaragöz",
        category: "Single Varietal",
        image: "/images/placeholders/product-placeholder.jpg",
      },
    ],
  },

  {
    id: "spirits",
    number: "02",
    title: "Spirits",
    subtitle: "Tradition Distilled Into Every Bottle",
    description:
      "Crafted with carefully selected ingredients and refined distillation techniques, our spirits combine authenticity, purity and character.",

    brands: [
      {
        id: "tamada",
        name: "Tamada",
        category: "Premium Brandy",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "whitewater",
        name: "White Water",
        category: "Vodka",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "beliyvolk",
        name: "Belıy Volk",
        category: "Vodka",
        image: "/images/placeholders/product-placeholder.jpg",
      },
    ],
  },

  {
    id: "softdrinks",
    number: "03",
    title: "Soft Drinks",
    subtitle: "Refreshing Every Moment",
    description:
      "Natural juices, nectars, sparkling beverages and functional drinks created for everyday enjoyment across more than 30 countries.",

    brands: [
      {
        id: "more",
        name: "+MORE",
        category: "Natural Juice",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "vita1000",
        name: "Vita1000",
        category: "Vitamin Drink",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "bahar",
        name: "Bahar",
        category: "Sparkling Drink",
        image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "frumba",
        name: "Frumba",
        category: "Fruit Drink",
       image: "/images/placeholders/product-placeholder.jpg",
      },
      {
        id: "vivi",
        name: "Vivi",
        category: "Mineral Water",
        image: "/images/placeholders/product-placeholder.jpg",
      },
    ],
  },
];