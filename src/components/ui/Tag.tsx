type TagProps = {
  children: string;
  variant?: "default" | "muted";
};

export function Tag({ children, variant = "default" }: TagProps) {
  const base =
    "rounded-md border border-[var(--border-soft)] bg-[var(--surface-raised)] tracking-wide";
  const color =
    variant === "muted"
      ? "text-[var(--text-muted)]"
      : "text-[var(--text-secondary)]";
  const sizes =
    variant === "muted" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";
  return <span className={`${base} ${color} ${sizes}`}>{children}</span>;
}
