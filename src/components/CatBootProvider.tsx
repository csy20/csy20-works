import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CatBootContext, hasPlayedCatBoot, type CatStart } from "./useCatBoot";

export function CatBootProvider({ children }: { children: ReactNode }) {
  const [catReady, setCatReady] = useState(hasPlayedCatBoot);
  const [origin, setOrigin] = useState<CatStart | null>(null);

  const releaseCat = useCallback((next: CatStart | null) => {
    setOrigin(next);
    setCatReady(true);
  }, []);

  const value = useMemo(
    () => ({ catReady, origin, releaseCat }),
    [catReady, origin, releaseCat],
  );

  return (
    <CatBootContext.Provider value={value}>{children}</CatBootContext.Provider>
  );
}
