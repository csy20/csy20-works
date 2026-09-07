import { useEffect, useState } from "react";
import { profile } from "../data/siteContent";
import { useAnimationSafeMode } from "./useAnimationSafeMode";

const BOOT_MS = 700;

export function BootScreen() {
  const shouldUseSafeMotion = useAnimationSafeMode();
  const [visible, setVisible] = useState(() => import.meta.env.MODE !== "test");

  useEffect(() => {
    if (!visible) return;
    const delay = shouldUseSafeMotion ? 120 : BOOT_MS;
    const id = window.setTimeout(() => setVisible(false), delay);
    return () => window.clearTimeout(id);
  }, [shouldUseSafeMotion, visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg-primary)] px-6"
      role="status"
      aria-label="Loading"
    >
      <p className="font-serif-accent text-3xl tracking-tight text-[var(--text-primary)] sm:text-5xl">
        {profile.name}
      </p>
      <p className="mt-3 font-display text-[11px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
        {profile.role}
      </p>
    </div>
  );
}
