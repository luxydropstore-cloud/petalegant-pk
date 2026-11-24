import { describe, expect, it } from "vitest";
import { absoluteUrl, businessJsonLd, pageHead, SITE_URL } from "@/lib/seo";
import { SITE } from "@/config/site";

describe("SEO head", () => {
  it("uses the owner's Facebook profile in site links and business information", () => {
    expect(SITE.facebookUrl).toBe("https://www.facebook.com/petalegant.pk/");
    expect(businessJsonLd['sameAs']).toContain("https://www.facebook.com/petalegant.pk/");
  });

  it("uses the owner's TikTok profile in site links and business information", () => {
    expect(SITE.tiktokUrl).toBe("https://www.tiktok.com/@petalegant.pk");
    expect(businessJsonLd['sameAs']).toContain("https://www.tiktok.com/@petalegant.pk");
  });

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
