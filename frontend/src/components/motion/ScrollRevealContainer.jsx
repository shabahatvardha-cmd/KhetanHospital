import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🌊 POLPHARMA SCROLL REVEAL CONTAINER
 * 
 * Staggers child elements with smooth cubic-bezier slide-up entrance
 * when scrolled into the viewport.
 */
export const ScrollRevealContainer = ({
  children,
  stagger = 0.12,
  delay = 0.1,
  className = "",
  once = true
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem = ({
  children,
  yOffset = 30,
  duration = 0.7,
  className = ""
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollRevealContainer;
