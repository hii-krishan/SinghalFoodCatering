export interface ContactConfig {
  /**
   * Set to true once the business owner provides their confirmed phone number.
   * If false, the UI displays clear, helpful prompts to request contact or submit via the enquiry form.
   */
  isPhoneConfigured: boolean;
  phoneNumber: string; // e.g. "+919812345678"
  displayPhone: string; // e.g. "+91 98123 45678"
  secondaryPhone: string;
  displaySecondaryPhone: string;

  /**
   * Set to true once the confirmed WhatsApp business number is configured.
   */
  isWhatsAppConfigured: boolean;
  whatsappNumber: string; // e.g. "919812345678" without plus or spaces for wa.me link
  secondaryWhatsappNumber: string;
  whatsappDefaultMessage: string;

  /**
   * Physical / registered service base
   */
  city: string;
  district: string;
  state: string;
  country: string;
  serviceRegions: string[];
}

export interface AboutConfig {
  businessName: string;
  tagline: string;
  introduction: string;
  philosophy: string;
  prepPromise: string;
  teamProcess: string;
  corePillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  contact: ContactConfig;
  about: AboutConfig;
  quoteDisclaimer: string;
}

export const siteConfig: SiteConfig = {
  brandName: "Singhal Food Catering",
  tagline: "Good Food. Great Gatherings. Unforgettable Celebrations.",
  heroHeadline: "Good Food. Great Gatherings. Unforgettable Celebrations.",
  heroSubheadline: "Making every occasion more special with food made for sharing.",
  
  contact: {
    // Owner can easily set these two flags to true and update their numbers below:
    isPhoneConfigured: true, 
    phoneNumber: "+919996199051", // Primary phone number
    displayPhone: "+91 99961 99051",
    secondaryPhone: "+919896489051", // Secondary phone number
    displaySecondaryPhone: "+91 98964 89051",
    
    isWhatsAppConfigured: true,
    whatsappNumber: "919996199051", // Primary WhatsApp number
    secondaryWhatsappNumber: "919896489051", // Secondary WhatsApp number
    whatsappDefaultMessage: "Hello Singhal Food Catering! I would like to inquire about catering services for my upcoming event in Ganaur/Sonipat.",

    city: "Ganaur",
    district: "Sonipat",
    state: "Haryana",
    country: "India",
    serviceRegions: [
      "Ganaur",
      "Sonipat City",
      "Murthal",
      "Rai",
      "Kundli",
      "Samalkha",
      "Panipat Border",
      "Surrounding Haryana Regions"
    ]
  },

  about: {
    businessName: "Singhal Food Catering",
    tagline: "Rooted in Haryana's hospitable food traditions, crafted for memorable gatherings.",
    introduction: "Singhal Food Catering was founded with a single passion: to bring families and communities together over genuinely delicious, lovingly prepared food. Based in Ganaur and actively catering throughout Sonipat and nearby Haryana, we take pride in personal attention to every celebration.",
    philosophy: "We believe true hospitality begins in the kitchen. Every ingredient is hand-selected, every gravy slow-simmered, and every counter designed to bring warmth, joy, and rich North Indian flavors to your guests.",
    prepPromise: "Strict cleanliness standards, fresh daily sourcing of dairy and vegetables, pure vegetarian prep options, and on-site live cooking ensure that your food is served hot, crisp, and bursting with authentic aroma.",
    teamProcess: "From initial menu consultation to live counter execution on your event day, our dedicated team handles every detail with respectful hospitality and polished service.",
    corePillars: [
      {
        title: "Pure Quality & Fresh Sourcing",
        description: "Fresh daily paneer, high-grade spices, and cold-pressed oils. No compromises on taste, cleanliness, or hygiene.",
        icon: "ShieldCheck"
      },
      {
        title: "Live Interactive Cooking",
        description: "Crispy hot tandoori rotis, sizzling chaat counters, and fresh jalebis made right in front of your guests.",
        icon: "Flame"
      },
      {
        title: "Tailored to Your Gathering",
        description: "Whether an intimate family puja of 50 or a royal wedding of 1,500, our menus and setups are tailored to your vision.",
        icon: "Users"
      },
      {
        title: "Respectful Service Staff",
        description: "Uniformed, courteous, and attentive catering staff dedicated to making every guest feel truly cherished.",
        icon: "HeartHandshake"
      }
    ]
  },

  quoteDisclaimer: "Every celebration is different. Call us to discuss your menu and receive a customised catering quote."
};
