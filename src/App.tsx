import { useEffect, type ReactNode } from 'react'

import { ThemeToggle } from './components/ThemeToggle'
import {
  currentInterests,
  heroHighlights,
  profile,
  projects,
  resumeUrl,
  socialLinks,
  techStack,
  workflow,
  type ProjectLinkTone,
  type SocialIcon,
} from './data/siteContent'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const revealDelayClasses = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'] as const
const ctaButtonClasses =
  'button-shell inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold sm:w-auto'
const projectButtonClasses =
  'button-shell inline-flex min-h-[3.15rem] w-full items-center justify-between gap-2 rounded-[1.05rem] px-5 py-3 text-sm font-semibold sm:min-h-0 sm:w-auto sm:justify-center sm:rounded-full'
const dockButtonClasses =
  'dock-icon-button flex h-10 w-10 flex-none items-center justify-center rounded-full'

const linkToneClasses: Record<ProjectLinkTone, string> = {
  ink: 'button-ink',
  clay: 'button-clay',
  mint: 'button-mint',
}

const featuredProject = projects.find((project) => project.featured)
const standardProjects = projects.filter((project) => !project.featured)

function getRevealDelayClass(index: number) {
  return revealDelayClasses[Math.min(index, revealDelayClasses.length - 1)] ?? 'reveal-delay-4'
}

function App() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!elements.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative isolate overflow-hidden text-[var(--text-primary)]">
      <BackgroundOrbs />

      <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--header-bg)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3 text-[var(--text-primary)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] text-sm font-bold shadow-[0_12px_24px_-22px_rgba(20,15,11,0.28)]">
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
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-colors duration-200 hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main
        id="top"
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-32 pt-4 sm:gap-10 sm:px-6 sm:pt-6 lg:px-8"
        style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2.5 md:hidden">
          <nav className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto pb-2 text-sm">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-[var(--border-soft)] bg-[var(--surface-raised)] px-3.5 py-2 text-[13px] text-[var(--text-secondary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle compact />
        </div>

        <section className="space-y-4 pb-1 pt-1 sm:space-y-5 sm:pb-2 sm:pt-4 lg:space-y-8 lg:pb-6 lg:pt-8">
          <div className="grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
            <div className="space-y-6 reveal-on-scroll sm:space-y-8" data-reveal>
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--accent)] sm:text-sm sm:tracking-[0.4em]">
                  {profile.strapline}
                </p>
                <div className="space-y-3">
                  <p className="font-serif-accent text-2xl italic text-[var(--accent)] sm:text-4xl">
                    {profile.name} {profile.handle}
                  </p>
                  <h1 className="max-w-3xl text-balance font-display text-[clamp(3rem,11vw,4.7rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                    {profile.heroTitle}
                  </h1>
                </div>
              </div>

              <div className="max-w-2xl space-y-4 text-balance text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
                <p>{profile.heroSummary}</p>
                <p>{profile.heroDescription}</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#projects"
                  className={`${ctaButtonClasses} button-clay`}
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
                  className={`${ctaButtonClasses} button-secondary`}
                >
                  Open resume
                  <span className="button-icon">
                    <DownloadIcon />
                  </span>
                </a>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-delay-2" data-reveal>
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                <article className="interactive-card overflow-hidden rounded-[2rem] border border-[var(--surface-dark-strong)] bg-[var(--surface-dark-strong)] p-4 shadow-[0_34px_80px_-46px_rgba(17,14,12,0.55)]">
                  <div
                    className="rounded-[1.6rem] p-4"
                    style={{ background: 'var(--hero-card-gradient)' }}
                  >
                    <img
                      src="/pfp.jpeg"
                      alt="Portrait of Chitresh Yadav"
                      className="aspect-[4/5] w-full rounded-[1.35rem] object-cover object-center"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="interactive-card rounded-[1.4rem] border border-[var(--panel-border)] bg-[var(--panel-card)] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--panel-accent)]">
                        Currently exploring
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-on-dark-soft)]">
                        AI-assisted handoffs, PWA surfaces, and cleaner frontend storytelling.
                      </p>
                    </div>
                    <div className="interactive-card rounded-[1.4rem] border border-[var(--panel-border)] bg-[var(--panel-card)] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--panel-accent)]">
                        Open to
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-on-dark-soft)]">
                        Freelance builds, mobile product work, and collaborative frontend design.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))_1.15fr]">
            {heroHighlights.map((item, index) => (
              <article
                key={item.label}
                className={`interactive-card reveal-on-scroll rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 shadow-[0_14px_30px_-24px_rgba(20,15,11,0.2)] sm:p-5 ${getRevealDelayClass(index + 1)}`}
                data-reveal
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{item.label}</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                  {item.value}
                </p>
              </article>
            ))}

            <article
              className="interactive-card reveal-on-scroll flex h-full flex-col justify-between rounded-[1.5rem] border border-[var(--border-accent)] bg-[var(--surface)] p-4 shadow-[0_14px_28px_-24px_rgba(20,15,11,0.16)] sm:p-5 reveal-delay-4"
              data-reveal
            >
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Design stance</p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                  From shipping screens to product systems.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  The hero now hands off into the rest of the portfolio with more rhythm, less dead
                  space, and a clearer bridge into the profile and shipped work.
                </p>
              </div>

              <a
                href="#about"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
              >
                Read the profile
                <span className="button-icon">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </article>
          </div>
        </section>

        <section
          id="about"
          className="reveal-on-scroll relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-[0_26px_60px_-42px_rgba(20,15,11,0.16)] sm:rounded-[2.2rem] sm:p-8 reveal-delay-1"
          data-reveal
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-70 blur-3xl"
            style={{ background: 'linear-gradient(90deg, var(--orb-one), transparent 70%)' }}
            aria-hidden="true"
          />

          <SectionHeading
            eyebrow="Profile"
            title="A portfolio built around product feel, not just feature lists."
            description="The old site already had the right story. This version sharpens the presentation and keeps the focus on how I actually work."
          />

          <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="interactive-card rounded-[1.6rem] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 text-base leading-7 text-[var(--text-secondary)] sm:rounded-[1.75rem] sm:p-6 sm:text-lg sm:leading-8">
              <p>{profile.aboutPrimary}</p>
              <p className="mt-5">{profile.aboutSecondary}</p>
            </article>

            <div className="grid gap-4">
              <DetailCard title="How I work" items={workflow} />
              <DetailCard title="Currently exploring" items={currentInterests} />
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="reveal-on-scroll rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-dark)] p-5 text-[var(--text-on-dark)] shadow-[0_24px_60px_-42px_rgba(10,10,10,0.38)] sm:p-8 reveal-delay-1"
          data-reveal
        >
          <SectionHeading
            eyebrow="Stack"
            title="Tools I keep close to the product layer."
            description="The strongest work usually comes from keeping implementation detail connected to the user experience, not isolated from it."
            invert
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {techStack.map((item) => (
              <article
                key={item.name}
                className="interactive-card rounded-[1.5rem] border border-[var(--panel-border)] bg-[var(--panel-card)] p-4 sm:rounded-[1.6rem] sm:p-5"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--panel-accent)]">{item.name}</p>
                <p className="mt-3 text-base leading-7 text-[var(--text-on-dark)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="reveal-on-scroll space-y-7 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-5 sm:space-y-8 sm:p-8 reveal-delay-1"
          data-reveal
        >
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that show what I ship and how I think."
            description="I kept the strongest work from the older portfolio and reframed it with cleaner hierarchy, clearer tags, and faster scanning."
          />

          {featuredProject ? (
            <article
              id="featured-release"
              className="interactive-card reveal-on-scroll overflow-hidden rounded-[2rem] border shadow-[0_26px_60px_-40px_rgba(17,14,12,0.36)] reveal-delay-2"
              style={{
                borderColor: 'var(--release-border)',
                background: 'var(--release-background)',
              }}
              data-reveal
            >
              <div className="grid gap-5 p-5 sm:gap-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="space-y-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-[1.15rem] border border-[var(--release-card-border)] bg-[#090c10] p-2 shadow-[0_16px_32px_-22px_rgba(0,0,0,0.45)] sm:h-[4.6rem] sm:w-[4.6rem] sm:rounded-[1.3rem]">
                      <img
                        src="/bytewise-logo.png"
                        alt="Bytewise logo"
                        className="h-full w-full object-contain"
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
                      Release signal
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--release-text)]">
                      {featuredProject.spotlight}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--release-body)]">
                      A public release matters because it shows end-to-end product execution, not
                      just interface polish.
                    </p>
                  </article>

                  <article className="interactive-card rounded-[1.7rem] border border-[var(--release-card-border)] bg-[var(--release-highlight)] p-5 text-[var(--release-highlight-text)]">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                      Why it stands out
                    </p>
                    <p className="mt-3 text-sm leading-7">
                      Among the portfolio pieces, this is the clearest shipping proof, so it gets
                      featured separately before the rest of the project grid.
                    </p>
                  </article>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {standardProjects.map((project, index) => (
              <article
                key={project.title}
                className={`interactive-card group reveal-on-scroll flex h-full flex-col rounded-[1.65rem] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4 sm:rounded-[1.9rem] sm:p-6 ${getRevealDelayClass((index % 4) + 1)}`}
                data-reveal
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <p className="text-xs uppercase tracking-[0.32em] text-[var(--accent)]">{project.eyebrow}</p>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="text-base leading-7 text-[var(--text-secondary)]">{project.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.title}-${tag}`}
                      className="rounded-full border border-[var(--chip-border)] bg-[var(--chip-bg)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--text-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap sm:pt-7">
                  {project.links.map((link) => (
                    <a
                      key={`${project.title}-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${projectButtonClasses} ${linkToneClasses[link.tone]}`}
                    >
                      {link.label}
                      <span className="button-icon">
                        <ArrowUpRightIcon />
                      </span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="reveal-on-scroll rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-dark)] p-5 text-[var(--text-on-dark)] sm:p-8 reveal-delay-1"
          data-reveal
        >
          <SectionHeading
            eyebrow="Contact"
            title="If the product needs both taste and execution, let’s talk."
            description="This first Vite version stays static on purpose: direct links, quick context, and a clear path to reach me."
            invert
          />

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="interactive-card rounded-[1.65rem] border border-[var(--panel-border)] bg-[var(--panel-card)] p-5 sm:rounded-[1.8rem] sm:p-6">
              <p className="font-serif-accent text-4xl italic text-[var(--panel-accent)]">csy20.works</p>
              <p className="mt-4 text-base leading-7 text-[var(--text-on-dark-soft)]">
                Best for freelance product work, mobile-first builds, and frontend redesigns
                that need stronger visual clarity without losing technical rigor.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:chitreshy20@gmail.com"
                  className={`${ctaButtonClasses} button-clay`}
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
                  className={`${ctaButtonClasses} button-panel`}
                >
                  Open resume
                  <span className="button-icon">
                    <DownloadIcon />
                  </span>
                </a>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`interactive-card reveal-on-scroll rounded-[1.5rem] border border-[var(--panel-border)] bg-[var(--panel-card)] p-4 sm:rounded-[1.6rem] sm:p-5 ${getRevealDelayClass((index % 4) + 1)}`}
                  data-reveal
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-[var(--panel-border)] bg-[var(--panel-card)] p-3 text-[var(--panel-accent)]">
                      <SocialGlyph icon={link.icon} />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-[var(--panel-accent)]">
                        {link.label}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-on-dark)]">{link.detail}</p>
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
  )
}

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  invert?: boolean
}

function SectionHeading({ eyebrow, title, description, invert = false }: SectionHeadingProps) {
  const eyebrowColor = invert ? 'text-[var(--panel-accent)]' : 'text-[var(--accent)]'
  const titleColor = invert ? 'text-[var(--text-on-dark)]' : 'text-[var(--text-primary)]'
  const descriptionColor = invert ? 'text-[var(--text-on-dark-soft)]' : 'text-[var(--text-secondary)]'

  return (
    <div className="mb-6 max-w-3xl sm:mb-8">
      <p className={`text-[11px] uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.34em] ${eyebrowColor}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-balance font-display text-[2rem] font-semibold tracking-[-0.04em] ${titleColor} sm:text-5xl`}
      >
        {title}
      </h2>
      <p className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7 ${descriptionColor}`}>{description}</p>
    </div>
  )
}

function DetailCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="interactive-card rounded-[1.6rem] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 sm:rounded-[1.75rem] sm:p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{title}</p>
      <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className="mt-2 h-2 w-2 flex-none rounded-full bg-[var(--accent-strong)]"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="animate-float-slow absolute left-[-8rem] top-[-6rem] h-64 w-64 rounded-full bg-[var(--orb-one)] blur-3xl sm:h-80 sm:w-80" />
      <div className="animate-drift absolute right-[-8rem] top-1/3 h-72 w-72 rounded-full bg-[var(--orb-two)] blur-3xl sm:h-96 sm:w-96" />
      <div className="animate-float-slow absolute bottom-[-10rem] left-1/3 h-72 w-72 rounded-full bg-[var(--orb-three)] blur-3xl sm:h-[28rem] sm:w-[28rem]" />
    </div>
  )
}

function BottomDock({ showFeaturedLink }: { showFeaturedLink: boolean }) {
  return (
    <div
      className="fixed left-1/2 z-50 -translate-x-1/2"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <nav
        className="hide-scrollbar reveal-on-scroll flex max-w-[calc(100vw-1rem)] items-center gap-1 overflow-x-auto rounded-full border border-[var(--dock-border)] bg-[var(--dock-bg)] px-2 py-2 shadow-[0_18px_42px_-30px_rgba(20,15,11,0.2)] backdrop-blur-2xl reveal-delay-4 sm:max-w-none sm:gap-2 sm:px-3"
        aria-label="Quick links"
        data-reveal
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

        <div className="mx-1 hidden h-8 w-px bg-[var(--dock-border)] sm:block" aria-hidden="true" />

        <div className="hidden sm:contents">
          {socialLinks.map((link) => (
            <DockButton
              key={link.label}
              href={link.href}
              label={link.label}
              external={link.href.startsWith('http') || link.href.startsWith('mailto:')}
            >
              <SocialGlyph icon={link.icon} />
            </DockButton>
          ))}
        </div>

        <ThemeToggle compact />
      </nav>
    </div>
  )
}

function DockButton({
  href,
  label,
  children,
  external = false,
}: {
  href: string
  label: string
  children: ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external && href.startsWith('http') ? '_blank' : undefined}
      rel={external && href.startsWith('http') ? 'noreferrer' : undefined}
      className={dockButtonClasses}
    >
      <span className="button-icon">{children}</span>
    </a>
  )
}

function SocialGlyph({ icon }: { icon: SocialIcon }) {
  switch (icon) {
    case 'github':
      return <GitHubIcon />
    case 'linkedin':
      return <LinkedInIcon />
    case 'x':
      return <XIcon />
    case 'email':
      return <MailIcon />
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
  )
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
  )
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
  )
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
  )
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
  )
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
  )
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
  )
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
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.794 23.383c.6.111.82-.258.82-.577 0-.285-.011-1.228-.017-2.226-3.338.726-4.042-1.415-4.042-1.415-.546-1.385-1.334-1.754-1.334-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.071 1.834 2.809 1.304 3.494.997.107-.775.419-1.304.763-1.603-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.178 0 0 1.009-.323 3.306 1.23a11.5 11.5 0 0 1 6.018 0c2.297-1.553 3.305-1.23 3.305-1.23.653 1.652.242 2.875.119 3.178.77.84 1.235 1.91 1.235 3.22 0 4.608-2.804 5.623-5.476 5.922.431.372.815 1.102.815 2.222 0 1.605-.014 2.898-.014 3.292 0 .321.217.694.825.576A12.001 12.001 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3zm7 0h3.83v1.71h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.54c0-1.32-.03-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.92V21h-4z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M18.901 2H21.99l-6.75 7.714L23.18 22h-6.215l-4.866-6.973L6.01 22H2.92l7.22-8.252L.82 2h6.372l4.398 6.295L18.9 2Zm-1.09 18h1.712L6.258 3.895H4.42L17.81 20Z" />
    </svg>
  )
}

export default App
