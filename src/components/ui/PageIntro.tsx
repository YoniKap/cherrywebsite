import type { ReactNode } from "react";
import { Doodle } from "./Doodle";

/** Standard page opener: mono kicker, condensed headline, optional serif lead. */
export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative container-site border-b border-bone/15 pt-14 pb-10 sm:pt-24 sm:pb-14">
      <Doodle
        kind="cherry"
        className="absolute top-8 right-4 w-16 rotate-12 [--wiggle:10deg] sm:top-14 sm:right-8 sm:w-24 lg:right-16 lg:w-32"
      />
      <p className="type-kicker text-ash">{kicker}</p>
      <h1 className="mt-4 type-display text-headline">{title}</h1>
      {children ? (
        <div className="mt-6 max-w-[34ch] font-serif text-2xl leading-snug text-bone/85 italic sm:text-3xl">
          {children}
        </div>
      ) : null}
    </header>
  );
}
