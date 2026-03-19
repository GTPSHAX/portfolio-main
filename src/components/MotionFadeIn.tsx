'use client';

import { PropsWithChildren } from "react";
import { motion } from "motion/react";

interface MotionFadeInProps {
  delay?: number;
  duration?: number;
  className?: string;
}

export default function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: PropsWithChildren<MotionFadeInProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
