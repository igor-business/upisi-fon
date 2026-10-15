import type { OrderRequest } from '@/types/common';

/** Simulated network delay while there is no backend. */
const FAKE_DELAY_MS = 800;

/**
 * Sends a purchase request.
 *
 * For now this only simulates the request. Later it should POST the order to a
 * backend endpoint (or serverless function) that emails it via Mailgun. Mailgun
 * must not be called from the browser, because that would expose the API key.
 */
export async function submitOrder(order: OrderRequest): Promise<void> {
  void order;
  await new Promise((resolve) => window.setTimeout(resolve, FAKE_DELAY_MS));
}
