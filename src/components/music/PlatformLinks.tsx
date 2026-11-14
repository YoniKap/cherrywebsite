import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Platform, PlatformLink } from "@/types/content";

const PLATFORM_LABEL: Record<Platform, string> = {
  spotify: "Spotify",
  "apple-music": "Apple Music",
  youtube: "YouTube",
  "youtube-music": "YouTube Music",
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud",
  deezer: "Deezer",
  tidal: "Tidal",
  "amazon-music": "Amazon Music",
};

/** Renders nothing when there are no links — no dead buttons. */
export function PlatformLinks({ links, title }: { links: PlatformLink[]; title: string }) {
  if (links.length === 0) return null;

  return (
    <ul aria-label={`Listen to ${title}`} className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.platform}>
          <ExternalLink
            href={link.url}
            className="border border-bone/25 px-4 py-3 type-kicker transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          >
            {PLATFORM_LABEL[link.platform]}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
