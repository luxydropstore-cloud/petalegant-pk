import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { pageMeta } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

const QUERY = "tag:birthday";

export const Route = createFileRoute("/birthday-specials")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(QUERY)),
  head: () => ({
    meta: pageMeta({
      title: "Birthday Flowers & Cakes Delivery in Karachi | Petalegant",
      description:
        "Send birthday flowers, birthday cakes and flower + cake combos in Karachi. Personalised messages available. Starting from PKR 2,500.",
    }),
  }),
  component: BirthdayPage,
});

function BirthdayPage() {
  return (
    <CollectionPage
      eyebrow="Birthday specials"
      title="Birthday flowers & cakes"
      intro="Bouquets, cakes and combos to make their birthday unforgettable."
      query={QUERY}
    >
      <SeoCopy heading="Birthday gift delivery in Karachi">
        <p>
          Surprise someone special with a birthday bouquet, a personalised birthday cake, or both. Add a
          custom message and we'll take care of the rest — delivered across Karachi.
        </p>
      </SeoCopy>
    </CollectionPage>
  );
}
