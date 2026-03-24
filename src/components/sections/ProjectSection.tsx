"use server";

import { bitsumis } from "@/fonts/local";
import { getAllProjects } from "@/lib/server/utils";
import ProjectList from "./ProjectList";

export default async function ProjectSection() {
  const projects = await getAllProjects();

  return (
    <section
      id="projects"
      className="bg-foreground text-accent min-h-screen flex items-center justify-center relative overflow-clip"
    >
      <div className="container z-1 w-full h-full py-10 divide-accent/80">
        {/* Projects Header */}
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-center gap-2">
            <span className="uppercase tracking-widest text-nowrap text-xs md:text-sm text-accent/70 hover:underline hover:decoration-accent/50 cursor-default w-fit">
              # [03] / Projects
            </span>
            <div className="w-full border border-accent/70 border-dashed" />
          </div>
          <h2
            className={`${bitsumis.className} text-4xl md:text-5xl leading-[0.9]`}
            dangerouslySetInnerHTML={{ __html: "My Projects" }}
          />
          <p
            className="text-lg md:text-xl text-background/60 leading-6"
            dangerouslySetInnerHTML={{
              __html: "Here are some of the projects I've worked on recently.",
            }}
          />
        </div>

        {/* Project List */}
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
