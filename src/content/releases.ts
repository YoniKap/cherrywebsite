import type { Release } from "@/types/content";

/**
 * Add a release by adding an object here — the /music listing, the
 * /music/[slug] page and the homepage pick it up automatically.
 * Only use verified links, dates and credits.
 */
export const releases: Release[] = [
  {
    slug: "bad-bet",
    title: "Bad Bet",
    type: "single",
    status: "released",
    releaseDate: "2026-09-24",
    featured: true,
    // TODO: cover, streaming links and credits once provided.
    links: [],
  },
  {
    slug: "numba-six",
    title: "Numba Six",
    // Release type and status unconfirmed — stays a draft (hidden in production) until verified.
    type: "single",
    status: "draft",
    links: [],
  },
];
