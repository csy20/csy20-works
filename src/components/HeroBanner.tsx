import { useEffect, useState } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";

export function HeroBanner() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const allowVideo = !prefersReducedMotion && import.meta.env.MODE !== "test";
  const [idleReady, setIdleReady] = useState(false);

  useEffect(() => {
    if (!allowVideo) {
      return;
    }

    let timeoutId: number | undefined;
    let idleId: number | undefined;
    const start = () => setIdleReady(true);

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
  }, [allowVideo]);

  const playVideo = allowVideo && idleReady;

  return (
    <div className="hero-banner" aria-hidden="true">
      <picture>
        <source srcSet="/hero-banner-poster.webp" type="image/webp" />
        <img
          src="/hero-banner-poster.jpg"
          alt=""
          width={1280}
          height={720}
          className="hero-banner-media"
          decoding="async"
          fetchPriority="low"
        />
      </picture>
      {playVideo && (
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
      <div className="hero-banner-wash" />
    </div>
  );
}
