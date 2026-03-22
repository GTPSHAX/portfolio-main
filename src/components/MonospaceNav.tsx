"use client";

import { cn } from "@/lib/utils";
import { terminalF4 } from "@/fonts/local";
import { useIsMobile } from "@/hooks/use-mobile";

interface MonospaceNavProps {
  className?: string;
  children?: React.ReactNode;
}

export function MonospaceNav({
  className,
  children,
  ariaLabel,
}: MonospaceNavProps & {
  ariaLabel?: string;
}) {
  return (
    <nav
      className={cn(
        "flex justify-between bg-foreground text-background",
        className,
        terminalF4.className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </nav>
  );
}

export function MonospaceNavBrand({
  className,
  children,
  href,
  ariaLabel,
}: MonospaceNavProps & {
  href: string;
  ariaLabel?: string;
}) {
  const isMobile = useIsMobile();

  return (
    <a
      href={href}
      className={cn(
        "px-4 py-2 text-sm font-terminal-f4 font-bold",
        isMobile ? "hidden": "block",
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

export function MonospaceNavItemList({
  className,
  children,
  ariaLabel,
}: MonospaceNavProps & {
  ariaLabel?: string;
}) {
  return (
    <ul className={cn("flex flex-1 outline outline-black divide-x divide-black", className)} aria-label={ariaLabel}>
      {children}
    </ul>
  );
}

export function MonospaceNavItem({
  className,
  children,
  ariaLabel,
}: MonospaceNavProps & {
  ariaLabel?: string;
}) {
  return (
    <li
      className={cn(
        "flex items-center justify-center flex-1 text-sm font-terminal-f4 hover:bg-background hover:text-foreground transition-colors duration-300 min-h-10",
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </li>
  );
}
