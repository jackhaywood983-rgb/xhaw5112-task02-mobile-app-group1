import type { Offering } from '../src/data/types';
import {
  calculateQuote,
  createQuoteReference,
  getDiscountRate,
  getNextTier,
} from '../src/lib/feeCalculator';

function item(id: string, price: number): Pick<Offering, 'id' | 'name' | 'category' | 'price'> {
  return { id, name: id, category: 'package', price };
}

describe('discount tiers', () => {
  it('charges full price for zero or one booking', () => {
    expect(getDiscountRate(0)).toBe(0);
    expect(getDiscountRate(1)).toBe(0);
  });

  it('applies 5% for two bookings', () => {
    expect(getDiscountRate(2)).toBe(0.05);
  });

  it('applies 10% for three bookings', () => {
    expect(getDiscountRate(3)).toBe(0.1);
  });

  it('applies 15% for four or more bookings', () => {
    expect(getDiscountRate(4)).toBe(0.15);
    expect(getDiscountRate(9)).toBe(0.15);
  });
});

describe('calculateQuote', () => {
  it('returns an empty zero quote', () => {
    const quote = calculateQuote([]);
    expect(quote.itemCount).toBe(0);
    expect(quote.subtotal).toBe(0);
    expect(quote.discountAmount).toBe(0);
    expect(quote.total).toBe(0);
    expect(quote.discountRate).toBe(0);
    expect(quote.lines).toHaveLength(0);
  });

  it('keeps a single booking at full price', () => {
    const quote = calculateQuote([item('ultimate-gamer-pass', 500)]);
    expect(quote.subtotal).toBe(500);
    expect(quote.discountAmount).toBe(0);
    expect(quote.total).toBe(500);
    expect(quote.discountLabel).toBe('No discount yet');
  });

  it('applies the 5% duo discount', () => {
    const quote = calculateQuote([item('a', 500), item('b', 1500)]);
    expect(quote.subtotal).toBe(2000);
    expect(quote.discountRate).toBe(0.05);
    expect(quote.discountAmount).toBe(100);
    expect(quote.total).toBe(1900);
    expect(quote.discountLabel).toBe('Duo');
  });

  it('applies the 10% team discount', () => {
    const quote = calculateQuote([item('a', 500), item('b', 750), item('c', 1500)]);
    expect(quote.subtotal).toBe(2750);
    expect(quote.discountAmount).toBe(275);
    expect(quote.total).toBe(2475);
    expect(quote.discountLabel).toBe('Team');
  });

  it('applies the 15% full squad discount', () => {
    const quote = calculateQuote([item('a', 500), item('b', 750), item('c', 750), item('d', 1500)]);
    expect(quote.subtotal).toBe(3500);
    expect(quote.discountRate).toBe(0.15);
    expect(quote.discountAmount).toBe(525);
    expect(quote.total).toBe(2975);
    expect(quote.discountLabel).toBe('Full squad');
  });

  it('rounds money in cents without drift', () => {
    const quote = calculateQuote([item('a', 499.99), item('b', 500)]);
    expect(quote.subtotal).toBe(999.99);
    expect(quote.discountAmount).toBe(50);
    expect(quote.total).toBe(949.99);
  });

  it('preserves line order and category', () => {
    const experience: Pick<Offering, 'id' | 'name' | 'category' | 'price'> = {
      id: 'vr',
      name: 'VR Experience',
      category: 'experience',
      price: 750,
    };
    const quote = calculateQuote([item('a', 500), experience]);
    expect(quote.lines.map((line) => line.id)).toEqual(['a', 'vr']);
    expect(quote.lines[1]?.category).toBe('experience');
  });
});

describe('getNextTier', () => {
  it('points at 5% for one booking', () => {
    expect(getNextTier(1)?.rate).toBe(0.05);
    expect(getNextTier(0)?.count).toBe(2);
  });

  it('points at 10% for two bookings', () => {
    expect(getNextTier(2)?.rate).toBe(0.1);
  });

  it('points at 15% for three bookings', () => {
    expect(getNextTier(3)?.rate).toBe(0.15);
  });

  it('returns null at the top tier', () => {
    expect(getNextTier(4)).toBeNull();
    expect(getNextTier(10)).toBeNull();
  });
});

describe('createQuoteReference', () => {
  it('creates readable NX references', () => {
    expect(createQuoteReference(123456)).toMatch(/^NX-[A-Z2-9]{5}$/);
  });

  it('is deterministic for a given seed', () => {
    expect(createQuoteReference(987654)).toBe(createQuoteReference(987654));
  });
});
