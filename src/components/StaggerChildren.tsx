"use client";

import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import React from "react";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  viewportTrigger?: boolean;
}

export default function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
  viewportTrigger = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView={viewportTrigger ? "visible" : undefined}
      animate={!viewportTrigger ? "visible" : undefined}
      viewport={viewportTrigger ? { once: true, margin: "-50px" } : undefined}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.5,
}: StaggerItemProps) {
  const getHiddenVariant = () => {
    const distance = 30;
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 }; // Starts right, moves left
      case "right":
        return { x: -distance, opacity: 0 }; // Starts left, moves right
      case "none":
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: getHiddenVariant(),
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: duration, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
