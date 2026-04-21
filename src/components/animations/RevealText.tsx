import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type RevealTextProps = {
  text?: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealTextInner({
  text,
  className,
  delay,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
    },
  };

  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay! * i },
    }),
  };

  return (
    <motion.div
      aria-label={text}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="overflow-hidden"
          aria-hidden="true"
          style={
            index < words.length - 1 ? { marginRight: "0.25em" } : undefined
          }
        >
          <motion.span variants={childVariants} className="inline-block">
            {word}
          </motion.span>
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
  const shouldReduceMotion = useReducedMotion();

  if (!text) {
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

  return <RevealTextInner text={text} className={className} delay={delay} />;
}
