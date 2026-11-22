import type { OrderRequest } from '@/types';

/** Vercel Function that checks the application and emails it to the team (api/order.ts). */
const ORDER_ENDPOINT = '/api/order';

/** How long the form waits for the server before reporting an error. */
const REQUEST_TIMEOUT_MS = 15_000;

/** Why sending failed: too many applications from this device, or anything else. */
export type OrderErrorReason = 'tooMany' | 'failed';

export class OrderSubmitError extends Error {
  reason: OrderErrorReason;

  constructor(reason: OrderErrorReason) {
    super(`Sending the application failed (${reason}).`);
    this.name = 'OrderSubmitError';
    this.reason = reason;
  }
}

/** Sends an application; throws an OrderSubmitError when it was not accepted. */
export async function submitOrder(order: OrderRequest): Promise<void> {
  let response: Response;
  try {
    response = await fetch(ORDER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    // No connection or no answer in time.
    throw new OrderSubmitError('failed');
  }
  if (!response.ok) {
    throw new OrderSubmitError(response.status === 429 ? 'tooMany' : 'failed');
  }
}
