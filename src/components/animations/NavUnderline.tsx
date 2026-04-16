import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type NavUnderlineProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function NavUnderline({
  children,
  href,
  className = "",
}: NavUnderlineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      initial="initial"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-current"
        variants={{
          initial: {
            scaleX: 0,
            originX: 1,
            transition: { duration: 0.25, ease: "easeInOut" },
          },
          hover: {
            scaleX: 1,
            originX: 0,
            transition: { duration: 0.25, ease: "easeInOut" },
          },
        }}
      />
    </motion.a>
  );
}
