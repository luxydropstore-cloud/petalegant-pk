import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, MapPin, Truck } from "lucide-react";
import { SITE } from "@/config/site";
import { whatsappUrl, generalMessage } from "@/lib/whatsapp";
import { Logo } from "./Header";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./WhatsAppIcon";
import { Leaf } from "./Leaf";
import { BOOKING_NOTE } from "@/lib/booking";

const SHOP_LINKS = [
  { to: "/shop", label: "Shop All" },
  { to: "/combos", label: "Flower + Cake Combos" },
  { to: "/flower-bouquets", label: "Flower Bouquets" },
  { to: "/cakes", label: "Cakes" },
  { to: "/birthday-specials", label: "Birthday Specials" },
  { to: "/anniversary-specials", label: "Anniversary Specials" },
  { to: "/custom-orders", label: "Custom Orders" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-12" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Elegant flower bouquets, celebration cakes and thoughtful combos  beautifully made and
            delivered across {SITE.city}.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Petalegant on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <InstagramIcon />
            </a>
            {[
              { name: "Facebook", url: SITE.facebookUrl, icon: Facebook },
              { name: "TikTok", url: SITE.tiktokUrl, icon: TikTokIcon },
              { name: "LinkedIn", url: SITE.linkedinUrl, icon: Linkedin },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Petalegant on ${social.name}`}
                title={social.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Petalegant on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Shop" className="md:col-span-3">
          <h2 className="eyebrow">Shop</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {SHOP_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground/80 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="eyebrow">Help</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/contact" className="text-foreground/80 hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" hash="how-to-order" className="text-foreground/80 hover:text-primary">
                How to order
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm text-foreground/80">
            <li className="flex items-start gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 text-primary" />
              <a href={whatsappUrl(generalMessage)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <InstagramIcon className="mt-0.5 h-4 w-4 text-primary" />
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                @{SITE.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 text-primary" strokeWidth={1.6} />
              <span>Delivery within {SITE.city} only</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" strokeWidth={1.6} />
              <span>{SITE.city}, Pakistan</span>
            </li>
          </ul>
          <p className="mt-6 rounded-lg border border-primary/20 bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Booking note:</span> {BOOKING_NOTE}
          </p>
        </div>
      </div>
      <div className="border-t border-border/80">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} {SITE.tagline}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <Leaf className="h-3 w-3" /> Flowers & cakes, delivered in {SITE.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
