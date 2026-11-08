import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/lib/shopify";
import { SITE } from "@/config/site";
import { ProductGrid } from "./ProductGrid";
import { SectionHeading } from "./SectionHeading";
import { CustomOrderBanner } from "./HomeSections";

export const COLLECTION_FILTERS = [
  { to: "/shop", label: "All" },
  { to: "/combos", label: "Combos" },
  { to: "/flower-bouquets", label: "Bouquets" },
  { to: "/cakes", label: "Cakes" },
  { to: "/birthday-specials", label: "Birthday" },
  { to: "/anniversary-specials", label: "Anniversary" },
] as const;

export function CollectionPage({
  eyebrow,
  title,
  intro,
  query,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  query?: string;
  children?: ReactNode;
}) {
  const { data: products } = useSuspenseQuery(productsQueryOptions(query));
  return (
    <>
      <section className="bg-secondary">
        <div className="container-page py-14 md:py-20">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} />
          <p className="mt-4 text-center text-sm tracking-wide text-primary">
            Starting from {SITE.startingPrice} · DM for price
          </p>
        </div>
      </section>

      <section className="container-page py-10 md:py-14">
        <nav aria-label="Filter by category" className="-mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-2">
          {COLLECTION_FILTERS.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="flex-shrink-0 rounded-full border border-border px-5 py-2 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-primary"
              activeProps={{ className: "border-primary bg-primary text-primary-foreground hover:text-primary-foreground" }}
            >
              {f.label}
            </Link>
          ))}
        </nav>
        <ProductGrid products={products} />
      </section>

      {children && <section className="container-page pb-16">{children}</section>}

      <CustomOrderBanner />
    </>
  );
}

export function SeoCopy({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl border-t border-border pt-12 text-[0.95rem] leading-relaxed text-muted-foreground">
      <h2 className="text-3xl text-primary-deep">{heading}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
