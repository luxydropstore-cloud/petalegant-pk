export const FULL_PAYMENT_THRESHOLD_PKR = 6000;

export function advancePaymentFor(totalPkr: number): number {
  return totalPkr > FULL_PAYMENT_THRESHOLD_PKR ? totalPkr : totalPkr * 0.5;
}

export const BOOKING_NOTE = `Orders up to PKR ${FULL_PAYMENT_THRESHOLD_PKR.toLocaleString("en-US")} are confirmed with a 50% advance payment, with the remaining balance due on delivery day. Orders above PKR ${FULL_PAYMENT_THRESHOLD_PKR.toLocaleString("en-US")} require full payment in advance. Your payment secures your booking and allows us to prepare your flowers and cake especially for you.`;