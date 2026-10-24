export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: "All" | "Buffet Displays" | "Live Counters" | "Starters & Mains" | "Desserts & Drinks" | "Event Decor";
  image: string;
  badge?: string;
  locationTag: string;
}

export const galleryCategories = [
  "All",
  "Buffet Displays",
  "Live Counters",
  "Starters & Mains",
  "Desserts & Drinks",
  "Event Decor"
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Grand Wedding Banquet Buffet",
    caption: "Polished copper chafing dishes, warm ambient candle accents, and fresh floral runners for a wedding reception in Sonipat.",
    category: "Buffet Displays",
    image: "/images/wedding_buffet.jpg",
    badge: "Wedding Setup",
    locationTag: "Sonipat Banquet"
  },
  {
    id: "gal-2",
    title: "Interactive Live Chaat Corner",
    caption: "Steaming hot aloo tikki on the tawa, crispy gol gappe with chilled flavoured waters, and active smiling chef service.",
    category: "Live Counters",
    image: "/images/live_chaat.jpg",
    badge: "Live Counter",
    locationTag: "Ganaur Celebration"
  },
  {
    id: "gal-3",
    title: "Royal North Indian Feast",
    caption: "Rich Dal Makhani with fresh butter dollop, Shahi Paneer, saffron-infused Zafrani Biryani, and hot tandoori garlic naans.",
    category: "Starters & Mains",
    image: "/images/hero_feast.jpg",
    badge: "Signature Feast",
    locationTag: "Main Banquet"
  },
  {
    id: "gal-4",
    title: "Gourmet Tandoori Starters Platter",
    caption: "Charcoal-grilled paneer tikka skewers with charred bell peppers, crispy spring rolls, and tangy fresh mint chutney.",
    category: "Starters & Mains",
    image: "/images/starters_platter.jpg",
    badge: "Appetizers",
    locationTag: "Engagement Ceremony"
  },
  {
    id: "gal-5",
    title: "Royal Wedding Dessert Extravaganza",
    caption: "Stacked golden gulab jamun in rose syrup, creamy saffron rasmalai with sliced pistachios, and fresh jalebi with malai rabri.",
    category: "Desserts & Drinks",
    image: "/images/desserts_platter.jpg",
    badge: "Mithai Station",
    locationTag: "Wedding Reception"
  },
  {
    id: "gal-6",
    title: "Fairy-Lit Open Lawn Banquet",
    caption: "Illuminated canopy tents over lush lawn with circular round tables, gold satin linens, and covered steam buffet lines.",
    category: "Event Decor",
    image: "/images/outdoor_lawn.jpg",
    badge: "Outdoor Setup",
    locationTag: "Murthal Farmhouse"
  },
  {
    id: "gal-7",
    title: "Welcome Drinks & Clay Kulhad Lassi Bar",
    caption: "Thick mango lassi in earthen kulhads with saffron strands, chilled badam thandai, and sparkling virgin mint mojitos.",
    category: "Desserts & Drinks",
    image: "/images/drinks_bar.jpg",
    badge: "Welcome Bar",
    locationTag: "Daytime Function"
  },
  {
    id: "gal-8",
    title: "Executive Corporate Buffet & Luncheon",
    caption: "Contemporary stainless chafers, crisp farm salads, fresh wraps, and curated healthy luncheon options for business gatherings.",
    category: "Buffet Displays",
    image: "/images/corporate_spread.jpg",
    badge: "Corporate Lunch",
    locationTag: "Kundli Industrial Hub"
  }
];
