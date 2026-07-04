import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonAsLink = {
  children: ReactNode;
  href: string;
  onClick?: never;
  variant?: ButtonVariant;
  className?: string;
  compact?: boolean;
};

type ButtonAsButton = {
  children: ReactNode;
  href?: never;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  compact?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

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

  const animationProps = shouldUseSafeMotion
    ? {}
    : {
        whileHover: { y: -2, scale: 1.01 },
        whileTap: { y: 0, scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      };

  if (href) {
    const isMailto = href.startsWith("mailto:");
    return (
      <motion.a
        href={href}
        {...(!isMailto ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
        {...animationProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      {...animationProps}
    >
      {children}
    </motion.button>
  );
}
