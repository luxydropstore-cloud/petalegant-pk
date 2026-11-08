import { SITE } from "@/config/site";

export function whatsappUrl(message: string, phone: string = SITE.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export interface OrderLine {
  title: string;
  quantity?: number | undefined;
  option?: string | null | undefined;
  url?: string | undefined;
}

export function productOrderMessage(line: OrderLine): string {
  const parts = [
    `Hello ${SITE.name}! I'd like to order:`,
    "",
    `• ${line.title}${line.option ? ` (${line.option})` : ""}${line.quantity && line.quantity > 1 ? ` × ${line.quantity}` : ""}`,
  ];
  if (line.url) parts.push(`  ${line.url}`);
  parts.push("", `Please share the price and delivery details for ${SITE.city}.`);
  return parts.join("\n");
}

export function cartOrderMessage(lines: OrderLine[]): string {
  const items = lines.map(
    (l) =>
      `• ${l.title}${l.option ? ` (${l.option})` : ""}${l.quantity && l.quantity > 1 ? ` × ${l.quantity}` : ""}`,
  );
  return [
    `Hello ${SITE.name}! I'd like to order:`,
    "",
    ...items,
    "",
    `Please share the total price and delivery details for ${SITE.city}.`,
  ].join("\n");
}

export const customOrderMessage = `Hello ${SITE.name}! I'd like to discuss a customised cake / bouquet.`;
export const generalMessage = `Hello ${SITE.name}! I'd like to place an order.`;
