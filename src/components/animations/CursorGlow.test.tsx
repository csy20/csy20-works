import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CursorGlow } from "./CursorGlow";
import { ThemeProvider } from "../ThemeProvider";

describe("CursorGlow", () => {
  it("renders nothing when theme is light", () => {
    const { container } = render(
      <ThemeProvider>
        <CursorGlow />
      </ThemeProvider>,
    );
    expect(container.firstChild).toBeNull();
  });
});
