# NutriFresh Bowl — Final GitHub Pages Website

This package is the updated NutriFresh Bowl website with the requested ordering and booking flow.

## Updated in this version

- **Attached NutriFresh Bowl logo used** (`assets/nutrifresh-logo.png`) — the previous incorrect logo has been removed.
- **Minimum order: ₹149**, enforced in the order form.
- **Booking cutoff: 11:59 PM one day before delivery.**
- Delivery date cannot be selected for the same day; the website starts from the next day.
- **Gym / fitness centre details** are captured in the booking form.
- **Delivery date** is captured.
- **Three delivery slots:**
  - 8:00 AM – 9:00 AM
  - 9:00 AM – 10:00 AM
  - 10:00 AM – 11:00 AM
- **Razorpay payment option** is built into the booking flow.
- Updated prices:
  - NutriFresh Oats Bowl — **₹129**
  - NutriFresh Protein Bowl — **₹129**
  - NutriFresh Basil Bowl — **₹119**
  - Nutri Power Sandwich — **₹109**
  - NutriFresh ABC Juice — **₹99**
  - NutriFresh Banana Milk Shake — **₹89**
- Added an order cart with quantity controls and live total.
- Added next-day booking messaging, gym delivery positioning and mobile-responsive design.
- No external libraries or build process required.

## Important: Activate your live Razorpay payment link

Because this is a static GitHub Pages website, the package does **not** invent or falsely present a Razorpay account/payment link as live.

Before publishing, open:

`script.js`

Find:

`const RAZORPAY_PAYMENT_LINK = "PASTE_YOUR_RAZORPAY_PAYMENT_LINK_HERE";`

Replace the placeholder with your **actual live Razorpay Payment Link** from your Razorpay dashboard.

The website will then open that Razorpay page after the customer:
1. Adds products
2. Reaches the ₹149 minimum order
3. Enters name and mobile number
4. Enters gym / fitness centre
5. Selects delivery date
6. Selects one of the three delivery slots
7. Enters delivery address

### Important payment note
A static GitHub Pages site cannot securely create a dynamic Razorpay Checkout order on its own because that normally requires a server/backend. This package therefore uses a Razorpay Payment Link placeholder rather than pretending that a live dynamic checkout is already connected.

## GitHub Pages upload

Upload these items to your repository root:

- `index.html`
- `style.css`
- `script.js`
- `README.md`
- `assets/` (entire folder)

The `assets` folder contains the attached logo and all six product images.

Then go to GitHub:

**Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**

## Final structure

```text
NutriFresh_Bowl_GitHub_Website_Final/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── nutrifresh-logo.png
    ├── nutrifresh_oats_bowl.png
    ├── nutrifresh_protein_bowl.png
    ├── nutrifresh_basil_bowl.png
    ├── nutri_power_sandwich.png
    ├── nutrifresh_abc_juice.png
    └── banana_milk_shake.png
```
