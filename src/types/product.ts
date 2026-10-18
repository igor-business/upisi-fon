/** Products that can be applied for on the site. */
export type ProductId = 'mockExams' | 'summerSchool' | 'fullPrep';

/** Pricing tiers: one student, a group of 3 to 5, or a group of 5 or more. */
export type PricingTier = 'individual' | 'group3' | 'group5';

/** Features a product can include. */
export type ProductFeature = 'program' | 'videos' | 'mentor' | 'mockExams' | 'summerSchool';

/** Configuration of a product (prices in RSD per student). */
export interface ProductConfig {
  /** Price per student for each available tier; every product has an individual price. */
  prices: { individual: number } & Partial<Record<Exclude<PricingTier, 'individual'>, number>>;
  /** Features included in the product. */
  features: readonly ProductFeature[];
  /** Highlights the product as the recommended one. */
  recommended?: boolean;
}
