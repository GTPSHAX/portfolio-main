import { cn } from "@/lib/utils";
import GlassSurface from "./GlassSurface";

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
  ariaLabel
}: NavProps & {
  logo?: React.ReactNode,
  actionButtons?: React.ReactNode,
  label: string,
  ariaLabel?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between px-5 py-3 sm:px-8 sm:py-4 md:px-15 md:py-5",
        className,
      )}
    >
      <GlassSurface width={"fit-content"} height={50} borderRadius={50} className="px-5">
        {label}
      </GlassSurface>

      <GlassSurface width={"fit-content"} height={50} borderRadius={50}>
        <nav
          className={cn("px-10 flex space-x-4", className)}
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
            className="flex space-x-4 h-full"
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
      className={cn(
        "text-sm font-bold px-4 py-2 border border-white",
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </li>
  );
}
