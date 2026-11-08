import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { pageMeta } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

const QUERY = "tag:combo";

export const Route = createFileRoute("/combos")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(QUERY)),
  head: () => ({
    meta: pageMeta({
      title: "Flower & Cake Combo Deals in Karachi | Petalegant",
      description:
        "Affordable flower + cake combos in Karachi — a fresh bouquet paired with a delicious cake. Starting from PKR 2,500. Order on WhatsApp.",
    }),
  }),
  component: CombosPage,
});

function CombosPage() {
  return (
    <CollectionPage
      eyebrow="Flower + cake combos"
      title="Combos"
      intro="A beautiful bouquet and a delicious cake, paired together in one thoughtful, affordable gift."
      query={QUERY}
    >
      <SeoCopy heading="Flower and cake delivery in Karachi">
        <p>
          Our combos are the easiest way to send flowers and cake together in Karachi. Each combo pairs a
          hand-wrapped bouquet with a celebration cake — perfect for birthdays, anniversaries and
          surprise deliveries.
        </p>
        <p>Want a different cake flavour or flower colour? Message us and we'll customise your combo.</p>
      </SeoCopy>
    </CollectionPage>
  );
}
