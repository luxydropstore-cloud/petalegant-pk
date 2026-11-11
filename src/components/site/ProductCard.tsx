import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { productOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ProductCard({ product, priority = false }: { product: ShopifyProduct; priority?: boolean }) {
  const p = product.node;
  const image = p.images.edges[0]?.node;
  const variant = p.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setOpen = useCartStore((s) => s.setOpen);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${p.title} added to your order`, { position: "top-center" });
    setOpen(true);
  };

  const handleOrder = () => {
    const url = `${window.location.origin}/product/${p.handle}`;
    window.open(whatsappUrl(productOrderMessage({ title: p.title, url })), "_blank");
  };

  return (
    <article className="group flex flex-col">
      <Link
        to="/product/$handle"
        params={{ handle: p.handle }}
        className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-secondary"
      >
        {image && (
          <img
            src={image.url.startsWith("https://cdn.shopify.com") ? `${image.url}${image.url.includes("?") ? "&" : "?"}width=700` : image.url}
            alt={image.altText ?? p.title}
            loading={priority ? "eager" : "lazy"}
            width={700}
            height={875}
            className="img-zoom h-full w-full object-cover group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] tracking-[0.18em] text-primary uppercase backdrop-blur-sm">
          {p.productType || "Petalegant"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-xl leading-snug font-semibold md:text-[1.4rem]">
          <Link to="/product/$handle" params={{ handle: p.handle }} className="hover:text-primary">
            {p.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium tracking-wide text-primary">DM for price</p>
        <div className="mt-4 flex items-center gap-2">
          <Button variant="heroOutline" size="sm" className="h-10 flex-1 px-3" asChild>
            <Link to="/product/$handle" params={{ handle: p.handle }}>
              View Details
            </Link>
          </Button>
          <Button variant="whatsapp" size="sm" className="h-10 flex-1 px-3" onClick={handleOrder}>
            <WhatsAppIcon /> Order Now
          </Button>
          {variant && (
          <Button
            variant="soft"
            size="icon"
            className="h-10 w-10 flex-shrink-0"
            aria-label={`Add ${p.title} to cart`}
            onClick={handleAdd}
            disabled={isLoading || !variant}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingBag />}
          </Button>
          )}
        </div>
      </div>
    </article>
  );
}
