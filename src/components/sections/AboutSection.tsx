"use server";

import { bitsumis } from "@/fonts/local";
import MDXContent, { frontmatter } from "#/content/about.mdx";
import { AboutSectionFrontmatter } from "@/types/content";

export default async function AboutSection() {
  const aboutFrontmatter = frontmatter as AboutSectionFrontmatter;

  return (
    <section
      id="about"
      className="bg-foreground/80 text-accent min-h-screen flex items-center justify-center relative overflow-x-clip"
    >
      <div className="container grid w-full h-full grid-cols-1 lg:grid-cols-2 py-10 divide-accent/80 divide-y lg:divide-y-0 lg:divide-x">
        {/* About Content */}
        <div className="flex flex-col gap-5 p-6">
          <span className="uppercase tracking-widest text-xs md:text-sm text-accent/70 hover:underline hover:decoration-accent/50 cursor-default w-fit">
            # [01] / About
          </span>
          <h2
            className={`${bitsumis.className} text-4xl md:text-5xl leading-[0.9]`}
            dangerouslySetInnerHTML={{ __html: aboutFrontmatter.title }}
          />
          <p
            className="text-lg md:text-xl text-background/60 leading-6"
            dangerouslySetInnerHTML={{
              __html: aboutFrontmatter.description,
            }}
          />
        </div>

        {/* Skills Content */}
        <div className="flex flex-col gap-5 p-6">
          <span className="uppercase tracking-widest text-xs md:text-sm text-accent/70 hover:underline hover:decoration-accent/50 cursor-default w-fit">
            # [02] / Skills
          </span>
          
          <div className="">
            {MDXContent({})}
          </div>
        </div>
      </div>
    </section>
  );
}
