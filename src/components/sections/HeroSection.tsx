"use server";

import Image from "next/image";
import { frontmatter } from "#/content/index.mdx";
import { bitsumis, blastimoSans } from "@/fonts/local";
import MotionFadeIn from "@/components/MotionFadeIn";
import { Button } from "../ui/button";
import Link from "next/link";
import { getSocialIcon } from "@/lib/server/utils";
import TerminalWindow from "../TerminalWindow";
import { HeroSectionFrontmatter } from "@/types/content";

export default async function HeroSection() {
  const indexFrontmatter = frontmatter as HeroSectionFrontmatter;
  
  return (
    <section
      id="hero"
      className="bg-foreground text-accent h-screen flex items-center justify-center relative overflow-x-clip"
    >
      {/* Background Hero (mask) */}
      <Image
        src="/images/background-hero.jpg"
        alt="Hero Background"
        fill
        className="object-cover object-center grayscale mix-blend-screen opacity-70 z-1 pointer-events-none"
        priority
        quality={75}
        draggable={false}
      />

      {/* Big Bold Typography */}
      <div
        aria-hidden="true"
        className={`absolute bottom-30 ${blastimoSans.className} font-bold text-[10rem] md:text-[20rem] 2md:text-[25rem]! opacity-30 uppercase leading-[0.8] text-nowrap pointer-events-none`}
      >
        {indexFrontmatter.bigBoldTypography}
      </div>

      <div className="container mx-auto px-6 pt-10 h-full">
        {/* Hero Content */}
        <div className="relative w-full h-full flex items-center">
          <MotionFadeIn delay={3} className="relative z-2 pt-10 flex-1 h-full">
            {/* Greetings Text Container */}
            <div className="flex flex-col items-start gap-3">
              {/* Badge */}
              <div
                className={`flex items-center gap-3 px-3 py-1.5 border border-accent backdrop-blur-md ${indexFrontmatter.openToWork ? "bg-green-500/50" : "bg-red-500/50"}`}
              >
                <div
                  aria-hidden="true"
                  className={`w-2 h-2 animate-pulse ${indexFrontmatter.openToWork ? "bg-green-700" : "bg-red-700"}`}
                />
                <span
                  className={`font-terminal-f4 text-xs md:text-sm font-semibold uppercase tracking-widest`}
                >
                  {indexFrontmatter.openToWork
                    ? "Open to Work"
                    : "Not Open to Work"}
                </span>
              </div>

              {/* Main Headline */}
              <div className="flex flex-col mt-3">
                <p className={`text-xl sm:text-2xl md:text-3xl font-light`}>
                  Hello, I&apos;m
                </p>
                <h1
                  className={`${bitsumis.className} font-semibold text-[3rem] sm:text-[3.4rem] md:text-6xl lg:text-[5rem] leading-[0.7]`}
                  dangerouslySetInnerHTML={{ __html: indexFrontmatter.name }}
                />

                {/* sub-text - roles */}
                <ul
                  aria-label="My Roles"
                  className="flex flex-wrap gap-3 mt-2 divide-accent divide-x-2 md:max-w-[40vw]"
                >
                  {indexFrontmatter.roles &&
                    indexFrontmatter.roles.map((role, index) => (
                      <li
                        key={index}
                        aria-label={role}
                        className={`text-[0.9rem] sm:text-md md:text-lg lg:text-[1.5rem] mt-2 opacity-80 tracking-wide pr-3`}
                      >
                        {role}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className={`text-base md:text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent border border-accent mt-10`}
            >
              <Link href="#projects" scroll>
                View Projects
              </Link>
            </Button>
          </MotionFadeIn>
          <MotionFadeIn
            delay={3.15}
            className="relative pt-10 w-1/2 lg:w-2/5 2xl:w-1/2 h-full"
          >
            {/* Social Links */}
            <nav className="absolute bottom-14 lg:bottom-20 z-3 md:z-auto md:top-0 right-0 p-4 lg:p-6 flex flex-col items-center gap-3 lg:gap-4 pointer-events-auto group transition-opacity duration-300 border border-accent bg-foreground md:border-none md:bg-transparent">
              <div
                aria-hidden="true"
                className="h-5 w-1 bg-background group-hover:opacity-70"
              />
              {indexFrontmatter.socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="group-hover:not-hover:opacity-70"
                >
                  {getSocialIcon(link.type, 30)}
                </Link>
              ))}
              <div
                aria-hidden="true"
                className="h-15 w-1 bg-background group-hover:opacity-70"
              />
            </nav>

            <TerminalWindow className="bottom-0 right-0 hidden md:block z-4" />
          </MotionFadeIn>

          {/* Profile Image */}
          <MotionFadeIn
            delay={3.3}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:-translate-x-1/3 lg:-translate-x-1/2 pointer-events-none grayscale min-w-120 z-3"
          >
            <Image
              src="/images/profile.png"
              alt="Profile Picture"
              width={700}
              height={800}
              priority
              unoptimized
              className="w-full h-auto"
              draggable={false}
            />
          </MotionFadeIn>
        </div>
      </div>
    </section>
  );
}
