import { SITE } from "@/config/site";
import { Leaf } from "./Leaf";

export function AnnouncementBar() {
  const messages = [
    `Delivery available across ${SITE.city}`,
    `Starting from ${SITE.startingPrice}`,
    "Special deals on flower + cake combos",
    "Customised cakes & bouquets available",
  ];
  return (
    <div className="bg-primary-deep text-primary-foreground">
      <div className="container-page flex h-9 items-center justify-center gap-6 overflow-hidden text-[0.72rem] tracking-[0.18em] uppercase">
        <p className="truncate md:hidden">
          {SITE.city} delivery · From {SITE.startingPrice}
        </p>
        <ul className="hidden items-center gap-6 md:flex">
          {messages.map((m, i) => (
            <li key={m} className="flex items-center gap-6">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-primary-foreground/50" />}
              <span>{m}</span>
            </li>
          ))}
        </ul>
        <Leaf className="hidden h-3 w-3 opacity-80 lg:inline-block" />
      </div>
    </div>
  );
}
