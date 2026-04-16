import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type MarqueeTickerProps = {
  children: ReactNode;
  className?: string;
};

export function MarqueeTicker({
  children,
  className = "",
}: MarqueeTickerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`overflow-hidden whitespace-nowrap text-sm flex gap-4 ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative block w-full overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div
        className="inline-flex min-w-fit flex-nowrap items-center gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
        style={{ width: "max-content" }}
      >
        <div className="flex gap-4 pr-4">{children}</div>
        <div className="flex gap-4 pr-4" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
