import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedPushpin
 * A delightful, tactile 3D cartoon-style pushpin that animates as if being
 * gently hammered into the campaign poster once it enters the viewport.
 * 
 * Features:
 * - 3D glossy red head with soft radial specular highlight
 * - Tapered metallic steel shaft
 * - Cast contact shadow beneath
 * - Controlled downward hammering motion with squash-and-stretch impact
 * - Final resting tilt at ~12 degrees
 * - Respects prefers-reduced-motion
 * - pointer-events: none so it never obstructs lightbox clicks or content
 */
export const AnimatedPushpin = ({
  isTriggered = false,
  className = '',
  onImpact,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isTriggered && !hasAnimated) {
      setHasAnimated(true);

      // Trigger optional impact vibration callback at the contact moment (~600ms total from start)
      if (onImpact && !shouldReduceMotion) {
        const timer = setTimeout(() => {
          onImpact();
        }, 550);
        return () => clearTimeout(timer);
      }
    }
  }, [isTriggered, hasAnimated, onImpact, shouldReduceMotion]);

  // Reduced motion fallback: instantly settled in resting position
  if (shouldReduceMotion) {
    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{
          transform: 'rotate(12deg)',
          transformOrigin: '50% 90%',
        }}
        aria-hidden="true"
      >
        <PushpinSVG />
      </div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none select-none will-change-transform ${className}`}
      style={{
        transformOrigin: '50% 90%',
      }}
      initial={{
        opacity: 0,
        y: -48,
        scale: 1.25,
        scaleY: 1.25,
        scaleX: 0.9,
        rotate: 0,
      }}
      animate={
        hasAnimated
          ? {
              // 1. Descends from above
              // 2. Strikes board with squash (scaleY 0.82, scaleX 1.16)
              // 3. Rebounds up slightly (-3px)
              // 4. Settles tilted at 12 degrees
              opacity: [0, 1, 1, 1, 1, 1],
              y: [-48, -48, 2, -3, 1, 0],
              scaleY: [1.25, 1.2, 0.82, 1.08, 0.97, 1.0],
              scaleX: [0.9, 0.92, 1.16, 0.95, 1.02, 1.0],
              rotate: [0, -4, 15, 9, 13, 12],
            }
          : {
              opacity: 0,
              y: -48,
              scale: 1.25,
              rotate: 0,
            }
      }
      transition={{
        delay: 0.35, // Ensures poster has settled first
        duration: 0.75, // Complete sequence ~750ms
        times: [0, 0.18, 0.48, 0.68, 0.88, 1.0],
        ease: 'easeOut',
      }}
      aria-hidden="true"
    >
      <PushpinSVG />
    </motion.div>
  );
};

/**
 * PushpinSVG
 * High-craft SVG illustration of an isometric pushpin with 3D gradients and highlights.
 */
const PushpinSVG = () => (
  <svg
    width="34"
    height="44"
    viewBox="0 0 34 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="overflow-visible filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.32)]"
  >
    <defs>
      {/* Metallic Pin Shaft Gradient */}
      <linearGradient id="pinSteel" x1="15" y1="23" x2="19" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="70%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      {/* Dark Crimson Rim Gradient */}
      <linearGradient id="pinRim" x1="9" y1="19" x2="25" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#991b1b" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>

      {/* Plastic Grip Body Gradient */}
      <linearGradient id="pinGrip" x1="12" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="45%" stopColor="#dc2626" />
        <stop offset="85%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>

      {/* Glossy Spherical Head Radial Highlight */}
      <radialGradient id="pinSphere" cx="14" cy="7" r="9" fx="13.5" fy="6" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fca5a5" />
        <stop offset="30%" stopColor="#ef4444" />
        <stop offset="75%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>
    </defs>

    {/* Cast Ground Shadow (Simulates pin penetration point) */}
    <ellipse cx="17" cy="40.5" rx="6" ry="2" fill="rgba(15, 23, 42, 0.35)" filter="blur(0.8px)" />

    {/* Metallic Steel Pin Point */}
    <path d="M 17 23 L 15.5 37 L 17 41.5 L 18.5 37 L 17 23 Z" fill="url(#pinSteel)" />
    {/* Specular Edge on Needle */}
    <path d="M 16.5 23 L 15.5 37 L 17 41.5 Z" fill="#ffffff" opacity="0.45" />

    {/* Flange / Base Collar (Seats against the paper) */}
    <ellipse cx="17" cy="23.5" rx="8" ry="3" fill="url(#pinRim)" />
    <ellipse cx="17" cy="22.5" rx="7.5" ry="2.6" fill="url(#pinGrip)" />

    {/* Pinched Grip Waist */}
    <path
      d="M 11.5 15 C 11.5 19 12.5 22 17 22 C 21.5 22 22.5 19 22.5 15 C 22.5 11 20.5 8 17 8 C 13.5 8 11.5 11 11.5 15 Z"
      fill="url(#pinGrip)"
    />

    {/* Spherical Upper Dome */}
    <circle cx="17" cy="10" r="7.5" fill="url(#pinSphere)" />

    {/* Soft Curved Specular Gloss Highlight */}
    <path
      d="M 12.8 7.5 C 13.8 5.6 16.2 5 18 5.5 C 15.5 6 13.8 7.5 13.2 9.5 C 12.8 8.8 12.8 8.1 12.8 7.5 Z"
      fill="#ffffff"
      opacity="0.8"
    />
    <circle cx="14.5" cy="7.8" r="1.2" fill="#ffffff" opacity="0.95" />
  </svg>
);
