import arcadeNeon from '../../assets/images/arcade-neon.jpg';
import arenaArcade from '../../assets/images/arena-arcade.jpg';
import birthdayParty from '../../assets/images/birthday-party.jpg';
import controller from '../../assets/images/controller.jpg';
import escapeRoom from '../../assets/images/escape-room.jpg';
import esportsTraining from '../../assets/images/esports-training.jpg';
import eventConfetti from '../../assets/images/event-confetti.jpg';
import eventStage from '../../assets/images/event-stage.jpg';
import heroArena from '../../assets/images/hero-arena.jpg';
import racingSim from '../../assets/images/racing-sim.jpg';
import retroArcade from '../../assets/images/retro-arcade.jpg';
import ultimatePass from '../../assets/images/ultimate-pass.jpg';
import vipBooth from '../../assets/images/vip-booth.jpg';
import vrHeadset from '../../assets/images/vr-headset.jpg';
import vrPlayer from '../../assets/images/vr-player.jpg';
import type { ArenaEvent, ArenaInfo, Coach, LeaderboardEntry, Offering, TimeSlot } from './types';

export const arena: ArenaInfo = {
  name: 'Next Level Gaming & Esports Arena',
  shortName: 'NXT LVL',
  descriptor: 'Gaming & Esports Arena',
  city: 'Johannesburg',
  district: 'Sandton',
  founded: 2023,
  founder: 'Jason Naidoo',
  tagline: 'Play. Compete. Level up.',
  address: '123 Gaming Boulevard, Sandton, Johannesburg, 2196',
  phone: '+27 11 555 0199',
  phoneHref: 'tel:+27115550199',
  email: 'bookings@nextlevelarena.co.za',
  hours: [
    { days: 'Monday – Thursday', hours: '10:00 – 22:00' },
    { days: 'Friday', hours: '10:00 – 00:00' },
    { days: 'Saturday', hours: '09:00 – 00:00' },
    { days: 'Sunday', hours: '09:00 – 20:00' },
  ],
  directionsUrl: 'https://maps.google.com/?q=123+Gaming+Boulevard+Sandton+Johannesburg',
};

export const photos = {
  hero: heroArena,
  arena: arenaArcade,
  arcade: arcadeNeon,
  controller,
  eventStage,
  eventConfetti,
  retro: retroArcade,
  vrHeadset,
} as const;

export const offerings: Offering[] = [
  {
    id: 'ultimate-gamer-pass',
    category: 'package',
    name: 'Ultimate Gamer Pass',
    eyebrow: 'Signature package',
    price: 500,
    priceNote: 'per player · 2 hours',
    duration: '2 hours',
    capacity: '1 player',
    image: ultimatePass,
    imageAlt: 'Console and monitor glowing purple in a darkened gaming station',
    badge: 'Most popular',
    tagline: 'Two hours. Every screen unlocked.',
    description:
      'The full arena pass: pick any high-spec PC or current-gen console, settle into a lounge chair and play on a 1 Gbps line. Includes a snack voucher and automatic entry into the Friday Night Cup.',
    highlights: ['RTX gaming PC or console', '1 Gbps fibre internet', 'Snack voucher included', 'Friday Night Cup entry'],
    features: [
      {
        title: 'High-spec stations',
        detail: 'RTX-class PCs, 240 Hz monitors and current-gen consoles with pro controllers.',
      },
      {
        title: 'Low-latency fibre',
        detail: 'A dedicated 1 Gbps line with dual-provider failover and backup power for load-shedding.',
      },
      {
        title: 'Snack voucher',
        detail: 'R100 to spend at the arena kitchen on drinks, wings or a toasted sarmie.',
      },
      {
        title: 'Tournament entry',
        detail: 'Your pass includes entry to that week’s Friday Night Cup — solo or with a squad.',
      },
    ],
    specs: [
      { label: 'Session', value: '2 hours' },
      { label: 'Setup', value: 'PC / console' },
      { label: 'Age', value: 'All ages' },
      { label: 'Extras', value: 'Snack voucher' },
    ],
    ctaLabel: 'Reserve a pass',
    gallery: arenaArcade,
    galleryAlt: 'Neon-lit arcade hall with rows of glowing machines',
  },
  {
    id: 'vip-gaming-experience',
    category: 'package',
    name: 'VIP Gaming Experience',
    eyebrow: 'Private booth',
    price: 1500,
    priceNote: 'per booth · up to 6 guests',
    duration: '3 hours',
    capacity: 'Up to 6 guests',
    image: vipBooth,
    imageAlt: 'Premium gaming desk lit in red and blue with a large monitor',
    badge: 'Private',
    tagline: 'Your own soundproof arena.',
    description:
      'A private, soundproof booth with two RTX rigs, a 65-inch console wall and a dedicated gaming assistant. Add catering, invite your squad and settle in for three hours of uninterrupted play.',
    highlights: ['Soundproof private booth', 'Two RTX rigs + console wall', 'Dedicated gaming assistant', 'Catering add-ons'],
    features: [
      {
        title: 'Soundproof booth',
        detail: 'A glass-fronted private room for up to six guests, with its own climate control and lighting scene.',
      },
      {
        title: 'Premium hardware',
        detail: 'Two RTX 4080 stations, a 65-inch OLED console wall, racing wheel and pro headsets.',
      },
      {
        title: 'Gaming assistant',
        detail: 'A host on call for game setup, coaching tips, food orders and tournament brackets.',
      },
      {
        title: 'Catering options',
        detail: 'Pizza, sliders, mocktails and cake platters delivered to the booth from the arena kitchen.',
      },
      {
        title: 'Priority booking',
        detail: 'VIP guests get first pick of weekend slots and complimentary parking at the door.',
      },
    ],
    specs: [
      { label: 'Session', value: '3 hours' },
      { label: 'Booth', value: 'Private · 6 guests' },
      { label: 'Host', value: 'Included' },
      { label: 'Catering', value: 'Optional' },
    ],
    ctaLabel: 'Book the booth',
    gallery: arcadeNeon,
    galleryAlt: 'Colourful neon arcade room with glowing cabinets',
  },
  {
    id: 'esports-training',
    category: 'package',
    name: 'Esports Training Package',
    eyebrow: 'Coached session',
    price: 1500,
    priceNote: 'per player · 90 minutes',
    duration: '90 minutes',
    capacity: '1–5 players',
    image: esportsTraining,
    imageAlt: 'Esports player in a red-lit headset focused on a monitor',
    tagline: 'Train like the bracket is already live.',
    description:
      'A coached session built around your role: aim and movement drills, VOD review, team communication practice and a structured scrim block against partner teams.',
    highlights: ['1-on-1 or squad coaching', 'VOD and strategy review', 'Comms room practice', 'Structured scrim block'],
    features: [
      {
        title: 'Coach profiles',
        detail: 'Choose a coach below. Every coach is ranked in the top 1% of their title and has tournament experience.',
      },
      {
        title: 'Strategy & gameplay',
        detail: 'A focused VOD review plus live drills for aim, movement, utility usage and decision making.',
      },
      {
        title: 'Team communication',
        detail: 'Practice in a six-seat comms room with pro headsets and a dedicated in-game caller review.',
      },
      {
        title: 'Scrim block',
        detail: 'Finish with a scheduled scrim against one of our partner academy teams and a written recap.',
      },
    ],
    specs: [
      { label: 'Session', value: '90 minutes' },
      { label: 'Group', value: '1–5 players' },
      { label: 'Titles', value: 'Valorant · CS2' },
      { label: 'Report', value: 'Included' },
    ],
    ctaLabel: 'Book a session',
    coaches: true,
    gallery: eventStage,
    galleryAlt: 'Esports players competing on a stage under spotlights',
  },
  {
    id: 'birthday-party',
    category: 'package',
    name: 'Birthday Party Package',
    eyebrow: 'Party lounge',
    price: 1500,
    priceNote: 'per party · up to 10 players',
    duration: '2.5 hours',
    capacity: 'Up to 10 players',
    image: birthdayParty,
    imageAlt: 'Colourful balloons ready for a birthday celebration',
    badge: 'Party host',
    tagline: 'Cake, controllers and a little friendly chaos.',
    description:
      'Take over the party lounge for two and a half hours. We handle the multiplayer tournament, the catering and the cake table; you handle the victory dance.',
    highlights: ['Private party lounge', 'Catering packages', 'Multiplayer tournament', 'Preferred date picker'],
    features: [
      {
        title: 'Party lounge',
        detail: 'A decorated private lounge with sofa seating, a projector wall and space for up to ten players.',
      },
      {
        title: 'Catering packages',
        detail: 'Choose pizza and slushies, a burger bar or a snack platter. Cake and candles are on us.',
      },
      {
        title: 'Tournament rules',
        detail: 'Our host runs a knockout bracket across Mario Kart, FIFA and Fall Guys with prizes for the podium.',
      },
      {
        title: 'Preferred date',
        detail: 'Pick a preferred date and time below; we hold it for 24 hours while the deposit is arranged.',
      },
    ],
    specs: [
      { label: 'Session', value: '2.5 hours' },
      { label: 'Party', value: 'Up to 10 guests' },
      { label: 'Host', value: 'Included' },
      { label: 'Catering', value: 'Choose a package' },
    ],
    ctaLabel: 'Plan the party',
    preferredDate: true,
    gallery: eventConfetti,
    galleryAlt: 'Confetti falling over a crowd under blue stage lights',
  },
  {
    id: 'vr-experience',
    category: 'experience',
    name: 'VR Experience',
    eyebrow: 'Reality, upgraded',
    price: 750,
    priceNote: 'per player · 45 minutes',
    duration: '45 minutes',
    capacity: '2–4 players',
    image: vrPlayer,
    imageAlt: 'Player wearing a VR headset in violet and blue light',
    tagline: 'Step out of the room. Stay in the game.',
    description:
      'A 45-minute VR session on current-gen headsets and PCVR sim rigs. Pick from our catalogue, get a proper safety briefing and let a spotter keep you upright.',
    highlights: ['Current-gen headsets', '35+ game catalogue', 'Safety briefing', '45-minute session'],
    features: [
      {
        title: 'Equipment',
        detail: 'Meta Quest 3 headsets paired with PCVR rigs, haptic controllers and a 3×3 m tracked play area.',
      },
      {
        title: 'Game catalogue',
        detail: 'From rhythm and party games to horror and open-world adventures — see the list below.',
      },
      {
        title: 'Safety guidelines',
        detail: 'A staff spotter is with every session, and the play area is cleared before you put the headset on.',
      },
      {
        title: 'Time slots',
        detail: 'Sessions run every 90 minutes. Pick an available slot when you reserve.',
      },
    ],
    specs: [
      { label: 'Session', value: '45 minutes' },
      { label: 'Players', value: '2–4 per bay' },
      { label: 'Age', value: '12+ recommended' },
      { label: 'Spotter', value: 'Included' },
    ],
    ctaLabel: 'Reserve a session',
    catalogue: ['Beat Saber', 'Half-Life: Alyx', 'Superhot VR', 'Walkabout Mini Golf', 'Gorilla Tag', 'F1 25 VR'],
    safety: [
      'Clear the play area and keep the headset strap snug.',
      'Wrist straps on before you pick up a controller.',
      'A staff spotter stays with your bay for the full session.',
      '12+ for intense titles; ask us for a family-friendly list.',
    ],
    gallery: vrHeadset,
    galleryAlt: 'Close-up of a VR headset lens lit in blue and magenta',
  },
  {
    id: 'racing-simulator',
    category: 'experience',
    name: 'Racing Simulator',
    eyebrow: 'Full motion',
    price: 750,
    priceNote: 'per driver · 30 minutes',
    duration: '30 minutes',
    capacity: '1 driver',
    image: racingSim,
    imageAlt: 'Sports car on a highway at dusk, representing the racing simulator',
    badge: 'Leaderboard',
    tagline: 'Kyalami, Spa, Monza. No licence needed.',
    description:
      'A full-motion hydraulic rig with a racing wheel, load-cell pedals and a wraparound screen. Pick a track, set a lap and see if you can crack the arena leaderboard.',
    highlights: ['Hydraulic motion rig', 'Wheel + load-cell pedals', 'Six legendary tracks', 'Live leaderboard'],
    features: [
      {
        title: 'Hydraulic hardware',
        detail: 'A 3-DOF motion platform, direct-drive wheel and load-cell pedals tuned by our sim team.',
      },
      {
        title: 'Tracks',
        detail: 'Race Kyalami, Spa-Francorchamps, Monza, Suzuka, Silverstone or the Nürburgring.',
      },
      {
        title: 'Leaderboard',
        detail: 'Every session posts a lap time. The top ten drivers each month win arena credit.',
      },
      {
        title: 'Reserve a session',
        detail: 'Book a 30-minute slot; add a second session for half price on weekdays.',
      },
    ],
    specs: [
      { label: 'Session', value: '30 minutes' },
      { label: 'Rig', value: 'Hydraulic · 3-DOF' },
      { label: 'Height', value: 'Min. 1.4 m' },
      { label: 'Leaderboard', value: 'Live' },
    ],
    ctaLabel: 'Reserve a session',
    tracks: ['Kyalami', 'Spa-Francorchamps', 'Monza', 'Suzuka', 'Silverstone', 'Nürburgring'],
    leaderboard: true,
    gallery: arenaArcade,
    galleryAlt: 'Neon-lit arcade hall with glowing racing and arcade cabinets',
  },
  {
    id: 'escape-room-challenge',
    category: 'experience',
    name: 'Escape Room Challenge',
    eyebrow: 'Neon lockdown',
    price: 750,
    priceNote: 'per team · 2–6 players',
    duration: '45 minutes',
    capacity: '2–6 players',
    image: escapeRoom,
    imageAlt: 'Collection of wooden puzzle boxes and brain teasers',
    tagline: 'The clock is neon. The exit is not obvious.',
    description:
      'Lock yourselves in our neon-lit control room and solve a chain of physical and digital puzzles before the 45 minutes run out. Three difficulty tiers, one very smug game master.',
    highlights: ['45-minute challenge', 'Three difficulty tiers', 'Hints on request', 'Team photo finish'],
    features: [
      {
        title: 'The room',
        detail: 'A neon control-room set with lockboxes, wired circuits, hidden messages and one suspicious robot.',
      },
      {
        title: 'Difficulty tiers',
        detail: 'Choose Rookie (family), Operator (standard) or Blackout (for teams who enjoy arguing).',
      },
      {
        title: 'Game master',
        detail: 'A game master watches the room and can drop a hint on the screen when you ask for one.',
      },
      {
        title: 'Finish line',
        detail: 'Successful teams get a spot on the wall, a team photo and bragging rights at the kitchen.',
      },
    ],
    specs: [
      { label: 'Session', value: '45 minutes' },
      { label: 'Team', value: '2–6 players' },
      { label: 'Tiers', value: '3 levels' },
      { label: 'Hints', value: 'On request' },
    ],
    ctaLabel: 'Lock in a team',
    gallery: arcadeNeon,
    galleryAlt: 'Neon arcade room with cyan and magenta lighting',
  },
];

export const coaches: Coach[] = [
  {
    id: 'coach-sipho',
    name: 'Sipho Dlamini',
    initials: 'SD',
    role: 'Valorant coach',
    rank: 'Immortal 3 · ex-academy IGL',
    bio: 'Sipho builds around team structure and mid-round calling. Expect clear homework and a very honest VOD review.',
    specialties: ['IGL fundamentals', 'Utility timing', 'VOD review'],
  },
  {
    id: 'coach-ayesha',
    name: 'Ayesha Patel',
    initials: 'AP',
    role: 'CS2 analyst',
    rank: 'Faceit level 10 · analyst',
    bio: 'Ayesha turns messy demo footage into a short list of fixes. Her aim drills are short, brutal and weirdly fun.',
    specialties: ['Aim & movement', 'Economy', 'Demo analysis'],
  },
  {
    id: 'coach-marco',
    name: 'Marco van Wyk',
    initials: 'MV',
    role: 'Sim racing coach',
    rank: '2024 Gauteng sim champion',
    bio: 'Marco coaches braking, trail-off and racecraft on the hydraulic rig. Bring a notebook; he will fill it.',
    specialties: ['Braking technique', 'Racecraft', 'Setup basics'],
  },
];

export const events: ArenaEvent[] = [
  {
    id: 'friday-night-cup',
    title: 'Friday Night Cup',
    format: 'Valorant 5v5 · single elimination',
    when: 'Every Friday · 20:00',
    entry: 'R150 per player',
    prize: 'R2 000 prize pool',
    image: eventStage,
    imageAlt: 'Player walking onto a lit esports stage',
    tag: 'Tournament',
  },
  {
    id: 'retro-rewind',
    title: 'Retro Rewind',
    format: 'Street Fighter, Tekken & Mario Kart',
    when: 'Saturdays · 18:00',
    entry: 'R120 entry',
    image: retroArcade,
    imageAlt: 'Retro computers and consoles glowing pink and blue',
    tag: 'Community',
  },
  {
    id: 'birthday-takeover',
    title: 'Birthday Takeover',
    format: 'Private party + tournament host',
    when: 'Sundays · from 14:00',
    entry: 'From R1 500',
    image: eventConfetti,
    imageAlt: 'Confetti falling over a celebrating crowd',
    tag: 'Party',
  },
];

export const timeSlots: TimeSlot[] = [
  { time: '10:00', status: 'available' },
  { time: '11:30', status: 'available' },
  { time: '13:00', status: 'few' },
  { time: '14:30', status: 'available' },
  { time: '16:00', status: 'full' },
  { time: '17:30', status: 'few' },
  { time: '19:00', status: 'available' },
  { time: '20:30', status: 'available' },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: 'lb-1', rank: 1, driver: 'KYL_99', track: 'Kyalami', time: '1:42.318', vehicle: 'GT3' },
  { id: 'lb-2', rank: 2, driver: 'NeonDeon', track: 'Spa', time: '2:18.904', vehicle: 'GT3' },
  { id: 'lb-3', rank: 3, driver: 'TumiPace', track: 'Monza', time: '1:48.117', vehicle: 'F1' },
  { id: 'lb-4', rank: 4, driver: 'SL33PY', track: 'Suzuka', time: '2:01.552', vehicle: 'GT3' },
  { id: 'lb-5', rank: 5, driver: 'Vee_Rex', track: 'Silverstone', time: '1:59.083', vehicle: 'GT3' },
];

export const arenaStats = [
  { value: '24', label: 'Gaming stations' },
  { value: '1 Gbps', label: 'Dedicated fibre' },
  { value: '4.9', label: 'Player rating' },
  { value: '7', label: 'Days a week' },
];

export const values = [
  {
    title: 'Accessible by design',
    detail: 'Step-free access, adjustable seating, quiet hours and adaptive controllers on request.',
  },
  {
    title: 'Competitive, fairly',
    detail: 'Transparent brackets, certified referees and a zero-tolerance policy for toxicity.',
  },
  {
    title: 'Community first',
    detail: 'School programmes, women-in-esports nights and free practice space for local teams.',
  },
  {
    title: 'Premium, always',
    detail: 'Hardware refreshed every 18 months, spotless stations and fibre that does not flinch.',
  },
];

export const timeline = [
  {
    year: '2023',
    title: 'The doors open',
    detail: 'Jason Naidoo opens a six-station LAN lounge in Sandton with a borrowed coffee machine.',
  },
  {
    year: '2024',
    title: 'The arena expands',
    detail: 'The floor doubles to 24 stations, the first Friday Night Cup sells out in 40 minutes.',
  },
  {
    year: '2025',
    title: 'Going full motion',
    detail: 'VR bays, the hydraulic racing rig and the neon escape room join the arena.',
  },
  {
    year: '2026',
    title: 'The next level',
    detail: 'A dedicated esports academy and a second floor for school and corporate events.',
  },
];

/** The one illustrative data seam the app relies on for pricing. */
export const priceDisclaimer = 'Prices are illustrative and in South African rand (ZAR). Final quotes are confirmed by the arena team.';
