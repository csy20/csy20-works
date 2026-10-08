import { memo } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { MagneticCard } from "../components/animations/MagneticCard";
import { Icon } from "../components/ui/Icon";
import { Tag } from "../components/ui/Tag";
import { projects, type Project, type ProjectGroup } from "../data/siteContent";
import { useAnimationSafeMode } from "../components/useAnimationSafeMode";
import {
  cardVariants,
  staggerContainer,
} from "../components/animations/motion";

const workGroups: { id: ProjectGroup; title: string }[] = [
  { id: "product", title: "Product" },
  { id: "selected", title: "Selected work" },
  { id: "other", title: "Other projects" },
];

function linkIcon(label: string) {
  if (label === "Play Store") return "play" as const;
  if (label === "GitHub") return "github" as const;
  return "external-link" as const;
}

export function ProjectsSection() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <Section id="projects" title="Work" subtitle="Projects">
      <div className="space-y-16">
        {workGroups.map((group) => {
          const items = projects.filter(
            (project) => project.group === group.id,
          );
          const showcase = items.filter((project) => project.spotlight);
          const rest = items.filter((project) => !project.spotlight);

          return (
            <div key={group.id} className="space-y-5">
              <h3 className="font-serif-accent text-2xl tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {group.title}
              </h3>

              {showcase.length > 0 && (
                <div className="grid gap-4 lg:grid-cols-2">
                  {showcase.map((app) => (
                    <div
                      key={app.title}
                      className={
                        app.wide || showcase.length === 1
                          ? "lg:col-span-2"
                          : undefined
                      }
                    >
                      <AppCard app={app} />
                    </div>
                  ))}
                </div>
              )}

              {rest.length > 0 && (
                <motion.div
                  className="space-y-4"
                  {...(!shouldUseSafeMotion && { variants: staggerContainer })}
                >
                  {rest.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}
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
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[var(--border-soft)] sm:h-14 sm:w-14 ${
              app.logo === "/02-logo.png"
                ? "bg-white"
                : "bg-[var(--surface-raised)]"
            }`}
          >
            {app.logo ? (
              <img
                src={app.logo}
                alt=""
                width={40}
                height={40}
                className={
                  app.logo === "/02-logo.png"
                    ? "h-9 w-9 object-contain sm:h-10 sm:w-10"
                    : "h-full w-full object-cover"
                }
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="font-serif-accent text-lg text-[var(--text-primary)]">
                {app.title.slice(0, 1)}
              </span>
            )}
          </div>
          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              {app.spotlight ? (
                <span className="font-display text-[10px] font-medium tracking-[0.16em] uppercase text-[var(--text-muted)]">
                  {app.spotlight}
                </span>
              ) : null}
              <span className="font-display text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[var(--text-muted)]">
                {app.eyebrow}
              </span>
            </div>
            <h4 className="font-serif-accent text-xl sm:text-2xl tracking-tight text-[var(--text-primary)]">
              {app.title}
            </h4>
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
              <Icon name={linkIcon(link.label)} size={14} />
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
              <h4 className="font-serif-accent text-lg sm:text-xl tracking-tight text-[var(--text-primary)]">
                {project.title}
              </h4>
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
