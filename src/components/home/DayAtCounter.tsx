import { ScrollStory } from "@/components/ScrollStory";

const steps = [
  {
    time: "9:00 am",
    title: "Open the shutter, open the app.",
    body: "Today's sales, bills, cash, UPI, card and khata on one screen. Switch to 7 days, 30 days or any range.",
    src: "/img/screens/home.webp",
    alt: "Home screen with today's sales of ₹8,640 across 23 bills",
  },
  {
    time: "11:30 am",
    title: "Rush hour. Tap, tap, tap.",
    body: "Every product is one tap away, with photo, price and stock left. Search, scan a barcode, or copy the last bill.",
    src: "/img/screens/sale.webp",
    alt: "Sale screen with nine grocery products and a ₹1,091 cart",
  },
  {
    time: "11:31 am",
    title: "Cash, UPI, card, khata or split.",
    body: "Add the customer's name and number only if you want to. Confirm never waits for the printer.",
    src: "/img/screens/checkout.webp",
    alt: "Checkout sheet showing ₹1,091 paid by UPI",
  },
  {
    time: "11:31 am",
    title: "Print it, or share it.",
    body: "Bluetooth thermal printers at 58, 80 or 112 mm, with your UPI QR on the receipt. Or share a PDF.",
    src: "/img/screens/receipt.webp",
    alt: "Receipt INV-0024 with five line items and a total of ₹1,091",
  },
  {
    time: "3:55 pm",
    title: "Low stock shows up before the shelf is empty.",
    body: "Mustard oil is down to 4. It's flagged in inventory so you reorder in time.",
    src: "/img/screens/inventory.webp",
    alt: "Inventory grid with mustard oil marked as low stock",
  },
  {
    time: "4:00 pm",
    title: "Delivery came in. Add 20.",
    body: "Change stock by a number, or set an exact count after a stock-take. Every change is kept in history.",
    src: "/img/screens/stock.webp",
    alt: "Stock adjustment sheet adding 20 bottles of mustard oil",
  },
  {
    time: "9:30 pm",
    title: "Shutter down. Back up.",
    body: "Export a backup, set an app PIN, set up printers, or switch the labels to हिंदी. It's all under More.",
    src: "/img/screens/more.webp",
    alt: "More screen listing Khata, Expenses, Store details, Printers, Data, Security and Language",
  },
] as const;

export function DayAtCounter() {
  return <ScrollStory steps={steps} />;
}
