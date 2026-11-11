import { Link } from "@tanstack/react-router";
import { ArrowRight, Flower2, CakeSlice, Gift, MessageCircle, Truck, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { customOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";
import { Leaf } from "./Leaf";
import { InstagramIcon, WhatsAppIcon } from "./WhatsAppIcon";

import comboRedRoses from "@/assets/combos/combo-red-roses-chocolate.webp.asset.json";
import comboSingleRose from "@/assets/combos/combo-single-rose-chocolate.webp.asset.json";
import comboSunflower from "@/assets/combos/combo-sunflower-floral-cake.webp.asset.json";
import g1 from "@/assets/gallery/petalegant-1.webp.asset.json";
import g2 from "@/assets/gallery/petalegant-2.webp.asset.json";
import g3 from "@/assets/gallery/petalegant-3.webp.asset.json";
import g4 from "@/assets/gallery/petalegant-4.webp.asset.json";
import g5 from "@/assets/gallery/petalegant-5.webp.asset.json";
import g6 from "@/assets/gallery/petalegant-6.webp.asset.json";
import g7 from "@/assets/gallery/petalegant-7.webp.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-page grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16 lg:py-20">
        <div className="relative order-1 md:order-2">
          <div className="absolute -inset-3 -z-0 rounded-lg bg-primary-soft/60 md:-inset-5" aria-hidden />
          <img
            src={comboRedRoses.url}
            alt="Red rose bouquet with a chocolate Happy Birthday cake by Petalegant"
            width={1215}
            height={1295}
            fetchPriority="high"
            className="relative aspect-[15/16] w-full rounded-lg object-cover shadow-elegant"
          />
        </div>
        <div className="order-2 md:order-1">
          <p className="eyebrow animate-fade-up flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5" /> Flowers & cakes · {SITE.city}
          </p>
          <h1 className="animate-fade-up mt-4 text-[2.6rem] leading-[1.02] text-primary-deep [animation-delay:120ms] md:text-[3.6rem] lg:text-[4.2rem]">
            Make Every Moment a Little More Beautiful
          </h1>
          <p className="animate-fade-up mt-5 max-w-md text-base leading-relaxed text-muted-foreground [animation-delay:240ms] md:text-lg">
            Thoughtful flowers and delicious cakes, beautifully paired for every celebration.
          </p>
          <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <Link to="/combos">
                Shop Combos <ArrowRight />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/flower-bouquets">Explore Bouquets</Link>
            </Button>
          </div>
          <p className="animate-fade-up mt-6 text-sm text-foreground/70 [animation-delay:480ms]">
            Starting from <span className="font-medium text-primary">{SITE.startingPrice}</span> ·
            Customised cakes & bouquets available
          </p>
        </div>
      </div>
    </section>
  );
}

const CATEGORIES = [
  { to: "/combos", label: "Flower + Cake Combos", img: comboSingleRose.url, w: 1215, h: 1295 },
  { to: "/flower-bouquets", label: "Flower Bouquets", img: g1.url, w: 900, h: 900 },
  { to: "/cakes", label: "Cakes", img: g4.url, w: 900, h: 900 },
  { to: "/birthday-specials", label: "Birthday Specials", img: comboSunflower.url, w: 1312, h: 1199 },
  { to: "/anniversary-specials", label: "Anniversary Specials", img: g6.url, w: 900, h: 900 },
] as const;

export function ShopByCategory() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Shop by category"
        title="Something lovely for everyone"
        intro="Browse bouquets, cakes and our signature flower + cake combos, or find the perfect gift for a birthday or anniversary."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.to}
            to={c.to}
            className={`group relative overflow-hidden rounded-lg bg-secondary ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:col-span-2 md:aspect-auto" : "aspect-[4/5] md:col-span-2"
            } ${i >= 3 ? "md:col-span-3 md:aspect-[16/10]" : ""}`}
          >
            <img
              src={c.img}
              alt={c.label}
              loading="lazy"
              width={c.w}
              height={c.h}
              className="img-zoom absolute inset-0 h-full w-full object-cover group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/80 via-primary-deep/30 to-transparent p-4 pt-16 md:p-6 md:pt-20">
              <h3 className="font-display text-xl text-primary-foreground md:text-2xl">{c.label}</h3>
              <span className="mt-1 inline-flex items-center gap-1 text-xs tracking-[0.18em] text-primary-foreground/85 uppercase">
                Shop now <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const REASONS = [
  { icon: Flower2, title: "Beautifully arranged bouquets", text: "Fresh blooms hand-wrapped with care and an eye for detail." },
  { icon: CakeSlice, title: "Delicious cakes for special moments", text: "Celebration cakes designed to look as good as they taste." },
  { icon: Gift, title: "Affordable combo deals", text: `Flowers and cake together, starting from ${SITE.startingPrice}.` },
  { icon: MessageCircle, title: "Convenient ordering", text: "Choose your favourite and order in minutes on WhatsApp." },
  { icon: Truck, title: `${SITE.city}-only delivery`, text: `We focus on ${SITE.city} so every order arrives fresh.` },
] as const;

export function WhyChoose() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Why Petalegant" title="Why choose Petalegant?" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {REASONS.map((r) => (
            <div key={r.title} className="bg-background p-7 transition-colors hover:bg-primary-soft/60">
              <r.icon className="h-7 w-7 text-primary" strokeWidth={1.3} />
              <h3 className="mt-5 text-xl text-primary-deep">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MOMENTS = [
  { title: "Birthdays", text: "Make their day with blooms and a cake made for candles.", img: g4.url, to: "/birthday-specials" },
  { title: "Anniversaries", text: "Red roses and something sweet to celebrate your story.", img: g6.url, to: "/anniversary-specials" },
  { title: "Surprises", text: "A doorstep surprise that says you were thinking of them.", img: comboRedRoses.url, to: "/combos" },
  { title: "Everyday celebrations", text: "Because a Tuesday can be beautiful too.", img: g2.url, to: "/shop" },
] as const;

export function SpecialMoments() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Special moments"
        title="For every reason to celebrate"
        intro="From milestone birthdays to quiet thank-yous, we help you mark the moments that matter."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOMENTS.map((m) => (
          <Link key={m.title} to={m.to} className="group block">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
              <img
                src={m.img}
                alt={`${m.title} flowers and cake by Petalegant`}
                loading="lazy"
                width={896}
                height={1152}
                className="img-zoom h-full w-full object-cover group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 text-2xl text-primary-deep group-hover:text-primary">{m.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { icon: Search, title: "Explore our collection", text: "Browse bouquets, cakes and combos." },
  { icon: Heart, title: "Choose your favourite", text: "Pick a design or ask us to customise one." },
  { icon: MessageCircle, title: "Order on WhatsApp", text: "Tap Order Now — your choice is pre-filled for you." },
  { icon: Truck, title: `Delivered in ${SITE.city}`, text: "We deliver your order fresh to the door." },
] as const;

export function HowToOrder() {
  return (
    <section id="how-to-order" className="scroll-mt-32 bg-primary-deep py-20 text-primary-foreground md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-primary-foreground/70">How to order</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Ordering is simple</h2>
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary-foreground/30">
                <s.icon className="h-6 w-6" strokeWidth={1.4} />
              </span>
              <p className="mt-5 font-display text-sm tracking-[0.3em] text-primary-foreground/60">0{i + 1}</p>
              <h3 className="mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/75">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 text-center">
          <Button
            asChild
            size="xl"
            className="rounded-full bg-primary-foreground text-primary-deep hover:bg-primary-soft"
          >
            <a href={whatsappUrl(`Hello ${SITE.name}! I'd like to place an order.`)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" /> Start your order
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const GALLERY = [comboRedRoses, g1, g4, comboSunflower, g3, g6, comboSingleRose, g2];

export function InstagramSection() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow={`@${SITE.instagramHandle}`}
        title="Follow us on Instagram"
        intro="Fresh designs, new combos and behind-the-scenes from our studio."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {GALLERY.map((g, i) => (
          <a
            key={g.asset_id}
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Instagram"
            className={`group relative overflow-hidden rounded-lg bg-secondary ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <img
              src={g.url}
              alt="Petalegant bouquet and cake designs"
              loading="lazy"
              width={900}
              height={900}
              className="img-zoom aspect-square h-full w-full object-cover group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary-deep/0 text-primary-foreground opacity-0 transition-all duration-300 group-hover:bg-primary-deep/40 group-hover:opacity-100">
              <InstagramIcon className="h-7 w-7" />
            </span>
          </a>
        ))}
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 flex aspect-[2/1] flex-col items-center justify-center gap-3 rounded-lg bg-primary md:col-span-1 md:aspect-square text-center text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <InstagramIcon className="h-8 w-8" />
          <span className="font-display text-2xl">Follow us</span>
          <span className="text-xs tracking-[0.2em] uppercase opacity-80">@{SITE.instagramHandle}</span>
        </a>
      </div>
    </section>
  );
}

export function CustomOrderBanner() {
  return (
    <section className="bg-secondary">
      <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
        <div className="grid grid-cols-2 gap-3">
          <img src={g5.url} alt="Custom bride to be cake by Petalegant" loading="lazy" width={900} height={900} className="aspect-[4/5] w-full rounded-lg object-cover" />
          <img src={g3.url} alt="Custom pink rose bouquet by Petalegant" loading="lazy" width={900} height={900} className="mt-10 aspect-[4/5] w-full rounded-lg object-cover" />
        </div>
        <div>
          <p className="eyebrow">Made just for you</p>
          <h2 className="mt-3 text-4xl text-primary-deep md:text-5xl">Customised cakes & bouquets</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Have a theme, colour, message or design in mind? Share your idea and we'll create a cake or
            bouquet that's entirely yours — for birthdays, bridal showers, nikkah, anniversaries and more.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="whatsapp" size="xl" asChild>
              <a href={whatsappUrl(customOrderMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" /> DM for a custom order
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/custom-orders">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
