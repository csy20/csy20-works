import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  featured?: boolean;
};

export function Card({
  children,
  className = "",
  hover = true,
  featured = false,
}: CardProps) {
  const motionHover = hover ? { whileHover: { y: -3, scale: 1.005 } } : {};

  return (
    <motion.div
      {...motionHover}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden rounded-2xl border bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-shadow duration-300 ${
        featured
          ? "border-[var(--border-soft)] ring-1 ring-[var(--accent)]/10"
          : "border-[var(--border-soft)]"
      } ${
        hover
          ? "hover:border-[var(--border)] hover:shadow-[var(--card-shadow-hover)]"
          : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
