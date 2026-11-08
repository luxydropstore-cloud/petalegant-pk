import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { pageMeta } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

export const Route = createFileRoute("/shop")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions()),
  head: () => ({
    meta: pageMeta({
      title: "Shop Flowers, Cakes & Combos in Karachi | Petalegant",
      description:
        "Browse Petalegant's full collection of flower bouquets, celebration cakes and flower + cake combos. Delivery across Karachi, starting from PKR 2,500.",
    }),
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <CollectionPage
      eyebrow="The collection"
      title="Shop all"
      intro="Every bouquet, cake and combo in one place — filter by category or occasion to find the perfect gift."
    >
      <SeoCopy heading="Flowers and cakes delivered in Karachi">
        <p>
          Petalegant brings together fresh flower bouquets and beautifully decorated cakes, so you can
          send one thoughtful gift for birthdays, anniversaries, bridal showers and everyday surprises.
          Every order is delivered within Karachi.
        </p>
        <p>
          Can't find exactly what you're looking for? We also create customised cakes and bouquets —
          just send us your idea on WhatsApp.
        </p>
      </SeoCopy>
    </CollectionPage>
  );
}
