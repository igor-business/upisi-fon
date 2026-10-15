/** Formats a price in RSD with dots as thousands separators, e.g. 29500 -> "29.500". */
export function formatPrice(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
