import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { Doodle } from "@/components/ui/Doodle";
import { PageIntro } from "@/components/ui/PageIntro";
import { getContacts, getSocials } from "@/lib/content";
import { LOGO, SOCIAL_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Booking, press and collaborations with Cherry Supreza.",
};

const PURPOSE_LABEL = {
  booking: "Booking",
  press: "Press",
  collabs: "Collaborations",
  general: "Everything else",
} as const;

/** Wavy cancellation lines + round date stamp, drawn over the stamp's corner. */
function Postmark({ className }: { className?: string }) {
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
        <path id="postmark-ring" d="M60 60 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
      </defs>
      <text fill="currentColor" fontSize="9" letterSpacing="2.4" fontFamily="var(--font-mono)">
        <textPath href="#postmark-ring">CHERRY SUPREZA · AIR MAIL · </textPath>
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

export default function ContactPage() {
  const contacts = getContacts();
  const socials = getSocials();

  return (
    <>
      <PageIntro kicker="Get in touch" title="Contact">
        Booking, press, or just to say hi.
      </PageIntro>

      <section className="container-site grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* ── Postcard ─────────────────────────────────────────── */}
        <div className="relative lg:col-span-7">
          <article
            aria-label="Email the band"
            className="airmail relative -rotate-[1.2deg] p-2.5 shadow-2xl shadow-black/60 transition-transform duration-500 ease-snap hover:rotate-0 sm:p-3"
          >
            <div className="relative grid gap-8 bg-bone px-6 py-8 text-ink sm:grid-cols-[1fr_auto_12rem] sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto_13rem]">
              {/* Message side */}
              <div className="min-w-0">
                <p className="font-mono text-xs tracking-[0.2em] text-ink/60 uppercase">
                  Post card
                </p>
                <p className="mt-6 font-serif text-3xl italic sm:text-4xl">Dear Cherry Supreza,</p>

                {contacts.length === 0 ? (
                  <p className="mt-6 text-lg">Booking and press contacts are coming soon.</p>
                ) : (
                  <dl className="mt-6 space-y-7">
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
                            className="block font-serif text-[clamp(1.35rem,5.5vw,2.1rem)] leading-tight font-semibold text-cherry italic underline decoration-cherry/40 decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-cherry"
                          >
                            {/* break after the @ when it must wrap, never mid-word */}
                            {c.email.split("@")[0]}@<wbr />
                            {c.email.split("@")[1]}
                          </a>
                          <div className="mt-4">
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
                <div className="stamp ml-auto w-28 rotate-3">
                  <div className="bg-[#fbf6ea] p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized asset */}
                    <img
                      src={LOGO.small.src}
                      width={LOGO.small.width}
                      height={LOGO.small.height}
                      alt=""
                      className="w-full"
                    />
                    <p className="mt-1 text-center font-mono text-[0.6rem] tracking-[0.15em] text-cherry">
                      SIDE A · 1¢
                    </p>
                  </div>
                </div>
                <Postmark className="absolute top-6 -left-10 w-44 -rotate-12 text-ink/45" />

                <div className="mt-14 space-y-6 font-serif text-xl text-ink/80 italic">
                  <p className="border-b border-ink/25 pb-1">Cherry Supreza</p>
                  <p className="border-b border-ink/25 pb-1">c/o the rehearsal room</p>
                  <p className="border-b border-ink/25 pb-1">Somewhere loud</p>
                </div>
              </div>
            </div>
          </article>
          <Doodle
            kind="cherries"
            className="absolute -bottom-10 -left-6 z-10 w-24 -rotate-12 sm:w-32"
          />
        </div>

        {/* ── Elsewhere ────────────────────────────────────────── */}
        {socials.length > 0 && (
          <nav aria-labelledby="elsewhere-heading" className="lg:col-span-4 lg:col-start-9">
            <h2 id="elsewhere-heading" className="type-kicker text-ash">
              Elsewhere
            </h2>
            <ul className="mt-4 border-t border-bone/15">
              {socials.map((s) => (
                <li key={s.platform} className="border-b border-bone/15">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5 transition-[padding,color] duration-300 ease-snap hover:pl-3 hover:text-cherry"
                  >
                    <span>
                      <span className="block type-display text-4xl sm:text-5xl">
                        {SOCIAL_LABEL[s.platform]}
                      </span>
                      <span className="mt-1 block type-kicker text-ash">
                        {s.handle ?? "Artist page"}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-8 shrink-0 transition-transform duration-300 ease-snap group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <Doodle kind="snake" className="mt-10 ml-auto hidden w-48 rotate-3 lg:block" />
          </nav>
        )}
      </section>
    </>
  );
}
