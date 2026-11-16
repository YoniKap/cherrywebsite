import clsx from "clsx";
import { LOGO } from "@/lib/site";
import type { ContactChannel } from "@/types/content";
import { CopyEmail } from "./CopyEmail";

const PURPOSE_LABEL = {
  booking: "Booking",
  press: "Press",
  collabs: "Collaborations",
  general: "Everything else",
} as const;

/** Wavy cancellation lines + round date stamp, drawn over the stamp's corner. */
function Postmark({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 220 120" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="60" cy="60" r="44" />
        <circle cx="60" cy="60" r="33" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M110 ${28 + i * 16} q 13 -9 26 0 t 26 0 t 26 0 t 26 0`}
            strokeLinecap="round"
          />
        ))}
      </g>
      <defs>
        <path id={id} d="M60 60 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
      </defs>
      <text fill="currentColor" fontSize="9" letterSpacing="2.4" fontFamily="var(--font-mono)">
        <textPath href={`#${id}`}>CHERRY SUPREZA · AIR MAIL · </textPath>
      </text>
      <text
        x="60"
        y="64"
        textAnchor="middle"
        fill="currentColor"
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--font-mono)"
      >
        C·S
      </text>
    </svg>
  );
}

/**
 * Airmail postcard with the band's email(s). `compact` drops the ruled
 * address lines and tightens the type, for the footer.
 */
export function Postcard({
  contacts,
  compact = false,
  id = "postcard",
  className,
}: {
  contacts: ContactChannel[];
  compact?: boolean;
  /** Unique per page: keys the postmark's SVG path. */
  id?: string;
  className?: string;
}) {
  return (
    <article
      aria-label="Email the band"
      className={clsx(
        "airmail relative -rotate-[1.2deg] shadow-2xl shadow-black/60 transition-transform duration-500 ease-snap hover:rotate-0",
        compact ? "p-2 sm:p-2.5" : "p-2.5 sm:p-3",
        className,
      )}
    >
      <div
        className={clsx(
          "relative grid bg-bone text-ink",
          compact
            ? "gap-6 px-5 py-6 sm:grid-cols-[1fr_auto_7rem] sm:px-7 sm:py-7"
            : "gap-8 px-6 py-8 sm:grid-cols-[1fr_auto_12rem] sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto_13rem]",
        )}
      >
        {/* Message side */}
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">Post card</p>
          <p
            className={clsx(
              "font-serif italic",
              compact ? "mt-4 text-2xl sm:text-3xl" : "mt-6 text-3xl sm:text-4xl",
            )}
          >
            Dear Cherry Supreza,
          </p>

          {contacts.length === 0 ? (
            <p className="mt-6 text-lg">Booking and press contacts are coming soon.</p>
          ) : (
            <dl className={clsx(compact ? "mt-4 space-y-5" : "mt-6 space-y-7")}>
              {contacts.map((c) => (
                <div key={c.purpose}>
                  <dt className="font-mono text-xs tracking-[0.14em] text-ink/70 uppercase">
                    {contacts.length === 1
                      ? "Booking, press & everything else"
                      : PURPOSE_LABEL[c.purpose]}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${c.email}`}
                      className={clsx(
                        "block font-serif leading-tight font-semibold text-cherry italic underline decoration-cherry/40 decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-cherry",
                        compact
                          ? "text-[clamp(1.25rem,5vw,1.6rem)]"
                          : "text-[clamp(1.35rem,5.5vw,2.1rem)]",
                      )}
                    >
                      {/* break after the @ when it must wrap, never mid-word */}
                      {c.email.split("@")[0]}@<wbr />
                      {c.email.split("@")[1]}
                    </a>
                    <div className={compact ? "mt-3" : "mt-4"}>
                      <CopyEmail email={c.email} />
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Centre fold */}
        <div aria-hidden="true" className="hidden w-px bg-ink/20 sm:block" />

        {/* Address side: stamp, postmark, ruled lines */}
        <div aria-hidden="true" className="relative hidden sm:block">
          <div className={clsx("stamp ml-auto rotate-3", compact ? "w-20" : "w-28")}>
            <div className="bg-[#fbf6ea] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized asset */}
              <img
                src={LOGO.small.src}
                width={LOGO.small.width}
                height={LOGO.small.height}
                alt=""
                loading="lazy"
                className="w-full"
              />
              <p className="mt-1 text-center font-mono text-[0.55rem] tracking-[0.15em] text-cherry">
                SIDE A · 1¢
              </p>
            </div>
          </div>
          <Postmark
            id={`${id}-postmark`}
            className={clsx(
              "absolute -rotate-12 text-ink/45",
              compact ? "top-4 -left-8 w-32" : "top-6 -left-10 w-44",
            )}
          />

          {!compact && (
            <div className="mt-14 space-y-6 font-serif text-xl text-ink/80 italic">
              <p className="border-b border-ink/25 pb-1">Cherry Supreza</p>
              <p className="border-b border-ink/25 pb-1">c/o the rehearsal room</p>
              <p className="border-b border-ink/25 pb-1">Somewhere loud</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
