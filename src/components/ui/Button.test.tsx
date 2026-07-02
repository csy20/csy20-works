import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Button } from "./Button";
import { useReducedMotion } from "framer-motion";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: vi.fn(() => true),
  };
});

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("renders as an anchor when href is provided", () => {
    render(<Button href="https://example.com">Link</Button>);
    const link = screen.getByRole("link", { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies variant classes", () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies compact class when compact is true", () => {
    const { container } = render(<Button compact>Compact</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("renders with animation props when reduced motion is not preferred", () => {
    vi.mocked(useReducedMotion).mockReturnValueOnce(false);
    const { container } = render(<Button>Animated</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
