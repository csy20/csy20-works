import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { MotionSafeProvider } from "./components/MotionSafeProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <MotionSafeProvider>
          <App />
        </MotionSafeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

import("./utils/webVitals").then(({ initWebVitals }) => initWebVitals());
