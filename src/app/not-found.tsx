import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { terminalF4, bitsumis } from "@/fonts/local";
import GeometricBackground from "@/components/background/GeometricBackground";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <MainLayout
      className={`relative ${terminalF4.className} min-h-screen flex flex-col bg-foreground overflow-clip`}
    >
      <GeometricBackground />

      <div className="flex-1 flex flex-col items-center justify-center relative z-1 p-6 min-h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
          <div className="relative">
            <h1
              className={`${bitsumis.className} text-[8rem] md:text-[12rem] leading-[0.8] text-accent opacity-90 select-none`}
            >
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
              <span className="bg-foreground/80 px-4 py-1 text-sm md:text-base text-accent border border-accent/20 backdrop-blur-sm uppercase tracking-widest font-mono">
                System Error
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl text-accent font-bold uppercase tracking-wide">
              Page Not Found
            </h2>
            <p className="text-background/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              The requested resource could not be found on this server. It might
              have been moved, deleted, or never existed in this dimension.
            </p>
          </div>

          <div className="pt-8">
            <Button
              asChild
              size="lg"
              className={`text-base md:text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent border border-accent rounded-none`}
            >
              <Link href="/">~/return_home</Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 hidden md:block opacity-30 font-mono text-xs text-accent">
          <div>ERR_CODE: 404_NOT_FOUND</div>
          <div>LOC: UNKNOWN_SECTOR</div>
        </div>
      </div>
    </MainLayout>
  );
}
