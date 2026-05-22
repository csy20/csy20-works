import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  compact?: boolean;
};

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  compact = false,
}: ButtonProps) {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-display text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]";

  const variants: Record<ButtonVariant, string> = {
    primary: `bg-[var(--accent)] text-[var(--accent-fg)] border border-transparent hover:opacity-90 shadow-[var(--button-shadow)]`,
    secondary: `bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--bg-secondary)]`,
    ghost: `bg-transparent text-[var(--text-secondary)] border border-transparent hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]`,
  };

  const sizes = compact ? "px-4 py-2 text-xs" : "px-6 py-3";

  const classes = `${base} ${variants[variant]} ${sizes} ${className}`;

  const motionProps = {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    if (shouldUseSafeMotion) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (shouldUseSafeMotion) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
