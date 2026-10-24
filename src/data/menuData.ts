export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  category: MenuCategory;
  tags: string[]; // e.g. "Pure Veg", "Chef's Special", "Live Station", "Traditional"
  isLiveCounterItem?: boolean;
}

export type MenuCategory = 
  | "Starters" 
  | "Main Course" 
  | "Breads & Rice" 
  | "Desserts" 
  | "Beverages" 
  | "Special Counters";

export interface CategoryInfo {
  id: MenuCategory;
  title: string;
  icon: string;
  description: string;
}

export const menuCategories: CategoryInfo[] = [
  {
    id: "Starters",
    title: "Starters & Finger Delights",
    icon: "Utensils",
    description: "Crispy, savoury delicacies served hot to kickstart your feast."
  },
  {
    id: "Special Counters",
    title: "Live Interactive Counters",
    icon: "Flame",
    description: "Theatrical live food preparation that wows guests with fresh aroma and action."
  },
  {
    id: "Main Course",
    title: "Royal Main Course",
    icon: "CookingPot",
    description: "Slow-simmered rich curries, fragrant gravies, and comforting North Indian classics."
  },
  {
    id: "Breads & Rice",
    title: "Tandoori Breads & Pulao",
    icon: "Wheat",
    description: "Freshly slapped oven breads, layered paranthas, and aged basmati delights."
  },
  {
    id: "Desserts",
    title: "Artisanal Sweets & Mithai",
    icon: "Sparkles",
    description: "Desi ghee halwas, creamy rasmalai, and sizzling live sweet counters."
  },
  {
    id: "Beverages",
    title: "Refreshing Coolers & Chai",
    icon: "GlassWater",
    description: "Traditional welcome coolers, thick lassis in clay kulhads, and spiced teas."
  }
];

export const sampleMenuItems: MenuItem[] = [
  // Starters
  {
    id: "starter-1",
    name: "Amritsari Paneer Tikka",
    hindiName: "अमृतसरी पनीर टिक्का",
    description: "Cubes of fresh malai paneer marinated in hung curd, yellow mustard, and freshly ground carom seeds, skewered over charcoal.",
    category: "Starters",
    tags: ["Pure Veg", "Chef's Special", "Charcoal Grill"],
    isLiveCounterItem: true
  },
  {
    id: "starter-2",
    name: "Crispy Dahi Ke Kabab",
    hindiName: "दही के कबाब",
    description: "Melt-in-mouth patties made with strained spiced yogurt and cottage cheese, crusted with breadcrumbs and shallow fried to golden perfection.",
    category: "Starters",
    tags: ["Pure Veg", "Crowd Favourite"]
  },
  {
    id: "starter-3",
    name: "Kurkuri Veg Spring Rolls",
    hindiName: "वेज स्प्रिंग रोल",
    description: "Paper-thin pastry rolls stuffed with wok-tossed shredded cabbage, bell peppers, carrots, and glass noodles, served with spicy garlic dip.",
    category: "Starters",
    tags: ["Pure Veg", "Crispy"]
  },
  {
    id: "starter-4",
    name: "Hara Bhara Kebab",
    hindiName: "हरा भरा कबाब",
    description: "Spinach, fresh green peas, and mashed potato medallions spiced with roasted cumin and green chillies, topped with roasted cashew nuts.",
    category: "Starters",
    tags: ["Pure Veg", "Nutritious"]
  },
  {
    id: "starter-5",
    name: "Tandoori Stuffed Soya Chaap",
    hindiName: "तंदूरी सोया चाप",
    description: "Succulent soya chaap stuffed with spiced paneer paste, bathed in red tandoori marinade and charred over live coals.",
    category: "Starters",
    tags: ["Pure Veg", "High Protein", "Tandoori"]
  },

  // Special Counters
  {
    id: "counter-1",
    name: "Royal Live Chaat Kiosk",
    hindiName: "शाही लाइव चाट काउंटर",
    description: "Interactive counter featuring spicy mint pani puri, sweet tamarind water, crispy aloo tikki on cast iron tawa, dahi bhalla, and papdi chaat.",
    category: "Special Counters",
    tags: ["Live Counter", "Delhi-NCR Style", "Crowd Magnet"],
    isLiveCounterItem: true
  },
  {
    id: "counter-2",
    name: "Live Tandoor & Naan Station",
    hindiName: "लाइव तंदूर एवं नान स्टेशन",
    description: "Clay ovens operated live on site, delivering piping hot butter naan, lachha parantha, missi roti, and stuffed kulchas directly to guests' plates.",
    category: "Special Counters",
    tags: ["Live Counter", "Piping Hot"],
    isLiveCounterItem: true
  },
  {
    id: "counter-3",
    name: "Italian Pasta & Bruschetta Counter",
    hindiName: "लाइव पास्ता काउंटर",
    description: "Made-to-order penne and fusilli tossed with choice of creamy Alfredo or tangy Arrabbiata sauces, olives, mushrooms, and sweet corn.",
    category: "Special Counters",
    tags: ["Live Counter", "Youth Favourite"],
    isLiveCounterItem: true
  },
  {
    id: "counter-4",
    name: "Live Hot Jalebi with Rabri",
    hindiName: "लाइव कुरकुरी जलेबी व रबड़ी",
    description: "Crispy spirals of thin jalebi fried live in pure desi ghee, dipped in saffron syrup, served with slow-reduced creamy malai rabri.",
    category: "Special Counters",
    tags: ["Live Counter", "Pure Desi Ghee", "Traditional Hit"],
    isLiveCounterItem: true
  },

  // Main Course
  {
    id: "main-1",
    name: "Dal Makhani (Slow-Simmered)",
    hindiName: "दाल मखनी",
    description: "Whole black urad dal and kidney beans slow-simmered for 14 hours over low flame with fresh cream, white butter, and aromatic spices.",
    category: "Main Course",
    tags: ["Pure Veg", "Signature Dish", "North Indian Classic"]
  },
  {
    id: "main-2",
    name: "Shahi Paneer Lababdar",
    hindiName: "पनीर लबाबदार",
    description: "Fresh cottage cheese simmered in a luscious cashew-tomato gravy infused with cardamom, kasuri methi, and grated paneer.",
    category: "Main Course",
    tags: ["Pure Veg", "Royal Favorite"]
  },
  {
    id: "main-3",
    name: "Pindi Chole Masala",
    hindiName: "पिंडी छोले",
    description: "Authentic dark rustic chickpeas cooked with dried pomegranate seeds, amchur, ginger juliennes, and a traditional spice bouquet.",
    category: "Main Course",
    tags: ["Pure Veg", "Traditional"]
  },
  {
    id: "main-4",
    name: "Navratan Korma",
    hindiName: "नवरत्न कोरमा",
    description: "Medley of seasonal vegetables, paneer cubes, and golden dry fruits in a silky mild saffron-cream sauce.",
    category: "Main Course",
    tags: ["Pure Veg", "Mild & Rich"]
  },
  {
    id: "main-5",
    name: "Dum Aloo Kashmiri",
    hindiName: "दम आलू कश्मीरी",
    description: "Baby potatoes deep-fried and slow-cooked under sealed 'dum' in a fennel-scented, Kashmiri red chilli and curd gravy.",
    category: "Main Course",
    tags: ["Pure Veg", "Aromatic"]
  },

  // Breads & Rice
  {
    id: "bread-1",
    name: "Garlic & Butter Naan",
    hindiName: "गार्लिक बटर नान",
    description: "Soft, pillowy leavened bread baked in the clay oven, brushed with melted dairy butter and roasted minced garlic.",
    category: "Breads & Rice",
    tags: ["Pure Veg", "Oven Fresh"]
  },
  {
    id: "bread-2",
    name: "Laccha Parantha & Missi Roti",
    hindiName: "लच्छा परांठा एवं मिस्सी रोटी",
    description: "Multi-layered flaky whole wheat paranthas alongside gram flour missi rotis kneaded with ajwain and kasuri methi.",
    category: "Breads & Rice",
    tags: ["Pure Veg", "Traditional"]
  },
  {
    id: "bread-3",
    name: "Amritsari Chur-Chur Naan",
    hindiName: "चूर-चूर नान",
    description: "Heavily stuffed potato-paneer naan baked crisp and hand-crushed with extra desi ghee right before serving.",
    category: "Breads & Rice",
    tags: ["Pure Veg", "Desi Ghee Special"]
  },
  {
    id: "bread-4",
    name: "Shahi Zafrani Veg Dum Biryani",
    hindiName: "शाही ज़ाफरानी वेज बिरयानी",
    description: "Long grain aged basmati rice layered with garden vegetables, saffron milk, fried onions (birista), fresh mint, and whole spices.",
    category: "Breads & Rice",
    tags: ["Pure Veg", "Aged Basmati", "Dum Cooked"]
  },
  {
    id: "bread-5",
    name: "Matar Jeera Pulao",
    hindiName: "मटर जीरा पुलाव",
    description: "Basmati rice tempered with roasted cumin seeds, sweet green peas, and whole cloves in fragrant ghee.",
    category: "Breads & Rice",
    tags: ["Pure Veg", "Comfort Classic"]
  },

  // Desserts
  {
    id: "sweet-1",
    name: "Kesariya Rasmalai",
    hindiName: "केसरिया रसमलाई",
    description: "Delicate chenna patties soaked in thick chilled clotted milk infused with Kashmiri saffron strands and slivered pistachios.",
    category: "Desserts",
    tags: ["Pure Veg", "Chilled Delight"]
  },
  {
    id: "sweet-2",
    name: "Warm Gulab Jamun with Silver Vark",
    hindiName: "गरम गुलाब जामुन",
    description: "Traditional mawa dumplings fried to deep mahagony brown and soaked in cardamom-rose scented sugar syrup.",
    category: "Desserts",
    tags: ["Pure Veg", "Warm Favorite"]
  },
  {
    id: "sweet-3",
    name: "Moong Dal Halwa (Desi Ghee)",
    hindiName: "मूंग दाल हलवा",
    description: "Slow-roasted yellow lentils in pure desi ghee, enriched with milk, mawa, green cardamom, and toasted almond flakes.",
    category: "Desserts",
    tags: ["Pure Veg", "Winter Wedding Special", "Pure Desi Ghee"]
  },
  {
    id: "sweet-4",
    name: "Gajar Ka Halwa",
    hindiName: "गाजर का हलवा",
    description: "Seasonal sweet red carrots grated and slow-cooked with whole milk, khoya, raisins, and cashews.",
    category: "Desserts",
    tags: ["Pure Veg", "Seasonal Classic"]
  },

  // Beverages
  {
    id: "drink-1",
    name: "Kulhad Mango & Sweet Lassi",
    hindiName: "कुल्हड़ मैंगो एवं मीठी लस्सी",
    description: "Thick, churned yogurt lassi served in natural clay kulhads, garnished with saffron cream and crushed almonds.",
    category: "Beverages",
    tags: ["Pure Veg", "Traditional Cooler"]
  },
  {
    id: "drink-2",
    name: "Rose Badam Thandai",
    hindiName: "रोज बादाम ठंडाई",
    description: "Festive cooling drink crafted with crushed almonds, rose petals, poppy seeds, fennel, and cold whole milk.",
    category: "Beverages",
    tags: ["Pure Veg", "Aromatic"]
  },
  {
    id: "drink-3",
    name: "Virgin Mint Mojito & Blue Lagoon",
    hindiName: "मिंट मोजिटो एवं कूलर्स",
    description: "Crisp aerated lemon coolers muddled with fresh garden mint sprigs and crushed ice for a modern welcome bar.",
    category: "Beverages",
    tags: ["Refreshing", "Live Bar"]
  },
  {
    id: "drink-4",
    name: "Special Masala Chai & Kulhad Coffee",
    hindiName: "कुल्हड़ मसाला चाय व कॉफ़ी",
    description: "Freshly brewed ginger-cardamom tea and frothy South Indian style coffee served piping hot throughout evening events.",
    category: "Beverages",
    tags: ["Pure Veg", "Hot Beverage"]
  }
];
