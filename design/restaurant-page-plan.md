# Restaurant / Café mode: page plan + image prompts

Source of truth: the app (`YourBillBookApp`), restaurant shop type. Real reference
screenshots: `public/assets/WhatsApp Image 2026-11-16 at 6.25.*.jpeg` (layout reference only;
they have test data and must not ship as-is).

---

## 1. Demo café (fake data used in every image)

**Annapurna Café**: a small chai-and-snacks café, 10 tables.

| Menu item | Price | Stock |
|---|---|---|
| Masala Chai | ₹20 | not tracked |
| Filter Coffee | ₹30 | not tracked |
| Samosa (2 pc) | ₹30 | not tracked |
| Veg Sandwich | ₹60 | not tracked |
| Masala Dosa | ₹80 | not tracked |
| Paneer Kathi Roll | ₹90 | not tracked |
| Veg Thali | ₹150 | not tracked |
| Cold Coffee | ₹70 | not tracked |
| Sweet Lassi | ₹50 | not tracked |
| Gulab Jamun (2 pc) | ₹40 | not tracked |
| Mineral Water 1 L | ₹20 | tracked: 24 pcs left |
| Cold Drink 750 ml | ₹45 | tracked: 12 pcs left |

**Tables:** T1 to T8, Terrace, Family (10 total; shows the custom table names feature).
Occupied right now: T2 (3 items · ₹160), T3 (5 items · ₹540), T5 (2 items · ₹110), Family (4 items · ₹390).

**Table T3 order (KOT #12):** Masala Dosa ×2 (₹160), Paneer Kathi Roll ×2 (₹180),
Cold Coffee ×2 (₹140), Masala Chai ×1 (₹20), Gulab Jamun ×1 (₹40) = **₹540**.

**Today on Home:** Sales ₹6,480 · Bills 38 · Expenses ₹850 · Cash ₹2,940 · UPI ₹3,180 · Card ₹360
(Cash + UPI + Card = Sales).

---

## 2. Page: `/restaurant` (nav label "Restaurant & Café")

```
┌──────────────────────────────────────────────────────────────┐
│ HERO                                                         │
│  "Tables, KOT and the bill.          [ café counter vector ] │
│   All on one phone, even offline."   [ phone: tables floor  ]│
│  ✓ Send KOT to the kitchen printer                           │
│  ✓ See which tables are busy                                 │
│  ✓ Pay once · ₹___ on Google Play                            │
│  [Get it on Google Play]   Turn it on in setup ↓             │
├──────────────────────────────────────────────────────────────┤
│ TICKER: Chai stall ✶ Café ✶ Dhaba ✶ Restaurant ✶ Bakery café │
│         ✶ Juice bar ✶ Sweet shop ✶ Canteen ✶ Food stall       │
├──────────────────────────────────────────────────────────────┤
│ "An evening at Annapurna Café" (scroll story, reuses the     │
│  DayAtCounter pattern with café steps + new screens)         │
│  7:30 pm  Floor fills up        → resto-tables               │
│  7:42 pm  Take the order        → resto-sale                 │
│  7:43 pm  Send KOT              → resto-cart                 │
│  8:05 pm  Table wants more      → resto-kot (edit + reprint) │
│  8:40 pm  Serve · Bill          → resto-checkout             │
│  8:41 pm  Receipt / PDF         → resto-receipt              │
│  11:00 pm Day closed            → resto-home                 │
├──────────────────────────────────────────────────────────────┤
│ KOT vs BILL (built in HTML/CSS, not an image)                │
│  ┌─ KOT #12 ──────┐   ┌─ Annapurna Café ──┐                  │
│  │ Table T3       │   │ INV-0412  T3      │                  │
│  │ 2  Masala Dosa │   │ Masala Dosa 2 160 │                  │
│  │ 2  Kathi Roll  │   │ ...               │                  │
│  │ --- kitchen ---│   │ TOTAL ₹540  [QR]  │                  │
│  └────────────────┘   └───────────────────┘                  │
│  "Kitchen sees items, not prices. Same printer for both."    │
├──────────────────────────────────────────────────────────────┤
│ FEATURE GRID (bento, vector spot art)                        │
│  Tables floor · Takeaway / walk-in sale · Edit / delete KOT  │
│  Full-table reprint · Menu: dishes unlimited, drinks counted │
│  Same printer for bills + KOT · Switch shop ↔ café anytime    │
├──────────────────────────────────────────────────────────────┤
│ "Everything from the shop app comes along"                   │
│  Khata · UPI QR on bill · Split pay · Discount · PDF share · │
│  Expenses · Backup · PIN · Hindi labels (core screens)       │
├──────────────────────────────────────────────────────────────┤
│ FAQ (café-specific)                                          │
│  Separate kitchen printer? · Can waiters use their own       │
│  phones? (no → StoreMitr) · Takeaway only? · Track stock of  │
│  drinks? · Switch back to shop mode? · Hindi for tables?     │
├──────────────────────────────────────────────────────────────┤
│ CTA: "Open the kitchen. Start billing."  price + Play badge  │
└──────────────────────────────────────────────────────────────┘
```

### Site-wide changes that come with it
- Add "Restaurant & Café" to `nav` and the sitemap.
- Homepage: a short teaser band ("Run a café? Turn on restaurant mode.") linking to `/restaurant`.
- `site.ts`: `shortDescription` and features mention cafés, tables and KOT; add a single `price` field.
- **Price everywhere it fits:** hero bullet, Pay-once card, YourBillBook vs StoreMitr ("₹___ one-time"), CTA, `/features`.
- Shop ticker: add Café, Dhaba, Chai stall.
- `layout.tsx` keywords: restaurant billing, KOT, café POS, table billing.
- `/features`: a new "Restaurant & Café" block with a phone screenshot.
- FAQ + `/support`: a restaurant-mode entry.

### Known app quirk (not changing the app)
The **Menu** tab shows "0 pcs" under dishes with stock tracking off. The Sale grid correctly hides it.
The website doesn't depend on that screen; prompt S7 below is optional for that reason.

---

## 3. Image prompts

### How to use
- **Screens (S1–S8):** use an image model that renders text well (e.g. ChatGPT image / Gemini).
  **Attach the matching real screenshot as a reference** so the layout stays true to the app.
  Output **720 × 1600 portrait PNG**. Check every number and spelling afterwards; regenerate if garbled.
- **Food photos (P):** one prompt, run per item, square 1024 × 1024.
- **Vector art (V1–V6):** attach `public/img/art/counter.webp` and `khata.webp` as **style references**.
- Drop finished files in `design/source-assets/restaurant/`; I'll convert to webp and wire them up.

### Shared block A: paste at the top of every screen prompt (S1–S8)
```
A clean, high-resolution Android phone screenshot of the "YourBillBook" billing app in
restaurant mode, 720x1600 portrait, flat UI, no device frame, no hands. Match the layout
of the attached reference screenshot exactly; only replace the data.
Style: Material Design, light grey-green background #F3F5F3, white rounded cards with a
hairline grey border, dark green primary #1E7B3F, Roboto font, Indian rupee ₹ with Indian
digit grouping (₹1,03,870 style).
Status bar: "9:41", full wifi, full signal, "100%" battery.
App bar: green two-leaf logo on the left, a grey pill with the store name
"Annapurna Café", and on the right a light pill with a printer icon, a small green check
badge and the text "KP-80".
Bottom tab bar: Home, Sale, Menu, Orders, More (icons: house, cart, food tray with bell,
clipboard list, hamburger); the active tab icon and label are green.
All text must be spelled exactly as given. No lorem ipsum, no extra UI.
```

### Shared block B: food photo look (for in-app tiles)
```
Studio food photo, top-down 3/4 angle, single serving on a plain white background,
soft even daylight, no props, no text, no hands, no logos, centered with margin,
appetising but realistic Indian café portion.
```

---

**S1 · `resto-home`** (ref: `6.25.14 PM.jpeg`)
```
[Block A] Home tab active.
Below the app bar, NO promo banner. A row of four rounded square shortcut tiles with a coloured
rounded icon and a label: "Tables" (green, table icon), "New sale" (teal, calculator icon),
"Menu" (blue, food-tray icon), "Orders" (purple, clipboard icon).
Then a light green-grey panel titled "TODAY" with segmented chips "Today" (selected, solid
green, white text), "7 days", "30 days", "Range".
Six white stat cards in a 2-column grid, each with a pale tinted icon square:
"Sales ₹6,480" | "Bills 38"
"Expenses ₹850" | "Cash ₹2,940"
"UPI ₹3,180" | "Card ₹360"
```

**S2 · `resto-tables`** (ref: `6.25.16 PM.jpeg`)
```
[Block A] Orders tab active.
Search field "Search table or item"; to its right a 3-button segmented control (table icon
selected green, receipt icon, food-tray icon).
Small heading "Tables" with subtitle "4 occupied · tap to take order".
3-column grid of rounded table tiles:
Row 1: "T1 / Free" · "T2 / 3 items / ₹160" · "T3 / 5 items / ₹540"
Row 2: "T4 / Free" · "T5 / 2 items / ₹110" · "T6 / Free"
Row 3: "T7 / Free" · "T8 / Free" · "Terrace / Free"
Row 4 full width: "Family / 4 items / ₹390"
Free tiles: white with grey "Free". Occupied tiles: very light green fill, green border,
dark green name, grey "N items", bold ₹ total.
```

**S3 · `resto-sale`** (ref: `6.25.15 PM (1).jpeg`)
```
[Block A] Sale tab active.
Search field "Search products"; to its right three icon buttons (copy, barcode, plus).
3-column grid of product tiles, each with a star icon top-left and a square FOOD PHOTO
(white background): Masala Chai ₹20 / pcs · Filter Coffee ₹30 / pcs · Samosa (2 pc) ₹30 / pcs ·
Masala Dosa ₹80 / pcs · Paneer Kathi Roll ₹90 / pcs · Veg Thali ₹150 / pcs ·
Cold Coffee ₹70 / pcs · Gulab Jamun (2 pc) ₹40 / pcs · Mineral Water 1 L ₹20 / pcs with
grey "24 pcs left" under it.
Masala Dosa, Paneer Kathi Roll and Cold Coffee have a green border and a small green
count badge "2"; Masala Chai and Gulab Jamun have badge "1".
Collapsed bottom cart sheet: three tiny round photo avatars, "5 items", "₹540" bold right;
a button row: red outlined trash, pause, "Discount" with tag icon, "Send KOT" (light green
outlined), "Checkout" (solid green).
```

**S4 · `resto-cart`** (ref: `6.25.15 PM.jpeg`)
```
[Block A] Sale tab active. Cart sheet expanded over the product grid.
Header: avatars, "5 items", "₹540". Same button row as before (trash, pause, Discount,
Send KOT, Checkout).
Cart rows, each with a small square food photo, name, unit price under it, and on the right
"−  qty  +" plus a red trash button:
Masala Dosa ₹80 · 2 | Paneer Kathi Roll ₹90 · 2 | Cold Coffee ₹70 · 2 |
Masala Chai ₹20 · 1 | Gulab Jamun (2 pc) ₹40 · 1
A dashed green box: "+ Add item not in inventory".
"Subtotal ₹540", bold "Total ₹540".
```

**S5 · `resto-kot`** (ref: `6.25.14 PM (1).jpeg`)
```
[Block A] Orders tab active. Top bar: back arrow, title "KOT".
Small grey "KOT #12", large bold "Table T3", grey "16 Nov 2026, 8:14 pm",
helper text "Change qty or remove items, then Reprint so kitchen sees the update."
White card with rows "−  2 pcs  +   Masala Dosa   Remove(red)", same for
"2 pcs Paneer Kathi Roll", "2 pcs Cold Coffee", "1 pcs Masala Chai", "1 pcs Gulab Jamun".
Buttons: "Serve · Bill" (green outlined) | "Delete" (red outlined);
"Reprint" (green outlined) | "+ New sale" (solid green).
```

**S6 · `resto-orders`** (ref: `6.25.15 PM (2).jpeg`)
```
[Block A] Orders tab active.
Search "Search invoice #"; segmented control with the receipt icon selected.
Section "TODAY" right-aligned "38 bills · ₹6,480". White rows (invoice left, time · method
under it, amount right):
INV-0412 · 8:52 pm · UPI · ₹540
INV-0411 · 8:40 pm · Cash · ₹110
INV-0410 · 8:31 pm · Card · ₹360
INV-0409 · 8:20 pm · Cash · ₹60
INV-0408 · 8:05 pm · UPI · Rahul · ₹390
Section "15 NOV 2026" right-aligned "41 bills · ₹7,120":
INV-0371 · 10:48 pm · Cash · ₹150
```

**S7 · `resto-menu`** (optional, see quirk above) (ref: `6.25.16 PM (1).jpeg`)
```
[Block A] Menu tab active.
Search "Search by name…"; icon row: clipboard, tags, history, barcode, plus.
Tiles with food photo, name, grey "₹price / pcs", bold stock line ONLY for drinks:
Mineral Water 1 L "24 pcs", Cold Drink 750 ml "12 pcs"; dishes have no stock line.
Items: Masala Chai, Filter Coffee, Samosa (2 pc), Veg Sandwich, Masala Dosa,
Paneer Kathi Roll, Veg Thali, Mineral Water 1 L, Cold Drink 750 ml.
```

**S8 · `resto-receipt`** (ref: `public/img/screens/receipt.webp`)
```
[Block A] Sale tab active. Top bar title "Receipt".
Big green check, "₹540 · UPI", "INV-0412 · Table T3".
A receipt card: "Annapurna Café", "MG Road, Pune", dashed rule, the 5 lines
(name, qty x rate, amount), dashed rule, "Total ₹540", "Paid · UPI", small UPI QR.
Buttons: "Print", "Share PDF", "Download", solid green "New sale".
```

---

**P · food tiles** (run once per item, same seed/style)
```
[Block B] Subject: <ITEM>.
```
Items: Masala Chai in a small glass · Filter Coffee in steel tumbler and davara ·
2 Samosas with green chutney · Veg Sandwich triangles · Masala Dosa folded with chutney cups ·
Paneer Kathi Roll in paper wrap · Veg Thali steel plate · Cold Coffee tall glass ·
Sweet Lassi in kulhad · 2 Gulab Jamun in bowl · Mineral Water 1 L plain unbranded bottle ·
Cold Drink 750 ml plain unbranded bottle (no logos).

---

### Shared block C: vector look (V1–V6)
```
Flat semi-vector illustration matching the attached reference art: clean shapes, soft
gradients, gentle shadows, slightly hand-drawn feel. Palette: deep green #0b5d2a, green
#1f7a3a, leaf green #7ed321, marigold accent #f2a900, warm wood #c98a4b, cream #fbf8f1,
charcoal #2b2b2b. No text, no words, no letters, no logos, no brand names. Indian setting.
```

**V1 · `resto-hero`** (1400 × 1050, landscape)
```
[Block C] A small Indian café counter. On the wooden counter: a phone on a green stand
whose screen shows a simple grid of table tiles (some tinted green), a compact black
thermal printer feeding a short paper ticket, a glass of masala chai and a plate with two
samosas, a steel order bell. Behind: a kitchen pass-through window with warm light and
a hanging ticket rail holding two paper slips; a chalkboard menu (scribbles only, no
words); a potted money plant. Top-left a marigold circle with a crossed-out wifi symbol.
Left third kept calm and empty for page text.
```

**V2 · `resto-kot`** (900 × 900, transparent or cream background)
```
[Block C] Close-up of a kitchen ticket rail with three paper KOT slips clipped on it,
lines of squiggles instead of text, one slip freshly printed from a small thermal printer
below; a steel order bell beside it.
```

**V3 · `resto-tables`** (900 × 900)
```
[Block C] Top-down view of four small café tables with chairs; each table has a small
folded table tent (blank). Two tables have plates and chai glasses (busy, soft green glow
around them), two are empty.
```

**V4 · `resto-takeaway`** (900 × 900)
```
[Block C] A brown paper takeaway bag with a folded top, a disposable chai cup with lid,
and a short printed receipt tucked in the bag.
```

**V5 · `resto-switch`** (900 × 600)
```
[Block C] A large rounded toggle switch in the middle. Left side: a tiny kirana shelf with
jars. Right side: a tiny café table with a chai glass and plate. The toggle knob is green
and sits on the café side.
```

**V6 · `og-restaurant`** (1200 × 630)
```
[Block C] Wide banner. Right half: a phone showing a grid of table tiles next to a
thermal printer feeding a ticket, chai glass and samosas in front. Left half: plain
deep-green gradient with empty space (I'll add the headline text in code).
```
