import { ImageResponse } from "next/og";
import { MESH_PATHS } from "@/components/LogoMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070A",
        }}
      >
        <svg width="132" height="110" viewBox="0 0 120 100" fill="none">
          {MESH_PATHS.map((d) => (
            <path
              key={d}
              d={d}
              stroke="#34C3DD"
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
            stroke="#34C3DD"
            strokeWidth={7}
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
