import { useEffect, useRef } from "react";
import { useCatBoot } from "../useCatBoot";
import {
  ONEKO_SIZE,
  onekoBackgroundPosition,
  onekoDirection,
} from "../onekoSprite";
import { useAnimationSafeMode } from "../useAnimationSafeMode";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { OnekoSprite } from "./OnekoSprite";

/**
 * Pixel cat that runs toward the cursor.
 * Sprite and motion adapted from oneko.js (MIT, adryd325/oneko.js).
 */
const SPEED = 14;

export function RunningCat() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { catReady, origin } = useCatBoot();
  const elRef = useRef<HTMLDivElement>(null);
  const enabled = !shouldUseSafeMotion && hasFinePointer && catReady;

  useEffect(() => {
    if (!enabled) return;
    const el = elRef.current;
    if (!el) return;

    let nekoX = origin?.x ?? 48;
    let nekoY = origin?.y ?? window.innerHeight - 96;
    let mouseX = origin?.mouseX ?? nekoX;
    let mouseY = origin?.mouseY ?? nekoY;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let lastTs = 0;
    let raf = 0;

    const setSprite = (name: string, frame: number) => {
      const pos = onekoBackgroundPosition(name, frame);
      if (pos) el.style.backgroundPosition = pos;
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
      const distance = Math.hypot(nekoX - mouseX, nekoY - mouseY);

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

      const direction = onekoDirection(nekoX, nekoY, mouseX, mouseY);
      setSprite(direction, frameCount);

      nekoX -= ((nekoX - mouseX) / distance) * SPEED;
      nekoY -= ((nekoY - mouseY) / distance) * SPEED;
      nekoX = Math.min(
        Math.max(ONEKO_SIZE / 2, nekoX),
        window.innerWidth - ONEKO_SIZE / 2,
      );
      nekoY = Math.min(
        Math.max(ONEKO_SIZE / 2, nekoY),
        window.innerHeight - ONEKO_SIZE / 2,
      );
      el.style.left = `${nekoX - ONEKO_SIZE / 2}px`;
      el.style.top = `${nekoY - ONEKO_SIZE / 2}px`;
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
    el.style.left = `${nekoX - ONEKO_SIZE / 2}px`;
    el.style.top = `${nekoY - ONEKO_SIZE / 2}px`;
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(onFrame);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled, origin]);

  if (!enabled) return null;

  const startX = (origin?.x ?? 48) - ONEKO_SIZE / 2;
  const startY = (origin?.y ?? window.innerHeight - 96) - ONEKO_SIZE / 2;

  return <OnekoSprite spriteRef={elRef} x={startX} y={startY} />;
}
