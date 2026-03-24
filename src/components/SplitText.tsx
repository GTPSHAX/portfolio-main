"use client";

import React from "react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: any;
  to?: any;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  viewportTrigger?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 0.5,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  onLetterAnimationComplete,
  viewportTrigger = true,
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
      initial="hidden"
      whileInView={viewportTrigger ? "visible" : undefined}
      animate={!viewportTrigger ? "visible" : undefined}
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants}
      onAnimationComplete={onLetterAnimationComplete}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {splitType === "chars" ? (
            word.split("").map((char, j) => (
              <motion.span
                key={j}
                className="inline-block"
                variants={itemVariants}
              >
                {char}
              </motion.span>
            ))
          ) : (
            <motion.span className="inline-block" variants={itemVariants}>
              {word}
            </motion.span>
          )}
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.div>
  );
};

export default SplitText;
