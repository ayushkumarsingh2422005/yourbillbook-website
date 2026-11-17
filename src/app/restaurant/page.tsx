import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowDown,
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconInfinity,
  IconTable,
  IconTicket,
} from "@/components/icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { PlayBadge } from "@/components/PlayBadge";
import { KotVsBill } from "@/components/restaurant/KotVsBill";
import { Reveal } from "@/components/Reveal";
import { ScrollStory } from "@/components/ScrollStory";
import { Ticker } from "@/components/Ticker";
import {
  cafeAspect,
  cafeFaqs,
  cafeScreen,
  cafeTypes,
  carriedOver,
  eveningSteps,
} from "@/content/restaurant";
import { priceLabel, site } from "@/content/site";

const description =
  "Restaurant and café billing on one Android phone: tables, KOT to the kitchen printer, edit and reprint tickets, then bill by cash, UPI or card. Works offline. Pay once.";

export const metadata: Metadata = {
  title: "Restaurant & Café billing with tables and KOT",
  description,
  alternates: { canonical: `${site.url}/restaurant` },
  openGraph: {
    type: "website",
    url: `${site.url}/restaurant`,
    title: `Tables, KOT and the bill · ${site.name}`,
    description,
    siteName: site.name,
  },
};

const h2 =
  "font-display text-4xl font-semibold leading-tight tracking-tight text-[var(--ybb-ink)] sm:text-5xl";
const kicker = "font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--ybb-primary)]";
const card = "h-full rounded-[1.75rem] border border-[var(--ybb-border)] bg-[var(--ybb-surface)]";

export default function RestaurantPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
          <div>
            <p className="font-mono text-sm font-bold text-[var(--ybb-primary)]">Restaurant &amp; café mode</p>
            <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tight text-[var(--ybb-ink)] sm:text-6xl lg:text-[3.9rem]">
              Tables, KOT and the bill. All on one phone,{" "}
              <span className="relative inline-block whitespace-nowrap">
                even offline.
                <svg
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3.5 w-full text-[var(--ybb-marigold)]"
                  aria-hidden="true"
                >
                  <path
                    className="draw-line"
                    d="M3 14 C 60 4, 120 4, 170 10 S 260 16, 297 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--ybb-ink)]/80">
              YourBillBook has a mode for chai stalls, cafés and small restaurants. Take
              the order at the table, send it to the kitchen, bill it when they&apos;re done.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                { icon: IconTicket, strong: "Send KOT", rest: "to the kitchen on your Bluetooth printer" },
                { icon: IconTable, strong: "See which tables are busy", rest: "and what each one owes" },
                {
                  icon: IconInfinity,
                  strong: "Pay once",
                  rest: site.price != null ? `· ${priceLabel()} on Google Play` : "on Google Play. No monthly fee.",
                },
              ].map(({ icon: Icon, strong, rest }) => (
                <li key={strong} className="flex items-center gap-3 text-[15px] text-[var(--ybb-muted)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--ybb-sheet)] text-[var(--ybb-primary)] ring-1 ring-[var(--ybb-primary)]/15">
                    <Icon size={17} />
                  </span>
                  <span>
                    <strong className="font-bold text-[var(--ybb-ink)]">{strong}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PlayBadge />
              <a href="#switch" className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--ybb-ink)]">
                <span className="underline decoration-[var(--ybb-marigold)] decoration-2 underline-offset-4">
                  How to turn it on
                </span>
                <IconArrowDown size={16} className="transition group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[1672/941] overflow-hidden rounded-[2rem] border border-[var(--ybb-border)] shadow-[0_40px_90px_-50px_rgba(60,40,0,0.55)]">
              <Image
                src="/img/resto/art/hero.webp"
                alt="Illustration of a café counter: a phone on a stand showing tables, a receipt printer, masala chai, samosas and an order bell, with kitchen tickets hanging behind"
                fill
                preload
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className="float-soft absolute -bottom-10 left-[6%] w-[27%] max-w-[170px]"
              style={{ "--r": "-5deg" } as React.CSSProperties}
            >
              <PhoneFrame
                src={cafeScreen("tables")}
                alt="YourBillBook tables screen with four occupied tables"
                sizes="200px"
                aspect={cafeAspect}
                compact
              />
            </div>
          </div>
        </div>
      </section>

      <Ticker items={cafeTypes} label="Food businesses that bill with tables or a counter" />

      {/* ================= EVENING STORY ================= */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-sm font-bold text-[var(--ybb-primary)]">The real app</p>
          <h2 className={`mt-2 ${h2}`}>An evening at Annapurna Café.</h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ybb-muted)]">
            A demo café with 10 tables. Follow table T3 from order to bill, then close the day.
          </p>
        </Reveal>
        <div className="mt-10 lg:mt-4">
          <ScrollStory steps={eveningSteps} aspect={cafeAspect} phoneWidth={340} />
        </div>
      </section>

      {/* ================= KOT vs BILL ================= */}
      <section id="kot" className="scroll-mt-20 border-y border-[var(--ybb-border)] bg-[var(--ybb-surface)]/70">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="mb-10 max-w-2xl">
            <p className="font-mono text-sm font-bold text-[var(--ybb-primary)]">One printer, two slips</p>
            <h2 className={`mt-2 ${h2}`}>The kitchen sees dishes. The table sees the bill.</h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ybb-muted)]">
              Table T3&apos;s order, as it comes out of the printer. Try adding a note, or one
              more chai halfway through the meal.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <KotVsBill />
          </Reveal>
        </div>
      </section>

      {/* ================= FEATURE BENTO ================= */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className={h2}>Made for a service rush, not just a counter.</h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-6">
          {/* Tables floor */}
          <Reveal className="lg:col-span-4">
            <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-[var(--ybb-primary-deep)] text-white sm:flex-row sm:items-stretch">
              <div className="relative z-10 p-7 sm:max-w-[46%] sm:p-9">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--ybb-leaf)]">
                  Tables floor
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
                  Busy tables glow green.
                </h3>
                <p className="mt-3 leading-relaxed text-white/75">
                  Each table shows how many items are on it and the running total. Starts
                  with 10; rename them Terrace, Family, Counter or whatever you call them.
                </p>
              </div>
              <div className="relative min-h-[220px] flex-1 sm:min-h-0">
                <Image
                  src="/img/resto/art/tables.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover [mask-image:linear-gradient(to_right,transparent,black_22%)] max-sm:[mask-image:linear-gradient(to_bottom,transparent,black_22%)]"
                />
              </div>
            </article>
          </Reveal>

          {/* Takeaway */}
          <Reveal delay={80} className="lg:col-span-2">
            <article className={`${card} group flex flex-col overflow-hidden`}>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/img/resto/art/takeaway.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7 pt-5">
                <p className={kicker}>Takeaway &amp; walk-in</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ybb-ink)]">
                  No table? Just bill it.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ybb-muted)]">
                  Parcel orders and counter sales go straight from Sale to checkout, like a shop.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Edit / delete KOT */}
          <Reveal className="lg:col-span-2">
            <article className={`${card} flex gap-5 p-7 lg:flex-col`}>
              <PhoneFrame
                src={cafeScreen("kot")}
                alt="KOT #12 screen with quantity controls and Remove buttons"
                sizes="150px"
                aspect={cafeAspect}
                compact
                className="w-[118px] shrink-0 self-start lg:mx-auto lg:w-[150px]"
              />
              <div>
                <p className={kicker}>Edit a KOT</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ybb-ink)]">
                  Wrong order? Fix the ticket.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ybb-muted)]">
                  Change a quantity, remove a dish, or delete the whole KOT. Reprint so the
                  kitchen has the right one.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Full-table reprint */}
          <Reveal delay={80} className="lg:col-span-2">
            <article className={`${card} flex flex-col p-7`}>
              <div className="flex flex-1 items-center justify-center py-2">
                <div className="zigzag-bottom w-[210px] rotate-[-2deg] bg-[var(--ybb-receipt)] px-4 pt-4 font-mono text-[12px] text-[var(--ybb-ink)] shadow-[0_20px_30px_-22px_rgba(60,40,0,0.6)]">
                  <p className="text-center font-bold">KOT · FULL</p>
                  <p className="text-center text-[11px] text-black/55">Includes #12 #13</p>
                  <div className="dashed-rule my-2" />
                  <p className="text-center font-bold">Table T3</p>
                  <div className="dashed-rule my-2" />
                  <p className="font-bold">2 pcs&nbsp;&nbsp;Masala Dosa</p>
                  <p className="font-bold">2 pcs&nbsp;&nbsp;Paneer Kathi Roll</p>
                  <p className="font-bold">2 pcs&nbsp;&nbsp;Masala Chai</p>
                  <p className="text-black/45">…</p>
                </div>
              </div>
              <p className={`mt-6 ${kicker}`}>Full-table reprint</p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ybb-ink)]">
                Kitchen lost a slip?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ybb-muted)]">
                Print one ticket with everything on the table, all KOTs merged and same dishes added up.
              </p>
            </article>
          </Reveal>

          {/* Menu stock */}
          <Reveal delay={160} className="lg:col-span-2">
            <article className={`${card} flex gap-5 p-7 lg:flex-col`}>
              <PhoneFrame
                src={cafeScreen("menu")}
                alt="Menu screen: dishes without stock counts, bottled drinks with pieces left"
                sizes="150px"
                aspect={cafeAspect}
                compact
                className="w-[118px] shrink-0 self-start lg:mx-auto lg:w-[150px]"
              />
              <div>
                <p className={kicker}>Menu</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ybb-ink)]">
                  Dishes never run out. Bottles do.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ybb-muted)]">
                  Turn stock off for kitchen dishes and on for water and cold drinks, so you
                  know when to reorder.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Same printer */}
          <Reveal className="lg:col-span-3">
            <article className={`${card} flex flex-col overflow-hidden sm:flex-row`}>
              <div className="relative aspect-[3/2] sm:aspect-auto sm:w-[48%]">
                <Image
                  src="/img/resto/art/kot.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 270px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-7">
                <p className={kicker}>Your printer</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ybb-ink)]">
                  One printer does both.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ybb-muted)]">
                  KOTs and bills come out of the same 58, 80 or 112 mm Bluetooth thermal
                  printer. No second printer, no router, no kitchen screen.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Switch */}
          <Reveal delay={80} className="lg:col-span-3">
            <article id="switch" className={`${card} scroll-mt-24 flex flex-col overflow-hidden`}>
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src="/img/resto/art/switch.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover scale-[1.12]"
                />
              </div>
              <div className="p-7 pt-4">
                <p className={kicker}>Turn it on</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ybb-ink)]">
                  Shop or café. Switch anytime.
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ybb-muted)]">
                  <li className="flex gap-2">
                    <IconCheck size={16} className="mt-0.5 shrink-0 text-[var(--ybb-primary)]" />
                    <span>
                      <strong className="text-[var(--ybb-ink)]">New install:</strong> pick{" "}
                      <em className="not-italic font-semibold text-[var(--ybb-ink)]">Restaurant / cafe</em> when
                      you set up your store.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <IconCheck size={16} className="mt-0.5 shrink-0 text-[var(--ybb-primary)]" />
                    <span>
                      <strong className="text-[var(--ybb-ink)]">Already using it:</strong> More → Store
                      details → Restaurant / cafe. Switch back the same way.
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ================= CARRIED OVER ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal className="grid gap-8 rounded-[2rem] border border-dashed border-[var(--ybb-border-strong)] p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--ybb-ink)] sm:text-4xl">
              Everything from the shop app comes along.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ybb-muted)]">
              Restaurant mode adds tables and KOT. The rest of YourBillBook is still there.
            </p>
            <Link
              href="/features"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--ybb-ink)]"
            >
              <span className="underline decoration-[var(--ybb-marigold)] decoration-2 underline-offset-4">
                See every feature
              </span>
              <IconArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {carriedOver.map((c) => (
              <li key={c.label} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ybb-sheet)] text-[var(--ybb-primary)]">
                  <IconCheck size={14} />
                </span>
                <span>
                  <span className="block font-semibold text-[var(--ybb-ink)]">{c.label}</span>
                  <span className="block text-sm text-[var(--ybb-muted)]">{c.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-t border-[var(--ybb-border)] bg-[var(--ybb-surface)]/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[var(--ybb-ink)]">
              Questions café owners ask us.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ybb-muted)]">
              Something else?{" "}
              <a
                href={`mailto:${site.supportEmail}`}
                className="font-semibold text-[var(--ybb-primary)] underline underline-offset-4"
              >
                {site.supportEmail}
              </a>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="divide-y divide-[var(--ybb-border)] border-y border-[var(--ybb-border)]">
              {cafeFaqs.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-[var(--ybb-ink)] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <IconChevronDown
                      size={20}
                      className="shrink-0 text-[var(--ybb-muted)] transition group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-5 pr-8 leading-relaxed text-[var(--ybb-muted)]">
                    {f.a}{" "}
                    {"link" in f && f.link && (
                      <a
                        href={f.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--sm-orange)] underline underline-offset-4"
                      >
                        {f.link.label}
                      </a>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--ybb-primary-deep)] text-white">
            <div className="grid items-center lg:grid-cols-[1fr_1.1fr]">
              <div className="relative z-10 p-8 sm:p-12">
                <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Open the kitchen. Start billing.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-white/75">
                  Install YourBillBook, pick Restaurant / cafe, add your menu, and send your
                  first KOT tonight.{" "}
                  {site.price != null ? `${priceLabel()}, ` : "Pay once, "}
                  no monthly fee.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <PlayBadge />
                  <Link
                    href="/support"
                    className="text-sm font-bold text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white"
                  >
                    Need help? Contact support
                  </Link>
                </div>
              </div>
              <div className="px-6 pb-6 lg:py-8 lg:pl-0 lg:pr-8">
                <Image
                  src="/img/resto/art/banner.webp"
                  alt=""
                  width={1200}
                  height={600}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="h-auto w-full rounded-[1.4rem] ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
