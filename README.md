# Dasterkhwan | دسترخوان

Online menu + WhatsApp ordering website for a Pakistani restaurant.
Plain HTML / CSS / JavaScript — no build step. Open `index.html` in a browser, or host it free on GitHub Pages.

## Files

| File | What it holds |
|---|---|
| `index.html` | Home page layout (header, hero, categories, menu, why us, steps, WhatsApp CTA, footer, cart drawer) |
| `css/styles.css` | All styling. Colours and fonts are at the top in `:root` |
| `js/config.js` | **Restaurant settings** — WhatsApp number, phone, address, opening hours, currency, delivery fee, order-number prefix |
| `js/menu-data.js` | **Menu** — categories and dishes (name, Urdu name, description, price, image, popular, available) |
| `js/cart.js` | Cart store (add / change quantity / remove / total), saved in the browser |
| `js/order.js` | Price formatting, order number generation, WhatsApp message builder |
| `js/app.js` | Renders the page and wires up the buttons |

## Common edits

- **WhatsApp number:** `js/config.js` → `whatsappNumber` (digits only, e.g. `923001234567`) and `phoneDisplay`.
- **Add a dish:** `js/menu-data.js` → copy one item block, give it a new unique `id`, set `category` to one of the category ids.
- **Remove / hide a dish:** delete its block, or set `available: false`.
- **Change a price:** edit `price` (a number, no commas).
- **Show on the home page "Popular" list:** set `popular: true` (the first 6 are shown).
- **Images:** `image` can be any image URL or a local file like `images/karahi.jpg`. If an image fails to load, the card shows the category emoji instead.

## How ordering works now

1. Customer picks a quantity and taps **Add to Cart** (cart is saved in the browser).
2. The cart drawer (bag icon in the header) lets them change quantities or remove items and shows the total.
3. **WhatsApp پر آرڈر بھیجیں** opens WhatsApp with the full order: order number (e.g. `DK-261001-4821`), items, quantities, line totals and grand total.

## Ready for the next steps

- **Full menu page:** reuse `DK.menuItems`, `DK.categories` and the dish-card markup in `js/app.js`.
- **Checkout form (name, phone, address, notes, delivery/pickup):** `DK.order.buildMessage()` already accepts `customer`, `type`, `notes` and `deliveryFee` — pass the form values in `sendOrder()` in `js/app.js`.
- **Admin panel:** replace `js/menu-data.js` with data loaded from an API or database; the rest of the site only reads `DK.categories` and `DK.menuItems`.

## Local preview

Double-click `index.html`, or run a local server:

```
node .claude/serve.js
```

then open http://localhost:5173.

Photos: [Unsplash](https://unsplash.com) (free licence). Swap them for the restaurant's own photos when available.
