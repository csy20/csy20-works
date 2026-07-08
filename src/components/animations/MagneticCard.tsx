import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { useSkipExpensiveAnimation } from "../useSkipExpensiveAnimation";

type MagneticCardProps = {
  children?: ReactNode;
  className?: string;
  style?: MotionStyle;
};

const MAGNETIC_SPRING = { stiffness: 280, damping: 22, mass: 0.6 };
const STRENGTH = 0.1;

export function MagneticCard({
  children,
  className = "",
  style,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const skipExpensive = useSkipExpensiveAnimation();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, MAGNETIC_SPRING);
  const smoothY = useSpring(y, MAGNETIC_SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const middleX = clientX - (rect.left + rect.width / 2);
      const middleY = clientY - (rect.top + rect.height / 2);
      x.set(middleX * STRENGTH);
      y.set(middleY * STRENGTH);
      frameRef.current = 0;
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    x.set(0);
    y.set(0);
  };

  if (skipExpensive) {
    return (
      <div ref={ref} className={className} style={style as CSSProperties}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
