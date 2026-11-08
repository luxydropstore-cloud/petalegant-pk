import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE } from "@/config/site";
import logo from "@/assets/petalegant-logo.png.asset.json";
import { CartDrawer } from "./CartDrawer";
import { AnnouncementBar } from "./AnnouncementBar";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappUrl, generalMessage } from "@/lib/whatsapp";

export function Logo({ className = "h-11 md:h-12" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt={`${SITE.name} — ${SITE.tagline}, ${SITE.city}`}
      width={1133}
      height={325}
      className={`${className} w-auto`}
    />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b border-border/70 bg-background/92 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 md:h-20">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary-soft"
                >
                  <Menu className="h-5 w-5" strokeWidth={1.6} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] max-w-sm bg-background">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="mt-2">
                  <Logo className="h-10" />
                </div>
                <nav aria-label="Mobile" className="mt-10 flex flex-col">
                  {NAV_LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="border-b border-border/60 py-4 font-display text-2xl text-foreground transition-colors hover:text-primary"
                      activeProps={{ className: "text-primary" }}
                      activeOptions={{ exact: l.to === "/" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                  <Link
                    to="/custom-orders"
                    onClick={() => setOpen(false)}
                    className="py-4 font-display text-2xl text-primary"
                  >
                    Custom Orders
                  </Link>
                </nav>
                <a
                  href={whatsappUrl(generalMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-primary"
                >
                  <WhatsAppIcon /> {SITE.whatsappDisplay}
                </a>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" aria-label={`${SITE.name} home`} className="flex-shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-[0.82rem] tracking-[0.14em] text-foreground/80 uppercase transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
                activeProps={{ className: "text-primary after:w-full" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-soft hover:text-primary sm:inline-flex"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
