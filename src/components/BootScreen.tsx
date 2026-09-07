import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { profile } from "../data/siteContent";
import { OnekoSprite } from "./animations/OnekoSprite";
import { EASE_OUT } from "./animations/motion";
import {
  hasPlayedCatBoot,
  markCatBootPlayed,
  useCatBoot,
  type CatStart,
} from "./useCatBoot";
import {
  ONEKO_SIZE,
  onekoBackgroundPosition,
  onekoDirection,
} from "./onekoSprite";
import { useAnimationSafeMode } from "./useAnimationSafeMode";
import { useSound } from "./useSound";

const WORD = profile.handle;
const LETTERS = [...WORD];
const FAILSAFE_MS = 3200;
const STATIC_HOLD_MS = 160;
const RUN_SPEED = 0.55;
const SPRINT_SPEED = 1.7;
const BAT_PAUSE_MS = 70;
const SPRING = {
  type: "spring" as const,
  stiffness: 680,
  damping: 16,
  mass: 0.55,
};

type Phase = "wait" | "run" | "alert" | "sprint" | "lift";

export function BootScreen() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const { releaseCat } = useCatBoot();
  const { playDockTick } = useSound();
  const [overlay, setOverlay] = useState(
    () => import.meta.env.MODE !== "test" && !hasPlayedCatBoot(),
  );
  const [bootCat, setBootCat] = useState(
    () =>
      import.meta.env.MODE !== "test" &&
      !hasPlayedCatBoot() &&
      !shouldUseSafeMotion,
  );
  const [fading, setFading] = useState(false);
  const [batted, setBatted] = useState(0);
  const catRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const catPosRef = useRef<CatStart | null>(null);
  const fadingRef = useRef(false);
  const finishedRef = useRef(false);
  const playCat = overlay && bootCat;
  const revealed = playCat ? batted : LETTERS.length;

  const finish = useCallback(
    (origin: CatStart | null) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      markCatBootPlayed();
      releaseCat(origin);
      setOverlay(false);
      setBootCat(false);
    },
    [releaseCat],
  );

  const startFade = useCallback(() => {
    if (fadingRef.current || finishedRef.current) return;
    fadingRef.current = true;
    setFading(true);
  }, []);

  useEffect(() => {
    if (!overlay || playCat) return;
    const id = window.setTimeout(startFade, STATIC_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [overlay, playCat, startFade]);

  useEffect(() => {
    if (!overlay) return;
    const id = window.setTimeout(startFade, FAILSAFE_MS);
    return () => window.clearTimeout(id);
  }, [overlay, startFade]);

  useEffect(() => {
    if (!fading) return;
    const id = window.setTimeout(() => finish(catPosRef.current), 360);
    return () => window.clearTimeout(id);
  }, [fading, finish]);

  useLayoutEffect(() => {
    if (!playCat) return;
    const catEl = catRef.current;
    const row = rowRef.current;
    if (!catEl || !row) return;

    let raf = 0;
    let cancelled = false;
    let x = -ONEKO_SIZE;
    let y = window.innerHeight / 2;
    let frame = 0;
    let lastTs = 0;
    let spriteTs = 0;
    let battedCount = 0;
    let phase: Phase = "wait";
    let alertUntil = 0;
    let sprintStartedAt = 0;
    let pauseUntil = 0;
    let mouseX = window.innerWidth * 0.72;
    let mouseY = window.innerHeight - 96;

    const applyCat = (name: string, visible = true) => {
      const pos = onekoBackgroundPosition(name, frame);
      if (pos) catEl.style.backgroundPosition = pos;
      catEl.style.left = `${x - ONEKO_SIZE / 2}px`;
      catEl.style.top = `${y - ONEKO_SIZE / 2}px`;
      catEl.style.opacity = visible ? "1" : "0";
      catPosRef.current = { x, y, mouseX, mouseY };
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const measure = () => {
      const rowBox = row.getBoundingClientRect();
      const centers: number[] = [];
      for (const el of letterRefs.current) {
        if (!el) continue;
        const box = el.getBoundingClientRect();
        centers.push(box.left + box.width / 2);
      }
      const span =
        centers.length > 1
          ? (centers[centers.length - 1] ?? 0) - (centers[0] ?? 0)
          : 0;
      return {
        centers,
        floorY: rowBox.bottom - ONEKO_SIZE / 2 + 16,
        ready: centers.length === LETTERS.length && span > 64,
      };
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = (ts: number) => {
      if (cancelled || !catEl.isConnected) return;
      if (ts - spriteTs > 80) {
        spriteTs = ts;
        frame += 1;
      }

      const { centers, floorY, ready } = measure();

      if (phase === "wait") {
        const fontsReady =
          typeof document.fonts === "undefined" ||
          document.fonts.status === "loaded";
        if (!ready || !fontsReady) {
          applyCat("E", false);
          raf = window.requestAnimationFrame(tick);
          return;
        }
        x = (centers[0] ?? row.getBoundingClientRect().left) - 170;
        y = floorY;
        phase = "run";
        lastTs = ts;
        applyCat("E");
        raf = window.requestAnimationFrame(tick);
        return;
      }

      if (!lastTs) lastTs = ts;
      const dt = Math.min(32, ts - lastTs);
      lastTs = ts;

      if (phase === "run") {
        y = floorY;
        if (ts < pauseUntil) {
          applyCat("scratchSelf");
          raf = window.requestAnimationFrame(tick);
          return;
        }
        const targetX =
          battedCount < centers.length
            ? (centers[battedCount] ?? x)
            : (centers[centers.length - 1] ?? x) + 46;
        const delta = targetX - x;
        const step = Math.min(Math.abs(delta), RUN_SPEED * dt);
        x += Math.sign(delta) * step;
        applyCat("E");
        if (Math.abs(targetX - x) <= 2) {
          if (battedCount < LETTERS.length) {
            battedCount += 1;
            setBatted(battedCount);
            playDockTick();
            pauseUntil = ts + BAT_PAUSE_MS;
          } else {
            phase = "alert";
            alertUntil = ts + 180;
            applyCat("alert");
          }
        }
      } else if (phase === "alert") {
        y = floorY;
        applyCat(ts - (alertUntil - 180) < 90 ? "alert" : "scratchSelf");
        if (ts >= alertUntil) {
          phase = "sprint";
          sprintStartedAt = ts;
        }
      } else {
        const dist = Math.hypot(mouseX - x, mouseY - y) || 1;
        const step = Math.min(dist, SPRINT_SPEED * dt);
        x += ((mouseX - x) / dist) * step;
        y += ((mouseY - y) / dist) * step;
        applyCat(onekoDirection(x, y, mouseX, mouseY));
        if (phase === "sprint" && ts - sprintStartedAt > 420) {
          phase = "lift";
          startFade();
        }
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [playCat, playDockTick, startFade]);

  if (!overlay && !bootCat) return null;

  return (
    <>
      {overlay ? (
        <motion.div
          role="status"
          aria-label="Starting"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg-primary)] px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: 0.34, ease: EASE_OUT }}
          style={{ pointerEvents: fading ? "none" : "auto" }}
        >
          <div
            ref={rowRef}
            className="flex font-serif-accent text-5xl tracking-tight text-[var(--text-primary)] sm:text-7xl"
          >
            {LETTERS.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                ref={(node) => {
                  letterRefs.current[index] = node;
                }}
                className="inline-block"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  initial={
                    playCat
                      ? {
                          y: 44,
                          rotate: index % 2 === 0 ? -12 : 10,
                          opacity: 0,
                          scale: 0.86,
                        }
                      : false
                  }
                  animate={
                    index < revealed
                      ? { y: 0, rotate: 0, opacity: 1, scale: 1 }
                      : {
                          y: 44,
                          rotate: index % 2 === 0 ? -12 : 10,
                          opacity: 0,
                          scale: 0.86,
                        }
                  }
                  transition={SPRING}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>
          <motion.p
            className="mt-3 font-display text-[11px] tracking-[0.18em] uppercase text-[var(--text-muted)]"
            initial={false}
            animate={{ opacity: revealed >= LETTERS.length ? 1 : 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            {profile.role}
          </motion.p>
        </motion.div>
      ) : null}
      {bootCat ? (
        <OnekoSprite spriteRef={catRef} zIndex={210} opacity={0} />
      ) : null}
    </>
  );
}
