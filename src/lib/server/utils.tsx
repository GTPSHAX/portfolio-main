"use server";

import path from "node:path";
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { cwd } from "node:process";
import { JSX } from "react";
import { GrLinkedin, GrGithub } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
import { SocialIconType, ProjectFrontmatter } from "@/types/content";

interface MdxModule {
  default: React.ComponentType;
  frontmatter: ProjectFrontmatter;
}

export async function getProject(slug: string): Promise<MdxModule | null> {
  const projectsDir = path.join(cwd(), "content/projects");
  const cleanSlug = slug.replace(/\.mdx?$/, "");

  // Determine extension
  let extension = ".mdx";
  if (!existsSync(path.join(projectsDir, `${cleanSlug}.mdx`))) {
    if (existsSync(path.join(projectsDir, `${cleanSlug}.md`))) {
      extension = ".md";
    } else {
      return null;
    }
  }

  try {
    const res = (await import(
      `../../../content/projects/${cleanSlug}${extension}`
    )) as MdxModule;

    // Ensure slug is populated in frontmatter
    if (res.frontmatter && !res.frontmatter.slug) {
      res.frontmatter.slug = cleanSlug;
    }

    return res;
  } catch (error) {
    console.error(`Error loading project ${cleanSlug}:`, error);
    return null;
  }
}

export async function getAllProjects(): Promise<ProjectFrontmatter[] | null> {
  const projectsDir = path.join(cwd(), "content/projects");

  if (!existsSync(projectsDir)) {
    return [];
  }

  try {
    const files = await readdir(projectsDir);

    const projects = await Promise.all(
      files
        .filter((file) => /\.(mdx?)$/.test(file))
        .map(async (file) => {
          const slug = file.replace(/\.mdx?$/, "");
          const project = await getProject(slug);
          return project?.frontmatter || null;
        }),
    );

    const validProjects = projects.filter(
      (p): p is ProjectFrontmatter => p !== null,
    );

    // Sort by date (newest)
    validProjects.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return validProjects;
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return null;
  }
}

export async function getSocialIcon(
  type: SocialIconType,
  size: number = 24,
): Promise<JSX.Element | null> {
  switch (type) {
    case "linkedin":
      return <GrLinkedin size={size} />;
    case "twitter":
      return <BsTwitterX size={size} />;
    case "github":
      return <GrGithub size={size} />;
    default:
      return null;
  }
}
