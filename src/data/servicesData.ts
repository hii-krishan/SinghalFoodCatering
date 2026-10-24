export interface CateringServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  features: string[];
  image: string;
  categoryTag: string;
  recommendedGuestSize: string;
  popularItemsHint: string;
}

export const servicesData: CateringServiceItem[] = [
  {
    id: "weddings-receptions",
    title: "Weddings & Grand Receptions",
    shortDescription: "Regal culinary spreads featuring multi-course royal buffets, welcoming beverage bars, live tandoor and chaat counters, and decadent traditional dessert stations.",
    features: [
      "Lavish Multi-Course Buffet Setup",
      "Live Chaat, Tandoor & Pasta Counters",
      "Traditional Mithai & Warm Halwa Stations",
      "Uniformed Hospitality & Table Attendants"
    ],
    image: "/images/wedding_buffet.jpg",
    categoryTag: "Flagship Service",
    recommendedGuestSize: "200 to 2,000+ Guests",
    popularItemsHint: "Dal Makhani, Shahi Paneer, Live Jalebi-Rabri, Assorted Naans"
  },
  {
    id: "engagements-roka",
    title: "Engagements & Roka Ceremonies",
    shortDescription: "Celebrate the union of two families with an intimate, elegant feast. Curated starters, signature mocktails, and tasteful seated or floating buffet arrangements.",
    features: [
      "Handcrafted Finger Foods & Starters",
      "Chilled Welcome Coolers & Mocktails",
      "Interactive Food Displays",
      "Customized Family Taste Palette"
    ],
    image: "/images/starters_platter.jpg",
    categoryTag: "Pre-Wedding",
    recommendedGuestSize: "75 to 350 Guests",
    popularItemsHint: "Paneer Tikka, Dahi Ke Kebab, Stuffed Kulcha, Kesariya Kheer"
  },
  {
    id: "birthday-celebrations",
    title: "Birthday Celebrations & Milestones",
    shortDescription: "Vibrant, fun-filled food catering tailored for all generations. From live street-food counters and kids' favourites to comforting classics for elders.",
    features: [
      "Live Gol Gappe & Chaat Kiosks",
      "Continental Starters & Sliders",
      "Special Dessert & Mocktail Station",
      "Flexible Timing & Quick Setup"
    ],
    image: "/images/live_chaat.jpg",
    categoryTag: "Joyful Moments",
    recommendedGuestSize: "30 to 250 Guests",
    popularItemsHint: "Pav Bhaji, Samosa Chaat, Fresh Shakes, Gulab Jamun"
  },
  {
    id: "family-functions",
    title: "Family Functions & Housewarmings",
    shortDescription: "Warm, heartwarming feasts for Griha Pravesh, Anniversaries, Kua Pujan, and family reunions. Clean, pure vegetarian culinary preparations that feel just like home.",
    features: [
      "Pure Vegetarian / Jain Options",
      "Traditional North Indian Thali Setup",
      "Homestyle Comfort with Festive Flair",
      "Punctual Delivery & Courteous Attendants"
    ],
    image: "/images/hero_feast.jpg",
    categoryTag: "Tradition & Warmth",
    recommendedGuestSize: "50 to 300 Guests",
    popularItemsHint: "Kadhai Paneer, Pindi Chole, Poori-Kachori, Moong Dal Halwa"
  },
  {
    id: "corporate-events",
    title: "Corporate Events & Conferences",
    shortDescription: "Sleek, punctual, and professional catering for seminars, executive lunches, annual meetings, and dealer meets across Sonipat and NCR industrial corridors.",
    features: [
      "Executive Boxed or Buffet Lunches",
      "All-Day High Tea & Snack Breaks",
      "Punctual Timelines & Crisp Presentation",
      "Dietary Segregation & Nutritious Salads"
    ],
    image: "/images/corporate_spread.jpg",
    categoryTag: "Professional",
    recommendedGuestSize: "40 to 600 Guests",
    popularItemsHint: "Gourmet Wraps, Dal Tadka, Jeera Pulao, Seasonal Fruit Platter"
  },
  {
    id: "festival-celebrations",
    title: "Festival Celebrations & Pujas",
    shortDescription: "Auspicious food preparations for Navratri, Diwali gatherings, Holi milans, and Janmashtami. Cooked with reverence, pure desi ghee, and sattvic ingredients on request.",
    features: [
      "Desi Ghee Delicacies",
      "Sattvic & Falahari Options",
      "Traditional Copper & Brass Serving Utensils",
      "Authentic Festive Flavours"
    ],
    image: "/images/desserts_platter.jpg",
    categoryTag: "Auspicious Occasions",
    recommendedGuestSize: "50 to 500 Guests",
    popularItemsHint: "Bedmi Poori, Aloo Sabzi, Sabudana Tikki, Kaju Katli"
  },
  {
    id: "outdoor-lawn-catering",
    title: "Outdoor Lawn & Farmhouse Catering",
    shortDescription: "Complete mobile catering setup for farmhouse parties, open lawn ceremonies, and shamiana gatherings in Ganaur, Sonipat, and Murthal outskirts.",
    features: [
      "Full Mobile Kitchen Infrastructure",
      "Fairy-Lit Canopies & Serving Tents",
      "Heavy-Duty Tandoors & Live Flame Woks",
      "Waste Management & Spotless Cleanliness"
    ],
    image: "/images/outdoor_lawn.jpg",
    categoryTag: "Open Air & Farmhouses",
    recommendedGuestSize: "150 to 1,500+ Guests",
    popularItemsHint: "Live Tawa Veg, Roomali Roti, Sizzling Sizzlers, Badam Milk"
  },
  {
    id: "special-occasions",
    title: "High-Tea & Custom Gathering Counter",
    shortDescription: "Bespoke catering for kitty parties, baby showers, retirement felicitation, and intimate garden gatherings with artisanal teas, coolers, and savoury bites.",
    features: [
      "Artisanal Chai & Beverage Counters",
      "Bespoke Canape & Savoury Starters",
      "Light Elegant Afternoon Menus",
      "Chic Crockery & Elegant Presentation"
    ],
    image: "/images/drinks_bar.jpg",
    categoryTag: "Bespoke Gathering",
    recommendedGuestSize: "25 to 150 Guests",
    popularItemsHint: "Kulhad Chai, Mango Lassi, Paneer Canapes, Fresh Bakery Bites"
  }
];
