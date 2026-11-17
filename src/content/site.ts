export const site = {
  name: "YourBillBook",
  domain: "yourbillbook.digicraft.one",
  url: "https://yourbillbook.digicraft.one",
  packageName: "com.digicraft.yourbillbook",
  tagline: "Offline billing for your shop. Pay once. Use forever.",
  shortDescription:
    "Offline billing, stock & Khata for shops and cafés, with tables and KOT for restaurants. Pay once. Works without internet.",
  /**
   * One-time Google Play price in rupees. Leave null until it is set in Play Console;
   * every "Pay once" line on the site picks it up automatically.
   */
  price: null as number | null,
  supportEmail: "support@digicraft.one",
  publisher: "DigiCraft",
  publisherUrl: "https://digicraft.one",
  playUrl:
    "https://play.google.com/store/apps/details?id=com.digicraft.yourbillbook",
  storeMitr: {
    name: "StoreMitr",
    url: "https://storemitr.com",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.digicraft.storemitr&hl=en_IN",
    tagline: "Multi-store · team · cloud sync · GST billing",
    supportEmail: "support@storemitr.com",
  },
} as const;

export const features = [
  {
    title: "Fast counter sales",
    body: "Search, favorites, barcode scan, hold bill, and copy last bill — built for rush hours.",
    icon: "sale",
  },
  {
    title: "Stock that stays honest",
    body: "Adjust stock, low-stock alerts, bulk price update, and a fast stock-take loop.",
    icon: "stock",
  },
  {
    title: "Khata / bakaya",
    body: "Track udhaar, collect payments, credit limits, and overdue reminders on Home.",
    icon: "khata",
  },
  {
    title: "Print & share",
    body: "Bluetooth thermal printers (58/80/112 mm), UPI QR on receipt, PDF share.",
    icon: "print",
  },
  {
    title: "Works offline",
    body: "Airplane mode friendly. Sales, stock, and Khata live in SQLite on your phone.",
    icon: "offline",
  },
  {
    title: "Restaurant & café mode",
    body: "Tables floor, KOT to the kitchen on the same printer, edit and reprint tickets, then bill the table.",
    icon: "kot",
  },
  {
    title: "Pay once",
    body: "One Google Play purchase. Same account can reinstall forever — no subscription.",
    icon: "pay",
  },
] as const;

export const nav = [
  { href: "/restaurant", label: "Restaurant & Café" },
  { href: "/features", label: "Features" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

/** "₹149 one-time" once a price is set, otherwise a neutral fallback. */
export const priceLabel = (fallback = "One-time price") =>
  site.price != null ? `₹${site.price.toLocaleString("en-IN")} one-time` : fallback;
