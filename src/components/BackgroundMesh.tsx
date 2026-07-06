export function BackgroundMesh() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-15"
      aria-hidden="true"
      style={{
        background: `
          var(--mesh-grad-1),
          var(--mesh-grad-2),
          var(--mesh-grad-3)
        `,
      }}
    />
  );
}
