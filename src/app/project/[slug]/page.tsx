"use server";

import MainLayout from "@/components/layout/MainLayout";
import { Metadata } from "next";
import { terminalF4, bitsumis } from "@/fonts/local";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProject } from "@/lib/server/utils";
import GeometricBackground from "@/components/background/GeometricBackground";
import { GoProjectTemplate } from "react-icons/go";
import StaggerChildren, { StaggerItem } from "@/components/StaggerChildren";
import { FaArrowRightLong } from "react-icons/fa6";

export async function generateStaticParams() {
  const projects = await getAllProjects();

  if (!projects) return [];

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const { title, description } = project.frontmatter;
  const ogImage = `/og?slug=${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { default: ProjectContent, frontmatter } = project;
  const allProjects = await getAllProjects();
  const currentIndex = allProjects?.findIndex((p) => p.slug === slug) ?? -1;
  const newerProject =
    currentIndex > 0 ? allProjects?.[currentIndex - 1] : null;
  const olderProject =
    currentIndex !== -1 && allProjects && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <MainLayout
      className={`relative ${terminalF4.className} min-h-screen overflow-clip`}
    >
      <GeometricBackground />

      <GoProjectTemplate
        size={500}
        className="absolute z-0 -right-[250px] -top-[100px] opacity-10 animate-spin [animation-duration:30s] pointer-events-none"
      />

      <article className="container z-1 relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-20">
        {/* Header */}
        <StaggerChildren className="flex flex-col gap-6 border-b border-accent/20 pb-10">
          <StaggerItem direction="down">
            <div className="flex items-center gap-2 text-sm text-accent/60 mb-2">
              <FaArrowRightLong className="text-green-500" />
              <span className="tracking-widest uppercase">
                ~/projects/{slug}
              </span>
            </div>
          </StaggerItem>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Content Column */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <StaggerItem>
                <h1
                  className={`${bitsumis.className} text-5xl md:text-7xl leading-[0.8] text-accent`}
                >
                  {frontmatter.title}
                </h1>
              </StaggerItem>

              {frontmatter.description && (
                <StaggerItem>
                  <p className="text-lg md:text-xl leading-relaxed text-background/60">
                    {frontmatter.description}
                  </p>
                </StaggerItem>
              )}

              <StaggerItem>
                <div className="flex flex-wrap gap-4 pt-4">
                  {frontmatter.date && (
                    <div className="px-4 py-2 border border-accent/20 bg-foreground/40 backdrop-blur-sm rounded-sm text-sm text-accent/80 font-mono">
                      REL:{" "}
                      {new Date(frontmatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                  {frontmatter.url && (
                    <Link
                      href={frontmatter.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 border border-accent/40 bg-accent/5 hover:bg-accent/10 transition-colors rounded-sm text-sm text-accent font-mono"
                    >
                      &gt; LIVE_DEMO
                    </Link>
                  )}
                  {frontmatter.repository && (
                    <Link
                      href={frontmatter.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 border border-accent/40 bg-accent/5 hover:bg-accent/10 transition-colors rounded-sm text-sm text-accent font-mono"
                    >
                      &gt; REPOSITORY
                    </Link>
                  )}
                </div>
              </StaggerItem>
            </div>

            {/* Thumbnail Column */}
            {frontmatter.thumbnail && (
              <StaggerItem direction="up" className="order-1 lg:order-2 w-full">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-accent/20 group">
                  <Image
                    src={frontmatter.thumbnail}
                    alt={frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                </div>
              </StaggerItem>
            )}
          </div>
        </StaggerChildren>

        {/* Content */}
        <StaggerChildren delay={0.6}>
          <StaggerItem>
            <div className="space-y-6 text-lg leading-relaxed text-background/60 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent/50 hover:[&_a]:decoration-accent [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-accent [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-accent [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-accent [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-accent [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:marker:text-accent [&_code]:bg-accent/10 [&_code]:text-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:font-mono [&_code]:text-sm [&_pre]:bg-foreground/50 [&_pre]:border [&_pre]:border-accent/20 [&_pre]:p-4 [&_pre]:rounded-lg [&_img]:rounded-lg [&_img]:border [&_img]:border-accent/20">
              <ProjectContent />
            </div>
          </StaggerItem>
        </StaggerChildren>

        {/* Project Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-accent/20 mt-10">
          {newerProject ? (
            <Link
              href={`/project/${newerProject.slug}`}
              className="group flex flex-col gap-2 p-4 border border-accent/20 bg-foreground/40 hover:border-accent/50 transition-colors rounded-lg text-left"
              prefetch
            >
              <span className="text-sm text-accent/60 font-mono">
                &lt; NEWER_PROJECT
              </span>
              <span className="text-xl font-bold text-accent group-hover:text-accent/80 transition-colors line-clamp-1">
                {newerProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {olderProject ? (
            <Link
              href={`/project/${olderProject.slug}`}
              className="group flex flex-col gap-2 p-4 border border-accent/20 bg-foreground/40 hover:border-accent/50 transition-colors rounded-lg text-right items-end"
              prefetch
            >
              <span className="text-sm text-accent/60 font-mono">
                OLDER_PROJECT &gt;
              </span>
              <span className="text-xl font-bold text-accent group-hover:text-accent/80 transition-colors line-clamp-1">
                {olderProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>
    </MainLayout>
  );
}
