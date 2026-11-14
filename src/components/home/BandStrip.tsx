import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBand } from "@/lib/content";

// Pinned slightly crooked, like gig posters on a wall; straightens on hover.
const TILT = ["-rotate-[1.5deg]", "rotate-[1deg]", "-rotate-[0.75deg]", "rotate-[1.75deg]"];

export function BandStrip() {
  const { members } = getBand();

  return (
    <section aria-labelledby="band-heading" className="container-site py-20 sm:py-28">
      <SectionHeading side="C" title="The band" id="band-heading" href="/about" linkLabel="About" />

      <ul className="mt-12 grid reveal grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {members.map((member, i) => (
          <li key={member.slug}>
            <Link href={`/about#${member.slug}`} className="group block">
              <div
                className={`relative aspect-[4/5] overflow-hidden bg-soot transition-transform duration-500 ease-snap group-hover:rotate-0 group-focus-visible:rotate-0 ${TILT[i % TILT.length]}`}
              >
                {member.portrait ? (
                  <Image
                    src={member.portrait.src}
                    alt={member.portrait.alt}
                    fill
                    sizes="(min-width: 64rem) 25vw, 50vw"
                    className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  // Placeholder: oversized initial, no fake portrait
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-end justify-start p-3"
                  >
                    <div className="absolute -top-1/4 -right-1/4 size-full halftone opacity-60 [--halftone-size:6px]" />
                    <span className="relative type-display text-[clamp(6rem,24vw,13rem)] leading-[0.75] text-ink transition-colors duration-500 [-webkit-text-stroke:1px_var(--color-bone)] group-hover:text-cherry group-hover:[-webkit-text-stroke-color:var(--color-cherry)]">
                      {member.nickname.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-4 font-serif text-3xl italic transition-colors group-hover:text-cherry sm:text-4xl">
                {member.nickname}
              </p>
              <p className="mt-1 text-sm text-bone/85">{member.name}</p>
              <p className="mt-1 type-kicker text-ash">{member.roles.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
