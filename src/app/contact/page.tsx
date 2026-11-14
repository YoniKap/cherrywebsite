import type { Metadata } from "next";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { getContacts, getSocials } from "@/lib/content";
import { SOCIAL_LABEL } from "@/lib/site";

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

export default function ContactPage() {
  const contacts = getContacts();
  const socials = getSocials();

  return (
    <>
      <PageIntro kicker="Get in touch" title="Contact" />
      <section className="container-site py-12">
        {contacts.length === 0 ? (
          <p className="border-y border-bone/15 py-14 font-serif text-2xl text-bone/80 italic">
            Booking and press contacts are coming soon.
          </p>
        ) : (
          <dl className="divide-y divide-bone/15 border-y border-bone/15">
            {contacts.map((c) => (
              <div
                key={c.purpose}
                className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:items-baseline"
              >
                <dt className="type-kicker text-ash">
                  {contacts.length === 1
                    ? "Booking, press & everything else"
                    : PURPOSE_LABEL[c.purpose]}
                </dt>
                <dd className="text-title">
                  <a href={`mailto:${c.email}`} className="link-wipe break-all hover:text-mustard">
                    {c.email}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {socials.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-6">
            {socials.map((s) => (
              <li key={s.platform}>
                <ExternalLink href={s.url} className="link-wipe type-kicker hover:text-mustard">
                  {SOCIAL_LABEL[s.platform]}
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
