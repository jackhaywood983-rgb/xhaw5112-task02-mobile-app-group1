export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter your full name.';
  if (trimmed.length < 2) return 'Your name needs at least 2 characters.';
  if (!/^[a-zA-Z\u00C0-\u024F' .-]+$/.test(trimmed)) return 'Use letters, spaces, hyphens or apostrophes only.';
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter your email address.';
  if (!EMAIL_PATTERN.test(trimmed)) return 'That email address does not look right.';
  return null;
}

export function validateMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Tell us what you need.';
  if (trimmed.length < 10) return 'Add a little more detail (at least 10 characters).';
  return null;
}

export function validatePreferredDate(value: string | null): string | null {
  return value ? null : 'Choose a preferred date.';
}

export function validateTimeSlot(value: string | null): string | null {
  return value ? null : 'Choose a time slot.';
}

export interface FieldErrors {
  name?: string | null;
  email?: string | null;
  message?: string | null;
  date?: string | null;
  slot?: string | null;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some((error) => Boolean(error));
}
