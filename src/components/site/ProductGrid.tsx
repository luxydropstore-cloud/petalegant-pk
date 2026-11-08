import type { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Leaf } from "./Leaf";

export function ProductGrid({ products, columns = 3 }: { products: ShopifyProduct[]; columns?: 3 | 4 }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-primary/25 bg-secondary px-6 py-16 text-center">
        <Leaf className="h-6 w-6" />
        <p className="mt-4 font-display text-2xl text-primary-deep">No products found</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          New arrangements are on their way. Message us on WhatsApp for today's designs.
        </p>
      </div>
    );
  }
  return (
    <div
      className={`grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
    >
      {products.map((p, i) => (
        <ProductCard key={p.node.id} product={p} priority={i < 3} />
      ))}
    </div>
  );
}
