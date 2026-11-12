import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/config/site";
import { whatsappUrl, generalMessage } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/site/SectionHeading";
import { InstagramIcon, WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Petalegant | Order Flowers & Cakes in Karachi",
      description:
        "Contact Petalegant on WhatsApp or Instagram to order flower bouquets, cakes and combos in Karachi, or to request a customised design.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `Hello ${SITE.name}!`,
      name && `My name is ${name.trim()}.`,
      occasion && `Occasion / date: ${occasion.trim()}`,
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappUrl(text), "_blank");
  };

  return (
    <section className="container-page py-14 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="We'd love to hear from you"
        intro="The quickest way to order or ask about prices is WhatsApp. We deliver across Karachi."
      />
      <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          <a
            href={whatsappUrl(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg border border-border p-5 transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs tracking-[0.18em] text-muted-foreground uppercase">WhatsApp</span>
              <span className="font-display text-xl">{SITE.whatsappDisplay}</span>
            </span>
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg border border-border p-5 transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
              <InstagramIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs tracking-[0.18em] text-muted-foreground uppercase">Instagram</span>
              <span className="font-display text-xl">@{SITE.instagramHandle}</span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-lg border border-border p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Truck className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-xs tracking-[0.18em] text-muted-foreground uppercase">Delivery</span>
              <span className="font-display text-xl">{SITE.city} only</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-lg bg-secondary p-6 md:col-span-3 md:p-8">
          <h2 className="text-3xl text-primary-deep">Send us a message</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion & date</Label>
            <Input
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              maxLength={120}
              placeholder="e.g. Birthday, 14 December"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">What would you like?</Label>
            <Textarea
              id="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={5}
              placeholder="Tell us about the bouquet, cake or combo you have in mind…"
              className="bg-background"
            />
          </div>
          <Button type="submit" variant="whatsapp" size="xl" className="w-full">
            <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
}
