import Link from "next/link";
import { EmbedFacade } from "@/components/music/EmbedFacade";
import { PlatformLinks } from "@/components/music/PlatformLinks";
import { ReleaseSleeve } from "@/components/music/ReleaseSleeve";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RELEASE_TYPE_LABEL, getFeaturedRelease } from "@/lib/content";
import { formatDate } from "@/lib/dates";

export function FeaturedRelease() {
  const release = getFeaturedRelease();
  if (!release) return null;

  return (
    <section aria-labelledby="featured-heading" className="container-site py-20 sm:py-28">
      <SectionHeading
        side="A"
        title="Latest release"
        id="featured-heading"
        href="/music"
        linkLabel="All music"
      />

      <div className="mt-12 grid reveal items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <ReleaseSleeve release={release} className="max-w-xl lg:col-span-6" />

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="type-kicker text-ash">
            {RELEASE_TYPE_LABEL[release.type]}
            {release.releaseDate && (
              <>
                {" · "}
                <time dateTime={release.releaseDate}>{formatDate(release.releaseDate)}</time>
              </>
            )}
          </p>
          <h3 className="mt-4 type-display text-headline">{release.title}</h3>
          {release.description && (
            <p className="mt-6 max-w-[40ch] font-serif text-2xl leading-snug text-bone/85 italic">
              {release.description}
            </p>
          )}

          <div className="mt-8 space-y-6">
            {release.embed && <EmbedFacade embed={release.embed} title={release.title} />}
            <PlatformLinks links={release.links} title={release.title} />
            <p className="type-kicker">
              <Link href={`/music/${release.slug}`} className="link-wipe hover:text-mustard">
                Credits &amp; details →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
