# Bissgro – Next.js

This project has been converted to **Next.js** (App Router).

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Assets**
   - Static assets are in `public/assets/` (copied from the original `assets/` folder).
   - Favicons, logo, images, etc. are served from `/assets/...`.

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about-us` | About Us |
| `/contact-us` | Contact Us |
| `/plans` | Pricing & Plans (Razorpay checkout) |
| `/privacy-policy` | Privacy Policy |
| `/terms-conditions` | Terms & Conditions |
| `/refund-policy` | Refund Policy |
| `/shipping-policy` | Shipping & Delivery Policy |

## Features

- **Header / Footer**: Shared layout; header fixed, full-width.
- **Chatbot**: Lead generation flow (service → info → WhatsApp).
- **WhatsApp float**: Left side; chatbot on right.
- **Plans**: Tabs (Web / App / SEO), pricing cards, checkout modal.
- **Razorpay**: Checkout via Razorpay; invoice to WhatsApp.
- **Contact form**: Submits to WhatsApp.
- **Reviews slider**: Client testimonials on home.

## Razorpay

- Key is set in `components/CheckoutModal.js` (`RAZORPAY_KEY`).
- Use **Test** keys for development, **Live** for production.
- **Secret** key must never be used in frontend; use it only on your backend.

## Original HTML/CSS/JS

- The previous static site (`.html`, `style.css`, `script.js`, `payment.js`) is still in the project.
- The Next.js app uses the same `style.css` (via `app/globals.css`).
- You can remove the old HTML files and `script.js` / `payment.js` once you are fully on Next.js.
