import type { ISODate } from "@/types/content";
import { toISODate } from "./dates";

/**
 * Today's date in the band's time zone. Pages are statically rendered, so this
 * is evaluated at build time: upcoming/past shows and the footer year update
 * on each deploy. (For daily refresh without deploys, add an R2 incremental
 * cache + `export const revalidate = 86400` on the pages that list shows.)
 */
export async function getToday(): Promise<ISODate> {
  return toISODate(new Date());
}

export async function getCurrentYear(): Promise<number> {
  return Number((await getToday()).slice(0, 4));
}
