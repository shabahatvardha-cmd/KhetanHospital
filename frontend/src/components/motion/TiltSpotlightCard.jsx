import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 🌟 POLPHARMA BIOTECH 3D TILT & CURSOR SPOTLIGHT CARD
 * 
 * Features:
 * 1. 3D perspective tilt following cursor with spring damping physics.
 * 2. Specular radial spotlight that glides across the dark frosted glass border and surface.
 * 3. Smooth scroll-triggered entrance animation (`whileInView`).
 * 4. Automatic smooth reset on mouse leave.
 */
export const TiltSpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.18)',
  borderColor = 'rgba(56, 189, 248, 0.4)',
  maxTilt = 7,
  delay = 0,
  onClick = undefined,
  ...rest
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate values normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Direct pixel positions for the spotlight glow
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  // Smooth spring physics for rotation
  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotlightX.set(x);
    spotlightY.set(y);

    const normX = x / rect.width;
    const normY = y / rect.height;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group will-change-transform ${className}`}
      {...rest}
    >
      {/* Specular Cursor Spotlight Glow (Follows exact pointer coordinates) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${spotlightX.get()}px ${spotlightY.get()}px, ${spotlightColor}, transparent 65%)`,
        }}
      />

      {/* Subtle Glowing Outer Border Highlight on Hover */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          boxShadow: `0 0 25px ${borderColor}`,
        }}
      />

      {/* Card Content with 3D Depth */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltSpotlightCard;
