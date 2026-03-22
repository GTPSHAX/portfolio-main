"use server";

import { outfit, robotoMono } from "@/fonts/google";
import Opening from "@/components/Opening";
import MainLayout from "@/components/layout/MainLayout";
import { terminalF4 } from "@/fonts/local";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";

export default async function Home() {

  return (
    <MainLayout className={`relative ${terminalF4.className}`}>
      <HeroSection />
      <AboutSection />
      
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
