"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { HADITH_TEXT, type ThemeKey } from "@/lib/content";

const PARTICLES = Array.from({ length: 34 }, (_, index) => ({
  left: (index * 17 + 11) % 100,
  top: (index * 23 + 7) % 100,
  delay: -((index * 0.43) % 9),
  duration: 8 + ((index * 0.73) % 7)
}));

export function GhadirScene(_props: {
  theme: ThemeKey;
  compact?: boolean;
}) {
  return (
    <div className="photo-scene pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="photo-vignette" />

      {Array.from({ length: 8 }, (_, index) => (
        <span
          className="ray"
          key={index}
          style={{
            transform: `rotate(${index * 12 - 42}deg)`,
            animationDelay: `${index * 0.24}s`
          }}
        />
      ))}

      {PARTICLES.map((particle, index) => (
        <span
          className="particle"
          key={index}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            "--duration": `${particle.duration}s`
          } as CSSProperties}
        />
      ))}

      <div
        className="arabic-display absolute inset-x-4 bottom-6 z-10 mx-auto max-w-5xl text-center text-[clamp(1.45rem,3.4vw,3.5rem)] font-bold leading-relaxed text-[#fff8d7] drop-shadow-[0_8px_24px_rgba(0,0,0,0.38)]"
      >
        {HADITH_TEXT.split("").map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            animate={{
              opacity: [0, 1, 1, 0],
              y: [14, 0, 0, -8],
              filter: ["blur(6px)", "blur(0px)", "blur(0px)", "blur(4px)"]
            }}
            transition={{
              duration: 6.4,
              times: [0, 0.18, 0.76, 1],
              delay: index * 0.045,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut"
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
