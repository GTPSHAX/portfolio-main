"use client";

import { useState, useEffect } from "react";
import SplitText from "./SplitText";
import * as motion from "motion/react-client";

export default function Opening() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 3.2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setHidden(true)}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-foreground z-[9999] text-accent"
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ y: -100, opacity: 0 }}
        transition={{ delay: 2.8, duration: 0.5 }}
      >
        <SplitText
          text={`"Urip iku murup"`}
          className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center"
          delay={50}
          duration={1.2}
          ease="back.out"
          splitType="chars"
          from={{ opacity: 0, y: 50, scale: 1.2 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
          textAlign="center"
        />
      </motion.div>
    </motion.div>
  );
}
