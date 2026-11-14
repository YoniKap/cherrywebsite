import Link from "next/link";
import { Doodle } from "@/components/ui/Doodle";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { getContacts, getSocials } from "@/lib/content";
import { NAV_ITEMS, SOCIAL_LABEL } from "@/lib/site";
import { getCurrentYear } from "@/lib/today";

export async function SiteFooter() {
  const year = await getCurrentYear();
  const socials = getSocials();
  const email = getContacts()[0]?.email;

  return (
    <footer className="mt-24 overflow-hidden border-t border-bone/15">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="type-kicker text-ash">Index</h2>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-wipe hover:text-mustard">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {email && (
          <div className="lg:col-span-3">
            <h2 className="type-kicker text-ash">Write to us</h2>
            <p className="mt-4">
              <a href={`mailto:${email}`} className="link-wipe break-all hover:text-mustard">
                {email}
              </a>
            </p>
          </div>
        )}

        {socials.length > 0 && (
          <div className="lg:col-span-3">
            <h2 className="type-kicker text-ash">Elsewhere</h2>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.platform}>
                  <ExternalLink href={s.url} className="link-wipe hover:text-mustard">
                    {SOCIAL_LABEL[s.platform]}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative">
        <Doodle
          kind="snake"
          className="absolute bottom-[38%] left-[52%] z-10 w-[28vw] max-w-[22rem] min-w-32 -rotate-6"
        />
        <p
          aria-hidden="true"
          className="-mb-[0.12em] px-2 type-display text-[13vw] leading-[0.8] whitespace-nowrap text-soot select-none"
        >
          Cherry Supreza
        </p>
      </div>

      <div className="border-t border-bone/15">
        <p className="container-site py-5 type-kicker text-ash">© {year} Cherry Supreza</p>
      </div>
    </footer>
  );
}
