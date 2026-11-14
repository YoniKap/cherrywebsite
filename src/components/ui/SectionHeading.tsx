import Link from "next/link";

/** Cassette-style section header: "Side A — Latest release", optional "see all" link. */
export function SectionHeading({
  side,
  title,
  id,
  href,
  linkLabel,
}: {
  side: string;
  title: string;
  id: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-t border-bone/15 pt-5">
      <div>
        <p className="type-kicker text-ash">Side {side}</p>
        <h2 id={id} className="mt-2 type-display text-title">
          {title}
        </h2>
      </div>
      {href && linkLabel && (
        <Link href={href} className="shrink-0 link-wipe pb-1 type-kicker hover:text-mustard">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
