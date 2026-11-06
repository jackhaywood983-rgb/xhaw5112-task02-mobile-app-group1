import type { Offering, OfferingCategory } from '../data/types';

export interface DiscountTier {
  count: number;
  rate: number;
  label: string;
  note: string;
}

/**
 * Discount ladder, highest first. Two bookings unlock 5%, three unlock 10%
 * and four or more unlock 15%. One booking is always full price.
 */
export const DISCOUNT_TIERS: DiscountTier[] = [
  { count: 4, rate: 0.15, label: 'Full squad', note: '4 or more bookings' },
  { count: 3, rate: 0.1, label: 'Team', note: '3 bookings' },
  { count: 2, rate: 0.05, label: 'Duo', note: '2 bookings' },
];

export interface QuoteLine {
  id: string;
  name: string;
  category: OfferingCategory;
  price: number;
}

export interface Quote {
  lines: QuoteLine[];
  itemCount: number;
  subtotal: number;
  discountRate: number;
  discountLabel: string;
  discountAmount: number;
  total: number;
}

export function getDiscountRate(itemCount: number): number {
  if (!Number.isFinite(itemCount) || itemCount < 2) return 0;
  if (itemCount >= 4) return 0.15;
  if (itemCount === 3) return 0.1;
  return 0.05;
}

export function getActiveTier(itemCount: number): DiscountTier | null {
  if (itemCount < 2) return null;
  if (itemCount >= 4) return DISCOUNT_TIERS[0];
  if (itemCount === 3) return DISCOUNT_TIERS[1];
  return DISCOUNT_TIERS[2];
}

/** The next tier a customer can unlock, or null when already at the top. */
export function getNextTier(itemCount: number): DiscountTier | null {
  if (itemCount < 2) return DISCOUNT_TIERS[2];
  if (itemCount === 2) return DISCOUNT_TIERS[1];
  if (itemCount === 3) return DISCOUNT_TIERS[0];
  return null;
}

function toCents(value: number): number {
  return Math.round(value * 100);
}

/**
 * Deterministic quote calculation. Money is handled in cents internally so
 * 5%, 10% and 15% never produce floating point drift.
 */
export function calculateQuote(items: readonly Pick<Offering, 'id' | 'name' | 'category' | 'price'>[]): Quote {
  const lines: QuoteLine[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
  }));

  const subtotalCents = lines.reduce((total, line) => total + toCents(line.price), 0);
  const itemCount = lines.length;
  const discountRate = getDiscountRate(itemCount);
  const discountCents = Math.round(subtotalCents * discountRate);
  const totalCents = Math.max(0, subtotalCents - discountCents);
  const tier = getActiveTier(itemCount);

  return {
    lines,
    itemCount,
    subtotal: subtotalCents / 100,
    discountRate,
    discountLabel: tier ? tier.label : 'No discount yet',
    discountAmount: discountCents / 100,
    total: totalCents / 100,
  };
}

/** Reference shown on the quotation, e.g. NX-8F3K2. */
export function createQuoteReference(seed: number = Date.now()): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let value = Math.abs(Math.floor(seed)) % 60_466_176; // 32^5
  let reference = '';
  for (let i = 0; i < 5; i += 1) {
    reference += alphabet[value % alphabet.length];
    value = Math.floor(value / alphabet.length);
  }
  return `NX-${reference}`;
}
