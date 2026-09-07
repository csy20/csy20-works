import { profile } from "../data/siteContent";

export function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 pb-24 text-center">
      <p className="font-display text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
        404
      </p>
      <h1 className="mt-3 font-serif-accent text-4xl tracking-tight text-[var(--text-primary)] sm:text-6xl">
        This page is not here.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-[var(--text-secondary)]">
        {profile.handle} does not keep spare routes. Go back to the work.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-6 font-display text-sm text-[var(--accent-fg)]"
      >
        Home
      </a>
    </main>
  );
}
