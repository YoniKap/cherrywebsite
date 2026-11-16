import { SHOWS_ENABLED } from "../../src/lib/site";

export const ROUTES = [
  "/",
  "/music",
  "/music/bad-bet",
  "/music/numba-six",
  ...(SHOWS_ENABLED ? ["/shows"] : []),
  "/about",
  "/media",
  "/contact",
];
