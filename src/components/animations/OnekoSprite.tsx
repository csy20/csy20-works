import type { Ref } from "react";
import { ONEKO_SHEET, ONEKO_SHEET_SIZE, ONEKO_SIZE } from "../onekoSprite";

export function OnekoSprite({
  spriteRef,
  zIndex = 40,
  x = -ONEKO_SIZE,
  y = 0,
  opacity = 1,
}: {
  spriteRef: Ref<HTMLDivElement | null>;
  zIndex?: number;
  x?: number;
  y?: number;
  opacity?: number;
}) {
  return (
    <div
      ref={spriteRef}
      aria-hidden="true"
      className="pointer-events-none fixed"
      style={{
        left: x,
        top: y,
        width: ONEKO_SIZE,
        height: ONEKO_SIZE,
        zIndex,
        opacity,
        backgroundImage: `url(${ONEKO_SHEET})`,
        backgroundSize: ONEKO_SHEET_SIZE,
        imageRendering: "pixelated",
      }}
    />
  );
}
