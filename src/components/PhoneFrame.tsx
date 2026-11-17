import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  preload?: boolean;
  compact?: boolean;
  /** Screen aspect ratio as `width/height`. Retail screens are 720/1608; café screens are 720/1126. */
  aspect?: string;
  children?: ReactNode;
};

/** A plain Android-style phone shell. Pass `src` for a single screen or `children` to stack screens. */
export function PhoneFrame({
  src,
  alt = "",
  className = "",
  style,
  sizes = "(min-width: 1024px) 300px, 60vw",
  preload = false,
  compact = false,
  aspect = "720/1608",
  children,
}: Props) {
  return (
    <div
      className={`relative bg-[#121a15] ${compact ? "rounded-[1.6rem] p-[5px]" : "rounded-[2.6rem] p-[9px]"} shadow-[0_40px_80px_-30px_rgba(11,63,32,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] ${className}`}
      style={style}
    >
      <div
        className={`relative overflow-hidden bg-white ${compact ? "rounded-[1.3rem]" : "rounded-[2.1rem]"}`}
        style={{ aspectRatio: aspect }}
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
        ) : (
          children
        )}
        <span className="pointer-events-none absolute left-1/2 top-[7px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#121a15]" />
      </div>
      <span className="absolute -right-[3px] top-24 h-14 w-[3px] rounded-r bg-[#121a15]" />
      <span className="absolute -right-[3px] top-44 h-8 w-[3px] rounded-r bg-[#121a15]" />
    </div>
  );
}
