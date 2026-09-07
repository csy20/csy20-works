import { useEffect, useRef } from "react";
import { useAnimationSafeMode } from "../useAnimationSafeMode";
import { useMediaQuery } from "../hooks/useMediaQuery";

/**
 * Pixel cat that runs toward the cursor.
 * Sprite and motion adapted from oneko.js (MIT, adryd325/oneko.js).
 */
const SIZE = 48;
const SPEED = 14;
const SPRITE: Record<string, [number, number][]> = {
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

export function RunningCat() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const elRef = useRef<HTMLDivElement>(null);
  const enabled = !shouldUseSafeMotion && hasFinePointer;

  useEffect(() => {
    if (!enabled) return;
    const el = elRef.current;
    if (!el) return;

    let nekoX = 48;
    let nekoY = window.innerHeight - 96;
    let mouseX = nekoX;
    let mouseY = nekoY;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let lastTs = 0;
    let raf = 0;

    const setSprite = (name: string, frame: number) => {
      const frames = SPRITE[name];
      if (!frames?.length) return;
      const sprite = frames[frame % frames.length];
      if (!sprite) return;
      el.style.backgroundPosition = `${sprite[0] * SIZE}px ${sprite[1] * SIZE}px`;
    };

    const resetIdle = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const idle = () => {
      idleTime += 1;
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const options = ["sleeping", "scratchSelf"];
        if (nekoX < 48) options.push("scratchWallW");
        if (nekoY < 48) options.push("scratchWallN");
        if (nekoX > window.innerWidth - 48) options.push("scratchWallE");
        if (nekoY > window.innerHeight - 48) options.push("scratchWallS");
        idleAnimation =
          options[Math.floor(Math.random() * options.length)] ?? "idle";
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) setSprite("tired", 0);
          else setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdle();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdle();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    const tick = () => {
      frameCount += 1;
      const diffX = nekoX - mouseX;
      const diffY = nekoY - mouseY;
      const distance = Math.hypot(diffX, diffY);

      if (distance < SPEED || distance < 56) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction || "idle", frameCount);

      nekoX -= (diffX / distance) * SPEED;
      nekoY -= (diffY / distance) * SPEED;
      nekoX = Math.min(Math.max(SIZE / 2, nekoX), window.innerWidth - SIZE / 2);
      nekoY = Math.min(
        Math.max(SIZE / 2, nekoY),
        window.innerHeight - SIZE / 2,
      );
      el.style.left = `${nekoX - SIZE / 2}px`;
      el.style.top = `${nekoY - SIZE / 2}px`;
    };

    const onFrame = (ts: number) => {
      if (!el.isConnected) return;
      if (!lastTs) lastTs = ts;
      if (ts - lastTs > 90) {
        lastTs = ts;
        tick();
      }
      raf = window.requestAnimationFrame(onFrame);
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    setSprite("idle", 0);
    el.style.left = `${nekoX - SIZE / 2}px`;
    el.style.top = `${nekoY - SIZE / 2}px`;
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(onFrame);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-40"
      style={{
        width: SIZE,
        height: SIZE,
        backgroundImage: "url(/oneko.gif)",
        backgroundSize: `${256 * (SIZE / 32)}px ${128 * (SIZE / 32)}px`,
        imageRendering: "pixelated",
      }}
    />
  );
}
