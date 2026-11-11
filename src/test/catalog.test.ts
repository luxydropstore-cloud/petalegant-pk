import { describe, expect, it } from "vitest";
import { filterLocalProducts, findLocalProduct, LOCAL_PRODUCTS } from "@/lib/catalog";

describe("owner's own catalog", () => {
  it("has the 10 designs from the owner's photos", () => {
    expect(LOCAL_PRODUCTS).toHaveLength(10);
  });
  it("shows 3 combos, 3 bouquets and 4 cakes on their pages", () => {
    expect(filterLocalProducts("tag:combo")).toHaveLength(3);
    expect(filterLocalProducts("product_type:Bouquet")).toHaveLength(3);
    expect(filterLocalProducts("product_type:Cake")).toHaveLength(4);
  });
  it("orders through WhatsApp only, so no product has an online-cart option", () => {
    expect(LOCAL_PRODUCTS.every((p) => p.node.variants.edges.length === 0)).toBe(true);
  });
  it("opens a product page by its link", () => {
    expect(findLocalProduct("bride-to-be-cake")?.node.title).toBe("Bride To Be Cake");
  });
});
