import clsx from "clsx";
import Image from "next/image";
import { RELEASE_TYPE_LABEL } from "@/lib/content";
import type { Release } from "@/types/content";

/**
 * Square release artwork. Without a real cover it renders a typeset
 * placeholder sleeve — clearly graphic, never a stand-in photo.
 */
export function ReleaseCover({
  release,
  sizes = "(min-width: 64rem) 40vw, 85vw",
  priority = false,
  className,
}: {
  release: Release;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (release.cover) {
    return (
      <Image
        src={release.cover.src}
        alt={release.cover.alt}
        width={release.cover.width}
        height={release.cover.height}
        sizes={sizes}
        priority={priority}
        className={clsx("aspect-square w-full object-cover", className)}
      />
    );
  }

  const year = release.releaseDate?.slice(0, 4);

  return (
    <div
      role="img"
      aria-label={`${release.title} — artwork coming soon`}
      className={clsx(
        "[container-type:inline-size] relative flex aspect-square w-full flex-col justify-between overflow-hidden bg-soot p-[6%]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -top-[30%] -right-[30%] size-[85%] halftone [--halftone-size:7px]"
      />
      <p aria-hidden="true" className="relative type-kicker text-ash">
        Cherry Supreza
      </p>
      <div aria-hidden="true" className="relative">
        <p className="type-display text-[18cqi] leading-[0.9] break-words text-bone">
          {release.title}
        </p>
        <p className="mt-[4cqi] flex justify-between type-kicker text-ash">
          <span>{RELEASE_TYPE_LABEL[release.type]}</span>
          {year && <span>{year}</span>}
        </p>
      </div>
    </div>
  );
}
