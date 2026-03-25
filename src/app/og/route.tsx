import { ImageResponse } from "next/og";
import { getProject } from "@/lib/server/utils";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Load fonts
  const fontBitsumis = await readFile(
    join(cwd(), "src/fonts/local/BITSUMIS.ttf"),
  );
  const fontTerminal = await readFile(
    join(cwd(), "src/fonts/local/Terminal F4.ttf"),
  );

  let title = "Portfolio";
  let description = "Software Engineer Portfolio";
  let date = new Date().toISOString();
  let topText = "~/";
  let status = "ONLINE";

  if (slug) {
    const project = await getProject(slug);

    if (!project) {
      return new ImageResponse(
        <div
          style={{
            fontSize: 48,
            background: "#EAE8E0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#454545",
            fontFamily: "TerminalF4",
          }}
        >
          Project not found
        </div>,
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: "TerminalF4",
              data: fontTerminal,
              style: "normal",
            },
          ],
        },
      );
    }

    title = project.frontmatter.title;
    description = project.frontmatter.description;
    date = project.frontmatter.date;
    topText = `~/projects/${slug}`;
    status = "COMPLETED";
  } else {
    title = searchParams.get("title") || title;
    description = searchParams.get("description") || description;
    topText = searchParams.get("topText") || topText;
    // For manual dates via params or default to current
    const paramDate = searchParams.get("date");
    if (paramDate) date = paramDate;
  }

  return new ImageResponse(
    <div
      style={{
        background: "#EAE8E0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        justifyContent: "space-between",
        fontFamily: "TerminalF4",
        color: "#454545",
        position: "relative",
        border: "4px solid #454545",
      }}
    >
      {/* Decorative Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(69, 69, 69, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          zIndex: -1,
        }}
      />

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          opacity: 0.7,
          fontSize: "24px",
        }}
      >
        <span>{topText}</span>
        <span>[OG_IMAGE_GENERATED]</span>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontFamily: "Bitsumis",
            fontSize: "100px",
            lineHeight: 0.85,
            textTransform: "uppercase",
            textShadow: "0 0 30px rgba(69, 69, 69, 0.2)",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "32px",
            opacity: 0.9,
            marginTop: "20px",
            lineHeight: 1.4,
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {description}
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "2px dashed rgba(69, 69, 69, 0.3)",
          paddingTop: "40px",
        }}
      >
        <div style={{ display: "flex", gap: "40px", fontSize: "24px" }}>
          <span>
            DATE:{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
          <span>STATUS: {status}</span>
        </div>

        <div
          style={{
            fontSize: "24px",
            opacity: 0.6,
            background: "#454545",
            color: "#EAE8E0",
            padding: "4px 12px",
          }}
        >
          {baseUrl}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Bitsumis",
          data: fontBitsumis,
          style: "normal",
        },
        {
          name: "TerminalF4",
          data: fontTerminal,
          style: "normal",
        },
      ],
    },
  );
}
