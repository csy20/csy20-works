import { describe, expect, it } from "vitest";
import { onekoBackgroundPosition, onekoDirection } from "./onekoSprite";

describe("onekoDirection", () => {
  it("faces east when the target is to the right", () => {
    expect(onekoDirection(0, 0, 100, 0)).toBe("E");
  });

  it("faces west when the target is to the left", () => {
    expect(onekoDirection(100, 0, 0, 0)).toBe("W");
  });

  it("faces north-east on a diagonal", () => {
    expect(onekoDirection(0, 100, 100, 0)).toBe("NE");
  });

  it("is idle when the target is on top of the cat", () => {
    expect(onekoDirection(10, 10, 10, 10)).toBe("idle");
  });
});

describe("onekoBackgroundPosition", () => {
  it("returns a sheet offset for a known sprite", () => {
    expect(onekoBackgroundPosition("E", 0)).toBe("-144px 0px");
    expect(onekoBackgroundPosition("E", 1)).toBe("-144px -48px");
  });

  it("returns undefined for an unknown sprite", () => {
    expect(onekoBackgroundPosition("nope", 0)).toBeUndefined();
  });
});
