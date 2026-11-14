import clsx from "clsx";
import Link from "next/link";
import type { Release } from "@/types/content";
import { ReleaseCover } from "./ReleaseCover";

/**
 * Cover + record. The vinyl peeks out and slides further from the sleeve on
 * hover/focus — like pulling a record from the rack. CSS only.
 */
export function ReleaseSleeve({
  release,
  priority,
  className,
}: {
  release: Release;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/music/${release.slug}`}
      className={clsx("group relative block w-full outline-offset-8", className)}
      aria-label={`${release.title} — release page`}
    >
      <div className="relative w-[85%]">
        <div
          aria-hidden="true"
          className="vinyl absolute inset-[3%] translate-x-[10%] rounded-full transition-[translate,rotate] duration-700 ease-snap group-hover:translate-x-[19%] group-hover:rotate-[35deg] group-focus-visible:translate-x-[19%] group-focus-visible:rotate-[35deg]"
        >
          <div className="absolute inset-[34%] flex items-center justify-center rounded-full bg-cherry">
            <span className="type-kicker text-[0.55rem] text-ink">CS</span>
            <span className="absolute size-[9%] rounded-full bg-ink" />
          </div>
        </div>
        <ReleaseCover
          release={release}
          priority={priority}
          className="relative shadow-[0_1.5rem_3rem_-1rem_rgb(0_0_0/0.7)] transition-transform duration-700 ease-snap group-hover:-translate-x-[2%]"
        />
      </div>
    </Link>
  );
}
