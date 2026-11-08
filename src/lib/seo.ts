import { SITE } from "@/config/site";

export function pageMeta({
  title,
  description,
  image,
  type = "website",
}: {
  title: string;
  description: string;
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
  if (image) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  return meta;
}

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Florist", "Bakery"],
  name: `${SITE.name} ${SITE.tagline}`,
  description:
    "Elegant flower bouquets, celebration cakes and flower + cake combo deals with delivery across Karachi. Customised cakes and bouquets available.",
  telephone: `+${SITE.whatsappNumber}`,
  priceRange: "PKR 2,500+",
  areaServed: { "@type": "City", name: "Karachi" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [SITE.instagramUrl],
};
