import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { pageMeta } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

const QUERY = "product_type:Cake";

export const Route = createFileRoute("/cakes")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(QUERY)),
  head: () => ({
    meta: pageMeta({
      title: "Custom Cakes in Karachi | Birthday & Celebration Cakes | Petalegant",
      description:
        "Beautiful birthday, bridal and celebration cakes in Karachi. Personalised designs and messages available. Starting from PKR 2,500 — DM for price.",
    }),
  }),
  component: CakesPage,
});

function CakesPage() {
  return (
    <CollectionPage
      eyebrow="Celebration cakes"
      title="Cakes"
      intro="Elegant cakes for birthdays, bridal showers, nikkah and anniversaries — personalised just for you."
      query={QUERY}
    >
      <SeoCopy heading="Customised cakes in Karachi">
        <p>
          Every Petalegant cake can be personalised with your message, colours, initials or theme. Share
          your idea on WhatsApp and we'll design a cake for your celebration, delivered in Karachi.
        </p>
      </SeoCopy>
    </CollectionPage>
  );
}
