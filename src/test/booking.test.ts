import { describe, expect, it } from "vitest";
import { advancePaymentFor } from "@/lib/booking";

describe("advance payment policy", () => {
  it("requires full payment for orders above PKR 6,000", () => {
    expect(advancePaymentFor(6001)).toBe(6001);
    expect(advancePaymentFor(8000)).toBe(8000);
  });
  it("keeps the 50% advance for orders up to and including PKR 6,000", () => {
    expect(advancePaymentFor(6000)).toBe(3000);
    expect(advancePaymentFor(2500)).toBe(1250);
  });
});