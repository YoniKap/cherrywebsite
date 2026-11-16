import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoFacade } from "@/components/media/VideoFacade";
import { PlatformLinks } from "@/components/music/PlatformLinks";
import { RELEASE_TYPE_LABEL, getReleaseBySlug, getReleases } from "@/lib/content";
import { formatDate } from "@/lib/dates";

// Only slugs from generateStaticParams exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getReleases().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/music/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};
  return {
    title: release.title,
    description: `${release.title} — ${RELEASE_TYPE_LABEL[release.type].toLowerCase()} by Cherry Supreza.`,
  };
}

// Phase 1 stub — artwork, links, credits and video arrive in Phase 3.
export default async function ReleasePage({ params }: PageProps<"/music/[slug]">) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) notFound();

  return (
    <article className="container-site pt-14 sm:pt-24">
      <p className="type-kicker text-ash">
        <Link href="/music" className="link-wipe hover:text-bone">
          ← Music
        </Link>
      </p>
      <h1 className="mt-6 type-display text-headline">{release.title}</h1>
      <p className="mt-6 type-kicker text-ash">
        {RELEASE_TYPE_LABEL[release.type]}
        {release.releaseDate ? (
          <>
            {" · "}
            <time dateTime={release.releaseDate}>{formatDate(release.releaseDate)}</time>
          </>
        ) : (
          release.status === "announced" && <span className="text-cherry"> · Coming soon</span>
        )}
      </p>
      <div className="mt-10 max-w-3xl space-y-8">
        <PlatformLinks links={release.links} title={release.title} />
        {release.videos?.map((video) => (
          <figure key={video.id}>
            <VideoFacade video={video} />
            <figcaption className="mt-2 type-kicker text-ash">{video.title}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
