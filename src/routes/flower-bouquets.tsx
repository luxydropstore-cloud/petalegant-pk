import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { breadcrumbJsonLd, collectionJsonLd, pageHead } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

const QUERY = "product_type:Bouquet";

export const Route = createFileRoute("/flower-bouquets")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(QUERY)),
  head: ({ loaderData }) =>
    pageHead({
      title: "Flower Bouquets Delivery in Karachi | Roses & More | Petalegant",
      description:
        "Elegant hand-wrapped flower bouquets in Karachi — red roses, pink roses, sunflowers and more. Starting from PKR 2,500. Custom bouquets available.",
      path: "/flower-bouquets",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flower Bouquets", path: "/flower-bouquets" },
        ]),
        collectionJsonLd("Flower Bouquets", "/flower-bouquets", loaderData ?? []),
      ],
    }),
  component: BouquetsPage,
});

function BouquetsPage() {
  return (
    <CollectionPage
      eyebrow="Fresh flowers"
      title="Flower bouquets"
      intro="Hand-wrapped bouquets of roses, sunflowers and seasonal blooms, arranged with care for every occasion."
      query={QUERY}
    >
      <SeoCopy heading="Fresh flower bouquets, delivered in Karachi">
        <p>
          From classic red roses to cheerful sunflowers, Petalegant bouquets are hand-arranged and
          beautifully wrapped. Choose a design from our collection or ask for a custom bouquet in your
          favourite colours.
        </p>
      </SeoCopy>
    </CollectionPage>
  );
}
