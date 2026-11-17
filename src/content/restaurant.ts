/**
 * Demo café used on /restaurant. Every number here matches the café screenshots in
 * public/img/resto/screens (see design/restaurant-page-plan.md).
 */

import type { StoryStep } from "@/components/ScrollStory";

export const demoCafe = {
  name: "Annapurna Café",
  address: "MG Road, Pune",
  table: "T3",
  kotNumber: 12,
  kotTime: "16 Nov 2026, 8:14 pm",
  invoice: "INV-0412",
} as const;

/** Table T3's order (KOT #12). Total ₹540. */
export const t3Order = [
  { name: "Masala Dosa", qty: 2, rate: 80 },
  { name: "Paneer Kathi Roll", qty: 2, rate: 90 },
  { name: "Cold Coffee", qty: 2, rate: 70 },
  { name: "Masala Chai", qty: 1, rate: 20 },
  { name: "Gulab Jamun", qty: 1, rate: 40 },
] as const;

/** Café screens are 1003×1568 renders, scaled to 720 wide. */
export const cafeAspect = "720/1126";

export const cafeScreen = (name: string) => `/img/resto/screens/${name}.webp`;

export const eveningSteps: readonly StoryStep[] = [
  {
    time: "7:30 pm",
    title: "The floor fills up.",
    body: "Every table on one screen. Busy ones turn green with the item count and running total, so you know where T3 stands without walking over.",
    src: cafeScreen("tables"),
    alt: "Tables screen: T2, T3, T5 and Family occupied, the rest free",
  },
  {
    time: "7:42 pm",
    title: "Take the order. Tap, tap, tap.",
    body: "The same fast Sale grid as the shop app, with photos of your dishes. Masala Dosa ×2, Kathi Roll ×2, Cold Coffee ×2, a chai and a Gulab Jamun.",
    src: cafeScreen("sale"),
    alt: "Sale screen with café dishes and a ₹540 cart of 5 items",
  },
  {
    time: "7:43 pm",
    title: "Send KOT. The kitchen starts.",
    body: "Check the cart, then Send KOT and pick the table. A kitchen ticket prints on your Bluetooth printer, with items and quantities and no prices.",
    src: cafeScreen("cart"),
    alt: "Expanded cart with five items, ₹540 total, and a Send KOT button",
  },
  {
    time: "8:14 pm",
    title: "Table wants more? Or less?",
    body: "Open the KOT, change a quantity or remove a dish, and Reprint so the kitchen sees the update. Delete a ticket that went to the wrong table.",
    src: cafeScreen("kot"),
    alt: "KOT #12 for Table T3 with quantity controls, Reprint and Serve · Bill buttons",
  },
  {
    time: "8:52 pm",
    title: "Serve · Bill. Paid by UPI.",
    body: "The table's KOTs turn into one bill. Cash, UPI, card or split. Your UPI QR prints on the receipt, or share it as a PDF.",
    src: cafeScreen("receipt"),
    alt: "Receipt for ₹540 paid by UPI, INV-0412, Table T3",
  },
  {
    time: "10:30 pm",
    title: "Every bill, in one list.",
    body: "Orders shows tables, bills and KOTs in one place. Search an invoice number when someone comes back asking.",
    src: cafeScreen("orders"),
    alt: "Orders list for today: 38 bills worth ₹6,480",
  },
  {
    time: "11:00 pm",
    title: "Lights off. Day closed.",
    body: "Sales, bills, expenses and the cash / UPI / card split for the day. Take a backup and go home.",
    src: cafeScreen("home"),
    alt: "Home screen: sales ₹6,480, 38 bills, expenses ₹850, cash ₹2,940, UPI ₹3,180, card ₹360",
  },
];

export const cafeTypes = [
  "Chai stall",
  "Café",
  "Dhaba",
  "Restaurant",
  "Bakery café",
  "Juice bar",
  "Sweet shop",
  "Canteen",
  "Food stall",
  "Tiffin centre",
  "Momo corner",
  "Dosa point",
];

export const carriedOver = [
  { label: "Khata / udhaar", note: "for regulars who pay monthly" },
  { label: "UPI QR on the bill", note: "printed on the receipt" },
  { label: "Split payment", note: "part cash, part UPI" },
  { label: "Discounts", note: "on the whole bill" },
  { label: "PDF share", note: "on WhatsApp or anywhere" },
  { label: "Expenses", note: "milk, gas, vegetables" },
  { label: "Backup & restore", note: "a file you keep" },
  { label: "App PIN", note: "and PIN for voiding bills" },
  { label: "Hindi labels", note: "Home, Sale, checkout, Khata" },
  { label: "58 / 80 / 112 mm", note: "Bluetooth thermal printers" },
];

export const cafeFaqs = [
  {
    q: "Do I need a separate kitchen printer?",
    a: "No. KOTs print on the same Bluetooth thermal printer you use for bills. The kitchen ticket shows the table, time, items and quantities, plus any note like “less spicy”, and never the prices.",
  },
  {
    q: "Can my waiters take orders on their own phones?",
    a: "Not in YourBillBook. It runs on one phone with the data stored on that phone. If you need staff logins or several phones sharing one menu and one set of tables, StoreMitr is our app built for that.",
    link: { href: "https://storemitr.com", label: "Visit StoreMitr" },
  },
  {
    q: "We only do takeaway and counter orders. Is it still useful?",
    a: "Yes. Bill straight from the Sale screen like a shop, without picking a table. Use tables and KOT only when someone sits down.",
  },
  {
    q: "Can I track stock for cold drinks and water but not for dishes?",
    a: "Yes. Stock tracking is a switch on each item. Leave it off for dishes, so they never run out, and turn it on for bottled drinks so you see how many are left.",
  },
  {
    q: "How many tables can I have? Can I name them?",
    a: "Restaurant mode starts with 10 tables. Add more, remove some, or rename them to Terrace, Family, Counter or anything you call them.",
  },
  {
    q: "Can I switch back to shop mode later?",
    a: "Yes, from More → Store details. Settle or clear any open tables first. Your products, bills and khata stay as they are.",
  },
  {
    q: "Does it need internet during service?",
    a: "No. Tables, KOT, bills and printing all run on the phone over Bluetooth. A busy Saturday night with no signal is fine.",
  },
];
