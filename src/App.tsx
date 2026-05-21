import { InkTransition } from "./components/animations/InkTransition";
import { CursorGlow } from "./components/animations/CursorGlow";
import { ScrollProgressBar } from "./components/animations/ScrollProgressBar";
import { BackgroundMesh } from "./components/BackgroundMesh";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./sections/HeroSection";
import { StackSection } from "./sections/StackSection";
import { ActivitySection } from "./sections/ActivitySection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";

export default function App() {
  return (
    <InkTransition>
      <div className="relative min-h-screen overflow-clip">
        <ScrollProgressBar />
        <CursorGlow />
        <BackgroundMesh />
        <Navigation />
        <main>
          <HeroSection />
          <StackSection />
          <ActivitySection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </InkTransition>
  );
}
