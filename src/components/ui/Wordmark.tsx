import clsx from "clsx";
import { LOGO } from "@/lib/site";

/** Logo mark + typeset band name. Used in the header and mobile menu. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Cherry Supreza"
      className={clsx("inline-flex items-center gap-2.5 leading-none whitespace-nowrap", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static asset */}
      <img
        src={LOGO.small.src}
        width={LOGO.small.width}
        height={LOGO.small.height}
        alt=""
        className="h-[1.9em] w-auto -rotate-6"
      />
      <span aria-hidden="true" className="type-poster">
        Cherry <span className="italic">Supreza</span>
      </span>
    </span>
  );
}
