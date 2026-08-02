import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #000000 0%, #121212 100%)",
          color: "#FFFFFF",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C9A962",
          }}
        >
          AiXLuxury Media Division
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.4,
              color: "rgba(255, 255, 255, 0.72)",
              maxWidth: 900,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.48)",
          }}
        >
          media.aixluxury.com
        </div>
      </div>
    ),
    size,
  );
}
