"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectFrontmatter } from "@/types/content";

interface ProjectListProps {
  projects: ProjectFrontmatter[] | null;
}

const INITIAL_VISIBLE = 6;

export default function ProjectList({ projects }: ProjectListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCount = isExpanded ? projects?.length : INITIAL_VISIBLE;
  const visibleProjects = projects?.slice(0, visibleCount);
  const hasMore = (projects?.length || 0) > INITIAL_VISIBLE;

  return (
    <>
      <div className="grid gap-5 p-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects && projects.length > 0 ? (
          visibleProjects?.map((project) => (
            <div
              key={project.slug}
              className="group px-4 py-4 flex flex-col gap-4 border border-accent/50 bg-background/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
            >
              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="relative w-full h-52 overflow-hidden ring-1 ring-accent/20">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />
                </div>
              )}

              {/* Project Info */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-accent">
                  {project.title}
                </h3>
                <p className="text-background/60 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Date */}
                <p className="text-xs text-background/50 uppercase tracking-wide">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Links */}
              <div className="flex gap-2 flex-wrap pt-1">
                <a
                  href={`/project/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-accent/60 text-accent hover:bg-accent hover:text-foreground transition-colors"
                >
                  Read more
                </a>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-accent/40 text-accent/90 hover:bg-accent/90 hover:text-foreground transition-colors"
                  >
                    View Project
                  </a>
                )}
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-accent/40 text-accent/90 hover:bg-accent/90 hover:text-foreground transition-colors"
                  >
                    Repository
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-foreground/60">No projects available.</p>
        )}
      </div>

      {/* View More Button */}
      {hasMore && (
        <div className="flex justify-center p-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2.5 rounded-full border border-accent/60 text-accent hover:bg-accent hover:text-foreground transition-colors text-sm md:text-base font-medium"
          >
            {isExpanded
              ? "Show less"
              : `View more projects (${(projects?.length || 0) - INITIAL_VISIBLE})`}
          </button>
        </div>
      )}
    </>
  );
}
