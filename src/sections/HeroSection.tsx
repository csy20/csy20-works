import { motion } from "framer-motion";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { RevealText } from "../components/animations/RevealText";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { profile, resumeUrl } from "../data/siteContent";
import { EASE_OUT, springSoft } from "../components/animations/motion";

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const heroImage = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.15 },
  },
};

export function HeroSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-[min(100dvh,100vh)] sm:min-h-dvh"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
          {...(!shouldUseSafeMotion && {
            variants: heroContainer,
            initial: "hidden",
            animate: "visible",
          })}
        >
          <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
            <motion.div
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
              {...(!shouldUseSafeMotion && { variants: heroItem })}
            >
              <Badge className="shrink-0">{profile.handle}</Badge>
              <span className="min-w-0 font-display text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--text-muted)]">
                {profile.role}
              </span>
            </motion.div>

            <h1 className="min-w-0">
              <RevealText
                text={profile.name}
                className="font-serif-accent text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] sm:leading-[0.95] text-[var(--text-primary)]"
                delay={0.35}
              />
            </h1>

            <motion.p
              className="font-display text-xs sm:text-sm tracking-[0.06em] text-[var(--text-muted)]"
              {...(!shouldUseSafeMotion && { variants: heroItem })}
            >
              {profile.strapline}
            </motion.p>

            <motion.p
              className="max-w-xl text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)] text-balance"
              {...(!shouldUseSafeMotion && { variants: heroItem })}
            >
              {profile.heroDescription}
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:pt-2"
              {...(!shouldUseSafeMotion && { variants: heroItem })}
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
                View work
                <Icon name="arrow-right" size={14} />
              </Button>
              <Button
                variant="secondary"
                href={resumeUrl}
                className="w-full sm:w-auto"
              >
                Get resume
                <Icon name="download" size={14} />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] shrink-0"
            {...(!shouldUseSafeMotion && { variants: heroImage })}
          >
            <motion.div
              className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-soft)] shadow-[var(--card-shadow)]"
              {...(!shouldUseSafeMotion && {
                whileHover: { y: -4, transition: springSoft },
              })}
            >
              <img
                src="/pfp.jpeg"
                alt={profile.name}
                width={640}
                height={640}
                className="w-full h-auto block"
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
