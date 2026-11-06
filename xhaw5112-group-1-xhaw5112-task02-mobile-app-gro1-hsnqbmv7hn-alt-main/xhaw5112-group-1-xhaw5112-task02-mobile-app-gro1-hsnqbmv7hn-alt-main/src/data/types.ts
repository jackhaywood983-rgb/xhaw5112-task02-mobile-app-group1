export type OfferingCategory = 'package' | 'experience';

export interface Feature {
  title: string;
  detail: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Offering {
  id: string;
  category: OfferingCategory;
  name: string;
  eyebrow: string;
  price: number;
  priceNote: string;
  duration: string;
  capacity: string;
  image: number;
  imageAlt: string;
  badge?: string;
  tagline: string;
  description: string;
  highlights: string[];
  features: Feature[];
  specs: Spec[];
  ctaLabel: string;
  /** Optional second image used on the detail screen. */
  gallery?: number;
  galleryAlt?: string;
  /** Extra detail-screen blocks. */
  coaches?: boolean;
  preferredDate?: boolean;
  catalogue?: string[];
  safety?: string[];
  tracks?: string[];
  leaderboard?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  initials: string;
  role: string;
  rank: string;
  bio: string;
  specialties: string[];
}

export interface ArenaEvent {
  id: string;
  title: string;
  format: string;
  when: string;
  entry: string;
  prize?: string;
  image: number;
  imageAlt: string;
  tag: string;
}

export interface TimeSlot {
  time: string;
  status: 'available' | 'few' | 'full';
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  driver: string;
  track: string;
  time: string;
  vehicle: string;
}

export interface ContactHour {
  days: string;
  hours: string;
}

export interface ArenaInfo {
  name: string;
  shortName: string;
  descriptor: string;
  city: string;
  district: string;
  founded: number;
  founder: string;
  tagline: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: ContactHour[];
  directionsUrl: string;
}
