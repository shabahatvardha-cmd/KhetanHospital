import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function WaveGradientText({
  words = ["Dr.", "Vatsal", "Khetan"],
  className = ""
}) {
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    // Switch to continuous wave oscillation after initial entrance completes
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
                        duration: 2.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.25, // Staggered wave effect across words
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
            className="inline-block will-change-transform bg-gradient-to-r from-[#08284d] via-[#0284c7] to-[#0369a1] bg-[length:200%_auto] bg-clip-text text-transparent font-black tracking-tight drop-shadow-xs"
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
