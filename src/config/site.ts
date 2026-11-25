// Business details shown across the site. Edit here to update everywhere.
export const SITE = {
  name: "Petalegant",
  tagline: "Cakes & Bouquets",
  city: "Karachi",
  startingPrice: "PKR 2,500",
  whatsappNumber: "923498731734", // digits only, international format
  whatsappDisplay: "+92 349 8731734",
  instagramHandle: "petalegant.pk",
  instagramUrl: "https://www.instagram.com/petalegant.pk/",
  facebookUrl: "https://www.facebook.com/petalegant.pk/",
  tiktokUrl: "https://www.tiktok.com/@petalegant.pk",
  linkedinUrl: "https://www.linkedin.com/company/petalegant",
} as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop All" },
  { to: "/flower-bouquets", label: "Flower Bouquets" },
  { to: "/cakes", label: "Cakes" },
  { to: "/combos", label: "Combos" },
  { to: "/contact", label: "Contact" },
] as const;
