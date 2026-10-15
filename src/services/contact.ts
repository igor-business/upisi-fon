import type { ContactRequest } from '@/types/common';

/** Simulated network delay while there is no backend. */
const FAKE_DELAY_MS = 800;

/**
 * Sends a message from the contact form.
 *
 * For now this only simulates the request. Later it should POST the message to the
 * same backend endpoint (or serverless function) as the purchase requests, which
 * emails it via Mailgun. Mailgun must not be called from the browser, because that
 * would expose the API key.
 */
export async function submitContact(request: ContactRequest): Promise<void> {
  void request;
  await new Promise((resolve) => window.setTimeout(resolve, FAKE_DELAY_MS));
}
