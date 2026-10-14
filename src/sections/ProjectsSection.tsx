import {
  projects,
  caseStudies,
  productSpotlights,
  type Project,
  type CaseStudy,
  type ProductSpotlight,
} from "../data/siteContent";
import { ActionLink } from "../components/ui/ActionLink";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SpeechPipeline } from "../components/SpeechPipeline";

function ProjectLinks({
  project,
  storeLabel,
}: {
  project: Project;
  storeLabel?: string;
}) {
  return (
    <div className="project-links">
      {project.links.map((link) => (
        <ActionLink key={link.href} href={link.href}>
          {link.label === "GitHub"
            ? "Source code"
            : link.label === "Release"
              ? "Alpha release"
              : storeLabel && link.label === "Play Store"
                ? storeLabel
                : link.label}
        </ActionLink>
      ))}
    </div>
  );
}

function PublishedProduct({
  project,
  spotlight,
}: {
  project: Project;
  spotlight: ProductSpotlight;
}) {
  return (
    <article
      id={spotlight.id}
      className="product-spotlight"
      aria-labelledby={`${spotlight.id}-heading`}
    >
      <div className="product-spotlight-cover">
        <p className="eyebrow">Published product / Android</p>
        <div className="product-cover-lockup">
          <img
            src={project.logo}
            alt={`${project.title} app icon`}
            width={512}
            height={512}
            loading="lazy"
          />
          <p className="product-cover-line">{spotlight.coverLine}</p>
        </div>
        <span className="product-cover-platform">
          Flutter + Dart · Local audio
        </span>
      </div>
      <div className="project-copy product-spotlight-copy">
        <p className="eyebrow">
          <span className="project-index">04</span>
          Published on Google Play
        </p>
        <h3 id={`${spotlight.id}-heading`}>{project.title}</h3>
        <p className="project-overview">{spotlight.overview}</p>
        <ul className="product-features">
          {spotlight.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <ProjectLinks project={project} storeLabel="Get it on Google Play" />
        <details className="engineering-detail">
          <summary>
            Inside the product <span aria-hidden="true">+</span>
          </summary>
          <div className="detail-content">
            <p>{project.description}</p>
            {project.releaseNote && <p>{project.releaseNote}</p>}
            <div
              className="project-tags"
              role="group"
              aria-label="Technologies"
            >
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

function EngineeringDetail({ study }: { study: CaseStudy }) {
  return (
    <details className="engineering-detail">
      <summary>
        Engineering notes <span aria-hidden="true">+</span>
      </summary>
      <div className="detail-content">
        <p>{study.detail}</p>
        {study.id === "speech-relay" && (
          <ActionLink href="https://github.com/csy20/speech-relay/blob/main/eval/results.md">
            Benchmark methodology & results
          </ActionLink>
        )}
      </div>
    </details>
  );
}

export function ProjectsSection() {
  const more = projects.filter(
    (project) =>
      !caseStudies.some((study) => study.title === project.title) &&
      !productSpotlights.some((spotlight) => spotlight.title === project.title),
  );
  return (
    <section
      id="projects"
      className="section work-section"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <SectionHeading
          id="work-heading"
          number="01"
          label="Selected work"
          title="Ideas, made real."
        >
          A few things I've built — from the first model call to a product you
          can use.
        </SectionHeading>
        <div className="featured-projects">
          {caseStudies.map((study, index) => {
            const project = projects.find(
              (item) => item.title === study.title,
            )!;
            return (
              <article
                key={study.id}
                id={study.id}
                className={`featured-project project-${study.id}`}
                aria-labelledby={`${study.id}-heading`}
              >
                {study.id === "speech-relay" ? (
                  <SpeechPipeline />
                ) : study.id === "02-os" ? (
                  <div className="os-visual">
                    <div className="visual-meta">
                      <span>02 / Agent-native desktop</span>
                      <span className="alpha-label">Public alpha</span>
                    </div>
                    <img
                      src={project.logo}
                      alt="02_OS logo"
                      width={701}
                      height={624}
                      loading="lazy"
                    />
                    <p>
                      Local context.
                      <br />
                      <em>Useful agents.</em>
                    </p>
                    <span className="visual-footnote">Rust + GNOME + MCP</span>
                  </div>
                ) : (
                  <div className="bytewise-visual">
                    <div className="visual-meta">
                      <span>Bytewise / Learning, anywhere</span>
                      <span>Google Play ↗</span>
                    </div>
                    <div className="bytewise-lockup">
                      <img
                        src={project.logo}
                        alt="Bytewise logo"
                        width={80}
                        height={80}
                        loading="lazy"
                      />
                      <strong>
                        bytewise<span>Make room for learning.</span>
                      </strong>
                    </div>
                    <div className="learning-topics">
                      <span>Algorithms</span>
                      <span>System design</span>
                      <span>Offline-first</span>
                    </div>
                  </div>
                )}
                <div className="project-copy">
                  <p className="eyebrow">
                    <span className="project-index">0{index + 1}</span>
                    {study.category}
                  </p>
                  <h3 id={`${study.id}-heading`}>
                    {study.title}
                    <span className="project-title-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </h3>
                  <p className="project-overview">{study.overview}</p>
                  <p className="project-decision">
                    <span>The decision</span>
                    {study.decision}
                  </p>
                  <p className="project-outcome">{study.outcome}</p>
                  <div
                    className="project-tags"
                    role="group"
                    aria-label="Technologies"
                  >
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ProjectLinks project={project} />
                  <EngineeringDetail study={study} />
                </div>
              </article>
            );
          })}
        </div>
        {productSpotlights.map((spotlight) => (
          <PublishedProduct
            key={spotlight.id}
            spotlight={spotlight}
            project={
              projects.find((project) => project.title === spotlight.title)!
            }
          />
        ))}
        <div className="more-work">
          <div className="more-work-heading">
            <h3>More from the workbench</h3>
            <span>{more.length} more projects</span>
          </div>
          <div className="project-index-list">
            {more.map((project, index) => (
              <details className="other-project" key={project.title}>
                <summary>
                  <span className="other-project-number">
                    0{index + caseStudies.length + productSpotlights.length + 1}
                  </span>
                  <span className="other-project-name">
                    {project.logo && (
                      <img
                        src={project.logo}
                        alt=""
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                    )}
                    <span>{project.title}</span>
                  </span>
                  <span className="other-project-category">
                    {project.eyebrow}
                  </span>
                  <span className="expand-icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="other-project-content">
                  <p>{project.description}</p>
                  {project.releaseNote && <p>{project.releaseNote}</p>}
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ProjectLinks project={project} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
