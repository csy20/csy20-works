import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

import { RevealText } from "./components/animations/RevealText";
import { MarqueeTicker } from "./components/animations/MarqueeTicker";
import { MagneticCard } from "./components/animations/MagneticCard";
import { CursorGlow } from "./components/animations/CursorGlow";
import { InkTransition } from "./components/animations/InkTransition";
import { NavUnderline } from "./components/animations/NavUnderline";
import { ScrollProgressBar } from "./components/animations/ScrollProgressBar";
import { ThemeTransitionOverlay } from "./components/animations/ThemeTransitionOverlay";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "./components/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";
import {
  profile,
  projects,
  resumeUrl,
  socialLinks,
  techStack,
  type StackItem,
  type ProjectLinkTone,
  type SocialIcon,
} from "./data/siteContent";

const navigation = [
  { label: "Stack", href: "#stack" },
  { label: "Activity", href: "#activity" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const revealDelayClasses = [
  "",
  "reveal-delay-1",
  "reveal-delay-2",
  "reveal-delay-3",
  "reveal-delay-4",
] as const;
const ctaButtonClasses =
  "button-shell inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold sm:w-auto";
const projectButtonClasses =
  "button-shell inline-flex min-h-[3.15rem] w-full items-center justify-between gap-2 rounded-[1.05rem] px-5 py-3 text-sm font-semibold sm:min-h-0 sm:w-auto sm:justify-center sm:rounded-full";

const linkToneClasses: Record<ProjectLinkTone, string> = {
  ink: "button-ink",
  clay: "button-clay",
  mint: "button-mint",
};
const githubCalendarTheme = {
  light: ["#fbf4ea", "#ead6c1", "#d1ab84", "#b97a49", "#7e5031"],
  dark: ["#171311", "#4d392d", "#7e5d46", "#c18657", "#e1b68b"],
};
const githubCalendarStyle = {
  color: "var(--text-primary)",
};

const featuredProject = projects.find((project) => project.featured);
const standardProjects = projects.filter((project) => !project.featured);
const stackCategoryOrder = [
  "frontend",
  "backend",
  "mobile",
  "platform",
] as const;
const stackCategoryLabels: Record<(typeof stackCategoryOrder)[number], string> =
  {
    frontend: "Frontend",
    backend: "Backend",
    mobile: "Mobile",
    platform: "Tools & Platform",
  };

function getRevealDelayClass(index: number) {
  return (
    revealDelayClasses[Math.min(index, revealDelayClasses.length - 1)] ??
    "reveal-delay-4"
  );
}

function getStackGroups(items: StackItem[]) {
  return stackCategoryOrder
    .map((category) => ({
      category,
      label: stackCategoryLabels[category],
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);
}

const stackGroups = getStackGroups(techStack);

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <InkTransition>
      <div className="relative isolate overflow-hidden text-[var(--text-primary)]">
        <ScrollProgressBar />
        <CursorGlow />
        <ThemeTransitionOverlay />
        <BackgroundOrbs />

        <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--header-bg)] backdrop-blur-2xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
            <a
              href="#top"
              className="flex min-w-0 items-center gap-3 text-[var(--text-primary)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] text-sm font-bold shadow-sm">
                c.
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] uppercase tracking-[0.28em] text-[var(--accent)] sm:text-sm sm:tracking-[0.32em]">
                  csy20.works
                </p>
                <p className="hidden truncate text-sm text-[var(--text-secondary)] sm:block">
                  {profile.role}
                </p>
              </div>
            </a>

            <div className="hidden items-center gap-3 md:flex">
              <nav className="flex items-center gap-5 text-sm text-[var(--text-secondary)]">
                {navigation.map((item) => (
                  <NavUnderline
                    key={item.href}
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </NavUnderline>
                ))}
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main
          id="top"
          className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-32 pt-2 sm:gap-8 sm:px-6 sm:pt-5 lg:gap-10 lg:px-8"
          style={{ paddingBottom: "calc(8rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2.5 md:hidden">
            <nav className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto pb-1.5 text-sm">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-chip whitespace-nowrap rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised)] px-3.5 py-2 text-[13px] text-[var(--text-secondary)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ThemeToggle compact />
          </div>

          <section className="hero-shell">
            <div className="hero-grid">
              <div className="hero-copy reveal-on-scroll" data-reveal>
                <div className="hero-intro space-y-3 sm:space-y-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="hero-signature font-serif-accent text-3xl italic text-[var(--accent)] sm:text-[2.75rem]">
                      <RevealText text={`${profile.name} ${profile.handle}`} />
                    </div>
                    <h1 className="hero-title text-balance font-display font-semibold text-[var(--text-primary)]">
                      <RevealText text={profile.heroTitle} delay={0.2} />
                    </h1>
                  </div>
                </div>

                <div className="hero-body space-y-4 text-balance text-base leading-7 sm:text-[1.04rem] sm:leading-8">
                  <p>{profile.heroSummary}</p>
                  <p>{profile.heroDescription}</p>
                </div>

                <div className="hero-actions flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    className={`${ctaButtonClasses} hero-primary-button button-clay`}
                  >
                    View work
                    <span className="button-icon">
                      <ArrowUpRightIcon />
                    </span>
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${ctaButtonClasses} hero-secondary-button button-secondary`}
                  >
                    Get resume
                    <span className="button-icon">
                      <DownloadIcon />
                    </span>
                  </a>
                </div>
              </div>

              <HeroPortraitPanel />
            </div>
          </section>

          <section
            id="stack"
            className="stack-showcase reveal-on-scroll rounded-3xl border border-[var(--border-soft)] p-5 text-[var(--text-on-dark)] sm:p-8 reveal-delay-1"
            data-reveal
          >
            <SectionHeading
              eyebrow="Stack"
              title="What I actually build with."
              description="These are the tools I reach for day to day — for frontend, backend, mobile, and everything around them."
              invert
            />

            <MarqueeTicker className="mb-10 py-2">
              {techStack.map((tool) => (
                <div
                  key={tool.name}
                  className="stack-pill group flex items-center gap-2.5 rounded-full border border-[var(--stack-pill-border)] bg-[var(--stack-pill-bg)] py-2 pl-2 pr-4 shadow-[var(--stack-pill-shadow)] ring-1 ring-inset ring-white/5 transition-all hover:border-[var(--stack-pill-border-hover)] hover:bg-[var(--stack-pill-bg-hover)]"
                >
                  <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--stack-pill-icon-bg)] shadow-inner ring-1 ring-white/10 transition-transform group-hover:scale-105">
                    <StackGlyph icon={tool.icon} />
                  </div>
                  <span className="text-[13px] font-medium tracking-wide text-[var(--stack-pill-text)]">
                    {tool.name}
                  </span>
                </div>
              ))}
            </MarqueeTicker>

            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
              <article className="interactive-card stack-showcase-panel rounded-[1.8rem] border p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--panel-accent)]">
                  My toolkit
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-on-dark)] sm:text-[2rem]">
                  Covers web and mobile, front to back.
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-on-dark-soft)] sm:text-base">
                  I don't stick to one framework — I pick whatever fits the
                  project. Frontend, backend, React Native, Flutter, and the
                  tools around them.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                  {stackGroups.map((group, index) => (
                    <div
                      key={group.category}
                      className={`rounded-[1.25rem] border border-[var(--release-card-border)] bg-[var(--release-card)] px-4 py-3 ${getRevealDelayClass(index + 1)}`}
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--panel-accent)]">
                        {group.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--release-text)]">
                        {group.items.length}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4">
                {stackGroups.map((group, groupIndex) => (
                  <article
                    key={group.category}
                    className={`interactive-card stack-group rounded-[1.7rem] border p-4 sm:p-5 ${getRevealDelayClass((groupIndex % 4) + 1)}`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-[var(--panel-accent)]">
                          {group.label}
                        </p>
                        <p className="mt-2 text-sm text-[var(--text-on-dark-soft)]">
                          {group.items.length} tools
                        </p>
                      </div>
                      <span className="stack-group-pulse" aria-hidden="true" />
                    </div>

                    <motion.div
                      className="stack-pill-grid flex flex-wrap gap-3"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-80px" }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.06 } },
                        hidden: {},
                      }}
                    >
                      {group.items.map((item) => (
                        <motion.div
                          key={item.name}
                          className="stack-pill"
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                              y: 0,
                              opacity: 1,
                              transition: { duration: 0.4 },
                            },
                          }}
                        >
                          <span className="stack-pill-icon" aria-hidden="true">
                            <StackGlyph icon={item.icon} />
                          </span>
                          <span>{item.name}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="activity"
            className="reveal-on-scroll rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 sm:p-8 reveal-delay-1"
            data-reveal
          >
            <SectionHeading
              eyebrow="Activity"
              title="I try to write code every day."
              description="Here's what my GitHub looks like over the past year."
            />

            <div className="activity-surface mt-8 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3 sm:p-5">
              <div className="activity-meta-row">
                <p className="activity-mobile-hint">
                  Swipe to see the full year
                </p>
                <p className="activity-desktop-note">
                  Contributions over the past year.
                </p>
              </div>

              <div className="activity-scroll-shell">
                <div className="activity-scroll hide-scrollbar">
                  <div className="activity-calendar-track">
                    <GitHubCalendar
                      username="csy20"
                      colorScheme={theme === "dark" ? "dark" : "light"}
                      theme={githubCalendarTheme}
                      style={githubCalendarStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="projects"
            className="reveal-on-scroll space-y-7 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 sm:space-y-8 sm:p-8 reveal-delay-1"
            data-reveal
          >
            <SectionHeading
              eyebrow="Projects"
              title="Things I've built."
              description="A mix of apps I've shipped, side projects I learned from, and tools I made because I needed them."
            />

            {featuredProject ? (
              <article
                id="featured-release"
                className="interactive-card reveal-on-scroll overflow-hidden rounded-3xl border reveal-delay-2"
                style={{
                  borderColor: "var(--release-border)",
                  background: "var(--release-background)",
                }}
                data-reveal
              >
                <div className="grid gap-5 p-5 sm:gap-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div className="space-y-5">
                    <div className="featured-header-row flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-[1.15rem] border border-[var(--release-card-border)] bg-[var(--surface-dark-strong)] p-2 shadow-sm sm:h-[4.6rem] sm:w-[4.6rem] sm:rounded-[1.3rem]">
                        <motion.img
                          src="/bytewise-logo.png"
                          alt="Bytewise logo"
                          loading="lazy"
                          decoding="async"
                          width={512}
                          height={512}
                          className="h-full w-full object-contain"
                          initial={{ clipPath: "inset(100% 0 0 0)" }}
                          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                          viewport={{ once: true }}
                          transition={{
                            ease: [0.76, 0, 0.24, 1],
                            duration: 0.75,
                          }}
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-4xl font-semibold tracking-[-0.05em] text-[var(--release-text)] sm:text-5xl">
                          {featuredProject.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-[var(--release-muted)] sm:text-[15px]">
                          <span>com.csy20.bytewise</span>
                          <span aria-hidden="true">•</span>
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--release-card-border)] bg-[var(--release-card)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--release-text)]">
                      Featured release
                      <SparkIcon />
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm uppercase tracking-[0.28em] text-[var(--release-muted)]">
                        {featuredProject.eyebrow}
                      </p>
                      <p className="max-w-2xl text-[15px] leading-7 text-[var(--release-body)] sm:text-base sm:leading-8">
                        {featuredProject.description}
                      </p>
                      {featuredProject.releaseNote ? (
                        <p className="max-w-2xl text-[15px] leading-7 text-[var(--release-body)] sm:text-base sm:leading-8">
                          {featuredProject.releaseNote}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tags.map((tag) => (
                        <span
                          key={`${featuredProject.title}-${tag}`}
                          className="rounded-full border border-[var(--release-card-border)] bg-[var(--release-card)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--release-text)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {featuredProject.links.map((link) => (
                        <a
                          key={`${featuredProject.title}-${link.label}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`${ctaButtonClasses} px-5 py-3 ${linkToneClasses[link.tone]}`}
                        >
                          {link.label}
                          <span className="button-icon">
                            <ArrowUpRightIcon />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <article className="interactive-card rounded-[1.7rem] border border-[var(--release-card-border)] bg-[var(--release-card)] p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--release-muted)]">
                        Status
                      </p>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--release-text)]">
                        {featuredProject.spotlight}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--release-body)]">
                        Having something on the Play Store is different from
                        having it on GitHub. It means the whole thing actually
                        works.
                      </p>
                    </article>

                    <article className="interactive-card rounded-[1.7rem] border border-[var(--release-card-border)] bg-[var(--release-highlight)] p-5 text-[var(--release-highlight-text)]">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                        Why it's up here
                      </p>
                      <p className="mt-3 text-sm leading-7">
                        Out of everything I've built, this is the one that
                        actually made it to a store. That's why it gets its own
                        section.
                      </p>
                    </article>
                  </div>
                </div>
              </article>
            ) : null}

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
              {standardProjects.map((project, index) => (
                <MagneticCard
                  key={project.title}
                  className={`project-card interactive-card group flex h-full flex-col rounded-2xl border border-[var(--border-soft)] p-4 sm:rounded-[1.5rem] sm:p-6`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (index % 4) * 0.1,
                  }}
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <p className="text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
                      {project.eyebrow}
                    </p>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="text-base leading-7 text-[var(--text-secondary)]">
                      {project.description}
                    </p>
                  </div>

                  <div className="project-tag-row mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.title}-${tag}`}
                        className="rounded-full border border-[var(--chip-border)] bg-[var(--chip-bg)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--text-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-actions mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap sm:pt-7">
                    {project.links.map((link) => (
                      <a
                        key={`${project.title}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${projectButtonClasses} project-link-button ${linkToneClasses[link.tone]}`}
                      >
                        {link.label}
                        <span className="button-icon">
                          <ArrowUpRightIcon />
                        </span>
                      </a>
                    ))}
                  </div>
                </MagneticCard>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="reveal-on-scroll rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-dark)] p-5 text-[var(--text-on-dark)] sm:p-8 reveal-delay-1"
            data-reveal
          >
            <SectionHeading
              eyebrow="Contact"
              title="Want to work together? Say hi."
              description="Easiest way is email, but I'm around on all of these."
              invert
            />

            <div className="contact-layout grid gap-5 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <article className="contact-panel interactive-card rounded-2xl border border-[var(--panel-border)] p-5 sm:rounded-[1.5rem] sm:p-6">
                <p className="font-serif-accent text-4xl italic text-[var(--panel-accent)]">
                  csy20.works
                </p>
                <p className="mt-4 text-base leading-7 text-[var(--text-on-dark-soft)]">
                  I'm open to freelance work, contract projects, and
                  collaborations — especially if it involves mobile apps or
                  making an existing frontend better.
                </p>

                <div className="contact-actions mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href="mailto:chitreshy20@gmail.com"
                    className={`${ctaButtonClasses} contact-primary-button button-clay`}
                  >
                    Send an email
                    <span className="button-icon">
                      <MailIcon />
                    </span>
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${ctaButtonClasses} contact-secondary-button button-panel`}
                  >
                    Get resume
                    <span className="button-icon">
                      <DownloadIcon />
                    </span>
                  </a>
                </div>
              </article>

              <div className="contact-social-grid grid gap-4 sm:grid-cols-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`contact-link-card interactive-card reveal-on-scroll rounded-2xl border border-[var(--panel-border)] p-4 sm:rounded-2xl sm:p-5 ${getRevealDelayClass((index % 4) + 1)}`}
                    data-reveal
                  >
                    <div className="flex items-center gap-3">
                      <div className="contact-link-icon rounded-full border border-[var(--panel-border)] p-3 text-[var(--panel-accent)]">
                        <SocialGlyph icon={link.icon} />
                      </div>
                      <div className="contact-link-copy">
                        <p className="text-sm uppercase tracking-[0.24em] text-[var(--panel-accent)]">
                          {link.label}
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-on-dark)]">
                          {link.detail}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <BottomDock showFeaturedLink={Boolean(featuredProject)} />
      </div>
    </InkTransition>
  );
}

function HeroPortraitPanel() {
  return (
    <div
      className="hero-visual reveal-on-scroll reveal-delay-2"
      data-reveal
      aria-hidden="true"
    >
      <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
        <article className="interactive-card hero-portrait-card overflow-hidden rounded-3xl border border-[var(--surface-dark-strong)] bg-[var(--surface-dark-strong)] p-2 shadow-md sm:p-4">
          <div
            className="rounded-2xl p-2.5 sm:p-4"
            style={{ background: "var(--hero-card-gradient)" }}
          >
            <motion.img
              src="/pfp.jpeg"
              alt="Portrait of Chitresh Yadav"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1200}
              height={1200}
              className="aspect-[4/5] w-full rounded-[1.35rem] object-cover object-center"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.75 }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  invert?: boolean;
};

function SectionHeading({
  eyebrow,
  title,
  description,
  invert = false,
}: SectionHeadingProps) {
  const eyebrowColor = invert
    ? "text-[var(--panel-accent)]"
    : "text-[var(--accent)]";
  const titleColor = invert
    ? "text-[var(--text-on-dark)]"
    : "text-[var(--text-primary)]";
  const descriptionColor = invert
    ? "text-[var(--text-on-dark-soft)]"
    : "text-[var(--text-secondary)]";

  return (
    <div className="section-heading-wrapper mb-6 max-w-3xl sm:mb-8">
      <p
        className={`text-[11px] uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.34em] ${eyebrowColor}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`section-heading-h2 mt-3 text-balance font-display text-[2rem] font-semibold tracking-[-0.04em] ${titleColor} sm:text-5xl`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7 ${descriptionColor}`}
      >
        {description}
      </p>
    </div>
  );
}

function BackgroundOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="animate-float-slow absolute left-[-8rem] top-[-6rem] h-64 w-64 rounded-full bg-[var(--orb-one)] blur-3xl sm:h-80 sm:w-80" />
      <div className="animate-drift absolute right-[-8rem] top-1/3 h-72 w-72 rounded-full bg-[var(--orb-two)] blur-3xl sm:h-96 sm:w-96" />
      <div className="animate-float-slow absolute bottom-[-10rem] left-1/3 h-72 w-72 rounded-full bg-[var(--orb-three)] blur-3xl sm:h-[28rem] sm:w-[28rem]" />
    </div>
  );
}

function BottomDock({ showFeaturedLink }: { showFeaturedLink: boolean }) {
  return (
    <div
      className="fixed left-1/2 z-50 -translate-x-1/2"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <nav
        className="hide-scrollbar flex max-w-[calc(100vw-1rem)] items-center gap-1 overflow-x-auto rounded-full border border-[var(--dock-border)] bg-[var(--dock-bg)] px-2 py-2 shadow-sm backdrop-blur-2xl sm:max-w-none sm:gap-2 sm:px-3"
        aria-label="Quick links"
      >
        <DockButton href="#top" label="Back to top">
          <HomeIcon />
        </DockButton>
        {showFeaturedLink ? (
          <DockButton href="#featured-release" label="Featured release">
            <PlayStoreIcon />
          </DockButton>
        ) : null}
        <DockButton href="#contact" label="Contact">
          <ContactIcon />
        </DockButton>
        <DockButton
          href="https://buymeacoffee.com/csy2402200q"
          label="Buy me a coffee"
          external
        >
          <CoffeeIcon />
        </DockButton>

        <div
          className="mx-1 hidden h-8 w-px bg-[var(--dock-border)] sm:block"
          aria-hidden="true"
        />

        <div className="hidden sm:contents">
          {socialLinks.map((link) => (
            <DockButton
              key={link.label}
              href={link.href}
              label={link.label}
              external={
                link.href.startsWith("http") || link.href.startsWith("mailto:")
              }
            >
              <SocialGlyph icon={link.icon} />
            </DockButton>
          ))}
        </div>

        <ThemeToggle compact />
      </nav>
    </div>
  );
}

function DockButton({
  href,
  label,
  children,
  external = false,
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external && href.startsWith("http") ? "_blank" : undefined}
      rel={external && href.startsWith("http") ? "noreferrer" : undefined}
      className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-transparent text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--dock-border)] hover:bg-[var(--dock-button-hover)] hover:text-[var(--text-primary)]"
    >
      {children}
    </a>
  );
}

function SocialGlyph({ icon }: { icon: SocialIcon }) {
  switch (icon) {
    case "github":
      return <GitHubIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "x":
      return <XIcon />;
    case "email":
      return <MailIcon />;
  }
}

function StackGlyph({ icon }: { icon: StackItem["icon"] }) {
  switch (icon) {
    case "html":
      return <HtmlIcon />;
    case "css":
      return <CssIcon />;
    case "javascript":
      return <JavaScriptIcon />;
    case "typescript":
      return <TypeScriptIcon />;
    case "jsx":
      return <JsxIcon />;
    case "tsx":
      return <TsxIcon />;
    case "nextjs":
      return <NextJsIcon />;
    case "react":
      return <ReactIcon />;
    case "reactnative":
      return <ReactNativeIcon />;
    case "mongodb":
      return <MongoDbIcon />;
    case "express":
      return <ExpressIcon />;
    case "ubuntu":
      return <UbuntuIcon />;
    case "flutter":
      return <FlutterIcon />;
    case "go":
      return <GoIcon />;
    case "firebase":
      return <FirebaseIcon />;
    case "supabase":
      return <SupabaseIcon />;
    case "dart":
      return <DartIcon />;
    case "tailwindcss":
      return <TailwindCssIcon />;
    case "python":
      return <PythonIcon />;
  }
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6 14 14 6M8 6h6v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="m10 2 1.7 4.3L16 8l-4.3 1.7L10 14l-1.7-4.3L4 8l4.3-1.7L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M10 3v8m0 0 3-3m-3 3-3-3M4 14.5h12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M3.5 5.5h13v9h-13v-9Zm0 0L10 10l6.5-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3.5 8.5 10 3l6.5 5.5v7a1 1 0 0 1-1 1h-3.75v-4h-3.5v4H4.5a1 1 0 0 1-1-1v-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4.5 3.5v13l10-6.5-10-6.5Zm0 0 7.5 7-7.5 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 6.5a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 16 6.5v7A2.5 2.5 0 0 1 13.5 16h-7A2.5 2.5 0 0 1 4 13.5v-7Zm2 0 4 2.5 4-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4.5 7.25h8.25v3.5A3.75 3.75 0 0 1 9 14.5H8.25A3.75 3.75 0 0 1 4.5 10.75v-3.5Zm8.25.75H14a1.75 1.75 0 1 1 0 3.5h-1.25M5 16h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 4.5c0 .55-.35.85-.7 1.16-.33.29-.67.59-.67 1.14M9.75 4.5c0 .55-.35.85-.7 1.16-.33.29-.67.59-.67 1.14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 .5a12 12 0 0 0-3.794 23.383c.6.111.82-.258.82-.577 0-.285-.011-1.228-.017-2.226-3.338.726-4.042-1.415-4.042-1.415-.546-1.385-1.334-1.754-1.334-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.071 1.834 2.809 1.304 3.494.997.107-.775.419-1.304.763-1.603-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.178 0 0 1.009-.323 3.306 1.23a11.5 11.5 0 0 1 6.018 0c2.297-1.553 3.305-1.23 3.305-1.23.653 1.652.242 2.875.119 3.178.77.84 1.235 1.91 1.235 3.22 0 4.608-2.804 5.623-5.476 5.922.431.372.815 1.102.815 2.222 0 1.605-.014 2.898-.014 3.292 0 .321.217.694.825.576A12.001 12.001 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3zm7 0h3.83v1.71h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.54c0-1.32-.03-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.92V21h-4z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M18.901 2H21.99l-6.75 7.714L23.18 22h-6.215l-4.866-6.973L6.01 22H2.92l7.22-8.252L.82 2h6.372l4.398 6.295L18.9 2Zm-1.09 18h1.712L6.258 3.895H4.42L17.81 20Z" />
    </svg>
  );
}

function HtmlIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M4 3.5h12l-1.1 12.2L10 17l-4.9-1.3L4 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 7.2h5.8M7.4 10.1h5M7.8 13.1l2.2.6 2.1-.6.3-3H7.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CssIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M4 3.5h12l-1.1 12.2L10 17l-4.9-1.3L4 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 7.1h5.7M7.8 10.1h4.5M8.2 13l1.8.6 2-.6.2-2.1H8.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <rect
        x="3.5"
        y="3.5"
        width="13"
        height="13"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.6 7.3v4.7c0 1-.4 1.5-1.4 1.5-.5 0-.9-.1-1.2-.4M11.4 12.4c.4.6 1 .9 1.8.9.8 0 1.5-.4 1.5-1.2 0-.7-.4-1-1.5-1.4-.9-.3-1.5-.8-1.5-1.7 0-1 .8-1.7 2-1.7.9 0 1.5.3 1.9.9"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <rect
        x="3.5"
        y="3.5"
        width="13"
        height="13"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.2 7.4h5.2M8.8 7.4v6M12.3 12.4c.4.6 1 .9 1.8.9.8 0 1.5-.4 1.5-1.2 0-.7-.4-1-1.5-1.4-.9-.3-1.5-.8-1.5-1.7 0-1 .8-1.7 2-1.7.9 0 1.5.3 1.9.9"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JsxIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M7.2 4.7v7.1c0 1.1-.5 1.7-1.5 1.7-.5 0-.8-.1-1.2-.3M10 5.2l5.1 9.6M15.1 5.2 10 14.8"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="10"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function TsxIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <circle
        cx="10"
        cy="10"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5.8 6.2h5M8.3 6.2v7.4M10.3 5.2l4.9 9.6M15.2 5.2l-4.9 9.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextJsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <circle
        cx="10"
        cy="10"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M7 13V7l6 6V7"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <ellipse
        cx="10"
        cy="10"
        rx="6.5"
        ry="2.8"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <ellipse
        cx="10"
        cy="10"
        rx="6.5"
        ry="2.8"
        transform="rotate(60 10 10)"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <ellipse
        cx="10"
        cy="10"
        rx="6.5"
        ry="2.8"
        transform="rotate(120 10 10)"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="10" cy="10" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ReactNativeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <ellipse
        cx="10"
        cy="9.6"
        rx="6.2"
        ry="2.45"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="10"
        cy="9.6"
        rx="6.2"
        ry="2.45"
        transform="rotate(60 10 9.6)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="10"
        cy="9.6"
        rx="6.2"
        ry="2.45"
        transform="rotate(120 10 9.6)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="8"
        y="13.2"
        width="4"
        height="3.2"
        rx="0.9"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <circle cx="10" cy="9.6" r="1.25" fill="currentColor" />
    </svg>
  );
}

function MongoDbIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M10 3.2c1.9 1.5 3.2 4 3.2 6.3 0 2.6-1.4 5.3-3.2 7.3-1.8-2-3.2-4.7-3.2-7.3 0-2.3 1.3-4.8 3.2-6.3Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.4v10.9M10 15.3c.5-.7 1.1-1.1 1.9-1.3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpressIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M5 7.1h8.1M5.1 10h5.8M5 12.9h8.1"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="m12.6 7.1 2.4 5.8M15 7.1l-2.4 5.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UbuntuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <circle
        cx="10"
        cy="10"
        r="5.2"
        stroke="currentColor"
        strokeWidth="1.45"
      />
      <circle cx="10" cy="4.1" r="1.35" fill="currentColor" />
      <circle cx="15.4" cy="13.1" r="1.35" fill="currentColor" />
      <circle cx="4.6" cy="13.1" r="1.35" fill="currentColor" />
      <path
        d="M10 5.5v1.7M14.2 12.3l-1.4-.8M5.8 12.3l1.4-.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlutterIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="m6 11.5 5.8-5.8h2.7L8.7 11.5m0 0 2.7 2.8h2.8L11.5 11.5M6 11.5l2.7 2.8"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M2.8 10h8.5M13.1 10h4.1M4.2 7.4h5.5M4.2 12.6h5.5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <circle cx="14.5" cy="8.1" r="1" fill="currentColor" />
      <circle cx="17" cy="8.1" r=".9" fill="currentColor" />
      <path
        d="M13.4 12.6h2.4a1.7 1.7 0 1 0 0-3.4h-2.4v5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FirebaseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="m6.2 14.8 3-10.8c.1-.4.7-.4.9-.1l1.8 3.3M6.2 14.8l2.7-4.8c.2-.3.6-.3.8 0l4.1 4.8M6.2 14.8 15 13"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M12.8 3.8H8.9a1.6 1.6 0 0 0-1.3.7l-2.9 4a1.6 1.6 0 0 0 1.3 2.6h1.8l-1 4.2 7.8-10.1A1 1 0 0 0 12.8 3.8Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M6.5 5.3h3.2l3.8 3.8v5.6h-5l-2-2V7.1c0-1 .8-1.8 1.8-1.8Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 5.3v3.8h3.8M6.9 12.3h6.6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TailwindCssIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M4 8.1c1.1-1.8 2.3-2.5 3.8-2.5 2.3 0 2.5 1.7 3.7 2.5.7.5 1.5.5 2.5 0M6.1 12c1.1-1.8 2.3-2.5 3.8-2.5 2.3 0 2.5 1.7 3.7 2.5.7.5 1.5.5 2.5 0"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <path
        d="M10 4.1H7.4A2.4 2.4 0 0 0 5 6.5v1.3h5.2a1.8 1.8 0 0 0 1.8-1.8V4.1H10Zm0 11.8h2.6a2.4 2.4 0 0 0 2.4-2.4v-1.3H9.8A1.8 1.8 0 0 0 8 14v1.9h2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="5.9" r=".8" fill="currentColor" />
      <circle cx="12" cy="14.1" r=".8" fill="currentColor" />
      <path
        d="M8 15.9H6.6A2.6 2.6 0 0 1 4 13.3V12c0-1.1.9-2 2-2h8M12 4.1h1.4A2.6 2.6 0 0 1 16 6.7V8c0 1.1-.9 2-2 2H6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default App;
