import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { InkTransition } from "./components/animations/InkTransition";
import { CursorGlow } from "./components/animations/CursorGlow";
import { ScrollProgressBar } from "./components/animations/ScrollProgressBar";
import { ThemeTransitionOverlay } from "./components/animations/ThemeTransitionOverlay";
import { BackgroundMesh } from "./components/BackgroundMesh";
import { Navigation } from "./components/Navigation";
import { useAnimationSafeMode } from "./components/useAnimationSafeMode";
import { HeroSection } from "./sections/HeroSection";
import { StackSection } from "./sections/StackSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const ActivitySection = lazy(() =>
  import("./sections/ActivitySection").then((m) => ({
    default: m.ActivitySection,
  })),
);
const ContactSection = lazy(() =>
  import("./sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);

export default function App() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <MotionConfig reducedMotion={shouldUseSafeMotion ? "always" : "user"}>
      <InkTransition>
        <div className="relative min-h-screen overflow-x-hidden">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--accent-fg)]"
          >
            Skip to content
          </a>
          <ScrollProgressBar />
          <CursorGlow />
          <ThemeTransitionOverlay />
          <BackgroundMesh />
          <Navigation />
          <main id="main-content">
            <HeroSection />
            <StackSection />
            <Suspense fallback={null}>
              <ActivitySection />
            </Suspense>
            <ProjectsSection />
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </main>
        </div>
      </InkTransition>
    </MotionConfig>
  );
}
