import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -40px 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`relative ${className}`}
    >
      {(title || subtitle) && (
        <motion.div
          variants={headingVariants}
          className="mx-auto max-w-5xl px-4 pb-8 pt-16 sm:pb-12 sm:pt-24 lg:px-8"
        >
          {subtitle && (
            <p className="font-display text-xs tracking-[0.2em] uppercase mb-3 text-[var(--text-muted)]">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-serif-accent text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:pb-24 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}
