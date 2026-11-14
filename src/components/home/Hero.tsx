import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { RELEASE_TYPE_LABEL, getBand, getFeaturedRelease } from "@/lib/content";

function RisingWord({
  word,
  offset = 0,
  className,
}: {
  word: string;
  offset?: number;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`rise-mask ${className ?? ""}`}>
      {[...word].map((char, i) => (
        <span key={i} className="rise" style={{ "--i": offset + i } as CSSProperties}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const band = getBand();
  const featured = getFeaturedRelease();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-clip">
      {/* Key art. Placeholder: a mustard halftone sun — graphic, not a fake photo. */}
      {band.heroImage ? (
        <Image
          src={band.heroImage.src}
          alt={band.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-60 sepia-[35%]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="fade-up absolute top-[4%] -right-[40%] -z-10 size-[120vw] halftone opacity-70 [--delay:0.2s] [--halftone-color:var(--color-mustard)] sm:-right-[20%] sm:size-[80vw] lg:top-[-14%] lg:-right-[4%] lg:size-[min(60vw,62rem)] lg:[--halftone-size:12px]"
        />
      )}

      <div className="container-site flex flex-1 flex-col justify-end pt-24 pb-8 sm:pb-12">
        <p className="fade-up type-kicker text-ash [--delay:0.45s]">
          {band.genres.slice(0, 3).join(" · ")}
        </p>

        {/* Poster headline: soft 70s serif, cream on espresso, misregistered cherry shadow.
            "Supreza" drops a line, slanted and pushed right, like a record-sleeve title. */}
        <h1 aria-label={band.name} className="mt-6 type-poster text-display">
          <RisingWord word="Cherry" className="block" />
          <RisingWord word="Supreza" offset={4} className="block pl-[0.6em] italic sm:pl-[1.2em]" />
        </h1>

        <div className="fade-up mt-10 grid gap-4 border-t border-bone/15 pt-5 [--delay:0.8s] sm:grid-cols-2">
          <p className="type-kicker text-ash">Two guitars · bass · drums</p>
          {featured && (
            <p className="type-kicker sm:text-right">
              <Link href={`/music/${featured.slug}`} className="group inline-flex gap-3">
                <span className="text-ash">Latest {RELEASE_TYPE_LABEL[featured.type]}</span>
                <span className="link-wipe group-hover:text-mustard">{featured.title} →</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
