import { ExternalLink } from "@/components/ui/ExternalLink";
import { formatDate } from "@/lib/dates";
import type { Show } from "@/types/content";

const STATUS_LABEL = { cancelled: "Cancelled", postponed: "Postponed" } as const;

/** Ticket-stub rows: date | venue + city | tickets. */
export function ShowList({ shows }: { shows: Show[] }) {
  return (
    <ol className="divide-y divide-dashed divide-bone/25 border-y border-bone/15">
      {shows.map((show) => (
        <li
          key={show.id}
          className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6"
        >
          <time dateTime={show.date} className="type-kicker text-ash">
            {formatDate(show.date, {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            {show.doorsTime && <span className="block">Doors {show.doorsTime}</span>}
          </time>
          <div>
            <p className="type-display text-title">{show.venue}</p>
            <p className="mt-1">
              {show.city}, {show.country}
            </p>
            {show.lineup && show.lineup.length > 0 && (
              <p className="mt-2 type-kicker text-ash">With {show.lineup.join(" · ")}</p>
            )}
          </div>
          <div>
            {show.status !== "confirmed" ? (
              <span className="type-kicker text-mustard">{STATUS_LABEL[show.status]}</span>
            ) : show.ticketUrl ? (
              <ExternalLink
                href={show.ticketUrl}
                className="border border-bone/25 px-4 py-3 type-kicker transition-colors hover:border-bone hover:bg-bone hover:text-ink"
              >
                Tickets
              </ExternalLink>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
