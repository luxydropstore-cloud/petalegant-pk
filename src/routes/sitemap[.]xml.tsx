import { createFileRoute } from "@tanstack/react-router";
import { fetchProducts } from "@/lib/shopify";

const STATIC_PATHS = [
  "/",
  "/shop",
  "/combos",
  "/flower-bouquets",
  "/cakes",
  "/birthday-specials",
  "/anniversary-specials",
  "/custom-orders",
  "/contact",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const products = await fetchProducts(undefined, 250);
        const urls = [
          ...STATIC_PATHS.map((p) => `${origin}${p}`),
          ...products.map((p) => `${origin}/product/${p.node.handle}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
