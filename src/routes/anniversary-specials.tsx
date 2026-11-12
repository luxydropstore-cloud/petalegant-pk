import { createFileRoute } from "@tanstack/react-router";
import { productsQueryOptions } from "@/lib/shopify";
import { breadcrumbJsonLd, collectionJsonLd, pageHead } from "@/lib/seo";
import { CollectionPage, SeoCopy } from "@/components/site/CollectionPage";

const QUERY = "tag:anniversary";

export const Route = createFileRoute("/anniversary-specials")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(QUERY)),
  head: ({ loaderData }) =>
    pageHead({
      title: "Anniversary Flowers & Cakes in Karachi | Red Roses | Petalegant",
      description:
        "Romantic anniversary bouquets, red roses and anniversary cakes delivered in Karachi. Starting from PKR 2,500. Customised designs available.",
      path: "/anniversary-specials",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Anniversary Specials", path: "/anniversary-specials" },
        ]),
        collectionJsonLd("Anniversary Specials", "/anniversary-specials", loaderData ?? []),
      ],
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
