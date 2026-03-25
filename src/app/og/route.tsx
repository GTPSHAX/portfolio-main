import { ImageResponse } from "next/og";
import { getProject } from "@/lib/server/utils";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const cloudflareR2WorkerUrl = process.env.CLOUDFLARE_R2_WORKER_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Create a stable cache key based on sorted search parameters
  searchParams.sort();
  const cacheKey = Buffer.from(searchParams.toString()).toString("base64url");

  // Try to get image from R2 Cache
  if (cloudflareR2WorkerUrl) {
    try {
      const cacheRes = await fetch(`${cloudflareR2WorkerUrl}/${cacheKey}`, {
        method: "GET",
      });

      if (cacheRes.ok) {
        const imageBuffer = await cacheRes.arrayBuffer();
        return new Response(imageBuffer, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch from R2 cache:", error);
    }
  }

  // If not in cache, generate the image
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

  let element = null;

  if (slug) {
    const project = await getProject(slug);

    if (!project) {
      element = (
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
        </div>
      );
    } else {
      title = project.frontmatter.title;
      description = project.frontmatter.description;
      date = project.frontmatter.date;
      topText = `~/projects/${slug}`;
      status = "COMPLETED";
    }
  } else {
    title = searchParams.get("title") || title;
    description = searchParams.get("description") || description;
    topText = searchParams.get("topText") || topText;
    const paramDate = searchParams.get("date");
    if (paramDate) date = paramDate;
  }

  if (!element) {
    element = (
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
      </div>
    );
  }

  const imageResponse = new ImageResponse(element, {
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
  });

  // 3. Save to R2 Cache and return
  if (cloudflareR2WorkerUrl) {
    try {
      const arrayBuffer = await imageResponse.arrayBuffer();
      // Execute PUT in background or await it. Since Vercel/Next might kill background tasks, we await.
      await fetch(`${cloudflareR2WorkerUrl}/${cacheKey}`, {
        method: "PUT",
        body: arrayBuffer,
        headers: {
          "Content-Type": "image/png",
        },
      });

      return new Response(arrayBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (error) {
      console.error("Failed to save to R2 cache:", error);
      // Fallback to returning the image response directly if caching fails
      // We need to regenerate the response because arrayBuffer() consumes the body
      // Ideally we would have cloned it, but since we already consumed it into arrayBuffer,
      // we can just return a new Response with that buffer.
    }
  }

  return imageResponse;
}
