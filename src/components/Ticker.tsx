/** A tilted strip of thermal paper with business types scrolling across it. */
export function Ticker({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <section aria-label={label} className="relative py-3">
      <div className="zigzag-y -rotate-1 bg-[var(--ybb-receipt)] py-4 shadow-[0_10px_30px_-20px_rgba(60,40,0,0.5)]">
        <div className="ticker flex overflow-hidden">
          <div className="ticker-track flex w-max shrink-0 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[var(--ybb-ink)]/75">
            {[0, 1].map((half) => (
              <div key={half} aria-hidden={half === 1} className="flex shrink-0 items-center">
                {[...items, ...items].map((s, i) => (
                  <span key={i} className="flex items-center gap-8 whitespace-nowrap pr-8">
                    {s}
                    <span className="text-[var(--ybb-primary)]">✶</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
