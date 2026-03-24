"use client";

import React, { useEffect, useState } from "react";

interface NoiseProps {
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({ patternAlpha = 15 }) => {
  const [noiseDataUrl, setNoiseDataUrl] = useState<string>("");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const imageData = ctx.createImageData(100, 100);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          // Generate high contrast noise
          const value = Math.random() > 0.5 ? 255 : 0;
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);
        const dataUrl = canvas.toDataURL();
        requestAnimationFrame(() => {
          setNoiseDataUrl(dataUrl);
        });
      }
    } catch (e) {
      console.error("Failed to generate noise texture", e);
    }
  }, []);

  if (!noiseDataUrl) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-9999 overflow-hidden"
      style={{ opacity: patternAlpha / 255 }}
    >
      <div
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
        style={{
          backgroundImage: `url(${noiseDataUrl})`,
          backgroundSize: "100px 100px",
          animation: "noiseAnimation 0.2s infinite",
        }}
      />
      <style>
        {`
        @keyframes noiseAnimation {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
        `}
      </style>
    </div>
  );
};

export default Noise;
