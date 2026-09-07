import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { MotionSafeProvider } from "./components/MotionSafeProvider.tsx";
import { SoundProvider } from "./components/SoundProvider.tsx";
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in the document");
}
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <MotionSafeProvider>
          <SoundProvider>
            <App />
          </SoundProvider>
        </MotionSafeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

import("./utils/webVitals")
  .then(({ initWebVitals }) => initWebVitals())
  .catch(() => console.warn("[Vitals] failed to load"));
