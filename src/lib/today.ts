import { cacheLife } from "next/cache";
import type { ISODate } from "@/types/content";
import { toISODate } from "./dates";

/**
 * Today's date in the band's time zone. Cached for a day so date-dependent
 * pages (shows, footer year) stay statically prerendered and refresh daily
 * without a redeploy. Cache Components only allows reading the clock inside
 * a "use cache" scope with an explicit cacheLife.
 */
export async function getToday(): Promise<ISODate> {
  "use cache";
  cacheLife("days");
  return toISODate(new Date());
}

export async function getCurrentYear(): Promise<number> {
  return Number((await getToday()).slice(0, 4));
}
