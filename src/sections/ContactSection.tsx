import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { socialLinks } from "../data/siteContent";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import { config } from "../config";

const contactWrapperVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ContactSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <Section id="contact" title="Get in touch" subtitle="Connect">
      <motion.div
        className="space-y-8"
        {...(!shouldUseSafeMotion && {
          variants: contactWrapperVariants,
        })}
      >
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 sm:p-8 text-center">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] text-balance max-w-md mx-auto mb-5">
            I&rsquo;m always open to new opportunities and collaborations. The
            best way to reach me is via email.
          </p>
          <Button
            variant="primary"
            href={
              socialLinks.find((l) => l.icon === "email")?.href ??
              `mailto:${config.email}`
            }
          >
            Send email
            <Icon name="arrow-right" size={14} />
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              {...(link.icon !== "email"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(!shouldUseSafeMotion && { whileHover: { y: -3 } })}
              className="flex items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 transition-shadow duration-300 hover:border-[var(--border)] hover:shadow-[var(--card-shadow-hover)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-[var(--surface-raised)] text-[var(--text-secondary)]">
                <Icon name={link.icon} size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-medium text-[var(--text-primary)]">
                  {link.label}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {link.detail}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
