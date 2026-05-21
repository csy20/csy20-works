import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { socialLinks } from "../data/siteContent";

export function ContactSection() {
  return (
    <Section id="contact" title="Get in touch" subtitle="Connect">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="space-y-8"
      >
        {/* Email CTA */}
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 sm:p-8 text-center">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] text-balance max-w-md mx-auto mb-5">
            I&rsquo;m always open to new opportunities and collaborations. The
            best way to reach me is via email.
          </p>
          <Button
            variant="primary"
            href={
              socialLinks.find((l) => l.icon === "email")?.href ??
              "mailto:chitreshy20@gmail.com"
            }
          >
            Send email
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Social links */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.icon !== "email" ? "_blank" : undefined}
              rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
              whileHover={{ y: -3 }}
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
