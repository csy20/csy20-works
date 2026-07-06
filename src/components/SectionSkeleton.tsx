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
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:px-8">
        <SkeletonSectionHeading />
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 sm:p-6">
          <SkeletonBlock className="mb-4 h-3 w-36" />
          <SkeletonBlock className="h-24 w-full" />
        </div>
      </div>
    </section>
  );
}

export function StackSectionSkeleton() {
  return (
    <section className="relative section-dark">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:px-8">
        <SkeletonSectionHeading />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`stack-skel-${i}`}
              className="relative rounded-xl border border-[var(--sd-panel-border)] p-4 sm:p-5"
            >
              <SkeletonBlock className="h-3 w-16 bg-white/10" />
              <SkeletonBlock className="mt-1 h-7 w-8 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSectionSkeleton() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:px-8">
        <SkeletonSectionHeading subtitleWidth="w-16" titleWidth="w-36" />
        <div className="space-y-8">
          <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 sm:p-8 text-center">
            <SkeletonBlock className="mx-auto mb-5 h-12 w-64" />
            <SkeletonBlock className="mx-auto h-10 w-36 rounded-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`contact-skel-${i}`}
                className="flex items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4"
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
