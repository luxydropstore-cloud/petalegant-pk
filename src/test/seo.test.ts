import { describe, expect, it } from "vitest";
import { absoluteUrl, pageHead, SITE_URL } from "@/lib/seo";

describe("SEO head", () => {
  it("points the canonical link at the page itself on the public site", () => {
    const head = pageHead({ title: "Cakes", description: "d", path: "/cakes" });
    expect(head.links).toEqual([{ rel: "canonical", href: "https://petalegant-pk.lovable.app/cakes" }]);
  });

  it("sets og:url to the same address as the canonical link", () => {
    const head = pageHead({ title: "Cakes", description: "d", path: "/cakes" });
    expect(head.meta).toContainEqual({ property: "og:url", content: `${SITE_URL}/cakes` });
  });

  it("makes site-relative photo paths absolute for link previews", () => {
    expect(absoluteUrl("/__l5e/assets-v1/x/photo.webp")).toBe(`${SITE_URL}/__l5e/assets-v1/x/photo.webp`);
    expect(absoluteUrl("https://cdn.shopify.com/a.jpg")).toBe("https://cdn.shopify.com/a.jpg");
  });
});
