import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronRight, Loader2, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { productQueryOptions } from "@/lib/shopify";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/config/site";
import { useCartStore } from "@/stores/cartStore";
import { productOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Leaf } from "@/components/site/Leaf";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData(productQueryOptions(params.handle));
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable | Petalegant" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.node;
    const image = p.images.edges[0]?.node?.url;
    const description =
      (p.description || `${p.title} by Petalegant`).slice(0, 150) + ` Delivery in ${SITE.city}.`;
    return {
      meta: pageMeta({ title: `${p.title} | Petalegant Karachi`, description, image, type: "product" }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            description: p.description,
            image: p.images.edges.map((e) => e.node.url),
            brand: { "@type": "Brand", name: SITE.name },
            category: p.productType,
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data } = useSuspenseQuery(productQueryOptions(handle));
  const product = data!;
  const p = product.node;
  const variants = p.variants.edges.map((e) => e.node);
  const [variantId, setVariantId] = useState(variants[0]?.id);
  const [activeImage, setActiveImage] = useState(0);
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const hasOptions = variants.length > 1;

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
    window.open(
      whatsappUrl(
        productOrderMessage({
          title: p.title,
          option: hasOptions ? variant?.title : null,
          url: window.location.href,
        }),
      ),
      "_blank",
    );
  };

  const images = p.images.edges.map((e) => e.node);

  return (
    <div className="container-page py-8 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{p.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
            {images[activeImage] && (
              <img
                src={images[activeImage].url}
                alt={images[activeImage].altText ?? p.title}
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-20 w-20 overflow-hidden rounded-md border-2 ${i === activeImage ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:pt-4">
          <p className="eyebrow flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5" /> {p.productType || SITE.name}
          </p>
          <h1 className="mt-3 text-4xl text-primary-deep md:text-5xl">{p.title}</h1>
          <p className="mt-4 inline-flex rounded-full bg-primary-soft px-4 py-1.5 text-sm font-medium text-primary-deep">
            DM for price
          </p>

          {p.description && <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>}

          {hasOptions && (
            <div className="mt-8">
              <p className="text-sm font-medium">{p.options[0]?.name ?? "Option"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    disabled={!v.availableForSale}
                    className={`rounded-full border px-5 py-2 text-sm transition-colors disabled:opacity-40 ${
                      v.id === variant?.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="whatsapp" size="xl" className="flex-1" onClick={handleOrder}>
              <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
            </Button>
            <Button variant="heroOutline" size="xl" className="flex-1" onClick={handleAdd} disabled={isLoading || !variant}>
              {isLoading ? <Loader2 className="animate-spin" /> : <><ShoppingBag /> Add to cart</>}
            </Button>
          </div>

          <ul className="mt-10 space-y-4 border-t border-border pt-8 text-sm text-foreground/80">
            <li className="flex gap-3">
              <Truck className="h-5 w-5 flex-shrink-0 text-primary" strokeWidth={1.5} />
              <span>Delivery available within {SITE.city} only.</span>
            </li>
            <li className="flex gap-3">
              <Sparkles className="h-5 w-5 flex-shrink-0 text-primary" strokeWidth={1.5} />
              <span>
                Want a different colour, size or message? This design can be customised —{" "}
                <Link to="/custom-orders" className="text-primary underline-offset-4 hover:underline">
                  ask about custom orders
                </Link>
                .
              </span>
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Prices start from {SITE.startingPrice}. Message us on WhatsApp for the exact price of this design.
          </p>
        </div>
      </div>
    </div>
  );
}
