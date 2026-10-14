import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PortraitCard } from "./PortraitCard";
import { portraits } from "../data/siteContent";

describe("PortraitCard", () => {
  it("preserves the original artwork and full square image with WebP and JPG sources", () => {
    const { container } = render(<PortraitCard />);
    expect(
      screen.getByRole("img", { name: portraits.twitter.alt }),
    ).toHaveAttribute("src", "/portrait-twitter.jpg");
    expect(container.querySelector("source")).toHaveAttribute(
      "srcset",
      "/portrait-twitter.webp",
    );
    expect(screen.getByRole("img")).toHaveAttribute("width", "736");
    expect(screen.getByRole("img")).toHaveAttribute("height", "736");
  });
});
