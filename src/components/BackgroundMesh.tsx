export function BackgroundMesh() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-20 dark:opacity-15"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(24,20,16,0.04), transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(24,20,16,0.03), transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(24,20,16,0.02), transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(232,228,220,0.04), transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(232,228,220,0.03), transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(232,228,220,0.02), transparent 50%)
          `,
        }}
      />
    </div>
  );
}
