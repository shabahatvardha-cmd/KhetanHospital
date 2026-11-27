import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function WaveGradientText({
  words = ["Dr.", "Vatsal", "Khetan"],
  className = ""
}) {
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAppeared(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] items-baseline select-none ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-visible py-1">
          <motion.span
            initial={{ y: 36, opacity: 0 }}
            animate={
              hasAppeared
                ? {
                    y: [0, -8, 0],
                    opacity: 1,
                    transition: {
                      y: {
                        duration: 2.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.22,
                      },
                    },
                  }
                : {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.7,
                      delay: index * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
            className="inline-block will-change-transform bg-gradient-to-r from-white via-cyan-300 to-sky-400 bg-[length:200%_auto] bg-clip-text text-transparent font-black tracking-tight drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
            style={{
              animation: 'shimmerGradient 6s ease infinite',
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default WaveGradientText;
