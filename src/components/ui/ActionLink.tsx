import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function ActionLink({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon name="external-link" size={14} />
    </a>
  );
}
