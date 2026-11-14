import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { getBand } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Cherry Supreza: Cherry, Kappi, Racoon and Bon.",
};

export default function AboutPage() {
  const band = getBand();

  return (
    <>
      <PageIntro kicker="03 / The band" title="About" />

      <section className="container-site grid gap-12 py-14 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed lg:col-span-6 lg:col-start-2">
          {band.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="members-heading" className="container-site py-6">
        <h2 id="members-heading" className="type-kicker text-ash">
          Members
        </h2>
        <ul className="mt-6 grid border-t border-bone/15 sm:grid-cols-2">
          {band.members.map((member) => (
            <li
              key={member.slug}
              id={member.slug}
              className="scroll-mt-24 border-b border-bone/15 py-8 sm:odd:pr-8"
            >
              <p className="font-serif text-5xl text-cherry italic sm:text-6xl">
                {member.nickname}
              </p>
              <p className="mt-3 text-lg">{member.name}</p>
              <p className="mt-1 type-kicker text-ash">{member.roles.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
