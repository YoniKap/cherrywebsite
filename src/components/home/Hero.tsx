import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { RELEASE_TYPE_LABEL, getBand, getFeaturedRelease } from "@/lib/content";
import { LOGO } from "@/lib/site";

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
      {/* Warm halftone sun behind the art */}
      <div
        aria-hidden="true"
        className="fade-up absolute top-[2%] -right-[30%] -z-20 size-[110vw] halftone opacity-40 [--delay:0.1s] [--halftone-color:var(--color-mustard)] sm:-right-[12%] sm:size-[75vw] lg:top-[-10%] lg:right-[-2%] lg:size-[min(56vw,58rem)] lg:[--halftone-size:12px]"
      />

      {/* Key art: a band photo if supplied, else the hand-drawn logo, slapped on like a sticker */}
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
        // eslint-disable-next-line @next/next/no-img-element -- pre-sized static asset, manual srcset
        <img
          src={LOGO.full.src}
          srcSet={`${LOGO.medium.src} ${LOGO.medium.width}w, ${LOGO.full.src} ${LOGO.full.width}w`}
          sizes="(min-width: 64rem) 40vw, 80vw"
          width={LOGO.full.width}
          height={LOGO.full.height}
          alt={LOGO.alt}
          fetchPriority="high"
          className="sticker absolute top-[3%] right-[4%] -z-10 w-[80vw] max-w-[30rem] sm:top-[6%] sm:w-[55vw] lg:top-1/2 lg:right-[6%] lg:w-[40vw] lg:max-w-[42rem] lg:-translate-y-[58%]"
        />
      )}

      <div className="container-site flex flex-1 flex-col justify-end pt-24 pb-8 sm:pb-12">
        {/* Poster headline: soft 70s serif, cream on espresso, misregistered cherry shadow.
            "Supreza" drops a line, slanted and pushed right, like a record-sleeve title. */}
        <h1 aria-label={band.name} className="type-poster text-display">
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
