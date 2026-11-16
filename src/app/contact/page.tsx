import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Postcard } from "@/components/contact/Postcard";
import { Doodle } from "@/components/ui/Doodle";
import { PageIntro } from "@/components/ui/PageIntro";
import { getContacts, getSocials } from "@/lib/content";
import { SOCIAL_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Booking, press and collaborations with Cherry Supreza.",
};

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
          <Postcard contacts={contacts} id="contact-postcard" />
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
