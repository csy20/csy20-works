import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";
import { EASE_OUT } from "./motion";

type RevealTextProps = {
  text?: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
  hidden: {
    opacity: 0,
    y: "110%",
    rotate: 6,
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.028, delayChildren: 0 },
  },
};

function RevealTextWords({
  text,
  className,
  delay,
  noAnimation,
}: {
  text: string;
  className?: string;
  delay?: number;
  noAnimation: boolean;
}) {
  if (noAnimation) {
    return (
      <div aria-label={text} className={`flex flex-wrap ${className ?? ""}`}>
        {text}
      </div>
    );
  }
  const words = text.split(" ");

  return (
    <motion.div
      aria-label={text}
      className={`flex flex-wrap ${className ?? ""}`}
      variants={container}
      initial="hidden"
      animate="visible"
      {...(delay != null && delay > 0
        ? { transition: { delayChildren: delay } as const }
        : {})}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-flex overflow-hidden"
          aria-hidden="true"
          style={
            index < words.length - 1 ? { marginRight: "0.28em" } : undefined
          }
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${word}-${charIndex}`}
              variants={childVariants}
              className="inline-block will-change-transform"
            >
              {char}
            </motion.span>
          ))}
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
  const noAnimation = useAnimationSafeMode();

  if (!text) {
    if (noAnimation) {
      return <div className={className}>{children}</div>;
    }

    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE_OUT, delay }}
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
      noAnimation={noAnimation}
    />
  );
}
