import type { MediaItem, Video } from "@/types/content";
import { band } from "./band";
import { releases } from "./releases";

/** Music videos come from their releases; add standalone videos (live clips etc.) here. */
export const videos: Video[] = [...releases.flatMap((r) => r.videos ?? [])];

export const mediaItems: MediaItem[] = [
  ...band.photos.map((image, i) => ({ id: `band-photo-${i + 1}`, kind: "photo" as const, image })),
];
