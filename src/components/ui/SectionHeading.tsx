import type { ReactNode } from "react";

export function SectionHeading({
  number,
  label,
  title,
  children,
  id,
}: {
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="section-heading">
      <div>
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </header>
  );
}
