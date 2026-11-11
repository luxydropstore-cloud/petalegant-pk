import type { ShopifyProduct } from "@/lib/shopify";
import g1 from "@/assets/gallery/petalegant-1.webp.asset.json";
import g2 from "@/assets/gallery/petalegant-2.webp.asset.json";
import g3 from "@/assets/gallery/petalegant-3.webp.asset.json";
import g4 from "@/assets/gallery/petalegant-4.webp.asset.json";
import g5 from "@/assets/gallery/petalegant-5.webp.asset.json";
import g6 from "@/assets/gallery/petalegant-6.webp.asset.json";
import g7 from "@/assets/gallery/petalegant-7.webp.asset.json";
import comboRedRoses from "@/assets/combos/combo-red-roses-chocolate.webp.asset.json";
import comboSingleRose from "@/assets/combos/combo-single-rose-chocolate.webp.asset.json";
import comboSunflower from "@/assets/combos/combo-sunflower-floral-cake.webp.asset.json";

/**
 * The owner's own designs, shown whenever the Shopify store has no products.
 * Ordering for these goes through WhatsApp only (no variants, so no online cart).
 */
interface CatalogItem {
  handle: string;
  title: string;
  type: "Combo" | "Bouquet" | "Cake";
  tags: string[];
  image: string;
  alt: string;
  description: string;
}

const ITEMS: CatalogItem[] = [
  {
    handle: "red-roses-chocolate-cake-combo",
    title: "Red Roses & Chocolate Cake Combo",
    type: "Combo",
    tags: ["combo", "birthday", "anniversary"],
    image: comboRedRoses.url,
    alt: "Red roses bouquet and chocolate birthday cake combo by Petalegant",
    description:
      "A lush red roses bouquet in black wrap with a satin ribbon, paired with a rich chocolate cake and Happy Birthday topper. Our signature flowers + cake gift.",
  },
  {
    handle: "single-rose-chocolate-cake-combo",
    title: "Single Rose & Chocolate Cake Combo",
    type: "Combo",
    tags: ["combo", "birthday"],
    image: comboSingleRose.url,
    alt: "Single red rose bouquet and chocolate birthday cake combo by Petalegant",
    description:
      "A single red rose with baby's breath in cream wrap, paired with a chocolate cake and Happy Birthday topper — simple, sweet and thoughtful.",
  },
  {
    handle: "sunflower-floral-cake-combo",
    title: "Sunflower & Floral Cake Combo",
    type: "Combo",
    tags: ["combo", "birthday"],
    image: comboSunflower.url,
    alt: "Sunflower bouquet and floral birthday cake combo by Petalegant",
    description:
      "Bright sunflowers in a black-and-gold wrap, paired with a hand-piped floral cake and Happy Birthday topper.",
  },
  {
    handle: "classic-red-roses-bouquet",
    title: "Classic Red Roses Bouquet",
    type: "Bouquet",
    tags: ["bouquet", "anniversary"],
    image: g1.url,
    alt: "Red roses bouquet in black wrap by Petalegant",
    description:
      "A bold bouquet of fresh red roses, wrapped in elegant black paper with a ribbon. Perfect for anniversaries and 'just because'.",
  },
  {
    handle: "sunshine-sunflower-bouquet",
    title: "Sunshine Sunflower Bouquet",
    type: "Bouquet",
    tags: ["bouquet", "birthday"],
    image: g2.url,
    alt: "Sunflower bouquet with baby's breath by Petalegant",
    description:
      "Cheerful sunflowers with baby's breath in a black wrap — a bright, happy gift for birthdays and congratulations.",
  },
  {
    handle: "blush-pink-roses-bouquet",
    title: "Blush Pink Roses Bouquet",
    type: "Bouquet",
    tags: ["bouquet", "birthday", "anniversary"],
    image: g3.url,
    alt: "Pink roses bouquet by Petalegant",
    description: "Soft pink roses wrapped in black and pink with a matching ribbon — sweet, romantic and elegant.",
  },
  {
    handle: "happy-birthday-my-love-cake",
    title: "Happy Birthday My Love Cake & Cupcakes",
    type: "Cake",
    tags: ["cake", "birthday", "anniversary"],
    image: g4.url,
    alt: "Happy Birthday My Love cake with cupcakes by Petalegant",
    description:
      "A heart-topped celebration cake with cupcakes, a personalised calendar date and a 'Happy Birthday My Love' message. Fully customisable.",
  },
  {
    handle: "bride-to-be-cake",
    title: "Bride To Be Cake",
    type: "Cake",
    tags: ["cake"],
    image: g5.url,
    alt: "Bride to be custom cake by Petalegant",
    description:
      "A custom bridal-shower cake with a bride figure and lavender florals. Name and colours can be customised.",
  },
  {
    handle: "initials-floral-celebration-cake",
    title: "Initials Floral Celebration Cake",
    type: "Cake",
    tags: ["cake", "anniversary"],
    image: g6.url,
    alt: "White initials cake with roses by Petalegant",
    description:
      "An elegant white cake with pearl detailing, white roses and gold initials — ideal for anniversaries, nikkah and engagements.",
  },
  {
    handle: "pink-bow-pearl-cake",
    title: "Pink Bow Pearl Cake",
    type: "Cake",
    tags: ["cake", "birthday"],
    image: g7.url,
    alt: "Pink bow cake with pearls by Petalegant",
    description: "A pretty pink bow cake finished with pearls — a playful, elegant choice for birthdays.",
  },
];

function toProduct(item: CatalogItem): ShopifyProduct {
  return {
    node: {
      id: `local:${item.handle}`,
      title: item.title,
      description: item.description,
      handle: item.handle,
      productType: item.type,
      tags: item.tags,
      priceRange: { minVariantPrice: { amount: "0", currencyCode: "PKR" } },
      images: { edges: [{ node: { url: item.image, altText: item.alt } }] },
      variants: { edges: [] },
      options: [],
    },
  };
}

export const LOCAL_PRODUCTS: ShopifyProduct[] = ITEMS.map(toProduct);

/** Supports the simple queries the shop pages use: "tag:x" and "product_type:X". */
export function filterLocalProducts(query?: string | null): ShopifyProduct[] {
  if (!query) return LOCAL_PRODUCTS;
  const [field, raw] = query.split(":");
  const value = (raw ?? "").trim().toLowerCase();
  if (field === "tag") return LOCAL_PRODUCTS.filter((p) => p.node.tags.includes(value));
  if (field === "product_type") return LOCAL_PRODUCTS.filter((p) => p.node.productType.toLowerCase() === value);
  return LOCAL_PRODUCTS;
}

export function findLocalProduct(handle: string): ShopifyProduct | null {
  return LOCAL_PRODUCTS.find((p) => p.node.handle === handle) ?? null;
}
