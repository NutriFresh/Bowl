# NutriFresh Bowl — GitHub-ready website

A clean, mobile-first healthy-food ordering site designed around NutriFresh Bowl's gym-first model. The design takes cues from modern healthy-food ordering experiences: strong product photography, simple menu cards, clear add-to-order actions, and a short scheduled-order journey. Examples reviewed included Sweetgreen's order-ahead/batched-delivery experience and FreshMenu's menu-first ordering layout.

## Final menu
- NutriFresh Oats Bowl — ₹99
- NutriFresh Protein Bowl — ₹99
- NutriFresh Basil Bowl — ₹89
- Nutri Power Sandwich — ₹79
- NutriFresh ABC Juice — ₹99 (Apple • Beetroot • Carrot)
- NutriFresh Banana Milk Shake — ₹89 (Milk • Banana • Dates • Chana)

### Combos
- Nutri Power Sandwich + ABC Juice — ₹169
- NutriFresh Protein Bowl + Banana Milk Shake — ₹169
- NutriFresh Protein Bowl + ABC Juice — ₹179

## Ordering rules implemented
- Orders must be placed by **11:59 PM on the day before the selected delivery date**.
- **Minimum order value: ₹149**.
- Customer selects delivery date and delivery slot.
- Gym name and delivery address are collected.
- The cart prevents checkout below ₹149.

## GitHub Pages
Upload all files/folders to a GitHub repository, then enable **Settings → Pages → Deploy from a branch → main → /(root)**.

## Logo
The supplied clean NutriFresh Bowl logo is included at `assets/logo.png` and is used in the header and footer.

## Images
The current site uses responsive remote food photography from Unsplash. For the strongest brand result before launch, replace these with your own NutriFresh Bowl product photographs that exactly match the final recipes.

## Payments / production
This package is a static GitHub Pages front end. Do not put Razorpay secret keys in the browser. For live payments, connect a Razorpay Payment Link or a secure backend/serverless function and then connect the order record to your preferred email/WhatsApp/order-management workflow. The checkout area is deliberately structured so that this can be added without redesigning the site.
