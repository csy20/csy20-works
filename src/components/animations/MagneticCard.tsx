import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { useSkipExpensiveAnimation } from "../useSkipExpensiveAnimation";

type MagneticCardProps = {
  children?: React.ReactNode;
  className?: string;
  style?: MotionStyle;
};

const MAGNETIC_SPRING = { stiffness: 300, damping: 25 };

export function MagneticCard({
  children,
  className = "",
  style,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const skipExpensive = useSkipExpensiveAnimation();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, MAGNETIC_SPRING);
  const smoothY = useSpring(y, MAGNETIC_SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set(middleX * 0.08);
    y.set(middleY * 0.08);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(!skipExpensive ? { x: smoothX, y: smoothY } : {}),
      }}
      {...(!skipExpensive && {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      })}
    >
      {children}
    </motion.div>
  );
}
