"use server";

import path from "node:path";
import { readdir } from "node:fs/promises";

import { JSX } from "react";
import { GrLinkedin, GrGithub } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
import { SocialIconType } from "@/types/content";
import { ProjectFrontmatter } from "@/types/content";
import { existsSync } from "node:fs";
import { cwd } from "node:process";

export async function getProject(slug: string): Promise<{
  default: React.ComponentType;
  frontmatter: ProjectFrontmatter;
} | null> {
  const projectsDir = "../../../content/projects/";

  // Check if file is exists with .md or .mdx ext
  let extFile = path.extname(slug);
  if (extFile === "") extFile = ".mdx";

  if (!existsSync(path.join(cwd(), "content/projects/", slug + extFile))) {
    extFile = ".md";
    if (!existsSync(path.join(cwd(), "content/projects/", slug + extFile)))
      return null;
  }

  return (
    ((await import(projectsDir + slug + extFile)) as {
      default: React.ComponentType;
      frontmatter: ProjectFrontmatter;
    }) || null
  );
}

export async function getAllProjects(): Promise<ProjectFrontmatter[] | null> {
  // Temp var
  let projectFrontmatters: ProjectFrontmatter[] = [];

  // Read content/projects/* files
  const projectsDir = path.join(process.cwd(), "content/projects/");
  const projectFiles = await readdir(projectsDir);

  console.log(JSON.stringify(projectFiles));
  // Get frontmatter each file
  for (let i = projectFiles.length; i > 0; i--) {
    const projectFile = projectFiles[i - 1];

    // Continue if file ext is not md or mdx
    const extFile = path.extname(projectFile);
    console.log(extFile);
    if (extFile !== ".md" && extFile !== ".mdx") continue;

    const projectFrontmatter = await getProject(projectFile.split(".")[0]);
    if (!projectFrontmatter) continue;

    projectFrontmatters.push(projectFrontmatter.frontmatter);
  }

  console.log(JSON.stringify(projectFrontmatters));

  // Sort by date (newest)
  projectFrontmatters.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return projectFrontmatters || null;
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
