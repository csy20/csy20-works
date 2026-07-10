import { memo, useMemo, useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useAnimationSafeMode } from "../useAnimationSafeMode";
import { EASE_OUT } from "../animations/motion";

type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const SECTION_INVIEW_MARGIN = "-80px 0px -40px 0px";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

function SectionHeading({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  if (!title && !subtitle) return null;
  return (
    <>
      {subtitle && (
        <p className="font-display text-xs tracking-[0.2em] uppercase mb-3 text-[var(--text-muted)]">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="font-serif-accent text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text-primary)]">
          {title}
        </h2>
      )}
    </>
  );
}

function SectionInner({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldUseSafeMotion = useAnimationSafeMode();
  const inView = useInView(ref, {
    once: true,
    margin: SECTION_INVIEW_MARGIN,
  });

  const headingContent = useMemo(() => {
    if (!title && !subtitle) return null;
    return (
      <SectionHeading
        {...(title !== undefined ? { title } : {})}
        {...(subtitle !== undefined ? { subtitle } : {})}
      />
    );
  }, [title, subtitle]);

  /* Mobile / reduced-motion: plain DOM — no opacity/y GPU layers */
  if (shouldUseSafeMotion) {
    return (
      <section ref={ref} id={id} className={`relative ${className}`}>
        {headingContent && (
          <div className="mx-auto w-full max-w-5xl px-4 pb-5 pt-14 sm:pb-12 sm:pt-24 lg:px-8">
            {headingContent}
          </div>
        )}
        <div className="mx-auto w-full max-w-5xl px-4 pb-14 sm:pb-24 lg:px-8">
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {headingContent && (
        <motion.div
          className="mx-auto w-full max-w-5xl px-4 pb-5 pt-14 sm:pb-12 sm:pt-24 lg:px-8"
          variants={headingVariants}
        >
          {headingContent}
        </motion.div>
      )}
      <motion.div
        className="mx-auto w-full max-w-5xl px-4 pb-14 sm:pb-24 lg:px-8"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

export const Section = memo(SectionInner);
