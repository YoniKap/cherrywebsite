import type { Release, Video } from "@/types/content";

export const badBetVideo: Video = {
  id: "bad-bet-music-video",
  title: "Bad Bet (Official Music Video)",
  provider: "youtube",
  videoId: "Uog2ntXd8Sc",
  poster: {
    src: "/images/videos/bad-bet.webp",
    alt: "Still from the Bad Bet music video: a man sipping a cocktail at a dim bar, a bartender in a bow tie behind him",
    width: 1280,
    height: 720,
  },
};

/**
 * Add a release by adding an object here — the /music listing, the
 * /music/[slug] page and the homepage pick it up automatically.
 * Only use verified links, dates and credits.
 */
/**
 * Unnamed releases teased on /music as "?" sleeves. No page, no title, no
 * date: just a promise. When one gets a name, add it to `releases` below
 * (status "announced") and lower this number.
 */
export const mysteryReleaseCount = 2;

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
    links: [
      { platform: "spotify", url: "https://open.spotify.com/track/387HYKlnIRujuzGLJPIANM" },
      {
        platform: "apple-music",
        url: "https://music.apple.com/us/album/bad-bet-single/6813293509",
      },
    ],
    embed: { provider: "spotify", id: "track/387HYKlnIRujuzGLJPIANM" },
    videos: [badBetVideo],
  },
  {
    slug: "numba-six",
    title: "Numba Six",
    // Confirmed as coming; date not announced yet. Add releaseDate when it is.
    type: "single",
    status: "announced",
    links: [],
  },
];
