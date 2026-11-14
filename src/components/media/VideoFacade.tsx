"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import type { Video } from "@/types/content";

const EMBED = {
  youtube: (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
  vimeo: (id: string) => `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`,
};

/** Poster + play button until clicked; the third-party player loads on demand. */
export function VideoFacade({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={EMBED[video.provider](video.videoId)}
        title={video.title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-soot"
    >
      {video.poster && (
        // eslint-disable-next-line @next/next/no-img-element -- poster is a local, pre-sized asset
        <img
          src={video.poster.src}
          alt=""
          width={video.poster.width}
          height={video.poster.height}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-cherry text-bone transition-transform group-hover:scale-110">
          <Play aria-hidden="true" className="size-6 translate-x-0.5 fill-current" />
        </span>
      </span>
      <span className="sr-only">Play video: {video.title}</span>
    </button>
  );
}
