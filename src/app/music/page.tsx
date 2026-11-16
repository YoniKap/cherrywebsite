import type { Metadata } from "next";
import Link from "next/link";
import { VideoFacade } from "@/components/media/VideoFacade";
import { EmbedFacade } from "@/components/music/EmbedFacade";
import { PlatformLinks } from "@/components/music/PlatformLinks";
import { ReleaseSleeve } from "@/components/music/ReleaseSleeve";
import { Doodle } from "@/components/ui/Doodle";
import { PageIntro } from "@/components/ui/PageIntro";
import { RELEASE_TYPE_LABEL, getMysteryReleaseCount, getReleases } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import type { Release } from "@/types/content";

export const metadata: Metadata = {
  title: "Music",
  description: "Singles and records by Cherry Supreza.",
};

function Meta({ release, number }: { release: Release; number: number | undefined }) {
  return (
    <p className="type-kicker text-ash">
      {number !== undefined && (
        <>
          <span className="text-mustard">No. {String(number).padStart(2, "0")}</span>
          {" · "}
        </>
      )}
      {RELEASE_TYPE_LABEL[release.type]}
      {" · "}
      {release.releaseDate ? (
        <time dateTime={release.releaseDate}>{formatDate(release.releaseDate)}</time>
      ) : (
        "Date TBA"
      )}
    </p>
  );
}

function ComingSoonStamp() {
  return (
    <span className="absolute top-4 left-3 z-20 -rotate-6 bg-cherry px-3 py-1.5 font-mono text-xs font-bold tracking-[0.15em] text-bone uppercase shadow-lg shadow-black/40">
      Coming soon
    </span>
  );
}

function DraftStamp() {
  return (
    <span className="absolute top-3 left-3 z-20 -rotate-6 border-2 border-mustard bg-ink/80 px-2 py-1 font-mono text-[0.65rem] font-bold tracking-[0.15em] text-mustard uppercase">
      Draft · dev only
    </span>
  );
}

export default function MusicPage() {
  const releases = getReleases(); // newest first
  const mysteries = getMysteryReleaseCount();
  const isOut = (r: Release) => r.status === "released" || r.status === "archived";
  // Catalogue numbers count up from the first release that's out; others get none.
  const numbered = releases.filter(isOut);
  const numberOf = (r: Release) => (isOut(r) ? numbered.length - numbered.indexOf(r) : undefined);
  const [latest, ...older] = numbered;
  // Coming soon (and, in dev, drafts) go first in the crate.
  const upcoming = releases.filter((r) => !isOut(r));

  return (
    <>
      <PageIntro kicker="Discography" title="Music">
        Singles, records, and whatever comes next.
      </PageIntro>

      {/* ── Latest release: the one in the window ─────────────────── */}
      {latest && (
        <section
          aria-labelledby="latest-heading"
          className="container-site grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16"
        >
          <div className="relative max-w-xl lg:col-span-6">
            {latest.status === "draft" && <DraftStamp />}
            <ReleaseSleeve release={latest} priority />
            <Doodle
              kind="cherries"
              className="absolute -top-[8%] left-[58%] z-20 w-[26%] rotate-12"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="type-kicker text-cherry">Latest release</p>
            <h2
              id="latest-heading"
              className="mt-3 type-poster text-[clamp(3.5rem,9vw,8rem)] leading-[0.9]"
            >
              {latest.title}
            </h2>
            <div className="mt-5">
              <Meta release={latest} number={numberOf(latest)} />
            </div>
            {latest.description && (
              <p className="mt-6 max-w-[40ch] font-serif text-2xl leading-snug text-bone/85 italic">
                {latest.description}
              </p>
            )}

            <div className="mt-10 space-y-6">
              <PlatformLinks links={latest.links} title={latest.title} />
              {latest.embed && <EmbedFacade embed={latest.embed} title={latest.title} />}
              {latest.videos?.[0] && (
                <figure className="max-w-lg">
                  <VideoFacade video={latest.videos[0]} />
                  <figcaption className="mt-2 type-kicker text-ash">Music video</figcaption>
                </figure>
              )}
              <p className="type-kicker">
                <Link href={`/music/${latest.slug}`} className="link-wipe hover:text-mustard">
                  Release page →
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── The crate: everything else, plus an empty slot ───────────── */}
      <section aria-labelledby="crate-heading" className="container-site pb-24">
        <div className="flex items-end justify-between gap-6 border-t border-bone/15 pt-6">
          <h2 id="crate-heading" className="type-display text-title">
            {older.length > 0 ? "Back catalogue" : "In the crate"}
          </h2>
          <Doodle kind="snake" className="hidden w-40 -rotate-3 sm:block" />
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {[...upcoming, ...older].map((release) => (
            <li key={release.slug} className="relative">
              {release.status === "draft" && <DraftStamp />}
              {release.status === "announced" && <ComingSoonStamp />}
              <ReleaseSleeve release={release} />
              <div className="mt-6">
                <Meta release={release} number={numberOf(release)} />
                <h3 className="mt-2 type-display text-title">
                  <Link
                    href={`/music/${release.slug}`}
                    className="transition-colors hover:text-cherry"
                  >
                    {release.title}
                  </Link>
                </h3>
              </div>
            </li>
          ))}

          {/* Unnamed releases: "?" sleeves, no page yet */}
          {Array.from({ length: mysteries }, (_, i) => (
            <li key={`mystery-${i}`} className="relative" aria-label="Unannounced release">
              <ComingSoonStamp />
              <div className="group relative w-[85%]">
                <div
                  aria-hidden="true"
                  className="vinyl absolute inset-[3%] translate-x-[10%] rounded-full transition-[translate,rotate] duration-700 ease-snap group-hover:translate-x-[19%] group-hover:rotate-[35deg]"
                >
                  <div className="absolute inset-[34%] rounded-full bg-mustard" />
                </div>
                <div className="[container-type:inline-size] relative flex aspect-square items-center justify-center overflow-hidden bg-soot shadow-[0_1.5rem_3rem_-1rem_rgb(0_0_0/0.7)]">
                  <div
                    aria-hidden="true"
                    className={`absolute size-[85%] halftone [--halftone-size:7px] ${i % 2 ? "-bottom-[30%] -left-[30%] [--halftone-color:var(--color-mustard)]" : "-top-[30%] -right-[30%]"}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`relative type-poster text-[60cqi] leading-none ${i % 2 ? "rotate-6" : "-rotate-6"}`}
                  >
                    ?
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <p className="type-kicker text-ash">Title &amp; date TBA</p>
                <h3 className="mt-2 type-display text-title text-bone/80">
                  <span aria-hidden="true">? ? ?</span>
                  <span className="sr-only">Unannounced release</span>
                </h3>
              </div>
            </li>
          ))}

          {/* Empty sleeve: the next one's still in the oven (only when nothing's announced) */}
          {upcoming.length === 0 && mysteries === 0 && (
            <li aria-label="More music coming soon">
              <div className="relative w-[85%]">
                <div className="relative flex aspect-square flex-col items-center justify-center gap-5 border-2 border-dashed border-bone/20 p-6 text-center">
                  <Doodle kind="cherry" className="w-[28%] -rotate-12" />
                  <p className="type-display text-title text-bone/80">More soon</p>
                  <p className="type-kicker text-ash">Still in the rehearsal room</p>
                </div>
              </div>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
