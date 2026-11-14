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
    cover: {
      src: "/images/releases/bad-bet.webp",
      alt: "Bad Bet cover: the words BAD BET in yellow serif capitals with a red offset shadow on black",
      width: 640,
      height: 640,
    },
    // TODO: credits once provided; other platforms as they're confirmed.
    links: [{ platform: "spotify", url: "https://open.spotify.com/track/387HYKlnIRujuzGLJPIANM" }],
    embed: { provider: "spotify", id: "track/387HYKlnIRujuzGLJPIANM" },
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
