import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * 🔢 AnimatedCounter
 * Smooth kinetic number counter that animates from 0 to target value on scroll into view.
 * Handles strings like "14+", "1,200+", "5,000+", "100%", "5.0★" gracefully.
 */
export const AnimatedCounter = ({
  value,
  duration = 1.8,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Convert value to string and parse numbers
    const strVal = String(value || '0');
    // Extract non-digits prefix/suffix
    const match = strVal.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
    if (!match) {
      setDisplayValue(strVal);
      return;
    }

    const prefix = match[1] || '';
    const rawNumberStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';

    const targetNumber = parseFloat(rawNumberStr);
    if (isNaN(targetNumber)) {
      setDisplayValue(strVal);
      return;
    }

    const isDecimal = rawNumberStr.includes('.');
    const decimalPlaces = isDecimal ? (rawNumberStr.split('.')[1] || '').length : 0;
    const hasCommas = match[2].includes(',');

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease-out cubic curve: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNumber = targetNumber * easeOut;

      let formattedNumber = isDecimal
        ? currentNumber.toFixed(decimalPlaces)
        : Math.floor(currentNumber).toString();

      if (hasCommas) {
        // Format with commas
        const parts = formattedNumber.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNumber = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(strVal);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={`inline-block tabular-nums font-mono ${className}`}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
