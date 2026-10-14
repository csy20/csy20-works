import { profile, resumeUrl, socialLinks } from "../data/siteContent";
import { config } from "../config";
import { ActionLink } from "../components/ui/ActionLink";
import { Icon } from "../components/ui/Icon";
import { SoundToggle } from "../components/SoundToggle";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <p className="eyebrow">04 / What's next</p>
        <div className="contact-grid">
          <div>
            <p className="availability">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </p>
            <h2 id="contact-heading">
              Have something
              <br />
              worth <em>building?</em>
            </h2>
            <p className="contact-description">
              Let's talk about the problem, the team, and what we could make
              together.
            </p>
            <div className="contact-actions">
              <a
                className="button button-primary"
                href={`mailto:${config.email}`}
              >
                Email me <Icon name="arrow-right" size={16} />
              </a>
              <ActionLink href={resumeUrl}>View resume</ActionLink>
            </div>
          </div>
          <div className="contact-aside">
            <a className="contact-email" href={`mailto:${config.email}`}>
              {config.email}
              <span aria-hidden="true">↗</span>
            </a>
            <p>Find me elsewhere</p>
            <div className="social-links">
              {socialLinks
                .filter((link) => link.icon !== "email")
                .map((link) => (
                  <ActionLink key={link.href} href={link.href}>
                    {link.label}
                  </ActionLink>
                ))}
            </div>
          </div>
        </div>
        <footer className="footer">
          <a className="footer-name" href="#hero">
            Chitresh Yadav <span>/ csy20</span>
          </a>
          <span>Built with care. Kept in the open.</span>
          <SoundToggle />
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
