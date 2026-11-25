import { SITE } from "@/config/site";
import type { ShopifyProduct } from "@/lib/shopify";
import logo from "@/assets/petalegant-logo.png.asset.json";

/** Public address of the live site — used for canonical links, og:url, sitemap and structured data. */
export const SITE_URL = "https://petalegant-pk.lovable.app";

/** Turn a site path (or already-absolute URL) into an absolute https URL on the public site. */
export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string | undefined;
  type?: "website" | "product" | "article";
}) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: "en_PK" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (path !== undefined) meta.push({ property: "og:url", content: absoluteUrl(path) });
  if (image) {
    const url = absoluteUrl(image);
    meta.push({ property: "og:image", content: url }, { name: "twitter:image", content: url });
  }
  return meta;
}

type JsonLd = Record<string, unknown>;

/** Full head for a page: meta tags, self-referencing canonical, and optional structured data. */
export function pageHead(opts: Parameters<typeof pageMeta>[0] & { path: string; jsonLd?: JsonLd[] }) {
  return {
    meta: pageMeta(opts),
    links: [{ rel: "canonical", href: absoluteUrl(opts.path) }],
    scripts: (opts.jsonLd ?? []).map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionJsonLd(name: string, path: string, products: ShopifyProduct[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.node.title,
        url: absoluteUrl(`/product/${p.node.handle}`),
      })),
    },
  };
}

/** Category page each product type belongs to (for breadcrumbs and internal links). */
export const PRODUCT_TYPE_CATEGORY: Record<string, { name: string; path: "/combos" | "/flower-bouquets" | "/cakes" }> = {
  Combo: { name: "Combos", path: "/combos" },
  Bouquet: { name: "Flower Bouquets", path: "/flower-bouquets" },
  Cake: { name: "Cakes", path: "/cakes" },
};

export const businessJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": ["Florist", "Bakery"],
  "@id": `${SITE_URL}/#business`,
  name: `${SITE.name} ${SITE.tagline}`,
  url: `${SITE_URL}/`,
  logo: absoluteUrl(logo.url),
  image: absoluteUrl(logo.url),
  description:
    "Elegant flower bouquets, celebration cakes and flower + cake combos with delivery across Karachi. Customised cakes and bouquets available.",
  telephone: `+${SITE.whatsappNumber}`,
  priceRange: "PKR 2,500+",
  areaServed: { "@type": "City", name: "Karachi" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [SITE.instagramUrl, SITE.facebookUrl, SITE.tiktokUrl, SITE.linkedinUrl],
};

export const websiteJsonLd: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE.name,
  url: `${SITE_URL}/`,
  inLanguage: "en-PK",
  publisher: { "@id": `${SITE_URL}/#business` },
};
