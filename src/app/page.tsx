"use server";

import Opening from "@/components/Opening";
import MainLayout from "@/components/layout/MainLayout";
import { terminalF4 } from "@/fonts/local";
import Noise from "@/components/Noise";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectSection from "@/components/sections/ProjectSection";

export default async function Home() {
  return (
    <MainLayout
      opening={<Opening />}
      className={`relative ${terminalF4.className}`}
    >
      <div className="fixed top-0 left-0 w-full h-full z-100 pointer-events-none">
        <Noise
          patternSize={250}
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={2}
          patternAlpha={30}
        />
      </div>

      <HeroSection />
      <AboutSection />
      <ProjectSection />
    </MainLayout>
  );
}
