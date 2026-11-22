/**
 * POST /api/order – receives an application from the order dialog, checks it again and emails it
 * to the team through Mailgun (Vercel Function, Node.js runtime).
 *
 * Environment variables (Vercel: Project → Settings → Environment Variables; locally: .env.local):
 * - MAILGUN_API_KEY   Mailgun private API key.
 * - MAILGUN_DOMAIN    Sending domain verified in Mailgun (e.g. mg.upisifon.rs).
 * - MAILGUN_REGION    "eu" when the domain is in Mailgun's EU region; otherwise the US API is used.
 * - ORDER_EMAIL_TO    Who receives the applications, comma separated.
 * - ORDER_EMAIL_FROM  Optional sender, default "UpišiFON prijave <prijave@MAILGUN_DOMAIN>".
 *
 * Without MAILGUN_API_KEY, `npm run dev` only prints the email in the terminal (see vite.config.ts).
 *
 * Imports from src/ must end in .js: the function runs as a native ES module on Vercel.
 */
import { PRODUCTS, TIER_STUDENT_LIMITS } from '../src/constants/products.js';
import type { OrderRequest, OrderStudent, PricingTier, ProductId } from '../src/types/index.js';
import { EMAIL_PATTERN, PHONE_PATTERN, normalizePhone } from '../src/utils/validation.js';

/** Product and tier names as shown on the site (sr/common.json: pricing.products / pricing.tiers). */
const PRODUCT_NAMES: Record<ProductId, string> = {
  fullPrep: 'Kompletna priprema',
  mockExams: 'Paket probnih prijemnih',
  summerSchool: 'Summer School',
};

const TIER_NAMES: Record<PricingTier, string> = {
  individual: 'Individualno',
  group3: 'Grupa 3–4',
  group5: 'Grupa 5+',
};

/** Larger requests are refused before parsing (a full group of 30 students is about 4 KB). */
const MAX_BODY_BYTES = 20_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PROMO_LENGTH = 50;

/** At most this many applications per IP address in the time window (per function instance). */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

const MAILGUN_TIMEOUT_MS = 10_000;

/** An application that passed every check, with the prices worked out on the server. */
interface CheckedOrder {
  product: ProductId;
  tier: PricingTier;
  students: OrderStudent[];
  promoCode: string;
  pricePerStudent: number;
  total: number;
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

function isRateLimited(ip: string, now: number): boolean {
  const recent = (recentRequests.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  const limited = recent.length >= RATE_LIMIT;
  if (!limited) {
    recent.push(now);
  }
  recentRequests.set(ip, recent);
  return limited;
}

const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Repeats the checks of the form (they can be skipped by calling the endpoint directly) and takes
 * the prices from the product configuration, never from the request. Returns null when invalid.
 */
function checkOrder(data: unknown): CheckedOrder | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }
  const { product, tier, students, promoCode } = data as Record<string, unknown>;

  if (!isString(product) || !Object.hasOwn(PRODUCTS, product)) {
    return null;
  }
  const config = PRODUCTS[product as ProductId];
  if (!isString(tier) || !Object.hasOwn(TIER_STUDENT_LIMITS, tier)) {
    return null;
  }
  const pricePerStudent = config.prices[tier as PricingTier];
  if (pricePerStudent === undefined) {
    return null;
  }

  const limits = TIER_STUDENT_LIMITS[tier as PricingTier];
  if (!Array.isArray(students) || students.length < limits.min || students.length > limits.max) {
    return null;
  }

  const seenEmails = new Set<string>();
  const checkedStudents: OrderStudent[] = [];
  for (const student of students as unknown[]) {
    if (typeof student !== 'object' || student === null) {
      return null;
    }
    const { name, phone, email } = student as Record<string, unknown>;
    if (!isString(name) || !isString(phone) || !isString(email)) {
      return null;
    }
    const cleanName = name.trim().replace(/\s+/g, ' ');
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();
    const emailKey = cleanEmail.toLowerCase();

    if (
      cleanName.split(' ').length < 2 ||
      cleanName.length > MAX_NAME_LENGTH ||
      !PHONE_PATTERN.test(normalizePhone(cleanPhone)) ||
      cleanEmail.length > MAX_EMAIL_LENGTH ||
      !EMAIL_PATTERN.test(emailKey) ||
      seenEmails.has(emailKey)
    ) {
      return null;
    }
    seenEmails.add(emailKey);
    checkedStudents.push({ name: cleanName, phone: cleanPhone, email: cleanEmail });
  }

  if (promoCode !== undefined && (!isString(promoCode) || promoCode.length > MAX_PROMO_LENGTH)) {
    return null;
  }

  return {
    product: product as ProductId,
    tier: tier as PricingTier,
    students: checkedStudents,
    promoCode: isString(promoCode) ? promoCode.trim() : '',
    pricePerStudent,
    total: pricePerStudent * checkedStudents.length,
  };
}

/** 29500 -> "29.500 RSD" (same format as on the site). */
const formatPrice = (amount: number) => `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} RSD`;

/** Escapes text placed into the HTML email, so what the user typed can never become markup. */
const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

function buildEmail(order: CheckedOrder, sentAt: Date) {
  const productName = PRODUCT_NAMES[order.product];
  const tierName = TIER_NAMES[order.tier];
  const count = order.students.length;
  const subject = `Nova prijava: ${productName} (${tierName}${count > 1 ? `, ${count} polaznika` : ''})`;
  const date = sentAt.toLocaleString('sr-Latn-RS', { timeZone: 'Europe/Belgrade' });

  const summary: [string, string][] = [
    ['Paket', productName],
    ['Način prijave', tierName],
    ['Broj polaznika', String(count)],
    ['Cena po polazniku', formatPrice(order.pricePerStudent)],
    ['Ukupno', formatPrice(order.total)],
    ['Promo kod', order.promoCode || '–'],
  ];

  const text = [
    subject,
    '',
    ...summary.map(([label, value]) => `${label}: ${value}`),
    '',
    'Polaznici:',
    ...order.students.map((s, i) => `${i + 1}. ${s.name}, ${s.phone}, ${s.email}`),
    '',
    `Prijava sa sajta upisifon.rs, ${date}.`,
    'Odgovor na ovaj mejl ide prvom polazniku.',
  ].join('\n');

  const cell = 'padding:6px 12px;border-bottom:1px solid #e2def0;';
  const html = `<!doctype html>
<html lang="sr"><body style="margin:0;padding:24px;background:#fff4f9;font-family:Arial,sans-serif;color:#1e1b2e;">
<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;">
<h2 style="margin:0 0 16px;color:#df0275;">${escapeHtml(subject)}</h2>
<table style="border-collapse:collapse;width:100%;margin-bottom:24px;">
${summary
  .map(
    ([label, value]) =>
      `<tr><td style="${cell}color:#6b6b80;width:40%;">${escapeHtml(label)}</td><td style="${cell}font-weight:bold;">${escapeHtml(value)}</td></tr>`,
  )
  .join('\n')}
</table>
<h3 style="margin:0 0 8px;">Polaznici</h3>
<table style="border-collapse:collapse;width:100%;">
<tr><th style="${cell}text-align:left;">#</th><th style="${cell}text-align:left;">Ime i prezime</th><th style="${cell}text-align:left;">Telefon</th><th style="${cell}text-align:left;">Email</th></tr>
${order.students
  .map(
    (s, i) =>
      `<tr><td style="${cell}">${i + 1}</td><td style="${cell}">${escapeHtml(s.name)}</td><td style="${cell}"><a href="tel:${escapeHtml(normalizePhone(s.phone))}">${escapeHtml(s.phone)}</a></td><td style="${cell}"><a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></td></tr>`,
  )
  .join('\n')}
</table>
<p style="margin:24px 0 0;color:#6b6b80;font-size:13px;">Prijava sa sajta upisifon.rs, ${escapeHtml(date)}. Odgovor na ovaj mejl ide prvom polazniku.</p>
</div>
</body></html>`;

  return { subject, text, html, replyTo: order.students[0].email };
}

type Email = ReturnType<typeof buildEmail>;

interface MailgunConfig {
  apiKey: string;
  domain: string;
  baseUrl: string;
  to: string[];
  from: string;
}

function readMailgunConfig(): MailgunConfig | null {
  const { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_REGION, ORDER_EMAIL_TO, ORDER_EMAIL_FROM } = process.env;
  const to = (ORDER_EMAIL_TO ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || to.length === 0) {
    return null;
  }
  return {
    apiKey: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN,
    baseUrl: MAILGUN_REGION?.toLowerCase() === 'eu' ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net',
    to,
    from: ORDER_EMAIL_FROM || `UpišiFON prijave <prijave@${MAILGUN_DOMAIN}>`,
  };
}

/** Sends the email through Mailgun's HTTP API (no SDK needed). */
async function sendWithMailgun(config: MailgunConfig, email: Email): Promise<void> {
  const body = new URLSearchParams({
    from: config.from,
    subject: email.subject,
    text: email.text,
    html: email.html,
    'h:Reply-To': email.replyTo,
  });
  for (const address of config.to) {
    body.append('to', address);
  }

  const response = await fetch(`${config.baseUrl}/v3/${encodeURIComponent(config.domain)}/messages`, {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`api:${config.apiKey}`).toString('base64')}` },
    body,
    signal: AbortSignal.timeout(MAILGUN_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Mailgun responded ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
}

async function handleOrder(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: { Allow: 'POST' } });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: 'too_large' }, 413);
  }
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ error: 'invalid' }, 400);
  }

  // Honeypot: a field people never see. Bots that fill it in get a normal answer, but nothing is sent.
  const honeypot = (data as Partial<OrderRequest> | null)?.website;
  if (isString(honeypot) && honeypot.trim() !== '') {
    return json({ ok: true });
  }

  // Vercel always sets the visitor's address; it is missing only in local development (no limit there).
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (ip && isRateLimited(ip, Date.now())) {
    return json({ error: 'too_many_requests' }, 429);
  }

  const order = checkOrder(data);
  if (!order) {
    return json({ error: 'invalid' }, 400);
  }

  const email = buildEmail(order, new Date());
  const config = readMailgunConfig();
  if (!config) {
    if (process.env.ORDER_DRY_RUN === '1') {
      console.info(`[api/order] Mailgun is not configured, so the email is only printed:\n\n${email.text}\n`);
      return json({ ok: true });
    }
    console.error('[api/order] Missing MAILGUN_API_KEY, MAILGUN_DOMAIN or ORDER_EMAIL_TO.');
    return json({ error: 'not_configured' }, 500);
  }

  try {
    await sendWithMailgun(config, email);
  } catch (error) {
    console.error('[api/order] Sending failed:', error);
    return json({ error: 'send_failed' }, 502);
  }
  return json({ ok: true });
}

export default {
  fetch: handleOrder,
};
