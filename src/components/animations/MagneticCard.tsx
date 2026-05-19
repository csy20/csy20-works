import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  type ComponentProps,
  type MouseEvent,
  useRef,
  useEffect,
  useState,
} from "react";

type MagneticCardProps = ComponentProps<typeof motion.article>;

function useHasTouchScreen() {
  // Read the initial value during render via lazy initializer (avoids setState-in-effect)
  const [isTouch, setIsTouch] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(pointer: coarse)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

export function MagneticCard({
  children,
  className = "",
  style,
  ...rest
}: MagneticCardProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useHasTouchScreen();

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

    x.set(middleX * 0.15);
    y.set(middleY * 0.15);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouch) return;
    x.set(0);
    y.set(0);
  };

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
