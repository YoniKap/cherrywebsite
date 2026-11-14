import type { Show } from "@/types/content";

/**
 * Add a show by adding an object here. Shows on or after today (Asia/Jerusalem)
 * are listed as upcoming; older ones move to the archive automatically.
 *
 * Example:
 * {
 *   id: "2027-01-15-barby-tel-aviv",
 *   date: "2027-01-15",
 *   doorsTime: "20:30",
 *   venue: "Venue name",
 *   city: "Tel Aviv",
 *   country: "Israel",
 *   status: "confirmed",
 *   ticketUrl: "https://...",
 * }
 */
export const shows: Show[] = [];
