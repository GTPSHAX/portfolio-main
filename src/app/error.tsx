"use client";

import Link from "next/link";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { terminalF4, bitsumis } from "@/fonts/local";
import GeometricBackground from "@/components/background/GeometricBackground";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MainLayout
      className={`relative ${terminalF4.className} min-h-screen flex flex-col bg-foreground overflow-clip`}
    >
      <GeometricBackground />

      <div className="flex-1 flex flex-col items-center justify-center relative z-1 p-6 min-h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
          <div className="relative">
            <h1
              className={`${bitsumis.className} text-[8rem] md:text-[12rem] leading-[0.8] text-destructive opacity-90 select-none`}
            >
              ERR
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
              <span className="bg-foreground/80 px-4 py-1 text-sm md:text-base text-destructive border border-destructive/20 backdrop-blur-sm uppercase tracking-widest font-mono">
                System Failure
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl text-destructive font-bold uppercase tracking-wide">
              Something went wrong
            </h2>
            <p className="text-background/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              An unexpected error occurred while processing your request. The
              system has encountered a critical exception.
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-destructive/60">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={reset}
              size="lg"
              className={`text-base md:text-lg px-8 py-6 bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive rounded-none cursor-pointer`}
            >
              ~/retry_operation
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={`text-base md:text-lg px-8 py-6 bg-transparent text-accent hover:bg-accent/10 hover:text-accent border border-accent/50 rounded-none cursor-pointer`}
            >
              <Link href="/">~/return_home</Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 hidden md:block opacity-30 font-mono text-xs text-destructive text-right">
          <div>STATUS: CRITICAL_FAILURE</div>
          <div>ERR_MSG: {error.message || "UNKNOWN_EXCEPTION"}</div>
        </div>
      </div>
    </MainLayout>
  );
}
