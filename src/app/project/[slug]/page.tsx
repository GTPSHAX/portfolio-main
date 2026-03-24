"use server";

import { access, readdir } from "node:fs/promises";
import path from "node:path";

import MainLayout from "@/components/layout/MainLayout";
import { terminalF4 } from "@/fonts/local";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

interface ProjectFrontmatter {
  title: string;
  description?: string;
  date?: string;
  url?: string;
  repository?: string;
  thumbnail?: string;
}

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function isValidProjectSlug(slug: string) {
  return /^[a-z0-9][a-z0-9-_]*$/i.test(slug);
}

async function loadProjectModule(slug: string) {
  if (!isValidProjectSlug(slug)) {
    notFound();
  }

  const projectFile = path.join(projectsDirectory, `${slug}.mdx`);

  try {
    await access(projectFile);
  } catch {
    notFound();
  }

  try {
    const file = path.join("../../../../content/projects", `${slug}.mdx`);
    
    return (await import(file)) as {
      default: React.ComponentType;
      frontmatter: ProjectFrontmatter;
    };
  } catch (error) { 
    const message = error instanceof Error ? error.message : "";

    if (message.includes("Cannot find module") || message.includes("not found")) {
      notFound();
    }

    throw error;
  }
}

export async function generateStaticParams() {
  const files = await readdir(projectsDirectory, { withFileTypes: true });

  return files
    .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
    .map((file) => ({
      slug: path.basename(file.name, ".mdx"),
    }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectModule = await loadProjectModule(slug);
  const ProjectContent = projectModule.default;
  const { frontmatter } = projectModule;

  return (
    <MainLayout className={`relative ${terminalF4.className} py-12`}>
      <article className="container mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
            Project / {slug}
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            {frontmatter.title}
          </h1>
          {frontmatter.description ? (
            <p className="max-w-3xl text-base leading-7 text-foreground/70 sm:text-lg">
              {frontmatter.description}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 text-sm text-foreground/70">
            {frontmatter.date ? <span>{frontmatter.date}</span> : null}
            {frontmatter.url ? (
              <a
                href={frontmatter.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Live site
              </a>
            ) : null}
            {frontmatter.repository ? (
              <a
                href={frontmatter.repository}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Repository
              </a>
            ) : null}
          </div>
        </header>

        <div className="space-y-6 text-base leading-7 text-foreground/80 [&_a]:underline [&_a]:underline-offset-4 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_p]:text-foreground/80 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_img]:rounded-lg [&_img]:border [&_img]:border-border/50 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_hr]:border-border/60">
          <ProjectContent />
        </div>
      </article>
    </MainLayout>
  );
}
