"use client";

import { useState } from "react";
import SplitText from "./SplitText";
import * as motion from "motion/react-client";

export default function Opening() {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      onAnimationComplete={() => setHidden(true)}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-999"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <SplitText
          text={`"Urip iku murup"`}
          className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center"
          delay={50}
          duration={2}
          ease="bounce.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
        />
      </motion.div>
    </motion.div>
  );
}
