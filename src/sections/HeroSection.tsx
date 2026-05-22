import { motion } from "framer-motion";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { RevealText } from "../components/animations/RevealText";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { profile, resumeUrl } from "../data/siteContent";

export function HeroSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            {/* Handle + Badge */}
            {shouldUseSafeMotion ? (
              <div className="flex items-center gap-3">
                <Badge>{profile.handle}</Badge>
                <span className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                  {profile.role}
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <Badge>{profile.handle}</Badge>
                <span className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                  {profile.role}
                </span>
              </motion.div>
            )}

            {/* Name */}
            <h1>
              <RevealText
                text={profile.name}
                className="font-serif-accent text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-[var(--text-primary)]"
                delay={0.4}
              />
            </h1>

            {/* Subtitle */}
            {shouldUseSafeMotion ? (
              <p className="font-display text-sm tracking-[0.06em] text-[var(--text-muted)]">
                {profile.strapline}
              </p>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="font-display text-sm tracking-[0.06em] text-[var(--text-muted)]"
              >
                {profile.strapline}
              </motion.p>
            )}

            {/* Description */}
            {shouldUseSafeMotion ? (
              <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] text-balance">
                {profile.heroDescription}
              </p>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)] text-balance"
              >
                {profile.heroDescription}
              </motion.p>
            )}

            {/* CTAs */}
            {shouldUseSafeMotion ? (
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View work
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button variant="secondary" href={resumeUrl}>
                  Get resume
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="flex flex-wrap gap-3 pt-2"
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button variant="secondary" href={resumeUrl}>
                  Get resume
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Portrait */}
          {shouldUseSafeMotion ? (
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px] shrink-0">
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
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px] shrink-0"
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
          )}
        </div>
      </div>
    </section>
  );
}
