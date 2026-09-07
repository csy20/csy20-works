/** Sprite sheet and facing math shared by the boot cat and the cursor cat. */

export const ONEKO_SIZE = 48;
export const ONEKO_SHEET = "/oneko.gif";
export const ONEKO_SHEET_SIZE = `${256 * (ONEKO_SIZE / 32)}px ${128 * (ONEKO_SIZE / 32)}px`;

export const ONEKO_SPRITE: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

export function onekoBackgroundPosition(
  name: string,
  frame: number,
): string | undefined {
  const frames = ONEKO_SPRITE[name];
  if (!frames?.length) return undefined;
  const sprite = frames[frame % frames.length];
  if (!sprite) return undefined;
  return `${sprite[0] * ONEKO_SIZE}px ${sprite[1] * ONEKO_SIZE}px`;
}

/** Facing from a cat at (fromX, fromY) toward (toX, toY), same as oneko.js. */
export function onekoDirection(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): string {
  const diffX = fromX - toX;
  const diffY = fromY - toY;
  const distance = Math.hypot(diffX, diffY);
  if (distance < 1) return "idle";
  let direction = "";
  direction += diffY / distance > 0.5 ? "N" : "";
  direction += diffY / distance < -0.5 ? "S" : "";
  direction += diffX / distance > 0.5 ? "W" : "";
  direction += diffX / distance < -0.5 ? "E" : "";
  return direction || "idle";
}
