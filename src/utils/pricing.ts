import { PRODUCTS, TIER_ORDER } from '@constants';
import type { PricingTier, ProductId } from '@/types';

/** Formats a price in RSD with dots as thousands separators, e.g. 29500 -> "29.500". */
export function formatPrice(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Tiers a product can be applied for, in display order. */
export function getAvailableTiers(product: ProductId): PricingTier[] {
  return TIER_ORDER.filter((tier) => PRODUCTS[product].prices[tier] !== undefined);
}

/** Price per student of a product in a tier (falls back to the individual price). */
export function getPrice(product: ProductId, tier: PricingTier): number {
  return PRODUCTS[product].prices[tier] ?? PRODUCTS[product].prices.individual;
}
