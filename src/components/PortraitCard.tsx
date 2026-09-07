import { motion } from "framer-motion";
import { portraits, profile } from "../data/siteContent";
import { useAnimationSafeMode } from "./useAnimationSafeMode";
import { springSoft } from "./animations/motion";

const portrait = portraits.twitter;

export function PortraitCard() {
  const shouldUseSafeMotion = useAnimationSafeMode();

  return (
    <div className="portrait-frame relative mx-auto w-56 sm:w-72 lg:w-80">
      <motion.div
        className="portrait-plate relative aspect-square w-full overflow-hidden rounded-[1.35rem] bg-[var(--surface-raised)]"
        {...(!shouldUseSafeMotion && {
          whileHover: { y: -6, scale: 1.02, transition: springSoft },
        })}
      >
        <picture>
          <source srcSet="/portrait-twitter.webp" type="image/webp" />
          <img
            src={portrait.src}
            alt={portrait.alt}
            width={736}
            height={736}
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </motion.div>
      <span className="sr-only">Portrait of {profile.name}</span>
    </div>
  );
}
