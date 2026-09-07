import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PortraitCard } from "./PortraitCard";
import { MotionSafeProvider } from "./MotionSafeProvider";
import { portraits } from "../data/siteContent";

describe("PortraitCard", () => {
  it("renders the illustrated portrait", () => {
    render(
      <MotionSafeProvider>
        <PortraitCard />
      </MotionSafeProvider>,
    );

    expect(
      screen.getByRole("img", { name: portraits.twitter.alt }),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Real" }),
    ).not.toBeInTheDocument();
  });
});
