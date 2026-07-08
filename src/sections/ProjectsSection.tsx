import { memo } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { MagneticCard } from "../components/animations/MagneticCard";
import { Icon } from "../components/ui/Icon";
import { Tag } from "../components/ui/Tag";
import { projects, type Project } from "../data/siteContent";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import {
  cardVariants,
  fadeUpSoft,
  staggerContainer,
} from "../components/animations/motion";

const featuredApp = projects.find((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export function ProjectsSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <Section id="projects" title="Apps & Projects" subtitle="Real work">
      <div className="space-y-12">
        {featuredApp && <AppCard app={featuredApp} />}
        <div>
          <motion.p
            className="font-display text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-5"
            {...(!shouldUseSafeMotion && { variants: fadeUpSoft })}
          >
            Projects
          </motion.p>
          <motion.div
            className="space-y-4"
            {...(!shouldUseSafeMotion && { variants: staggerContainer })}
          >
            {otherProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

const AppCard = memo(function AppCard({ app }: { app: Project }) {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] shadow-[var(--card-shadow)]"
      {...(!shouldUseSafeMotion && { variants: cardVariants })}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)]">
              <img
                src="/bytewise-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-green-600 dark:text-green-400">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"
                    aria-hidden="true"
                  />
                  Published
                </span>
                <span className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                  {app.eyebrow}
                </span>
              </div>
              <h3 className="font-serif-accent text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
                {app.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] text-balance">
                {app.description}
              </p>
            </div>
          </div>
          {app.spotlight && (
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
              <Icon name="star" size={14} />
              {app.spotlight}
            </span>
          )}
        </div>

        {app.releaseNote && (
          <div className="mt-6 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] text-balance">
              {app.releaseNote}
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {app.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {app.links.map((link) => (
            <Button key={link.label} href={link.href} variant="primary">
              <Icon name="play" size={16} />
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const ProjectCard = memo(function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.div variants={cardVariants}>
      <MagneticCard>
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-shadow duration-300 hover:shadow-[var(--card-shadow-hover)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <span className="font-display text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                {project.eyebrow}
              </span>
              <h3 className="font-serif-accent text-xl tracking-tight text-[var(--text-primary)]">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] text-balance max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="muted">
                {tag}
              </Tag>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                variant={link.tone === "mint" ? "primary" : "secondary"}
                compact
              >
                {link.label}
                <Icon name="external-link" size={12} />
              </Button>
            ))}
          </div>
        </div>
      </MagneticCard>
    </motion.div>
  );
});
