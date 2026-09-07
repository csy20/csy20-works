import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BootScreen } from "./BootScreen";
import { CatBootProvider } from "./CatBootProvider";
import { MotionSafeProvider } from "./MotionSafeProvider";
import { SoundProvider } from "./SoundProvider";
import { ThemeProvider } from "./ThemeProvider";

function renderBoot() {
  return render(
    <ThemeProvider>
      <MotionSafeProvider>
        <SoundProvider>
          <CatBootProvider>
            <BootScreen />
          </CatBootProvider>
        </SoundProvider>
      </MotionSafeProvider>
    </ThemeProvider>,
  );
}

describe("BootScreen", () => {
  it("skips the overlay in test mode so pages render immediately", () => {
    renderBoot();
    expect(
      screen.queryByRole("status", { name: "Starting" }),
    ).not.toBeInTheDocument();
  });
});
