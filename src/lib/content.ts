/**
 * The only module pages use to read content. Keep functions synchronous and
 * pure (no clock reads) so they're easy to test; pass `today` in explicitly.
 * Swapping to a CMS later means changing these function bodies, not pages.
 */
import { band } from "@/content/band";
import { mediaItems, videos } from "@/content/media";
import { mysteryReleaseCount, releases } from "@/content/releases";
import { shows } from "@/content/shows";
import { contacts, socials } from "@/content/socials";
import type { ISODate, Release, ReleaseType, Show } from "@/types/content";

const INCLUDE_DRAFTS = process.env.NODE_ENV !== "production";

export const RELEASE_TYPE_LABEL: Record<ReleaseType, string> = {
  single: "Single",
  ep: "EP",
  album: "Album",
};

export function isListed(release: Release, includeDrafts: boolean = INCLUDE_DRAFTS): boolean {
  return includeDrafts || release.status !== "draft";
}

/** Newest first; undated releases last. */
export function sortReleases(list: readonly Release[]): Release[] {
  return [...list].sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));
}

export function getMysteryReleaseCount(): number {
  return mysteryReleaseCount;
}

export function getReleases(includeDrafts: boolean = INCLUDE_DRAFTS): Release[] {
  return sortReleases(releases.filter((r) => isListed(r, includeDrafts)));
}

export function getReleaseBySlug(slug: string): Release | undefined {
  return getReleases().find((r) => r.slug === slug);
}

/** The pinned release, else the newest non-draft one. */
export function getFeaturedRelease(): Release | undefined {
  const published = getReleases(false);
  return published.find((r) => r.featured) ?? published[0];
}

export function splitShows(
  list: readonly Show[],
  today: ISODate,
): { upcoming: Show[]; past: Show[] } {
  const upcoming = list.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = list.filter((s) => s.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

export function getShows(today: ISODate) {
  return splitShows(shows, today);
}

export function getBand() {
  return band;
}

export function getSocials() {
  return socials;
}

export function getContacts() {
  return contacts;
}

export function getMedia() {
  return { videos, items: mediaItems };
}
