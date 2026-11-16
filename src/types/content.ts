/**
 * Content models for the whole site.
 * Pages never read `src/content/*` directly — they go through `src/lib/content.ts`.
 */

/**
 * - draft: work in progress, never rendered in production
 * - announced: confirmed and coming, shown as "coming soon" (date optional until announced)
 * - released: out in the world, full page
 * - archived: still listed, de-emphasized
 */
export type PublishStatus = "draft" | "announced" | "released" | "archived";

/** Zero-padded calendar date, e.g. "2026-09-24". Validated in tests/unit/content.test.ts. */
export type ISODate = `${number}-${number}-${number}`;

export type Platform =
  | "spotify"
  | "apple-music"
  | "youtube"
  | "youtube-music"
  | "bandcamp"
  | "soundcloud"
  | "deezer"
  | "tidal"
  | "amazon-music";

export interface PlatformLink {
  platform: Platform;
  url: string;
}

export interface ImageAsset {
  /** Path under /public, e.g. "/images/releases/bad-bet.jpg" */
  src: string;
  /** Required. Describe what's in the image, not that it is an image. */
  alt: string;
  width: number;
  height: number;
  /** Photographer / artist credit */
  credit?: string;
}

export interface Credit {
  role: string;
  names: string[];
}

export interface Track {
  title: string;
  /** "3:41" */
  duration?: string;
  note?: string;
}

export interface Video {
  id: string;
  title: string;
  provider: "youtube" | "vimeo";
  videoId: string;
  poster?: ImageAsset;
  releasedOn?: ISODate;
  credits?: Credit[];
}

export type ReleaseType = "single" | "ep" | "album";

export interface Release {
  /** URL segment: /music/[slug] */
  slug: string;
  title: string;
  type: ReleaseType;
  status: PublishStatus;
  /** Required once released; optional for drafts and undated announcements. */
  releaseDate?: ISODate;
  /** Absent → typographic fallback cover. Never a stock image. */
  cover?: ImageAsset;
  description?: string;
  tracks?: Track[];
  credits?: Credit[];
  /** Empty is fine — the UI hides the section. */
  links: PlatformLink[];
  /**
   * Click-to-load player. `id` per provider:
   * - spotify: "track/<id>" or "album/<id>"
   * - bandcamp: "track=<id>" or "album=<id>"
   * - youtube: "<videoId>"
   */
  embed?: { provider: "spotify" | "bandcamp" | "youtube"; id: string };
  videos?: Video[];
  /** Pinned on the homepage. If none is featured, the newest release is used. */
  featured?: boolean;
}

export interface Member {
  slug: string;
  name: string;
  nickname: string;
  roles: string[];
  bio?: string;
  portrait?: ImageAsset;
}

export interface Band {
  name: "Cherry Supreza";
  tagline?: string;
  bio: string[];
  genres: string[];
  location?: string;
  formedYear?: number;
  members: Member[];
  /** Homepage key art. Absent → graphic halftone placeholder. */
  heroImage?: ImageAsset;
  photos: ImageAsset[];
}

export interface Show {
  id: string;
  date: ISODate;
  /** "20:00" local time */
  doorsTime?: string;
  venue: string;
  city: string;
  country: string;
  status: "confirmed" | "cancelled" | "postponed";
  ticketUrl?: string;
  eventUrl?: string;
  lineup?: string[];
  poster?: ImageAsset;
}

export type SocialPlatform =
  "instagram" | "tiktok" | "youtube" | "facebook" | "spotify" | "bandcamp";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  handle?: string;
}

export interface ContactChannel {
  purpose: "booking" | "press" | "general" | "collabs";
  email: string;
}

export interface MediaItem {
  id: string;
  kind: "photo" | "artwork" | "poster";
  image: ImageAsset;
  caption?: string;
  date?: ISODate;
}
