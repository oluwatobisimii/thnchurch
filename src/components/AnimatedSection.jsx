import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Reveal-on-scroll helpers.
// Content starts only slightly faded (never fully invisible) and triggers as soon
// as any part enters the viewport, so sections never sit blank while scrolling,
// on slow phones, or in link previews. Reduced-motion users get plain content.

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.01, margin: '0px 0px 80px 0px' };
const OFFSET = 22;

const offsets = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
  none: {},
};

export default function AnimatedSection({
  children,
  className = '',
  style = {},
  delay = 0,
  direction = 'up',
  duration = 0.55,
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0.001, ...(offsets[direction] || offsets.up) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '', style = {}, delay = 0, staggerChildren = 0.08 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', style = {} }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0.001, y: 18 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
