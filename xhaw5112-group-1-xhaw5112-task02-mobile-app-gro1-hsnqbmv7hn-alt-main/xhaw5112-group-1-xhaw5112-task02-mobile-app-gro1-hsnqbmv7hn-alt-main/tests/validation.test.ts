import { getUpcomingDates } from '../src/lib/dates';
import { formatPercent, formatZAR } from '../src/lib/format';
import {
  hasErrors,
  validateEmail,
  validateMessage,
  validateName,
  validatePreferredDate,
  validateTimeSlot,
} from '../src/lib/validation';

describe('validateName', () => {
  it('accepts normal names and apostrophes', () => {
    expect(validateName('Darshil Singh')).toBeNull();
    expect(validateName("Zoë O'Brien")).toBeNull();
    expect(validateName('Jean-Luc')).toBeNull();
  });

  it('rejects empty and single-character names', () => {
    expect(validateName('')).toBeTruthy();
    expect(validateName('   ')).toBeTruthy();
    expect(validateName('A')).toBeTruthy();
  });

  it('rejects names with digits or symbols', () => {
    expect(validateName('Player 1')).toBeTruthy();
    expect(validateName('Darshil@Arena')).toBeTruthy();
  });
});

describe('validateEmail', () => {
  it('accepts useful email addresses', () => {
    expect(validateEmail('player@nextlevel.co.za')).toBeNull();
    expect(validateEmail('first.last+tag@example.com')).toBeNull();
  });

  it('rejects incomplete addresses', () => {
    expect(validateEmail('')).toBeTruthy();
    expect(validateEmail('player')).toBeTruthy();
    expect(validateEmail('player@')).toBeTruthy();
    expect(validateEmail('player@arena')).toBeTruthy();
    expect(validateEmail('player @arena.com')).toBeTruthy();
  });
});

describe('message and booking fields', () => {
  it('requires a meaningful message', () => {
    expect(validateMessage('')).toBeTruthy();
    expect(validateMessage('Hi')).toBeTruthy();
    expect(validateMessage('I would like to book a birthday party.')).toBeNull();
  });

  it('requires a date and a slot', () => {
    expect(validatePreferredDate(null)).toBeTruthy();
    expect(validatePreferredDate('Tue 3 Nov')).toBeNull();
    expect(validateTimeSlot(null)).toBeTruthy();
    expect(validateTimeSlot('19:00')).toBeNull();
  });

  it('detects any outstanding error', () => {
    expect(hasErrors({ name: null, email: null })).toBe(false);
    expect(hasErrors({ name: 'Required', email: null })).toBe(true);
  });
});

describe('formatZAR', () => {
  it('formats whole rand with spaces', () => {
    expect(formatZAR(0)).toBe('R 0');
    expect(formatZAR(500)).toBe('R 500');
    expect(formatZAR(1500)).toBe('R 1 500');
    expect(formatZAR(1234567)).toBe('R 1 234 567');
  });

  it('shows cents only when needed', () => {
    expect(formatZAR(2025.5)).toBe('R 2 025.50');
    expect(formatZAR(949.99)).toBe('R 949.99');
    expect(formatZAR(2000, { alwaysCents: true })).toBe('R 2 000.00');
  });

  it('formats percentage tiers', () => {
    expect(formatPercent(0.05)).toBe('5%');
    expect(formatPercent(0.15)).toBe('15%');
  });
});

describe('getUpcomingDates', () => {
  it('starts tomorrow and returns stable labels', () => {
    const dates = getUpcomingDates(3, new Date(2026, 10, 2));
    expect(dates).toHaveLength(3);
    expect(dates[0]?.id).toBe('2026-11-03');
    expect(dates[0]?.label).toBe('Tue 3 Nov');
    expect(dates[2]?.id).toBe('2026-11-05');
  });
});
