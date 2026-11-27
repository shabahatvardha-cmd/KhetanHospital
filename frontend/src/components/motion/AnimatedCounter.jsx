import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * ⚡ POLPHARMA ANIMATED NUMBER COUNTER
 * 
 * Smoothly animates numbers from 0 to the target count when scrolled into view.
 * Handles strings like "14+", "1,200+", "5,000+", "100%".
 */
export const AnimatedCounter = ({
  value = "0",
  className = "",
  duration = 2.0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Parse prefix, number, and suffix
  const str = String(value);
  const numericMatch = str.match(/[\d,.]+/);
  const rawNumber = numericMatch ? parseFloat(numericMatch[0].replace(/,/g, '')) : 0;
  const prefix = str.slice(0, numericMatch ? numericMatch.index : 0);
  const suffix = numericMatch ? str.slice(numericMatch.index + numericMatch[0].length) : '';
  const hasComma = numericMatch && numericMatch[0].includes(',');

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 70,
    damping: 18,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(rawNumber);
    }
  }, [isInView, rawNumber, motionVal]);

  const spanRef = useRef(null);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (spanRef.current) {
        const rounded = Math.round(latest);
        const formatted = hasComma ? rounded.toLocaleString() : rounded.toString();
        spanRef.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springVal, prefix, suffix, hasComma]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      <span ref={spanRef}>
        {prefix}0{suffix}
      </span>
    </span>
  );
};

export default AnimatedCounter;
