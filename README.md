# Next Level Gaming & Esports Arena — Mobile App

A production-quality React Native (Expo) app for **Next Level Gaming & Esports Arena**, Sandton, Johannesburg. The app implements the full twelve-flow mobile brief: packages, experiences, booking requests, a transparent fee calculator and contact details, wrapped in the dark neon visual language from the design reference.

| | |
|---|---|
| **Platform** | React Native · Expo SDK 58 · TypeScript |
| **Navigation** | React Navigation 7 (native stack + custom bottom tab bar) |
| **Tests** | Jest + Testing Library (30 passing) |
| **Currency** | South African rand (`R`) |
| **Backend** | None required — local mock data with a single integration seam |

![Home screen](screenshots/home.png)

## Run it

Requires Node.js `22.13+` or `24.3+` (React Native 0.88's supported range) and npm.

```bash
npm install
npm start          # Expo dev server — scan the QR code with Expo Go
npm run android    # open on an Android emulator/device
npm run ios        # open on an iOS simulator
npm run web        # browser preview
npm test           # 30 unit + navigation tests
npm run typecheck  # tsc --noEmit
```

From a clean install the app opens on Home. All twelve flows are reachable from the bottom tabs and cards; no account, API key or backend is needed.

## The twelve flows

| # | Flow | Where |
|---|---|---|
| 1 | Home — hero, welcome, Packages / Experiences / Book Now, featured events | **Home** tab |
| 2 | About Us — 2023 story, founder, mission, vision, goals, timeline | Header info button or Home story card |
| 3 | Packages summary — Ultimate, VIP, Esports Training, Birthday Party | **Explore → Packages** |
| 4 | Experiences summary — VR, Racing Simulator, Escape Room | **Explore → Experiences** |
| 5 | Ultimate Gamer Pass detail — hardware, fibre, snack voucher, tournament entry, reserve | Ultimate Gamer Pass card |
| 6 | VIP Gaming detail — private soundproof booth, assistant, catering, priority booking | VIP card |
| 7 | Esports Training detail — coach profiles, schedule form, date and slot selection | Esports Training card |
| 8 | Birthday Party detail — party lounge, catering, tournament rules, preferred date | Birthday Party card |
| 9 | VR Experience detail — equipment specs, catalogue, safety rules, time slots | VR card |
| 10 | Racing Simulator detail — hydraulic rig, six tracks, live leaderboard, reserve | Racing card |
| 11 | Calculate Fees — multi-select, 5% / 10% / 15% tiers, quote breakdown, customer details | **Book** tab |
| 12 | Contact Us — location, hours, directions, validated enquiry form | **Arena** tab |

Detail flows are data-driven: one package detail screen and one experience detail screen render every offering from the same data layer, with extra blocks (coaches, date picker, catalogue, leaderboard) switched on by content flags.

## Architecture

```
App.tsx                     font loading, splash screen, providers
index.ts                    Expo entry point
src/
  components/               reusable shell, header, tabs, hero, cards, fields,
                            date/time selectors, quote summary, notices, states
  data/
    content.ts              single mock-data layer (offers, coaches, events, hours)
    types.ts                content interfaces
  lib/
    feeCalculator.ts        deterministic quote engine + discount tiers
    validation.ts           name, email, message and booking-field rules
    format.ts               platform-stable ZAR formatting
    dates.ts                upcoming-date labels for selectors
    useReducedMotion.ts      OS reduced-motion preference
  navigation/               typed stacks/tabs and the custom bottom bar
  screens/                  Home, About, Explore, two detail screens,
                            Calculate Fees, Contact
  theme/tokens.ts           colour, gradient, type, spacing, radius and shadow tokens
tests/                      fee engine, validation/formatting, navigation smoke
docs/                       design reference, ownership, implementation notes
PROMPT.md                   original implementation brief
```

Every screen consumes the same tokens and components. Prices, names, hours and imagery live in `src/data/content.ts`; swapping the mock data for an API means replacing that one module while keeping the components unchanged.

### Fee engine

The calculator is deterministic and testable:

- 1 booking → 0% · 2 → **5%** · 3 → **10%** · 4 or more → **15%**.
- Money is calculated in cents internally and rounded once, so totals never drift.
- The quotation shows each line, subtotal, the active tier, the discount and the final total, plus a hint for the next tier.
- Invalid selections or contact details never produce a quote; inline errors and screen-reader announcements explain what is missing.

`src/lib/feeCalculator.ts` is framework-free and ready to move behind an API later.

### Design system

Deep navy/near-black (`#05070E`) base, glass panels with thin borders, cyan/teal primary actions, purple/magenta accents, Barlow Condensed display type and Inter body text. Rounded cards, generous spacing, 44–52 px controls, gradient CTAs and a persistent glassy bottom tab bar. Layouts cap content at 560 px on tablets/web while stretching cleanly on small phones; all photography is bundled locally under `assets/images/`.

## Accessibility

- Every interactive control has a role, label and, where relevant, selected/checked/disabled state.
- Tap targets are at least 44 px; primary CTAs are 52 px tall.
- Form fields use visible labels (never placeholder-only), inline errors and `accessibilityLiveRegion`/announcements on submit.
- Images carry descriptive alternatives; decorative imagery is excluded from the accessibility tree.
- Reduced-motion preferences disable entrance and navigation animations; press feedback remains subtle.
- Contrast was checked against the dark base for body, muted, cyan and green text.
- Web builds are keyboard navigable with visible focus and semantic headings.

See [tests/accessibility-notes.md](tests/accessibility-notes.md) for the implementation checklist.

## Quality checks

```bash
npm run typecheck                          # clean
npm test                                   # 30/30 passing
npx expo export --platform android         # native bundle builds
npx expo export --platform ios             # native bundle builds
npx expo export --platform web             # web bundle builds
```

Tests cover every discount tier and total, cents rounding, quote references, all validation rules, ZAR formatting, date generation and a navigation smoke test across all four tabs. The acceptance checklist is recorded in [tests/acceptance-checklist.md](tests/acceptance-checklist.md).

## Assumptions and known limitations

- **Illustrative business details.** The brief names Johannesburg and founder Jason Naidoo but does not supply verified prices, phone/email, address or hours. They live in one data module and are labelled illustrative in the UI.
- **No backend.** Booking requests and quotes are confirmed locally with a reference code; nothing is sent or stored. Integration seams are isolated in `src/data` and `src/lib`.
- **Mock availability.** Time-slot availability and the racing leaderboard are seeded demo data, not a live booking system.
- **Photography** is bundled from Unsplash for the prototype (see [docs/IMAGE-CREDITS.md](docs/IMAGE-CREDITS.md)); replace with commissioned arena photography before launch.
- **Expo Go on a physical phone** needs the phone and development machine on the same network; use a tunnel if the LAN blocks Metro.

## Team ownership and contributions

| Developer | Student number | Contributed |
|---|---|---|
| **Darshil Singh** | ST10510339 | Project foundation and Expo configuration, design tokens and visual direction, app shell, navigation and custom bottom tab bar, shared header/hero/button/card primitives, Home and Explore shells, fee-calculator integration and release coordination. |
| **Ethan Haywood** | ST10530024 | Package and experience card treatment, all package/experience detail flows, coach/date/time-slot booking interactions, imagery selection and mobile visual QA. |
| **Jovan David** | ST10510821 | Data model and mock content, forms and inline validation, deterministic fee engine, accessibility hardening, unit/navigation tests, documentation and final QA. |

Commit history is scoped to these ownership boundaries and identifies the responsible developer in each commit message. See [docs/TEAM-OWNERSHIP.md](docs/TEAM-OWNERSHIP.md) and [docs/GIT-HISTORY.txt](docs/GIT-HISTORY.txt).

## More screens

| Explore | Calculate fees |
|---|---|
| ![Explore](screenshots/explore.png) | ![Calculator](screenshots/calculate.png) |

| Package detail | Contact |
|---|---|
| ![Package detail](screenshots/package-detail.png) | ![Contact](screenshots/contact.png) |

| Coach and date booking | Quote confirmation |
|---|---|
| ![Coach booking](screenshots/coach-booking.png) | ![Quote confirmation](screenshots/quote-confirmation.png) |

The original brief remains in [PROMPT.md](PROMPT.md), with design notes in [docs/DESIGN-REFERENCE.md](docs/DESIGN-REFERENCE.md).
