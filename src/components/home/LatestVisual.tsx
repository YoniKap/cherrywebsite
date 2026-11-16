import Image from "next/image";
import { VideoFacade } from "@/components/media/VideoFacade";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedRelease, getMedia } from "@/lib/content";
import { SHOWS_ENABLED } from "@/lib/site";

/** Newest video, else newest photo. Hidden entirely until media exists.
 *  Skips videos already playing in the featured-release block above. */
export function LatestVisual() {
  const { videos, items } = getMedia();
  const featuredVideoIds = new Set(getFeaturedRelease()?.videos?.map((v) => v.id));
  const video = videos.find((v) => !featuredVideoIds.has(v.id));
  const photo = items[0];
  if (!video && !photo) return null;

  return (
    <section aria-labelledby="visual-heading" className="container-site py-20 sm:py-28">
      <SectionHeading
        side={SHOWS_ENABLED ? "D" : "C"}
        title="Seen lately"
        id="visual-heading"
        href="/media"
        linkLabel="Media"
      />
      <div className="mt-12 reveal">
        {video ? (
          <figure>
            <VideoFacade video={video} />
            <figcaption className="mt-3 type-kicker text-ash">{video.title}</figcaption>
          </figure>
        ) : photo ? (
          <figure>
            <Image
              src={photo.image.src}
              alt={photo.image.alt}
              width={photo.image.width}
              height={photo.image.height}
              sizes="(min-width: 110rem) 105rem, 100vw"
              className="w-full"
            />
            {(photo.caption || photo.image.credit) && (
              <figcaption className="mt-3 type-kicker text-ash">
                {photo.caption}
                {photo.image.credit && ` — Photo: ${photo.image.credit}`}
              </figcaption>
            )}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
