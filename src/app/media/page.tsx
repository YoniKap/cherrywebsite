import type { Metadata } from "next";
import Image from "next/image";
import { VideoFacade } from "@/components/media/VideoFacade";
import { getMedia } from "@/lib/content";
import { Doodle } from "@/components/ui/Doodle";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Media",
  description: "Videos, photos, artwork and posters from Cherry Supreza.",
};

export default function MediaPage() {
  const { videos, items } = getMedia();
  return (
    <>
      <PageIntro kicker="Archive" title="Media" />
      {videos.length > 0 && (
        <section aria-labelledby="videos-heading" className="container-site pt-12">
          <h2 id="videos-heading" className="type-kicker text-ash">
            Videos
          </h2>
          <ul className="mt-6 grid gap-8 md:grid-cols-2">
            {videos.map((video) => (
              <li key={video.id}>
                <figure>
                  <VideoFacade video={video} />
                  <figcaption className="mt-2 type-kicker text-ash">{video.title}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}
      {items.length > 0 ? (
        <section aria-labelledby="photos-heading" className="container-site py-12">
          <h2 id="photos-heading" className="type-kicker text-ash">
            Photos
          </h2>
          <ul className="mt-6 grid gap-8 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="first:md:col-span-2">
                <figure>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 48rem) 50vw, 100vw"
                    className="w-full"
                  />
                  {(item.caption || item.image.credit) && (
                    <figcaption className="mt-3 type-kicker text-ash">
                      {item.caption}
                      {item.image.credit && ` — Photo: ${item.image.credit}`}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : videos.length === 0 ? (
        <section className="container-site py-12">
          <div className="border-y border-bone/15 py-14">
            <p className="type-display text-title">The archive is still empty.</p>
            <p className="mt-3 font-serif text-2xl text-bone/80 italic">
              Videos, photos and posters will land here.
            </p>
            <Doodle kind="cherries" className="mt-8 w-28 -rotate-6" />
          </div>
        </section>
      ) : null}
    </>
  );
}
