"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectFrontmatter } from "@/types/content";
import Link from "next/link";

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
      <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects && projects.length > 0 ? (
          visibleProjects?.map((project) => (
            <div
              key={project.slug}
              className="group relative flex flex-col gap-4 p-5 rounded-lg border border-accent/20 bg-foreground/40 backdrop-blur-sm hover:border-accent/60 hover:shadow-[0_0_15px_-3px_rgba(var(--accent),0.2)] transition-all duration-300"
            >
              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="relative w-full h-48 overflow-hidden rounded-md border border-accent/10">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-accent/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              )}

              {/* Project Info */}
              <div className="flex flex-col gap-3 flex-grow">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-accent group-hover:text-accent/80 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent/50">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                    <div className="h-px flex-grow bg-accent/20 border-t border-dashed border-accent/20" />
                  </div>
                </div>

                <p className="text-accent/70 text-sm leading-relaxed line-clamp-3 font-light">
                  {project.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-2 mt-auto">
                <Link
                  href={`/project/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono px-3 py-1.5 border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 transition-colors"
                  prefetch
                >
                  &gt; Read_More
                </Link>

                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-3 py-1.5 border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 transition-colors"
                  >
                    &gt; Demo
                  </Link>
                )}

                {project.repository && (
                  <Link
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-3 py-1.5 border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 transition-colors"
                  >
                    &gt; Source
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-accent/50 font-mono p-6">
            _ No projects found in directory.
          </p>
        )}
      </div>

      {/* View More Button */}
      {hasMore && (
        <div className="flex justify-center p-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative px-8 py-3 bg-transparent overflow-hidden"
          >
            <div className="absolute inset-0 border border-accent/40 group-hover:border-accent transition-colors duration-300" />
            <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative font-mono text-sm text-accent group-hover:text-accent font-medium tracking-wider">
              {isExpanded
                ? "[-] COLLAPSE_VIEW"
                : `[+] LOAD_MORE (${(projects?.length || 0) - INITIAL_VISIBLE})`}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
