import type { PricingTier, ProductId } from './product';

/** Contact details of a single student in an application. */
export interface OrderStudent {
  /** First and last name. */
  name: string;
  /** Phone number. */
  phone: string;
  /** Email address. */
  email: string;
}

/** An application sent from the order dialog. */
export interface OrderRequest {
  product: ProductId;
  tier: PricingTier;
  /** Price per student in RSD at the time of the application. */
  pricePerStudent: number;
  /** Total price in RSD (price per student x number of students). */
  total: number;
  students: OrderStudent[];
  /** Optional promo code entered by the user. */
  promoCode?: string;
}
