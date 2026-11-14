import type { ReactNode } from "react";

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
    <header className="container-site border-b border-bone/15 pt-14 pb-10 sm:pt-24 sm:pb-14">
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
