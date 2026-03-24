import { cn } from "@/lib/utils";
import { bitsumis } from "@/fonts/local";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-foreground text-accent pt-20 pb-10 border-t border-accent/20 overflow-hidden",
        className,
      )}
    >
      <div className="container mx-auto px-6 flex flex-col gap-10">
        {/* Terminal Command Line */}
        <div className="flex items-center gap-2 text-accent/50 font-mono text-sm md:text-base mb-2">
          <span className="text-green-500">➜</span>
          <span className="text-blue-500">~</span>
          <span className="text-accent/70">./init_contact.sh</span>
        </div>

        {/* Big CTA */}
        <div className="relative z-10">
          <h2
            className={`${bitsumis.className} text-[4rem] sm:text-[5rem] md:text-[8rem] lg:text-[11rem] leading-[0.8] tracking-tight`}
          >
            <a
              href="mailto:contact@example.com"
              className="group flex flex-wrap items-baseline hover:text-accent/80 transition-colors duration-300 cursor-pointer"
            >
              Let's Talk
              <span className="inline-block w-3 h-3 md:w-6 md:h-6 lg:w-10 lg:h-10 bg-accent ml-2 md:ml-4 lg:ml-8 animate-pulse mb-2 md:mb-4 lg:mb-8" />
            </a>
          </h2>
        </div>

        {/* Footer Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 md:mt-20 border-t border-accent/10 pt-10">
          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-accent/40 uppercase tracking-widest">
              Directory
            </span>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm md:text-base text-accent/80">
              <a
                href="#hero"
                className="hover:text-accent transition-colors hover:underline decoration-dashed underline-offset-4"
              >
                /root
              </a>
              <a
                href="#about"
                className="hover:text-accent transition-colors hover:underline decoration-dashed underline-offset-4"
              >
                /about
              </a>
              <a
                href="#projects"
                className="hover:text-accent transition-colors hover:underline decoration-dashed underline-offset-4"
              >
                /projects
              </a>
            </nav>
          </div>

          {/* Copyright & Info */}
          <div className="flex flex-col gap-4 md:items-end md:text-right">
            <span className="font-mono text-xs text-accent/40 uppercase tracking-widest">
              Metadata
            </span>
            <div className="flex flex-col gap-1 font-mono text-xs md:text-sm text-accent/60">
              <p>v1.0.0 &bull; {currentYear} Edition</p>
              <p>Designed & Built with &lt;3</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
