import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';

// Scroll animation toolkit (Framer Motion).
//
// Every reveal starts from a nearly-invisible state and fires as soon as the
// element is about to enter the viewport (80px early), so content never sits
// blank. The whole app is wrapped in <MotionConfig reducedMotion="user">, and
// these components also fall back to plain elements for reduced-motion users.

export const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.01, margin: '0px 0px 80px 0px' };

const offsets = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

/* ---------- Fade + slide a block into view ---------- */
export default function AnimatedSection({
  children,
  className = '',
  style = {},
  delay = 0,
  direction = 'up',
  duration = 0.8,
  as = 'div',
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  if (reduce) return <Tag className={className} style={style}>{children}</Tag>;
  const M = motion[as] || motion.div;

  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0.001, scale: 0.985, ...(offsets[direction] || offsets.up) }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/* ---------- Children appear one after another ---------- */
export function StaggerContainer({ children, className = '', style = {}, delay = 0, staggerChildren = 0.09 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { delayChildren: delay, staggerChildren } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', style = {}, tilt = 0, rest = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0.001, y: 40, scale: 0.96, rotate: tilt },
        visible: { opacity: 1, y: 0, scale: 1, rotate: rest },
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Headings wipe up from behind a mask ---------- */
function makeHeading(tag) {
  const M = motion[tag];
  return function RevealHeading({ children, style, className, delay = 0, ...rest }) {
    const reduce = useReducedMotion();
    if (reduce) {
      const Tag = tag;
      return <Tag className={className} style={style} {...rest}>{children}</Tag>;
    }
    // The heading itself stays unclipped so the in-view check can see it;
    // the mask wipe happens on an inner span.
    return (
      <M className={className} style={style} initial="hidden" whileInView="visible" viewport={VIEWPORT} {...rest}>
        <motion.span
          style={{ display: 'block' }}
          variants={{
            hidden: { clipPath: 'inset(0 0 100% 0)', y: 28, opacity: 0.001 },
            visible: { clipPath: 'inset(-5% 0 -15% 0)', y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.9, delay, ease: EASE }}
        >
          {children}
        </motion.span>
      </M>
    );
  };
}
export const RH1 = makeHeading('h1');
export const RH2 = makeHeading('h2');

/* ---------- Parallax: drift an element as the page scrolls ---------- */
// `speed` is how many px the element travels across its time on screen
// (negative = moves up faster than the page).
export function Parallax({ children, speed = -60, className = '', style = {} }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2]);
  const y = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/* ---------- Thin bar showing how far down the page you are ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
