import { motion } from "framer-motion";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { RevealText } from "../components/animations/RevealText";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { profile, resumeUrl } from "../data/siteContent";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

export function HeroSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <section id="hero" className="relative min-h-dvh flex items-center">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <motion.div
              className="flex items-center gap-3"
              {...(!shouldUseSafeMotion && {
                ...fadeInUp,
                transition: { ...fadeInUp.transition, delay: 0.15 },
              })}
            >
              <Badge>{profile.handle}</Badge>
              <span className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                {profile.role}
              </span>
            </motion.div>

            <h1>
              <RevealText
                text={profile.name}
                className="font-serif-accent text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-[var(--text-primary)]"
                delay={0.4}
              />
            </h1>

            <motion.p
              className="font-display text-sm tracking-[0.06em] text-[var(--text-muted)]"
              {...(!shouldUseSafeMotion && {
                ...fadeInUp,
                transition: { ...fadeInUp.transition, delay: 0.5 },
              })}
            >
              {profile.strapline}
            </motion.p>

            <motion.p
              className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] text-balance"
              {...(!shouldUseSafeMotion && {
                ...fadeInUp,
                transition: { ...fadeInUp.transition, delay: 0.65 },
              })}
            >
              {profile.heroDescription}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              {...(!shouldUseSafeMotion && {
                ...fadeInUp,
                transition: { ...fadeInUp.transition, delay: 0.8 },
              })}
            >
              <Button
                variant="primary"
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View work
                <Icon name="arrow-right" size={14} />
              </Button>
              <Button variant="secondary" href={resumeUrl}>
                Get resume
                <Icon name="download" size={14} />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px] shrink-0"
            {...(!shouldUseSafeMotion && {
              ...fadeInScale,
              transition: { ...fadeInScale.transition, delay: 0.3 },
            })}
          >
            <div className="overflow-hidden rounded-3xl border border-[var(--border-soft)] shadow-[var(--card-shadow)]">
              <img
                src="/pfp.jpeg"
                alt={profile.name}
                width={640}
                height={640}
                className="w-full h-auto block"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
