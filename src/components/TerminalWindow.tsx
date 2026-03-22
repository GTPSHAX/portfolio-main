"use client";

import { useRef, useState } from "react";
import { terminalF4 } from "@/fonts/local";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  className?: string;
  initialX?: number;
  initialY?: number;
  children?: React.ReactNode;
}

export default function TerminalWindow({
  className,
  initialX = 0,
  initialY = 0,
  children,
}: TerminalWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const dragStartRef = useRef<{
    x: number;
    y: number;
    cursorX: number;
    cursorY: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = {
      x: position.x,
      y: position.y,
      cursorX: event.clientX,
      cursorY: event.clientY,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = event.clientX - dragStartRef.current.cursorX;
    const dy = event.clientY - dragStartRef.current.cursorY;
    setPosition({
      x: dragStartRef.current.x + dx,
      y: dragStartRef.current.y + dy,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={cn("absolute", className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className={cn("bg-foreground border border-accent shadow-2xl w-80 md:w-96 lg:w-xl overflow-hidden", terminalF4.className)}>
        {/* Window Header */}
        <div
          className="bg-accent/20 border-b border-accent px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span
            className="text-xs font-semibold text-accent"
          >
            terminal
          </span>
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-accent/60 hover:bg-accent transition-colors" aria-hidden />
            <button className="w-3 h-3 rounded-full bg-accent/60 hover:bg-accent transition-colors" aria-hidden />
            <button className="w-3 h-3 rounded-full bg-accent/60 hover:bg-accent transition-colors" aria-hidden />
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 text-accent text-sm space-y-1 font-light select-none">
          {children ?? (
            <>
              <p
                className="text-accent opacity-80"
              >
                $ whoami
              </p>
              <p
                className="text-accent opacity-60"
              >
                developer
              </p>
              <p
                className="text-accent opacity-80 mt-3"
              >
                $ pwd
              </p>
              <p
                className="text-accent opacity-60"
              >
                /home/developer/projects
              </p>
              <p
                className="text-accent opacity-80 mt-3"
              >
                $ npm run build
              </p>
              <p
                className="text-accent opacity-60"
              >
                Building... ✓
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
