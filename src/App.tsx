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
const ProjectsSection = lazy(() =>
  import("./sections/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  })),
);
const ContactSection = lazy(() =>
  import("./sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);

function BelowFoldFallback() {
  return (
    <>
      <StackSectionSkeleton />
      <ActivitySectionSkeleton />
      <ContactSectionSkeleton />
    </>
  );
}

export default function App() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const reducedMotion = useMemo(
    () => (shouldUseSafeMotion ? ("always" as const) : ("user" as const)),
    [shouldUseSafeMotion],
  );

  return (
    <MotionConfig reducedMotion={reducedMotion}>
      <InkTransition>
        {/*
          Dock is a sibling of the scroll shell so overflow-x on the shell
          never creates a containing block that traps position:fixed.
        */}
        <div className="relative min-h-screen overflow-x-clip">
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
          <main
            id="main-content"
            className="pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))]"
          >
            <HeroSection />
            <Suspense fallback={<BelowFoldFallback />}>
              <StackSection />
              <ActivitySection />
              <ProjectsSection />
              <ContactSection />
            </Suspense>
          </main>
        </div>
        <Navigation />
      </InkTransition>
    </MotionConfig>
  );
}
