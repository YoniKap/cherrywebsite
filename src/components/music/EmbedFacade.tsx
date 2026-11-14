"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import type { Release } from "@/types/content";

type Embed = NonNullable<Release["embed"]>;

const PROVIDER: Record<
  Embed["provider"],
  { label: string; src: (id: string) => string; height?: number }
> = {
  spotify: {
    label: "Spotify",
    src: (id) => `https://open.spotify.com/embed/${id}?theme=0`,
    height: 152,
  },
  bandcamp: {
    label: "Bandcamp",
    src: (id) =>
      `https://bandcamp.com/EmbeddedPlayer/${id}/size=large/bgcol=0e0c0b/linkcol=c8102e/tracklist=false/artwork=small/transparent=true/`,
    height: 120,
  },
  youtube: {
    label: "YouTube",
    src: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
  },
};

/**
 * Third-party players cost hundreds of KB and set cookies. Show a plain
 * button until the visitor asks for the player.
 */
export function EmbedFacade({ embed, title }: { embed: Embed; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const provider = PROVIDER[embed.provider];

  if (loaded) {
    return (
      <iframe
        src={provider.src(embed.id)}
        title={`${title} on ${provider.label}`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={provider.height ? "w-full" : "aspect-video w-full"}
        style={provider.height ? { height: provider.height } : undefined}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex w-full items-center gap-4 border border-bone/25 px-4 py-4 text-left transition-colors hover:border-cherry"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cherry text-bone transition-transform group-hover:scale-105">
        <Play aria-hidden="true" className="size-4 translate-x-px fill-current" />
      </span>
      <span>
        <span className="block">Play {title}</span>
        <span className="block type-kicker text-ash">Loads the {provider.label} player</span>
      </span>
    </button>
  );
}
