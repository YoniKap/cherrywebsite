import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { RELEASE_TYPE_LABEL, getReleases } from "@/lib/content";
import { formatDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Music",
  description: "Singles and records by Cherry Supreza.",
};

export default function MusicPage() {
  const releases = getReleases();

  return (
    <>
      <PageIntro kicker="Discography" title="Music">
        Singles, records, and whatever comes next.
      </PageIntro>

      <section aria-labelledby="releases-heading" className="container-site py-12">
        <h2 id="releases-heading" className="sr-only">
          Releases
        </h2>
        <ol className="divide-y divide-bone/15 border-y border-bone/15">
          {releases.map((release) => (
            <li key={release.slug}>
              <Link
                href={`/music/${release.slug}`}
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="type-display text-title transition-colors group-hover:text-cherry">
                  {release.title}
                </span>
                <span className="type-kicker text-ash">
                  {RELEASE_TYPE_LABEL[release.type]} ·{" "}
                  {release.releaseDate ? (
                    <time dateTime={release.releaseDate}>{formatDate(release.releaseDate)}</time>
                  ) : (
                    "TBA"
                  )}
                  {release.status === "draft" && " · draft (dev only)"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
