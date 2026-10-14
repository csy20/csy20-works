import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SoundContext } from "./useSound";

const SOUND_STORAGE_KEY = "csy20-dock-sound";
const TICK_INTERVAL_MS = 60;

function getInitialSoundPreference() {
  try {
    return window.localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(getInitialSoundPreference);
  const enabledRef = useRef(soundEnabled);
  const gestureRef = useRef(false);
  const contextRef = useRef<AudioContext | null>(null);
  const resumingRef = useRef<AudioContext | null>(null);
  const lastTickRef = useRef(-Infinity);

  const getContext = useCallback(() => {
    if (contextRef.current) return contextRef.current;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) contextRef.current = new AudioCtx();
    } catch {
      // Audio is optional; unavailable APIs must not affect navigation.
    }

    return contextRef.current;
  }, []);

  const resumeContext = useCallback((context: AudioContext) => {
    if (context.state !== "suspended" || resumingRef.current === context)
      return;

    resumingRef.current = context;
    try {
      void Promise.resolve(context.resume())
        .catch(() => {
          // A later deliberate gesture can retry a browser-blocked resume.
        })
        .finally(() => {
          if (resumingRef.current === context) resumingRef.current = null;
        });
    } catch {
      resumingRef.current = null;
    }
  }, []);

  useEffect(() => {
    const unlockAudio = (event: Event) => {
      if (!event.isTrusted) return;
      gestureRef.current = true;
      if (!enabledRef.current) return;

      const context = getContext();
      if (context) resumeContext(context);
    };

    const syncPreference = (event: StorageEvent) => {
      if (event.key !== SOUND_STORAGE_KEY && event.key !== null) return;
      const enabled = event.newValue !== "off";
      enabledRef.current = enabled;
      setSoundEnabled(enabled);
    };

    window.addEventListener("pointerdown", unlockAudio, { capture: true });
    window.addEventListener("keydown", unlockAudio, { capture: true });
    window.addEventListener("storage", syncPreference);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio, { capture: true });
      window.removeEventListener("keydown", unlockAudio, { capture: true });
      window.removeEventListener("storage", syncPreference);
      const context = contextRef.current;
      contextRef.current = null;
      resumingRef.current = null;
      gestureRef.current = false;
      if (context) {
        try {
          void context.close().catch(() => {});
        } catch {
          // Closing an already unavailable context is harmless.
        }
      }
    };
  }, [getContext, resumeContext]);

  const toggleSound = useCallback(() => {
    const enabled = !enabledRef.current;
    enabledRef.current = enabled;
    setSoundEnabled(enabled);

    try {
      window.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // Muting still works for this visit when storage is restricted.
    }

    if (enabled && gestureRef.current) {
      const context = getContext();
      if (context) resumeContext(context);
    }
  }, [getContext, resumeContext]);

  const playDockTick = useCallback(() => {
    if (!enabledRef.current || !gestureRef.current) return;

    const context = getContext();
    if (!context) return;
    if (context.state !== "running") {
      resumeContext(context);
      // Never schedule ticks in a suspended context or replay a hover burst.
      return;
    }

    const now = performance.now();
    if (now - lastTickRef.current < TICK_INTERVAL_MS) return;
    lastTickRef.current = now;

    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 1640;
      gain.gain.setValueAtTime(0.03, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0008,
        context.currentTime + 0.045,
      );
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
      oscillator.start();
      oscillator.stop(context.currentTime + 0.05);
    } catch {
      // Audio failures must never interrupt a dock action.
    }
  }, [getContext, resumeContext]);

  const value = useMemo(
    () => ({ soundEnabled, toggleSound, playDockTick }),
    [soundEnabled, toggleSound, playDockTick],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
