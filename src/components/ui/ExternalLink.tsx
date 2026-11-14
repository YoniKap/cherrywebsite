import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
  className,
  icon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx("inline-flex items-center gap-1", className)}
    >
      {children}
      {icon && (
        <ArrowUpRight aria-hidden="true" className="size-[1em] shrink-0" strokeWidth={1.75} />
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
