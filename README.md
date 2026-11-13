# LUMEN — Luxury Lifestyle & High-End Technology Platform

A premier, fully responsive, five-page e-commerce web platform engineered with **100% pure semantic HTML5, modern CSS3, and modular ES6+ JavaScript**.

Designed to rival the digital presence of world-class international brands like Apple, Bang & Olufsen, and Nike.

---

## 💎 Project Highlights & Architecture

- **Zero Framework Overhead**: Built completely from scratch without React, Vue, Angular, Bootstrap, or Tailwind CSS.
- **Modern CSS3 Design System**:
  - Modular CSS tokens for colors, fluid typography (`clamp()`), elevations, and borders.
  - Glassmorphic navigation header (`backdrop-filter: blur(16px)`).
  - Responsive layout built with flexible **CSS Grid** and **CSS Flexbox**.
  - Smooth micro-interactions, hover transformations, and tactile feedback.
- **Reactive State Management (`store.js`)**:
  - Event-driven store with automatic `localStorage` synchronization across all pages.
  - Real-time shopping bag and wishlist counters in header and drawers.
  - Comprehensive price, coupon, shipping, and sales tax calculation engine.
- **Universal Mobile-First Responsiveness (`responsive.css`)**:
  - Strict zero horizontal overflow (`overflow-x: hidden`).
  - Tested across viewports from ultra-compact smartphones (320px) to ultra-wide displays (1440px+).
  - Off-canvas mobile navigation drawer with touch gestures.
  - Touch-friendly controls (minimum 44x44px hit targets).

---

## 📑 5 Complete Connected Pages

### 1. Home Page (`index.html`)
- **Hero Showcase**: High-impact split banner with headline typography, social proof rating avatars, and floating glassmorphism product card.
- **Value Trust Bar**: 4 key buyer protections (Free Global Courier Delivery, 30-Day Home Trial, 2-Year Full Warranty, 24/7 Concierge Support).
- **Curated Category Grid**: 4 visual cards with hover zoom linking directly to filtered collections.
- **Best-Sellers Showcase**: Interactive product cards with dynamic rating stars, Quick View modal triggers, and instantaneous Add-to-Bag buttons.
- **Materials & Engineering Spotlight**: Editorial split showcase highlighting sustainable circular metallurgy.
- **Promotional Countdown Banner**: Working JavaScript countdown clock (`HH:MM:SS`) with instant coupon copy action.
- **Verified Customer Testimonials**: Client feedback cards with verified purchaser tags and location badges.
- **LUMEN Journal Subscription**: Form with regex email validation and toast alerts.

### 2. Shop & Catalogue (`shop.html`)
- **Filter Sidebar**:
  - Real-time search keyword filter.
  - Multi-select category checkboxes with live product counts.
  - Price range slider ($50 to $1,000) with dynamic price readout.
  - Minimum customer rating filter (4.8★ & 4.5★).
  - "In Stock Only" toggle switch.
  - "Clear All Filters" reset button.
- **Sorting Toolbar**: Instant reordering by Featured, Price (Low-to-High / High-to-Low), Customer Rating, and New Releases.
- **Empty State**: Friendly fallback state with an automatic filter reset button when queries yield no results.
- **Load More Pagination**: Dynamic incremental product loading.
- **URL Parameter Support**: Deep-linking support (e.g. `shop.html?category=audio`, `shop.html?search=horizon`, `shop.html?filter=wishlist`).

### 3. Product Details Page (`product.html`)
- **Dynamic Product Loading**: Automatically loads any product via query parameter (e.g. `product.html?id=lmn-01` to `lmn-16`).
- **Interactive Image Gallery**: High-res multi-angle thumbnail strip with hover zoom lens preview.
- **Color Finishes & Configurations**: Interactive swatches and specification pill selectors that update state in real-time.
- **Quantity Stepper**: Inventory-bounded stepper (`-`, number, `+`).
- **Action Suite**:
  - "Add to Shopping Bag" (with animated confirmation state and slide-out mini-cart).
  - "Instant Checkout" (adds to bag and redirects directly to payment).
  - "Add to Wishlist" (toggle bookmark).
- **Four Tabbed Modules**:
  1. Overview & Bulleted Highlights.
  2. Technical Specifications table.
  3. Shipping & Return policies.
  4. Verified Client Reviews with a working interactive "Submit Review" form.
- **Related Products Ecosystem**: 4 complementary product recommendations.

### 4. Shopping Bag & Checkout (`cart.html`)
- **Cart Overview Table**:
  - Selected item cards/rows with product thumbnail, variant name, unit price, quantity stepper, item subtotal, and deletion button.
  - Free Shipping Progress Meter with dynamic visual progress bar ($150 threshold).
  - Promotional Coupon Input with live discount calculation.
- **Four-Step Simulated Checkout**:
  1. *Customer Contact*: Full name, email, phone number.
  2. *Delivery Address*: Street, city, zip code, country selector.
  3. *Shipping Method*: Standard Ground (Free), Priority Air ($15), VIP Overnight ($25).
  4. *Encrypted Payment*: Credit card formatting with auto-spacing, expiry formatting, CVV, and "Auto-Fill Demo Card" helper.
- **Order Confirmation Receipt Modal**:
  - Unique generated Order ID (`#LMN-XXXXXX`).
  - Itemized receipt breakdown and delivery estimate.
  - Clears `localStorage` cart upon success.

### 5. About Us & Studio Support (`about.html`)
- **Brand Manifesto**: The story of LUMEN and design philosophies.
- **Impact Metrics**: Numbers that define the studio (50k+ creators, 99.4% CSAT, 100% carbon neutral).
- **Interactive FAQ Accordion**: Expandable answers addressing shipping, trial period, and repairs.
- **Concierge Support Grid**:
  - Global atelier details (Chicago and Berlin headquarters).
  - Stylized interactive Google Maps card with coordinates.
  - Interactive Contact Form with real-time field validation and feedback toasts.

---

## 🏷️ Test Promo Codes

You can enter the following codes during checkout or in the cart summary:

| Promo Code | Discount Type | Description |
| :--- | :--- | :--- |
| **`LUMEN20`** | 20% Off | 20% off your entire order |
| **`WELCOME10`** | $10 Flat | $10 off first order |
| **`FREESHIP`** | Free Shipping | Free Express Courier Delivery regardless of total |

---

## 🚀 How to Run Locally

Because the project is built with standard ES6 modules (`import`/`export`), it is recommended to view the project using a local HTTP server.

### Option 1: Built-in 1-Click Windows PowerShell Server (Zero Dependencies!)
On Windows, simply right-click `serve.ps1` and select **"Run with PowerShell"**, or open PowerShell in the project directory and run:

```powershell
.\serve.ps1
```
This launches a high-speed local HTTP server on `http://localhost:8080` using Windows native .NET components and immediately opens your browser. No Node, Python, or external software required!

### Option 2: Python Built-In Server
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in any web browser.

### Option 3: Node.js `npx serve` or `http-server`
```bash
npx serve .
# or
npx http-server -p 8000
```

### Option 4: VS Code Live Server
Right-click `index.html` inside Visual Studio Code and select **"Open with Live Server"**.

---

## 📂 Project Structure

```
├── index.html            # Page 1: Home Page & Brand Showcase
├── shop.html             # Page 2: Product Catalogue with Filter & Sort
├── product.html          # Page 3: Dynamic Product Details Page
├── cart.html             # Page 4: Shopping Bag & Simulated Checkout
├── about.html            # Page 5: About Studio, FAQ Accordion & Contact
│
├── css/
│   ├── style.css         # Design tokens, typography, glassmorphism & components
│   └── responsive.css    # Breakpoints, mobile menu drawer, and touch adaptations
│
├── js/
│   ├── data.js           # 16 detailed realistic products, categories, coupons & FAQs
│   ├── store.js          # Reactive store, calculations, and localStorage persistence
│   ├── ui.js             # Toasts, mini-cart drawer, quick view modal & search
│   ├── main.js           # Universal header, badges, active links & newsletter
│   ├── shop.js           # Catalogue filtering, search, sorting & pagination
│   ├── product.js        # PDP gallery zoom, tabs, variants & review submission
│   ├── cart-checkout.js  # Cart table updates, promo codes & checkout simulation
│   └── contact.js        # FAQ accordion logic and contact form validation
│
└── README.md             # Documentation and usage guide
```

---

## 🛡️ Browser Compatibility

Tested and compatible with all modern evergreen browsers:
- Google Chrome 100+
- Apple Safari 15+
- Mozilla Firefox 100+
- Microsoft Edge 100+
