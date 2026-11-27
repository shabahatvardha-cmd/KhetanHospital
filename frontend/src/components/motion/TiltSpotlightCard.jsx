import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 🎴 TiltSpotlightCard
 * Spring-physics 3D perspective card with dynamic cursor spotlight
 * Inspired by Polpharma Biologics' tactile interactive cards.
 */
export const TiltSpotlightCard = ({
  children,
  className = '',
  maxTilt = 6,
  spotlightColor = 'rgba(56, 189, 248, 0.16)',
  borderColor = 'rgba(56, 189, 248, 0.4)',
  delay = 0,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalised [-0.5, 0.5] for tilt
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
    setSpotlightPos({ x, y });
  }, [mouseX, mouseY]);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Specular Border Glow on Hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
          boxShadow: isHovered ? `0 0 25px -5px ${spotlightColor}` : 'none',
        }}
      />

      {/* Content wrapper with slight 3D pop */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltSpotlightCard;
