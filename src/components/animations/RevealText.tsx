import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

type RevealTextProps = {
  text?: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealTextWords({
  text,
  className,
  delay,
  shouldUseSafeMotion,
}: {
  text: string;
  className?: string;
  delay?: number;
  shouldUseSafeMotion: boolean;
}) {
  const words = text.split(" ");
  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: (delay ?? 0) * i },
    }),
  };

  return (
    <motion.div
      aria-label={text}
      className={`flex flex-wrap ${className}`}
      {...(!shouldUseSafeMotion && {
        variants: container,
        initial: "hidden",
        animate: "visible",
      })}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={shouldUseSafeMotion ? undefined : "overflow-hidden"}
          aria-hidden="true"
          style={
            index < words.length - 1 ? { marginRight: "0.25em" } : undefined
          }
        >
          {shouldUseSafeMotion ? (
            word
          ) : (
            <motion.span variants={childVariants} className="inline-block">
              {word}
            </motion.span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

export function RevealText({
  text,
  children,
  className = "",
  delay = 0,
}: RevealTextProps) {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const shouldReduceMotion = useReducedMotion();

  if (!text) {
    if (shouldUseSafeMotion) {
      return <div className={className}>{children}</div>;
    }

    return (
      <motion.div
        className={className}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <RevealTextWords
      text={text}
      className={className}
      delay={delay}
      shouldUseSafeMotion={shouldUseSafeMotion}
    />
  );
}
