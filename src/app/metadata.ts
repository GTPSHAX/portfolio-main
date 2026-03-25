import type { Metadata } from "next";
import { frontmatter } from "#/content/index.mdx";
import type { HeroSectionFrontmatter } from "@/types/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const indexFrontmatter: HeroSectionFrontmatter =
  frontmatter as HeroSectionFrontmatter;

const ogImage =
  "/og?title=" +
  encodeURIComponent(
    indexFrontmatter.name.replaceAll("<br>", " ") + " Portfolio",
  ) +
  "&description=" +
  encodeURIComponent(
    "Portfolio of " +
      indexFrontmatter.name.replaceAll("<br>", " ") +
      ", a " +
      indexFrontmatter.roles.join(", ") +
      ".",
  ) +
  "&topText=" +
  encodeURIComponent(
    "~/" + indexFrontmatter.name.replaceAll("<br>", "").toLowerCase(),
  );

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: indexFrontmatter.name.replaceAll("<br>", " ") + " | Portfolio",
    template: "%s | " + indexFrontmatter.name.replaceAll("<br>", " "),
  },
  description:
    "Portfolio of " +
    indexFrontmatter.name.replaceAll("<br>", " ") +
    ", a " +
    indexFrontmatter.roles.join(", ") +
    ".",
  applicationName: indexFrontmatter.name.replaceAll("<br>", " ") + " Portfolio",
  keywords: [
    ...indexFrontmatter.roles,
    "Portfolio",
    "Website Portfolio",
    "Modern and unique portfolio",
  ],
  authors: [
    { name: indexFrontmatter.name.replaceAll("<br>", " "), url: baseUrl },
  ],
  creator: indexFrontmatter.name.replaceAll("<br>", " "),
  publisher: indexFrontmatter.name.replaceAll("<br>", " "),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: indexFrontmatter.name.replaceAll("<br>", " ") + " | Portfolio",
    description:
      "Portfolio of " +
      indexFrontmatter.name.replaceAll("<br>", " ") +
      ", a " +
      indexFrontmatter.roles.join(", ") +
      ".",
    url: baseUrl,
    siteName: indexFrontmatter.name.replaceAll("<br>", " ") + " Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt:
          indexFrontmatter.name.replaceAll("<br>", " ") +
          " Portfolio Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: indexFrontmatter.name.replaceAll("<br>", " ") + " | Portfolio",
    description:
      "Portfolio of " +
      indexFrontmatter.name.replaceAll("<br>", " ") +
      ", a " +
      indexFrontmatter.roles.join(", ") +
      ".",
    creator: "@" + indexFrontmatter.name.replaceAll("<br>", "").toLowerCase(),
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
