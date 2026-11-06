# Accessibility and validation notes

Implementation evidence for the accessibility requirements in the brief.

## Labels and roles

- Bottom tabs use `accessibilityRole="tab"` with `accessibilityState.selected`; icons are decorative.
- Offering cards, event cards, contact methods, directions and coach options are buttons/links/radios with descriptive labels that include price or destination.
- Images from `expo-image` carry `accessibilityLabel` from the content layer; decorative glows and dividers are excluded.
- Quote checkboxes use `accessibilityRole="checkbox"` and expose `checked`; time slots/dates use radio roles with selected/disabled states.

## Forms and validation

- Visible labels above every field; placeholders are examples, never the label.
- Required fields are marked with `*` and have inline error text announced through `accessibilityLiveRegion="polite"`.
- Submit failures announce a summary through `AccessibilityInfo.announceForAccessibility`; success confirmations are also announced.
- Quote submission is impossible without a valid name, email and at least one booking; invalid input never renders a quote.
- Date and time-slot selection are validated with explicit, visible errors.

## Touch, motion and contrast

- Controls are 44–52 px tall, tab targets 52 px; hit slop is added to icon-only buttons.
- `useReducedMotion` listens to the OS preference; entrance animations are skipped and stack transitions become a fade.
- Colour palette checked against the `#05070E` base: body `#A3ACC9`, headings `#F5F7FF`, cyan `#3BE8FF` and success `#5CE6A4` all provide strong contrast.
- Font scaling is allowed; display headings cap at 1.25× to avoid clipping, body copy scales further.

## Web and keyboard

- All actions are focusable with a visible default focus ring; custom tab bar and buttons use Pressable semantics.
- Horizontal date/event rails scroll without trapping focus; vertical screens use a single scroll container.
- Form labels and roles appear correctly in the browser accessibility tree (checked during the visual pass).

## Automated coverage

- `tests/validation.test.ts` covers name, email, message, date and slot rules.
- `tests/navigation.test.tsx` renders the app and exercises all four tab destinations.
