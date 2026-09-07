import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useAnimationSafeMode } from "./useAnimationSafeMode";

export function HeroBanner() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const shouldUseSafeMotion = useAnimationSafeMode();
  const [playVideo, setPlayVideo] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 480], [0, 90]);

  useEffect(() => {
    if (prefersReducedMotion || import.meta.env.MODE === "test") return;

    let timeoutId: number | undefined;
    let idleId: number | undefined;
    const start = () => setPlayVideo(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 1400 });
    } else {
      timeoutId = window.setTimeout(start, 500);
    }

    return () => {
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="hero-banner" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        {...(!shouldUseSafeMotion ? { style: { y } } : {})}
      >
        <picture>
          <source srcSet="/hero-banner-poster.webp" type="image/webp" />
          <img
            src="/hero-banner-poster.jpg"
            alt=""
            width={854}
            height={480}
            className="hero-banner-media"
            decoding="async"
            fetchPriority="low"
          />
        </picture>
        {playVideo && !prefersReducedMotion && (
          <video
            className="hero-banner-media hero-banner-video"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/hero-banner-poster.jpg"
          >
            <source src="/hero-banner.webm" type="video/webm" />
            <source src="/hero-banner.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="hero-banner-wash" />
    </div>
  );
}
