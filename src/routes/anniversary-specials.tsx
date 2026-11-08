import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { pageMeta } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

const QUERY = "tag:anniversary";

export const Route = createFileRoute("/anniversary-specials")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(QUERY)),
  head: () => ({
    meta: pageMeta({
      title: "Anniversary Flowers & Cakes in Karachi | Red Roses | Petalegant",
      description:
        "Romantic anniversary bouquets, red roses and anniversary cakes delivered in Karachi. Starting from PKR 2,500. Customised designs available.",
    }),
  }),
  component: AnniversaryPage,
});

function AnniversaryPage() {
  return (
    <CollectionPage
      eyebrow="Anniversary specials"
      title="Anniversary flowers & cakes"
      intro="Red roses, elegant cakes and romantic combos to celebrate your story."
      query={QUERY}
    >
      <SeoCopy heading="Anniversary gifts delivered in Karachi">
        <p>
          Celebrate another year together with red roses, an initials cake or a flower and cake combo.
          Tell us your date and message — we'll make it personal.
        </p>
      </SeoCopy>
    </CollectionPage>
  );
}
