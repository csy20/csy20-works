import { PortraitCard } from "../components/PortraitCard";
import { Icon } from "../components/ui/Icon";
import { profile, resumeUrl } from "../data/siteContent";
import { mergedContributionSummary } from "../data/contributions";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="hero container"
      aria-labelledby="intro-heading"
    >
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="identity">
            <span className="status-dot" aria-hidden="true" />
            {profile.name}
            <span className="identity-separator" aria-hidden="true">
              /
            </span>
            <span>{profile.role}</span>
          </p>
          <h1 id="intro-heading">
            Building useful
            <br className="desktop-break" /> software, from
            <br className="desktop-break" />{" "}
            <span className="headline-final">
              model to <em>product.</em>
            </span>
          </h1>
          <p className="hero-description">{profile.heroDescription}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Selected work <span aria-hidden="true">↘</span>
            </a>
            <a
              href={resumeUrl}
              className="button button-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <Icon name="external-link" size={15} />
            </a>
          </div>
        </div>
        <PortraitCard />
      </div>
      <div
        className="hero-proof"
        role="group"
        aria-label="Engineering evidence"
      >
        <a href="#speech-relay">
          <strong>
            23.6% <span>less latency</span>
          </strong>
          <span>Speech Relay · VAD vs. fixed windows</span>
        </a>
        <a href="#open-source">
          <strong>
            {mergedContributionSummary.merged} <span>merged upstream PRs</span>
          </strong>
          <span>
            {mergedContributionSummary.total} technical PRs ·{" "}
            {mergedContributionSummary.repositories} repositories
          </span>
        </a>
        <a href="#nen">
          <strong>
            Shipped <span>on Google Play</span>
          </strong>
          <span>Bytewise + Nen · installable products</span>
        </a>
      </div>
    </section>
  );
}
