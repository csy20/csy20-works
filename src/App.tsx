import { MotionConfig } from "framer-motion";
import { Navigation } from "./components/Navigation";
import { SocialDock } from "./components/SocialDock";
import { NotFound } from "./components/NotFound";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ActivitySection } from "./sections/ActivitySection";
import { StackSection } from "./sections/StackSection";
import { ContactSection } from "./sections/ContactSection";
import { profile, resumeUrl } from "./data/siteContent";
import { Icon } from "./components/ui/Icon";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path !== "/" && path !== "/index.html") return <NotFound />;

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="masthead container">
        <a
          href="#hero"
          className="wordmark"
          aria-label={`${profile.name} — home`}
        >
          <span className="brand-mark" aria-hidden="true">
            c.
          </span>
          <span>
            {profile.handle}
            <span className="wordmark-domain"> / independent engineer</span>
          </span>
        </a>
        <div className="masthead-actions">
          <a
            href={resumeUrl}
            className="masthead-resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <Icon name="external-link" size={14} />
          </a>
          <Navigation placement="header" />
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        <ActivitySection />
        <StackSection />
        <ContactSection />
      </main>
      <SocialDock />
    </MotionConfig>
  );
}
