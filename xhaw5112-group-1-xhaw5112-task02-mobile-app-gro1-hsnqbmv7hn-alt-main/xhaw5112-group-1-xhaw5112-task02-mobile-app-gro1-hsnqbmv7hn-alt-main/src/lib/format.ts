/**
 * Formats a rand amount without relying on Intl, so the output is identical
 * on iOS, Android and web.
 *
 * 1500 -> "R 1 500" · 2025.5 -> "R 2 025.50"
 */
export function formatZAR(amount: number, options: { alwaysCents?: boolean } = {}): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const rounded = Math.round(safe * 100) / 100;
  const negative = rounded < 0;
  const absolute = Math.abs(rounded);
  const [whole, fraction = ''] = absolute.toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const showCents = options.alwaysCents === true || fraction !== '00';
  const cents = showCents ? `.${fraction}` : '';
  return `${negative ? '−' : ''}R ${grouped}${cents}`;
}

/** Compact price used inside dense cards: 1500 -> "R 1 500". */
export function formatPrice(amount: number): string {
  return formatZAR(amount);
}

export function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}
