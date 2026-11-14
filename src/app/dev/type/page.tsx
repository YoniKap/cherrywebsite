import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Type specimen",
  robots: { index: false, follow: false },
};

const COLORS = [
  ["ink", "bg-ink"],
  ["soot", "bg-soot"],
  ["bone", "bg-bone"],
  ["ash", "bg-ash"],
  ["cherry", "bg-cherry"],
  ["mustard", "bg-mustard"],
  ["olive", "bg-olive"],
] as const;

/** Design-system reference. Development only — 404s in production. */
export default function TypeSpecimen() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="container-site space-y-16 py-16">
      <section>
        <p className="type-kicker text-ash">
          Poster — Fraunces 900, SOFT 100, WONK 1 + cherry offset
        </p>
        <p className="mt-4 type-poster text-display">Bad Bet</p>
      </section>
      <section>
        <p className="type-kicker text-ash">Headline</p>
        <p className="mt-4 type-display text-headline">Numba Six</p>
      </section>
      <section>
        <p className="type-kicker text-ash">Title</p>
        <p className="mt-4 type-display text-title">Two guitars, bass, drums</p>
      </section>
      <section>
        <p className="type-kicker text-ash">Serif accent — Fraunces italic</p>
        <p className="mt-4 font-serif text-5xl text-cherry italic">Cherry · Kappi · Racoon · Bon</p>
      </section>
      <section className="max-w-[65ch]">
        <p className="type-kicker text-ash">Body — Archivo 17px</p>
        <p className="mt-4">
          The songs move between tight, funk-bent grooves, crooked guitar lines, long atmospheric
          stretches and louder, messier moments.
        </p>
      </section>
      <section>
        <p className="type-kicker text-ash">Kicker — Courier Prime</p>
        <p className="mt-4 type-kicker">Single · 24 Sep 2026 · Cat. CS-001</p>
      </section>
      <section>
        <p className="type-kicker text-ash">Colour</p>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {COLORS.map(([name, bg]) => (
            <li key={name}>
              <div className={`${bg} aspect-square border border-bone/15`} />
              <p className="mt-2 type-kicker">{name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
