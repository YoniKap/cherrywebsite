/**
 * Content integrity checks. These run in CI so a typo in src/content/*
 * fails the build instead of shipping a broken page.
 */
import { describe, expect, it } from "vitest";
import { band } from "@/content/band";
import { mediaItems, videos } from "@/content/media";
import { releases } from "@/content/releases";
import { shows } from "@/content/shows";
import { contacts, socials } from "@/content/socials";
import { getReleases, sortReleases, splitShows } from "@/lib/content";
import { toISODate } from "@/lib/dates";
import type { ImageAsset, ISODate, Release, Show } from "@/types/content";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isValidISODate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(value);
}

function allImages(): ImageAsset[] {
  return [
    ...releases.flatMap((r) => [r.cover, ...(r.videos ?? []).map((v) => v.poster)]),
    ...band.members.map((m) => m.portrait),
    band.heroImage,
    ...band.photos,
    ...shows.map((s) => s.poster),
    ...videos.map((v) => v.poster),
    ...mediaItems.map((m) => m.image),
  ].filter((img): img is ImageAsset => img !== undefined);
}

function allUrls(): string[] {
  return [
    ...releases.flatMap((r) => r.links.map((l) => l.url)),
    ...shows.flatMap((s) => [s.ticketUrl, s.eventUrl]),
    ...socials.map((s) => s.url),
  ].filter((u): u is string => u !== undefined);
}

function duplicates(values: string[]): string[] {
  return values.filter((v, i) => values.indexOf(v) !== i);
}

describe("content integrity", () => {
  it("has unique identifiers", () => {
    expect(duplicates(releases.map((r) => r.slug))).toEqual([]);
    expect(duplicates(band.members.map((m) => m.slug))).toEqual([]);
    expect(duplicates(shows.map((s) => s.id))).toEqual([]);
    expect(duplicates(mediaItems.map((m) => m.id))).toEqual([]);
    expect(duplicates(videos.map((v) => v.id))).toEqual([]);
  });

  it("uses URL-safe release slugs", () => {
    for (const r of releases) expect(r.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("dates every non-draft release", () => {
    for (const r of releases.filter((r) => r.status !== "draft")) {
      expect(r.releaseDate, `${r.slug} needs a releaseDate`).toBeDefined();
    }
  });

  it("uses valid, zero-padded dates", () => {
    const dates = [
      ...releases.map((r) => r.releaseDate),
      ...shows.map((s) => s.date),
      ...videos.map((v) => v.releasedOn),
      ...mediaItems.map((m) => m.date),
    ].filter((d): d is ISODate => d !== undefined);
    for (const d of dates) expect(isValidISODate(d), d).toBe(true);
  });

  it("links only over https", () => {
    for (const url of allUrls()) expect(url, url).toMatch(/^https:\/\//);
  });

  it("gives every image alt text and dimensions", () => {
    for (const img of allImages()) {
      expect(img.alt.trim(), img.src).not.toBe("");
      expect(img.width, img.src).toBeGreaterThan(0);
      expect(img.height, img.src).toBeGreaterThan(0);
      expect(img.src, img.src).toMatch(/^\//);
    }
  });

  it("uses plausible contact emails", () => {
    for (const c of contacts) expect(c.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("does not leave announced releases in the past", () => {
    // If this fails, a release came out: flip its status to "released".
    const today = toISODate(new Date());
    for (const r of releases.filter((r) => r.status === "announced")) {
      expect(r.releaseDate! >= today, `${r.slug} is announced but dated in the past`).toBe(true);
    }
  });
});

describe("content queries", () => {
  const release = (slug: string, overrides: Partial<Release> = {}): Release => ({
    slug,
    title: slug,
    type: "single",
    status: "released",
    links: [],
    ...overrides,
  });

  it("sorts releases newest first, undated last", () => {
    const sorted = sortReleases([
      release("old", { releaseDate: "2025-01-01" }),
      release("undated", { status: "draft" }),
      release("new", { releaseDate: "2026-09-24" }),
    ]);
    expect(sorted.map((r) => r.slug)).toEqual(["new", "old", "undated"]);
  });

  it("hides drafts when drafts are excluded", () => {
    expect(getReleases(false).some((r) => r.status === "draft")).toBe(false);
  });

  it("splits shows into upcoming (soonest first) and past (latest first)", () => {
    const show = (id: string, date: ISODate): Show => ({
      id,
      date,
      venue: "V",
      city: "C",
      country: "X",
      status: "confirmed",
    });
    const { upcoming, past } = splitShows(
      [
        show("a", "2026-11-01"),
        show("b", "2026-12-20"),
        show("today", "2026-11-14"),
        show("c", "2026-10-01"),
      ],
      "2026-11-14",
    );
    expect(upcoming.map((s) => s.id)).toEqual(["today", "b"]);
    expect(past.map((s) => s.id)).toEqual(["a", "c"]);
  });
});
