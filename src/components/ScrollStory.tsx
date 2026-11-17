"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

export type StoryStep = {
  time: string;
  title: string;
  body: string;
  /** Path of the phone screen image. */
  src: string;
  alt: string;
};

type Props = {
  steps: readonly StoryStep[];
  /** Screen aspect ratio, `width/height`. */
  aspect?: string;
  /** Phone width on desktop, in px. */
  phoneWidth?: number;
};

/** Desktop: text scrolls while one phone stays put and swaps screens. Mobile: swipeable cards. */
export function ScrollStory({ steps, aspect = "720/1608", phoneWidth = 300 }: Props) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Half the height of the phone + time label, so the phone sits centred while sticky.
  const [w, h] = aspect.split("/").map(Number);
  const stickyHalf = Math.round((phoneWidth * h) / w / 2 + 30);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: text scrolls, phone stays */}
      <div className="hidden gap-16 lg:grid lg:grid-cols-[1fr_360px]">
        <ol className="relative">
          <span className="absolute bottom-10 left-[5px] top-10 w-px bg-[var(--ybb-border-strong)]" />
          {steps.map((s, i) => (
            <li
              key={s.src}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className="relative flex min-h-[50vh] flex-col justify-center pl-10"
            >
              <span
                className={`absolute left-0 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 transition ${
                  active === i
                    ? "scale-125 border-[var(--ybb-primary)] bg-[var(--ybb-primary)]"
                    : "border-[var(--ybb-border-strong)] bg-[var(--ybb-paper)]"
                }`}
              />
              <div className={`transition duration-500 ${active === i ? "opacity-100" : "opacity-35"}`}>
                <p className="font-mono text-sm font-bold text-[var(--ybb-primary)]">{s.time}</p>
                <h3 className="mt-2 max-w-md font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--ybb-ink)]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--ybb-muted)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="relative">
          <div className="sticky" style={{ top: `calc(50vh - ${stickyHalf}px)` }}>
            <div className="mb-4 flex items-center justify-center gap-2 font-mono text-sm text-[var(--ybb-muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--ybb-primary)]" />
              <span key={active} className="line-in font-bold text-[var(--ybb-ink)]">
                {steps[active].time}
              </span>
              <span>· {active + 1}/{steps.length}</span>
            </div>
            <PhoneFrame className="mx-auto" aspect={aspect} style={{ width: phoneWidth }}>
              {steps.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes={`${phoneWidth}px`}
                  className={`screen-fade object-cover ${
                    active === i ? "opacity-100" : "translate-y-3 opacity-0"
                  }`}
                />
              ))}
            </PhoneFrame>
          </div>
        </div>
      </div>

      {/* Mobile: swipe through the day */}
      <ol className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] lg:hidden">
        {steps.map((s) => (
          <li key={s.src} className="w-[78vw] max-w-[300px] shrink-0 snap-center">
            <PhoneFrame src={s.src} alt={s.alt} sizes="78vw" className="w-full" aspect={aspect} />
            <p className="mt-4 font-mono text-sm font-bold text-[var(--ybb-primary)]">{s.time}</p>
            <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-[var(--ybb-ink)]">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ybb-muted)]">{s.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
