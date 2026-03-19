import { outfit, rubikGlitch } from "@/fonts/google";
import Opening from "@/components/Opening";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { blastimoSans, cracked, drunkText } from "@/fonts/local";

export default function Home() {
  return (
    <MainLayout className={`relative`}>
      <section
        id="hero"
        className="bg-accent-foreground text-accent h-dvh flex items-center justify-center relative overflow-clip"
      >
        {/* Background Hero (mask) */}
        <Image
          src="/images/background-hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center grayscale mix-blend-screen z-1"
          priority
          quality={75}
          draggable={false}
        />

        {/* Big Bold Typography */}
        <div
          className={`absolute bottom-30 ${blastimoSans.className} font-extrabold text-[10rem] md:text-[20rem] 2md:text-[25rem]! opacity-50 uppercase leading-[0.8] text-nowrap`}
        >
          RAFIE HASANNUDIN
        </div>

        <div className="container mx-auto px-6 h-full">
          {/* Profile Image */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center border border-black">
              <Image
                src="/images/profile.png"
                alt="Profile Picture"
                width={700}
                height={800}
                preload
                unoptimized
                className="grayscale min-w-125 2md:min-w-225 z-2"
                draggable={false}
              />
            </div>
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