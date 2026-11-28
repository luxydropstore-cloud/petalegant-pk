import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { productsQueryOptions } from "@/lib/shopify";
import { businessJsonLd, pageHead, websiteJsonLd } from "@/lib/seo";
import heroImage from "@/assets/combos/combo-red-roses-chocolate.webp.asset.json";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/site/ProductGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  CustomOrderBanner,
  Hero,
  HowToOrder,
  InstagramSection,
  ShopByCategory,
  SpecialMoments,
  WhyChoose,
} from "@/components/site/HomeSections";

const COMBOS_QUERY = "tag:combo";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions(COMBOS_QUERY)),
  head: () =>
    pageHead({
      title: "Petalegant | Flower Bouquets, Cakes & Combos Delivered in Karachi",
      description:
        "Order elegant flower bouquets, celebration cakes and flower + cake combos in Karachi. Starting from PKR 2,500. Customised cakes & bouquets available — order on WhatsApp.",
      path: "/",
      image: heroImage.url,
      jsonLd: [businessJsonLd, websiteJsonLd],
    }),
  component: Index,
});

function BestsellingCombos() {
  const { data: products } = useSuspenseQuery(productsQueryOptions(COMBOS_QUERY));
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow="Bestselling combos"
          title="Flowers & cake, perfectly paired"
          intro="Our most-loved combos  a bouquet and a cake in one thoughtful gift. Starting from PKR 2,500."
        />
        <Button variant="heroOutline" size="lg" asChild>
          <Link to="/combos">
            View all combos <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="mt-12">
        <ProductGrid products={products.slice(0, 6)} />
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <div className="border-b border-border bg-secondary">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-xs text-primary-deep">
          <span>Flowers & cakes · Karachi</span>
          <span>Starting from PKR 2,500</span>
          <span>Customised cakes & bouquets available</span>
        </div>
      </div>
      <ShopByCategory />
      <BestsellingCombos />
      <WhyChoose />
      <SpecialMoments />
      <CustomOrderBanner />
      <HowToOrder />
      <InstagramSection />
    </>
  );
}
