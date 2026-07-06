import { memo, useMemo, useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

const SECTION_INVIEW_MARGIN = "-80px 0px -40px 0px";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
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

function SectionInner({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
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
      <>
        {subtitle && (
          <p
            className={`font-display text-xs tracking-[0.2em] uppercase mb-3 ${dark ? "text-[var(--sd-muted)]" : "text-[var(--text-muted)]"}`}
          >
            {subtitle}
          </p>
        )}
        {title && (
          <h2
            className={`font-serif-accent text-3xl sm:text-4xl lg:text-5xl tracking-tight ${dark ? "text-[var(--sd-text)]" : ""}`}
          >
            {title}
          </h2>
        )}
      </>
    );
  }, [title, subtitle, dark]);

  const heading = headingContent ? (
    <motion.div
      className={`mx-auto max-w-5xl px-4 pb-8 pt-16 sm:pb-12 sm:pt-24 lg:px-8 ${dark ? "text-[var(--sd-text)]" : ""}`}
      {...(shouldUseSafeMotion
        ? {}
        : {
            variants: headingVariants,
            initial: "hidden",
            animate: inView ? "visible" : "hidden",
          })}
    >
      {headingContent}
    </motion.div>
  ) : null;

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative ${dark ? "section-dark" : ""} ${className}`}
      {...(shouldUseSafeMotion
        ? {}
        : {
            variants: containerVariants,
            initial: "hidden",
            animate: inView ? "visible" : "hidden",
          })}
    >
      {heading}
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:pb-24 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}

export const Section = memo(SectionInner);
