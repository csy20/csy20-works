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

const featuredApps = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export function ProjectsSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <Section id="projects" title="Apps & Projects" subtitle="Real work">
      <div className="space-y-12">
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredApps.map((app) => (
            <AppCard key={app.title} app={app} />
          ))}
        </div>
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
      className="relative h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
      {...(!shouldUseSafeMotion && { variants: cardVariants })}
    >
      <div className="flex h-full flex-col p-4 sm:p-7">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)]">
            {app.logo ? (
              <img
                src={app.logo}
                alt=""
                width={40}
                height={40}
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : null}
          </div>
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[10px] font-medium tracking-[0.16em] uppercase text-[var(--text-muted)]">
                On Play
              </span>
              <span className="font-display text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[var(--text-muted)]">
                {app.eyebrow}
              </span>
            </div>
            <h3 className="font-serif-accent text-xl sm:text-2xl tracking-tight text-[var(--text-primary)]">
              {app.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] text-balance">
          {app.description}
        </p>

        {app.releaseNote && (
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] text-balance">
            {app.releaseNote}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {app.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row sm:flex-wrap">
          {app.links.map((link) => (
            <Button
              key={link.label}
              href={link.href}
              variant={link.tone === "mint" ? "primary" : "secondary"}
              compact
              className="w-full sm:w-auto"
            >
              <Icon
                name={link.label === "Play Store" ? "play" : "github"}
                size={14}
              />
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
        <div className="relative border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-2">
              <span className="font-display text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[var(--text-muted)]">
                {project.eyebrow}
              </span>
              <h3 className="font-serif-accent text-lg sm:text-xl tracking-tight text-[var(--text-primary)]">
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

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {project.links.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                variant={link.tone === "mint" ? "primary" : "secondary"}
                compact
                className="w-full sm:w-auto"
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
