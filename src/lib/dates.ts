import type { ISODate } from "@/types/content";

/** The band's home time zone — decides when a show becomes "past". */
export const SITE_TIME_ZONE = "Asia/Jerusalem";

export function toISODate(date: Date, timeZone: string = SITE_TIME_ZONE): ISODate {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date) as ISODate;
}

/** "24 Sep 2026". Formats the calendar date as written, independent of server time zone. */
export function formatDate(
  iso: ISODate,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" },
): string {
  return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
