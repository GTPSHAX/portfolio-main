"use server";

import { outfit, rubikGlitch } from "@/fonts/google";
import Opening from "@/components/Opening";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { blastimoSans, cracked, drunkText } from "@/fonts/local";
import { frontmatter } from "#/content/index.mdx";
import { getSocialIcon, SocialIconType } from "@/lib/server/utils";
import Link from "next/link";

interface IndexFrontmatter {
  name: string;
  bigBoldTypography: string;
  socialLinks: {
    type: SocialIconType;
    href: string;
    ariaLabel: string;
  }[];
  openToWork: boolean;
  roles?: string[];
}

export default async function Home() {
  const indexFrontmatter = frontmatter as IndexFrontmatter;

  return (
    <MainLayout className="relative">
      <section
        id="hero"
        className="bg-accent-foreground text-accent h-screen flex items-center justify-center relative overflow-clip"
      >
        {/* Background Hero (mask) */}
        <Image
          src="/images/background-hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center grayscale mix-blend-screen z-1 pointer-events-none"
          priority
          quality={75}
          draggable={false}
        />

        {/* Big Bold Typography */}
        <div
          aria-hidden="true"
          className={`absolute bottom-30 ${blastimoSans.className} font-bold text-[10rem] md:text-[20rem] 2md:text-[25rem]! opacity-50 uppercase leading-[0.8] text-nowrap pointer-events-none`}
        >
          {indexFrontmatter.bigBoldTypography}
        </div>

        <div className="container mx-auto px-6 pt-10 h-full">
          {/* Hero Content */}
          <div className="relative w-full h-full">
            {/* Social Links */}
            <nav className="absolute top-10 right-0 p-6 flex flex-col items-center gap-4 pointer-events-auto group transition-opacity duration-300">
              <div aria-hidden="true" className="h-5 w-1 bg-background group-hover:opacity-70" />
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
              <div aria-hidden="true" className="h-15 w-1 bg-background group-hover:opacity-70" />
            </nav>

            {/* Profile Image */}
            <Image
              src="/images/profile.png"
              alt="Profile Picture"
              width={700}
              height={800}
              priority
              unoptimized
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none grayscale min-w-125 2md:min-w-225 z-2"
              draggable={false}
            />
          </div>
        </div>
      </section>
      <div className="">
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptas
        dignissimos earum eum vero, aliquid error temporibus voluptatem eligendi
        quo placeat quos similique nemo amet inventore nobis ipsa sunt harum.
      </div>
    </MainLayout>
  );
}
