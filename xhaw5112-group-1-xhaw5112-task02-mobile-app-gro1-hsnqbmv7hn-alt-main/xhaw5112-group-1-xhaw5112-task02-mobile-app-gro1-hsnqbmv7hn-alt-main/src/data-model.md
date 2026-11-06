# Content/data model seam

Keep these collections in one data source so screens do not duplicate content:

- `packages`: Ultimate Gamer Pass, VIP Experience, Esports Training, Birthday Party Package.
- `experiences`: VR Experience, Racing Simulator, Escape Room Challenge.
- `coaches`, `events`, `bookingSlots`, `contactDetails`.
- Every sellable item needs a stable id, name, price in ZAR, description, features, image alt text, and CTA label.
- The quote engine consumes selected ids and returns subtotal, discount tier, discount amount, and final total.
