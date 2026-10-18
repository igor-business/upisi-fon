import type { PricingTier, ProductConfig, ProductFeature, ProductId } from '@/types';

/** Products that can be applied for. Prices are in RSD per student. */
export const PRODUCTS: Readonly<Record<ProductId, ProductConfig>> = {
  mockExams: {
    prices: { individual: 5000, group3: 4500, group5: 4000 },
    features: ['mentor', 'mockExams'],
  },
  summerSchool: {
    prices: { individual: 7000 },
    features: ['summerSchool'],
  },
  fullPrep: {
    prices: { individual: 33000, group3: 29500, group5: 26000 },
    features: ['program', 'videos', 'mentor', 'mockExams', 'summerSchool'],
    recommended: true,
  },
};

/** All features a product can include, in display order (texts: pricing.features.<feature>). */
export const PRODUCT_FEATURES: readonly ProductFeature[] = [
  'program',
  'videos',
  'mentor',
  'mockExams',
  'summerSchool',
];

/** Products shown as cards in the pricing section (Summer School has its own page). */
export const PRICING_CARDS = ['mockExams', 'fullPrep'] as const satisfies readonly ProductId[];

/** Order of the pricing tiers in the tier switch. */
export const TIER_ORDER: readonly PricingTier[] = ['individual', 'group3', 'group5'];

/** Allowed number of students per tier. */
export const TIER_STUDENT_LIMITS: Readonly<Record<PricingTier, { min: number; max: number }>> = {
  individual: { min: 1, max: 1 },
  group3: { min: 3, max: 5 },
  group5: { min: 5, max: 30 },
};

