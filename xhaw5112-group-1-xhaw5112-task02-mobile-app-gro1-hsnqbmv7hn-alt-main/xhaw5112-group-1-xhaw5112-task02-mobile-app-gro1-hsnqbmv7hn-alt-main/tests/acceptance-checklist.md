# Acceptance checklist

- [x] All 12 required screens/routes are reachable.
  - Home, About, Packages, Experiences, four package detail flows, three experience detail flows, Calculate Fees and Contact. Navigation smoke test covers all four tabs; detail flows are opened from their cards.
- [x] Package and experience cards show price, summary, features, and action.
  - `OfferingCard` shows image + alt, badge, price, tagline, duration, capacity and a detail CTA.
- [x] Detail flows expose booking/slot/date interactions where required.
  - Esports Training has coach selection + schedule; Birthday Party and VR have date and time-slot selection; Racing has a reserve-session CTA and leaderboard.
- [x] Calculator supports selection, customer details, 5%/10%/15% tiers, and quote breakdown.
  - `tests/feeCalculator.test.ts` covers every tier, totals, rounding, line order and references; the UI shows the live breakdown and next-tier hint.
- [x] Contact form validates required name and email.
  - `tests/validation.test.ts` covers names, emails, messages and booking fields; inline errors plus live announcements are wired into both forms.
- [x] Responsive layouts match the dark neon reference direction.
  - Verified at 390×844 (web preview) and exported for Android/iOS; content is capped at 560 px on wide screens.
- [x] Focus states, labels, alt text, contrast, and tap targets are checked.
  - See `accessibility-notes.md`; primary actions are 52 px, tab targets are 52+ px.
- [x] Clean-install and test commands are documented.
  - README "Run it" and "Quality checks"; `npm install`, `npm test`, `npm run typecheck`, platform exports.

Verification run:

- `npx tsc --noEmit` — passed.
- `npx jest --watchAll=false` — 30/30 tests passed across 3 suites.
- `npx expo export --platform android` — bundle exported (`index-*.hbc`, 2.6 MB).
- `npx expo export --platform ios` — bundle exported (`index-*.hbc`, 2.6 MB).
- `npx expo export --platform web` — bundle exported.
