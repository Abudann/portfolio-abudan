import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/utils";

export const runtime = "edge";
export const alt = "Abudan — Fullstack Web Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0b1120", // navy-950
        backgroundImage: "linear-gradient(to bottom right, #0b1120, #0f172a, #1e293b)",
        color: "#f8fafc", // foreground
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
          textAlign: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1.1,
            color: "#f8fafc",
          }}
        >
          {siteConfig.name}
          <span style={{ color: "#22D3EE" }}>.</span>
        </div>

        <div
          style={{
            fontSize: "36px",
            color: "#22D3EE",
            fontWeight: 600,
          }}
        >
          {siteConfig.roles.join(" • ")}
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            marginTop: "40px",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
