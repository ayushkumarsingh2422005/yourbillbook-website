"use client";

import { useState } from "react";
import { IconPlus, IconRotate } from "@/components/icons";
import { demoCafe, t3Order } from "@/content/restaurant";
import { formatINR } from "@/content/demo";

const EXTRA = { name: "Masala Chai", rate: 20 } as const;
const NOTE_ON = "Masala Dosa";

/** A decorative QR-like grid (not scannable). Deterministic so server and client match. */
function FakeQr({ size = 64 }: { size?: number }) {
  const n = 21;
  const cells: [number, number][] = [];
  const finder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (finder(r, c)) continue;
      if (((r * 7 + c * 13 + r * c) % 5) < 2) cells.push([r, c]);
    }
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="white" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} width={size} height={size} aria-hidden="true" shapeRendering="crispEdges">
      <rect width={n} height={n} fill="white" />
      {cells.map(([r, c]) => (
        <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="currentColor" />
      ))}
      {eye(0, 0)}
      {eye(n - 7, 0)}
      {eye(0, n - 7)}
    </svg>
  );
}

function KotSlip({
  number,
  time,
  lines,
  note,
  fresh,
}: {
  number: number;
  time: string;
  lines: { name: string; qty: number }[];
  note?: string;
  fresh?: boolean;
}) {
  return (
    <div
      className={`zigzag-bottom w-full bg-[var(--ybb-receipt)] px-5 pt-5 font-mono text-[13px] text-[var(--ybb-ink)] shadow-[0_24px_40px_-28px_rgba(60,40,0,0.6)] ${
        fresh ? "receipt-feed" : ""
      }`}
    >
      <p className="text-center text-base font-bold">KOT #{number}</p>
      <p className="text-center text-xs text-black/55">{demoCafe.name}</p>
      <div className="dashed-rule my-3" />
      <p className="text-center font-bold">Table {demoCafe.table}</p>
      <p className="text-center text-xs text-black/55">{time}</p>
      <div className="dashed-rule my-3" />
      <ul className="space-y-1.5">
        {lines.map((l) => (
          <li key={l.name}>
            <p className="font-bold">
              {l.qty} pcs&nbsp;&nbsp;{l.name}
            </p>
            {note && l.name === NOTE_ON && (
              <p key={note} className="line-in pl-4 text-black/70">
                * {note}
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="dashed-rule my-3" />
      <p className="text-center text-xs text-black/55">--- kitchen ---</p>
    </div>
  );
}

export function KotVsBill() {
  const [extraChai, setExtraChai] = useState(0);
  const [note, setNote] = useState(false);

  const billLines = t3Order.map((l) =>
    l.name === EXTRA.name ? { ...l, qty: l.qty + extraChai } : l,
  );
  const total = billLines.reduce((s, l) => s + l.qty * l.rate, 0);
  const changed = extraChai > 0 || note;

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setNote((v) => !v)}
          aria-pressed={note}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            note
              ? "border-[var(--ybb-primary)] bg-[var(--ybb-primary)] text-white"
              : "border-[var(--ybb-border-strong)] bg-[var(--ybb-surface)] text-[var(--ybb-ink)] hover:border-[var(--ybb-primary)]"
          }`}
        >
          Note on Dosa: “less spicy”
        </button>
        <button
          type="button"
          onClick={() => setExtraChai((n) => Math.min(n + 1, 4))}
          disabled={extraChai >= 4}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ybb-border-strong)] bg-[var(--ybb-surface)] px-4 py-2 text-sm font-semibold text-[var(--ybb-ink)] transition hover:border-[var(--ybb-primary)] disabled:opacity-50"
        >
          <IconPlus size={15} /> Table asks for one more chai
        </button>
        {changed && (
          <button
            type="button"
            onClick={() => {
              setExtraChai(0);
              setNote(false);
            }}
            className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[var(--ybb-muted)] hover:text-[var(--ybb-ink)]"
          >
            <IconRotate size={15} /> Reset
          </button>
        )}
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
        {/* Kitchen */}
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--ybb-primary)]">
            Goes to the kitchen
          </p>
          <div className="mx-auto max-w-[300px] space-y-5 md:mx-0 md:-rotate-[1deg]">
            <KotSlip
              number={demoCafe.kotNumber}
              time={demoCafe.kotTime}
              lines={t3Order.map(({ name, qty }) => ({ name, qty }))}
              note={note ? "less spicy" : undefined}
            />
            {extraChai > 0 && (
              <KotSlip
                key={extraChai}
                number={demoCafe.kotNumber + 1}
                time="16 Nov 2026, 8:31 pm"
                lines={[{ name: EXTRA.name, qty: extraChai }]}
                fresh
              />
            )}
          </div>
          <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-[var(--ybb-muted)]">
            {extraChai > 0
              ? `KOT #${demoCafe.kotNumber + 1} carries only the new chai. The kitchen doesn't cook the dosas twice.`
              : "Table, time, items and quantities. Notes print under the dish. No prices."}
          </p>
        </div>

        {/* Customer */}
        <div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--ybb-primary)]">
            Goes to the customer
          </p>
          <div className="zigzag-bottom mx-auto max-w-[360px] bg-[var(--ybb-receipt)] px-6 pt-6 font-mono text-[13px] text-[var(--ybb-ink)] shadow-[0_24px_40px_-28px_rgba(60,40,0,0.6)] md:mx-0 md:rotate-[0.8deg]">
            <p className="text-center font-sans text-lg font-bold">{demoCafe.name}</p>
            <p className="text-center text-xs text-black/55">{demoCafe.address}</p>
            <div className="dashed-rule my-3" />
            <div className="flex justify-between text-xs text-black/60">
              <span>{demoCafe.invoice}</span>
              <span>Table {demoCafe.table}</span>
            </div>
            <div className="dashed-rule my-3" />
            <ul className="space-y-1.5">
              {billLines.map((l) => (
                <li key={l.name} className="grid grid-cols-[1fr_auto_4.2rem] items-baseline gap-2">
                  <span className="truncate">{l.name}</span>
                  <span className="text-black/50">
                    {l.qty}×{l.rate}
                  </span>
                  <span
                    key={`${l.name}-${l.qty}`}
                    className={`text-right font-bold ${l.name === EXTRA.name && extraChai > 0 ? "pop inline-block" : ""}`}
                  >
                    {formatINR(l.qty * l.rate)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="dashed-rule my-3" />
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-base font-bold">Total</span>
              <span key={total} className="pop inline-block font-sans text-xl font-bold">
                {formatINR(total)}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-[var(--ybb-sheet)]/60 p-3">
              <div className="font-sans">
                <p className="text-sm font-bold text-[var(--ybb-primary-dark)]">Scan to pay · UPI</p>
                <p className="text-xs text-black/55">Any UPI app</p>
              </div>
              <span className="text-[var(--ybb-ink)]">
                <FakeQr size={60} />
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-[360px] text-sm leading-relaxed text-[var(--ybb-muted)]">
            Every KOT on the table, merged into one bill with rates and your UPI QR.
          </p>
        </div>
      </div>
    </div>
  );
}
