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

/**
 * An application sent from the order dialog to /api/order. Prices are not sent: the server takes
 * them from the product configuration, so they cannot be changed in the browser.
 */
export interface OrderRequest {
  product: ProductId;
  tier: PricingTier;
  students: OrderStudent[];
  /** Optional promo code entered by the user. */
  promoCode?: string;
  /** Honeypot field that people never see; a filled-in value marks a bot. */
  website?: string;
}
