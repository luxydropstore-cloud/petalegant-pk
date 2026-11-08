import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { cartOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { SITE } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function CartDrawer() {
  const { items, isLoading, isSyncing, isOpen, setOpen, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setOpen(false);
    }
  };

  const handleWhatsApp = () => {
    const message = cartOrderMessage(
      items.map((i) => ({
        title: i.product.node.title,
        quantity: i.quantity,
        option: i.variantTitle !== "Default Title" ? i.variantTitle : null,
      })),
    );
    window.open(whatsappUrl(message), "_blank");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Open cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-soft hover:text-primary"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-medium text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col bg-background sm:max-w-md">
        <SheetHeader className="flex-shrink-0 text-left">
          <SheetTitle className="font-display text-3xl font-semibold text-primary-deep">Your order</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Your cart is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} · prices confirmed on WhatsApp`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col pt-4">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-12 w-12 text-primary/30" strokeWidth={1.2} />
              <p className="text-muted-foreground">Nothing here yet.</p>
              <Button variant="heroOutline" asChild onClick={() => setOpen(false)}>
                <Link to="/shop">Explore the collection</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex gap-4 py-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-display text-lg font-semibold">{item.product.node.title}</h4>
                        {item.variantTitle !== "Default Title" && (
                          <p className="text-sm text-muted-foreground">
                            {item.selectedOptions.map((o) => o.value).join(" · ")}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Remove item"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0 space-y-3 border-t bg-background pt-4">
                <p className="text-sm text-muted-foreground">
                  Starting from {SITE.startingPrice}. Message us for the exact price and {SITE.city} delivery.
                </p>
                <Button variant="whatsapp" size="xl" className="w-full" onClick={handleWhatsApp}>
                  <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
                </Button>
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4" /> Checkout online
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
