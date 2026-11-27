import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🌊 ScrollRevealContainer
 * Staggers children entrance with cubic-bezier slide-up and opacity fade when scrolled into view.
 */
export const ScrollRevealContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
  initialY = 24,
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem = ({
  children,
  className = '',
  initialY = 20,
  ...props
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: initialY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealContainer;
