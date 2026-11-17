import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "YourBillBook restaurant & café mode: tables, KOT and the bill on one phone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bg = await readFile(join(process.cwd(), "src/app/restaurant/og-bg.jpg"));
const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bgSrc} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 64px",
            width: 560,
            height: "100%",
            color: "white",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: "#7ed321", letterSpacing: 2 }}>
            RESTAURANT &amp; CAFÉ MODE
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, marginTop: 18 }}>
            Tables, KOT and the bill.
          </div>
          <div style={{ fontSize: 30, marginTop: 22, color: "rgba(255,255,255,0.8)" }}>
            On one phone. Even offline.
          </div>
          <div style={{ fontSize: 26, marginTop: 40, fontWeight: 700, color: "#f2a900" }}>YourBillBook</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
