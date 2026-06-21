import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  type CSSProperties,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";
import { useMediaQuery } from "../hooks/useMediaQuery";

type MagneticCardProps = ComponentProps<typeof motion.article>;

export function MagneticCard({
  children,
  className = "",
  style,
  ...rest
}: MagneticCardProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const shouldUseSafeMotion = useAnimationSafeMode();
  const isTouch = useMediaQuery("(pointer: coarse)");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    // Skip on touch devices — touch events simulate mousemove on iOS causing jank
    if (!ref.current || shouldReduceMotion || isTouch) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set(middleX * 0.08);
    y.set(middleY * 0.08);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouch) return;
    x.set(0);
    y.set(0);
  };

  if (shouldUseSafeMotion || isTouch) {
    return (
      <article className={className} style={style as CSSProperties | undefined}>
        {children as ReactNode}
      </article>
    );
  }

  return (
    <motion.article
      {...rest}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion || isTouch
          ? (style ?? {})
          : { ...style, x: smoothX, y: smoothY }
      }
      className={className}
    >
      {children}
    </motion.article>
  );
}
