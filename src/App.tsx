import { lazy, Suspense, useMemo } from "react";
import { MotionConfig } from "framer-motion";
import { InkTransition } from "./components/animations/InkTransition";
import { CursorGlow } from "./components/animations/CursorGlow";
import { ScrollProgressBar } from "./components/animations/ScrollProgressBar";
import { ThemeTransitionOverlay } from "./components/animations/ThemeTransitionOverlay";
import { BackgroundMesh } from "./components/BackgroundMesh";
import { Navigation } from "./components/Navigation";
import { useAnimationSafeMode } from "./components/useAnimationSafeMode";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import {
  StackSectionSkeleton,
  ActivitySectionSkeleton,
  ContactSectionSkeleton,
} from "./components/SectionSkeleton";

const StackSection = lazy(() =>
  import("./sections/StackSection").then((m) => ({
    default: m.StackSection,
  })),
);
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
  const reducedMotion = useMemo(
    () => (shouldUseSafeMotion ? ("always" as const) : ("user" as const)),
    [shouldUseSafeMotion],
  );

  return (
    <MotionConfig reducedMotion={reducedMotion}>
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
            <Suspense fallback={<StackSectionSkeleton />}>
              <StackSection />
            </Suspense>
            <Suspense fallback={<ActivitySectionSkeleton />}>
              <ActivitySection />
            </Suspense>
            <ProjectsSection />
            <Suspense fallback={<ContactSectionSkeleton />}>
              <ContactSection />
            </Suspense>
          </main>
        </div>
      </InkTransition>
    </MotionConfig>
  );
}
