import { createFileRoute } from "@tanstack/react-router";
import { Palette, MessageSquareHeart, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/config/site";
import { customOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import g3 from "@/assets/gallery/petalegant-3.webp.asset.json";
import g4 from "@/assets/gallery/petalegant-4.webp.asset.json";
import g5 from "@/assets/gallery/petalegant-5.webp.asset.json";
import g6 from "@/assets/gallery/petalegant-6.webp.asset.json";

export const Route = createFileRoute("/custom-orders")({
  head: () =>
    pageHead({
      title: "Customised Cakes & Bouquets in Karachi | Petalegant",
      description:
        "Order customised cakes and bouquets in Karachi — personalised messages, themes, colours and initials for birthdays, bridal showers, nikkah and anniversaries. DM for price.",
      path: "/custom-orders",
    }),
  component: CustomOrdersPage,
});

const POINTS = [
  { icon: Palette, title: "Your colours & theme", text: "Match your décor, outfit or favourite flowers." },
  { icon: MessageSquareHeart, title: "Personal messages", text: "Names, initials, dates and special words on cakes and cards." },
  { icon: CalendarHeart, title: "Any occasion", text: "Birthdays, bridal showers, mayun, nikkah, anniversaries and more." },
] as const;

function CustomOrdersPage() {
  return (
    <>
      <section className="bg-secondary">
        <div className="container-page grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
          <div>
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="Made just for you"
              title="Customised cakes & bouquets"
              intro="Share your idea and we'll design a cake or bouquet that's entirely yours, delivered anywhere in Karachi."
            />
            <p className="mt-4 text-sm text-primary">Starting from {SITE.startingPrice} · DM for price</p>
            <Button variant="whatsapp" size="xl" className="mt-8" asChild>
              <a href={whatsappUrl(customOrderMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" /> Start a custom order
              </a>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[g4, g5, g6, g3].map((g, i) => (
              <img
                key={g.asset_id}
                src={g.url}
                alt="Custom Petalegant cake and bouquet design"
                width={900}
                height={900}
                loading={i < 2 ? "eager" : "lazy"}
                className={`aspect-square w-full rounded-lg object-cover ${i % 2 === 1 ? "translate-y-6" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.title} className="text-center">
              <p.icon className="mx-auto h-8 w-8 text-primary" strokeWidth={1.3} />
              <h2 className="mt-4 text-2xl text-primary-deep">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-border p-8 text-center">
          <h2 className="text-3xl text-primary-deep">How it works</h2>
          <p className="mt-4 text-muted-foreground">
            Send us a reference photo or describe your idea, your date and delivery area in Karachi. We'll
            reply with design options and the price.
          </p>
        </div>
      </section>
    </>
  );
}
