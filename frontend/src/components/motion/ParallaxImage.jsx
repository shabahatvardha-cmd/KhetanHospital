import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * 🌊 PARALLAX IMAGE CONTAINER
 * Moves image at a subtle offset to scroll speed for natural depth without jank.
 */
export const ParallaxImage = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  yOffset = 30,
  scaleEffect = false
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, scaleEffect ? 1.05 : 1, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        style={{ y, scale }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${imageClassName}`}
        loading="lazy"
      />
    </div>
  );
};

/**
 * 🎬 SCROLL-DRIVEN SCENE TRANSITION WRAPPER
 * Smoothly blends opacity and subtle y translation as the scene enters and exits the viewport.
 */
export const ScrollScene = ({
  children,
  className = '',
  fadeRange = [0, 0.15, 0.85, 1],
  opacityRange = [0.4, 1, 1, 0.4]
}) => {
  const sceneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, fadeRange, opacityRange);

  return (
    <motion.div ref={sceneRef} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxImage;
