import { ImageResponse } from "next/og";
import { MESH_PATHS } from "@/components/LogoMark";
import { SITE } from "@/data/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2F5F6",
          color: "#0B1216",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="60" viewBox="0 0 120 100" fill="none">
            {MESH_PATHS.map((d) => (
              <path
                key={d}
                d={d}
                stroke="#0F9BB8"
                strokeWidth={7}
                strokeLinecap="round"
              />
            ))}
            <rect
              x="4"
              y="4"
              width="112"
              height="92"
              rx="4"
              stroke="#0F9BB8"
              strokeWidth={7}
            />
          </svg>
          <span style={{ fontSize: 44, letterSpacing: "-0.02em" }}>
            {SITE.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            Design Code
          </span>
          <span
            style={{
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#0F9BB8",
            }}
          >
            IA aplicada
          </span>
        </div>

        <span style={{ fontSize: 26, color: "#5A6B73", maxWidth: 900 }}>
          Landing pages, sites institucionais, sistemas web completos e
          automações com inteligência artificial.
        </span>
      </div>
    ),
    size,
  );
}
