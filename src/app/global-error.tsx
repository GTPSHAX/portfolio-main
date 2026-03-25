"use client";

import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { terminalF4, bitsumis } from "@/fonts/local";
import GeometricBackground from "@/components/background/GeometricBackground";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${terminalF4.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={`relative ${terminalF4.className} min-h-screen flex flex-col bg-foreground overflow-clip text-accent`}
          >
            <GeometricBackground />

            <div className="flex-1 flex flex-col items-center justify-center relative z-1 p-6 min-h-screen">
              <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
                <div className="relative">
                  <h1
                    className={`${bitsumis.className} text-[6rem] md:text-[10rem] leading-[0.8] text-destructive opacity-90 select-none`}
                  >
                    FATAL
                  </h1>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <span className="bg-foreground/80 px-4 py-1 text-sm md:text-base text-destructive border border-destructive/20 backdrop-blur-sm uppercase tracking-widest font-mono">
                      System Crash
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl text-destructive font-bold uppercase tracking-wide">
                    Global Application Error
                  </h2>
                  <p className="text-background/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                    A critical system failure has occurred. The application
                    layout could not be rendered.
                  </p>
                  {error.digest && (
                    <p className="text-xs font-mono text-destructive/60">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>

                <div className="pt-8">
                  <Button
                    onClick={reset}
                    size="lg"
                    className={`text-base md:text-lg px-8 py-6 bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive rounded-none cursor-pointer`}
                  >
                    ~/reboot_system
                  </Button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-10 left-10 hidden md:block opacity-30 font-mono text-xs text-destructive text-left">
                <div>CRITICAL_PROCESS_DIED</div>
                <div>MEM_DUMP: 0x00000000</div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
