import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedWordReveal({
  text = '',
  words = null,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.04,
  once = true
}) {
  const wordList = words || text.split(' ').filter(Boolean);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Polpharma smooth cubic-bezier
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.06em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-5% 0px' }}
    >
      {wordList.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden py-[0.04em] -my-[0.04em]">
          <motion.span
            variants={wordVariants}
            className={`inline-block will-change-transform ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default AnimatedWordReveal;

