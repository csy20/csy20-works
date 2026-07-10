function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[var(--surface-raised)] ${className}`}
    />
  );
}

function SkeletonSectionHeading({
  subtitleWidth = "w-20",
  titleWidth = "w-40",
}: {
  subtitleWidth?: string;
  titleWidth?: string;
}) {
  return (
    <div className="mb-4 space-y-2">
      <SkeletonBlock className={`h-3 ${subtitleWidth}`} />
      <SkeletonBlock className={`h-8 ${titleWidth}`} />
    </div>
  );
}

export function ActivitySectionSkeleton() {
  return (
    <section className="relative" aria-hidden="true">
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-12 sm:pb-24 sm:pt-24 lg:px-8">
        <SkeletonSectionHeading />
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-3 sm:p-6">
          <SkeletonBlock className="mb-4 h-3 w-36" />
          <SkeletonBlock className="h-24 w-full" />
        </div>
      </div>
    </section>
  );
}

export function StackSectionSkeleton() {
  return (
    <section className="relative" aria-hidden="true">
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-12 sm:pb-24 sm:pt-24 lg:px-8">
        <SkeletonSectionHeading />
        <div className="mb-6 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`stack-stat-${i}`}
              className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-3"
            >
              <SkeletonBlock className="mx-auto h-2.5 w-12" />
              <SkeletonBlock className="mx-auto mt-2 h-6 w-6" />
            </div>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`stack-card-${i}`}
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4"
            >
              <SkeletonBlock className="mb-3 h-4 w-24" />
              <div className="grid grid-cols-2 gap-2">
                <SkeletonBlock className="h-10 w-full" />
                <SkeletonBlock className="h-10 w-full" />
                <SkeletonBlock className="h-10 w-full" />
                <SkeletonBlock className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSectionSkeleton() {
  return (
    <section className="relative" aria-hidden="true">
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-12 sm:pb-24 sm:pt-24 lg:px-8">
        <SkeletonSectionHeading subtitleWidth="w-16" titleWidth="w-36" />
        <div className="space-y-6 sm:space-y-8">
          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 sm:p-8 text-center">
            <SkeletonBlock className="mx-auto mb-5 h-12 w-full max-w-64" />
            <SkeletonBlock className="mx-auto h-11 w-full max-w-36 rounded-full" />
          </div>
          <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`contact-skel-${i}`}
                className="flex min-h-14 items-center gap-3 sm:gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-3.5 sm:p-4"
              >
                <SkeletonBlock className="h-10 w-10 rounded-xl" />
                <div className="space-y-1.5">
                  <SkeletonBlock className="h-3.5 w-20" />
                  <SkeletonBlock className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
