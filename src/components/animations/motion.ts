import type { Transition, Variants } from "framer-motion";

/** Shared easing — smooth deceleration used across the site */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_INK = [0.76, 0, 0.24, 1] as const;

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 28,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

/** Section / block entrance */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

/** Parent that staggers its motion children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

/** Tech-stack / chip entrance */
export const chipVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

/** Card / panel entrance */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const hoverLift = {
  y: -3,
  transition: springSnappy,
};

export const hoverChip = {
  y: -2,
  scale: 1.03,
  transition: springSnappy,
};
