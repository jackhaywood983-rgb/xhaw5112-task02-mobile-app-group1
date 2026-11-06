# Prompt 1 — Next Level Gaming & Esports Arena Mobile App

Build a faithful, production-quality mobile app for **Next Level Gaming & Esports Arena**, Johannesburg. Treat this brief as the source of truth and implement the supplied Figma references as closely as possible: do not replace the visual direction with a generic template or a different brand.

## Product and visual direction

Create a dark premium esports interface with a deep navy/near-black background, glassy dark cards, thin borders, subtle shadows, cyan/teal primary actions, and purple/magenta highlights. Use high-quality gaming-arena imagery with blue, violet, and magenta lighting. Use a bold condensed/modern heading style with highly readable body text. Keep spacing generous, corner radii rounded, controls touch-friendly, and contrast accessible. The UI should feel like the supplied mobile references: compact branded header, stacked content cards, strong cyan/purple CTAs, and a persistent bottom tab bar with Home, Events/Packages, Bookings/Calculator, and Profile/Contact destinations. Use responsive safe-area handling and support small phones through large phones.

Do not invent a new information architecture. Implement the following mobile screens and flows:

1. **Home** — hero image/banner, Next Level Gaming & Esports Arena branding, short welcome message, buttons for Packages, Experiences, and Book Now, plus featured events.
2. **About Us** — story: founded in 2023 by Jason Naidoo in Johannesburg; mission, vision, and arena goals.
3. **Packages summary** — cards for Ultimate Gamer Pass, VIP Experience, Esports Training, and Birthday Party Package. Every card has price, concise description, key features, and a clear action.
4. **Experiences summary** — cards for VR Experience, Racing Simulator, and Escape Room Challenge with price and key features.
5. **Ultimate Gamer Pass detail** — high-spec PC/console setups, high-speed fibre internet, snack voucher, tournament entry, and reserve CTA.
6. **VIP Gaming detail** — private soundproof booths, equipment, dedicated gaming assistant, catering options, priority booking, imagery, and booking CTA.
7. **Esports Training detail** — coach profiles, strategy/gameplay development, team communication facilities, schedule/booking form.
8. **Birthday Party detail** — party lounge, catering packages, multiplayer tournament rules, and preferred booking date selector.
9. **VR Experience detail** — equipment/specifications, VR game catalogue, safety guidelines, and available time-slot selection.
10. **Racing Simulator detail** — hydraulic simulator hardware, racing tracks, live leaderboard, and reserve-session CTA.
11. **Calculate Fees** — checkbox selection for packages/services; calculate subtotal; apply the relevant 5%, 10%, or 15% discount tier; collect customer details; show a quotation breakdown and final total. The calculation must be deterministic, testable, and transparent to the user.
12. **Contact Us** — Johannesburg location, operating hours, validated name/email form, phone and email direct-contact options.

## Interaction and quality requirements

Use reusable components for the app shell, branded header, bottom tabs, hero, card, price pill, feature list, form fields, date picker, time-slot selector, quote summary, toast/error states, and loading/empty states. Add navigation transitions that are subtle rather than distracting. Make all actions keyboard/screen-reader accessible where supported, use labels rather than placeholder-only fields, provide meaningful image alternatives, respect reduced-motion preferences, and ensure tap targets are at least 44–48 px. Validate email and required fields inline. Never let invalid form values silently produce a quote.

Use local mock data for packages, experiences, coaches, slots, events, and contact information so the prototype works without a backend. Keep content and prices in a single data layer. Use South African rand formatting (`R`), and clearly label any values that are illustrative. Make the fee engine easy to replace with an API later. Include unit tests for discount tiers, totals, validation, and at least one navigation smoke test.

## Recommended implementation

Use React Native with Expo and TypeScript. Organize by `app/` or `src/` routes/screens, `components/`, `data/`, `theme/`, `lib/feeCalculator`, and tests. Use a reliable navigation library and keep the project runnable with documented commands. Do not hard-code duplicated content inside multiple screens. Provide a README with setup, architecture, accessibility checks, known assumptions, and ownership.

## Team ownership and Git history

Keep these names visible in the README and in the commit history:

- **Darshil Singh (Team Lead, ST10510339)** — mobile app shell, navigation/bottom tabs, design tokens, reusable UI components, fee-calculation integration and release coordination.
- **Ethan Haywood (ST10530024)** — package/experience detail screens, booking/date/time-slot interactions, image/content treatment, and mobile visual QA.
- **Jovan David (ST10510821)** — data models/mock content, forms and validation, accessibility hardening, tests, documentation, and final QA.

Preserve a clear, chronological history with descriptive commits. Each commit must identify the responsible person in the author or message, and no one should claim work outside their assigned area. Use this suggested six-commit sequence: (1) Darshil project foundation and theme, (2) Darshil navigation and shared components, (3) Ethan package/experience screens, (4) Ethan booking interactions and visual polish, (5) Jovan data/forms/fee tests/accessibility, (6) Jovan final QA and documentation.

## Definition of done

The app must run from a clean install, all 12 flows must be reachable from navigation, the fee calculation and validation must work, the mobile UI must visibly match the reference direction, content must be readable at accessible contrast, and the README must explain exactly how each team member contributed. Do not omit screens because a backend is not available; use mock data and clearly marked integration seams instead.
