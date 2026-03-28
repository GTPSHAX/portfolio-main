"use server";

import { bitsumis } from "@/fonts/local";
import MDXContent, { frontmatter } from "#/content/about.mdx";
import { AboutSectionFrontmatter } from "@/types/content";
import { GoGear } from "react-icons/go";
import GeometricBackground from "@/components/background/GeometricBackground";
import StaggerChildren, { StaggerItem } from "@/components/StaggerChildren";

export default async function AboutSection() {
  const aboutFrontmatter = frontmatter as AboutSectionFrontmatter;

  return (
    <section
      id="about"
      className="bg-foreground text-accent min-h-screen flex items-center justify-center relative overflow-clip"
    >
      {/* Background Gradient & Geometric Elements */}
      <GeometricBackground />

      <GoGear
        aria-hidden="true"
        size={500}
        className="absolute z-0 -right-[250px] -bottom-[250px] opacity-15 animate-spin [animation-duration:20s]"
      />

      <div className="container z-1 grid w-full h-full grid-cols-1 lg:grid-cols-2 py-10">
        {/* About Content */}
        {/* Accessible duplicate for screen readers */}
        <div
          className="sr-only"
          aria-hidden="false"
          dangerouslySetInnerHTML={{ __html: aboutFrontmatter.title + "\n" + aboutFrontmatter.description }}
        />
        <StaggerChildren
          delay={0.2}
          staggerDelay={0.15}
          accessible={false}
          className="flex flex-col gap-5 p-6 h-fit lg:sticky lg:top-24"
        >
          <StaggerItem direction="down">
            <div className="flex items-center justify-center gap-2">
              <span
                aria-hidden="true"
                className="uppercase tracking-widest text-nowrap text-xs md:text-sm text-accent/70 hover:underline hover:decoration-accent/50 cursor-default w-fit"
              >
                # [01] / About
              </span>
              <div className="w-full border border-accent/70 border-dashed" />
            </div>
          </StaggerItem>

          <StaggerItem>
            <h2
              className={`${bitsumis.className} text-4xl md:text-5xl leading-[0.9]`}
              dangerouslySetInnerHTML={{ __html: aboutFrontmatter.title }}
            />
          </StaggerItem>

          <StaggerItem>
            <p
              className="text-lg md:text-xl text-background/60 leading-6"
              dangerouslySetInnerHTML={{
                __html: aboutFrontmatter.description,
              }}
            />
          </StaggerItem>
        </StaggerChildren>

        {/* Skills Content */}
        {/* Accessible duplicate for screen readers */}
        <div className="sr-only" aria-hidden="false">
          {MDXContent({})}
        </div>
        <StaggerChildren
          delay={0.4}
          staggerDelay={0.15}
          accessible={false}
          className="flex flex-col gap-5 p-6 h-full"
        >
          <StaggerItem direction="down">
            <div className="flex items-center justify-center gap-2">
              <span
                aria-hidden="true"
                className="uppercase tracking-widest text-nowrap text-xs md:text-sm text-accent/70 hover:underline hover:decoration-accent/50 cursor-default w-fit"
              >
                # [02] / Skills
              </span>
              <div className="w-full border border-accent/70 border-dashed" />
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="">{MDXContent({})}</div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
