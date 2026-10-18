import { createContext } from 'react';
import type { PricingTier, ProductId } from '@/types';

/** Product and tier the dialog was opened with. */
export interface OrderSelection {
  product: ProductId;
  tier: PricingTier;
}

export interface OrderDialogContextValue {
  /** Opens the application dialog for a product (individual tier by default). */
  openOrder: (product: ProductId, tier?: PricingTier) => void;
}

export const OrderDialogContext = createContext<OrderDialogContextValue | null>(null);
