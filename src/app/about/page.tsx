import type { Metadata } from "next";
import Image from "next/image";
import type { DoodleKind } from "@/components/ui/Doodle";
import { Doodle } from "@/components/ui/Doodle";
import { PageIntro } from "@/components/ui/PageIntro";
import { getBand } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Cherry Supreza: Cherry, Kappi, Raccoon and Bon.",
};

// Pinned to the wall at slightly different angles; straighten on hover.
const TILT = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-[2.5deg]"];
const PLACEHOLDER: DoodleKind[] = ["cherry", "cherries", "snake", "cherry"];

function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 h-7 w-24 bg-bone/55 shadow-sm backdrop-blur-[1px] ${className ?? ""}`}
    />
  );
}

export default function AboutPage() {
  const band = getBand();
  const [lead, ...rest] = band.bio;
  const photo = band.photos[0];

  return (
    <>
      <PageIntro kicker="The band" title="About" />

      {/* ── Spread: bio + liner notes | taped band photo ───────────── */}
      <section className="container-site grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          {lead && (
            <p className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.06] font-medium tracking-[-0.015em] text-balance [font-variation-settings:'SOFT'_100,'WONK'_1]">
              {lead.startsWith(band.name) ? (
                <>
                  <span className="type-poster">{band.name}</span>
                  {lead.slice(band.name.length)}
                </>
              ) : (
                lead
              )}
            </p>
          )}
          <div className="mt-8 max-w-[52ch] space-y-5 font-serif text-xl leading-[1.6] text-pretty text-bone/80 [font-variation-settings:'SOFT'_50] sm:text-[1.375rem]">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Liner notes: who plays what, record-sleeve style */}
          <div className="mt-14 max-w-xl">
            <h2 className="type-kicker text-ash">Line-up</h2>
            <dl className="mt-4 space-y-3">
              {band.members.map((m) => (
                <div key={m.slug} className="flex flex-wrap items-baseline gap-x-3 sm:flex-nowrap">
                  <dt className="font-serif text-[1.7rem] font-medium whitespace-nowrap italic [font-variation-settings:'SOFT'_100,'WONK'_1]">
                    <a href={`#${m.slug}`} className="transition-colors hover:text-cherry">
                      {m.nickname}
                    </a>
                  </dt>
                  <span
                    aria-hidden="true"
                    className="hidden min-w-6 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-bone/25 sm:block"
                  />
                  <dd className="w-full type-kicker text-mustard sm:w-auto sm:text-right">
                    {m.roles.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {photo && (
          <figure className="relative self-start lg:col-span-6 lg:mt-4">
            <div className="relative rotate-2 bg-bone p-3 pb-14 shadow-2xl shadow-black/60 transition-transform duration-500 ease-snap hover:rotate-0 sm:p-4 sm:pb-16">
              <Tape className="-top-3 left-8 -rotate-6" />
              <Tape className="-top-3 right-8 rotate-[8deg]" />
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 64rem) 45vw, 100vw"
                className="w-full"
              />
              <figcaption className="absolute right-0 bottom-3 left-0 text-center font-serif text-2xl text-ink italic sm:bottom-4 sm:text-3xl">
                Cherry Supreza
                {photo.credit && (
                  <span className="block font-mono text-[0.65rem] tracking-[0.12em] text-ink/60 not-italic">
                    Photo: {photo.credit}
                  </span>
                )}
              </figcaption>
            </div>
            <Doodle
              kind="cherries"
              className="absolute -right-4 -bottom-12 z-20 w-24 rotate-12 sm:w-32"
            />
          </figure>
        )}
      </section>

      {/* ── Members: taped polaroids ───────────────────────────────── */}
      <section aria-labelledby="members-heading" className="container-site pt-10 pb-24">
        <div className="flex items-end justify-between gap-6 border-t border-bone/15 pt-6">
          <h2 id="members-heading" className="type-display text-title">
            Meet the band
          </h2>
          <Doodle kind="snake" className="hidden w-40 -rotate-3 sm:block" />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {band.members.map((member, i) => (
            <li key={member.slug} id={member.slug} className="scroll-mt-28">
              <article className="group">
                <div className="psy-halo relative isolate">
                  <div
                    className={`relative bg-bone p-2.5 pb-16 shadow-xl shadow-black/50 transition-transform duration-500 ease-snap group-hover:-translate-y-1 group-hover:rotate-0 ${TILT[i % TILT.length]}`}
                  >
                    <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
                    <div className="relative aspect-[4/5] overflow-hidden bg-soot">
                      {member.portrait ? (
                        <Image
                          src={member.portrait.src}
                          alt={member.portrait.alt}
                          fill
                          sizes="(min-width: 64rem) 22vw, (min-width: 30rem) 45vw, 90vw"
                          className="object-cover grayscale-[50%] sepia-[30%] transition-[filter] duration-500 group-hover:grayscale-0 group-hover:sepia-0"
                        />
                      ) : (
                        <Doodle
                          kind={PLACEHOLDER[i % PLACEHOLDER.length]!}
                          className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                      )}
                    </div>
                    <h3 className="absolute right-0 bottom-3 left-0 text-center font-serif text-4xl text-ink italic">
                      {member.nickname}
                    </h3>
                  </div>
                </div>
                <p className="mt-6 text-lg">{member.name}</p>
                <p className="mt-1 type-kicker text-mustard">{member.roles.join(" · ")}</p>
                {member.portrait?.credit && (
                  <p className="mt-2 text-xs text-ash">Photo: {member.portrait.credit}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
