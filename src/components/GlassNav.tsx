"use client";

import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlassNav({
  className,
  children,
  logo,
  actionButtons,
  label,
  ariaLabel,
}: NavProps & {
  logo?: React.ReactNode;
  actionButtons?: React.ReactNode;
  label: string;
  ariaLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "relative flex items-center justify-between px-5 py-3 sm:px-8 sm:py-4 md:px-15 md:py-5",
        className,
      )}
    >
      {/* Brand Logo (Idk why i make this, only for perfection maybe?) */}
      <GlassSurface
        width={"fit-content"}
        height={50}
        borderRadius={50}
        className="px-5"
      >
        {label}
      </GlassSurface>

      {/* Navigation Items */}
      {!isMobile && (
        <div className="absolute md:relative top-full left-0 right-0 w-full flex items-center justify-center md:block md:w-fit px-5 sm:px-8 md:px-0">
          <GlassSurface
            width={isMobile ? "100%" : "fit-content"}
            height={isMobile ? "fit-content" : 50}
            borderRadius={isMobile ? 10 : 50}
          >
            <nav
              className={cn("px-10 flex space-x-4 w-full", className)}
              id="nav"
              aria-label={ariaLabel}
            >
              {logo && (
                <div className="shrink-0" id="Brand" aria-label="Brand Logo">
                  {logo}
                </div>
              )}

              <ul
                id="nav-items"
                className="flex flex-col md:flex-row items-stretch md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4 h-full flex-1"
                aria-label="Navigation Items"
              >
                {children}
              </ul>

              {actionButtons && (
                <div
                  className="ml-auto flex space-x-4"
                  id="nav-actions"
                  aria-label="Navigation actions"
                >
                  {actionButtons}
                </div>
              )}
            </nav>
          </GlassSurface>
        </div>
      )}

      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu backdrop"
                className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-0 right-0 z-50 w-full flex items-center justify-center px-5 sm:px-8"
              >
                <GlassSurface width="100%" height="fit-content" borderRadius={10}>
                  <nav
                    className={cn("px-10 flex space-x-4 w-full", className)}
                    id="nav"
                    aria-label={ariaLabel}
                  >
                    {logo && (
                      <div
                        className="shrink-0"
                        id="Brand"
                        aria-label="Brand Logo"
                      >
                        {logo}
                      </div>
                    )}

                    <ul
                      id="nav-items"
                      className="flex flex-col md:flex-row items-stretch md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4 h-full flex-1"
                      aria-label="Navigation Items"
                    >
                      {children}
                    </ul>

                    {actionButtons && (
                      <div
                        className="ml-auto flex space-x-4"
                        id="nav-actions"
                        aria-label="Navigation actions"
                      >
                        {actionButtons}
                      </div>
                    )}
                  </nav>
                </GlassSurface>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Burger toggler for mobile */}
      {isMobile && (
        <GlassSurface width={50} height={50} borderRadius={50} className="z-60">
          <motion.button
            className="flex flex-col items-center justify-center w-full h-full"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.12 }}
          >
            <motion.span
              className="block w-6 h-0.5 bg-white mb-1"
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white mb-1"
              animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            />
          </motion.button>
        </GlassSurface>
      )}
    </div>
  );
}

export function GlassNavItem({
  className,
  children,
  ariaLabel,
}: NavProps & {
  ariaLabel?: string;
}) {
  return (
    <li
      className={cn("text-sm font-bold w-full", className)}
      aria-label={ariaLabel}
    >
      {children}
    </li>
  );
}
