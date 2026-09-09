import { motion } from "framer-motion";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { RevealText } from "../components/animations/RevealText";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { HeroBanner } from "../components/HeroBanner";
import { PortraitCard } from "../components/PortraitCard";
import { profile, resumeUrl } from "../data/siteContent";
import { EASE_OUT } from "../components/animations/motion";

const heroItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function HeroSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <section
      id="hero"
      className="relative flex min-h-[min(100dvh,100vh)] items-center overflow-hidden sm:min-h-dvh"
    >
      <HeroBanner />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-14 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div className="order-2 flex min-w-0 flex-col gap-5 sm:gap-6 lg:order-1">
            <p className="hero-kicker">
              {profile.handle}
              <span className="hero-kicker-sep">/</span>
              {profile.role}
            </p>

            <h1 className="min-w-0">
              <RevealText
                text={profile.name}
                className="font-serif-accent text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] sm:leading-[0.95] text-[var(--text-primary)]"
                delay={0.08}
              />
            </h1>

            <motion.p
              className="max-w-xl text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)] text-balance"
              {...(!shouldUseSafeMotion && {
                initial: "hidden",
                animate: "visible",
                variants: heroItem,
              })}
            >
              {profile.heroDescription}
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:pt-2"
              {...(!shouldUseSafeMotion && {
                initial: "hidden",
                animate: "visible",
                variants: heroItem,
              })}
            >
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: shouldUseSafeMotion ? "auto" : "smooth",
                  });
                }}
              >
                Selected work
                <Icon name="arrow-right" size={14} />
              </Button>
              <Button
                variant="secondary"
                href={resumeUrl}
                className="w-full sm:w-auto"
              >
                CV
                <Icon name="download" size={14} />
              </Button>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <PortraitCard />
          </div>
        </div>
      </div>
    </section>
  );
}
