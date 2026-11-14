import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { getSocials } from "@/lib/content";
import { NAV_ITEMS } from "@/lib/site";
import { getCurrentYear } from "@/lib/today";

const SOCIAL_LABEL = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  spotify: "Spotify",
  bandcamp: "Bandcamp",
} as const;

export async function SiteFooter() {
  const year = await getCurrentYear();
  const socials = getSocials();

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

      <p
        aria-hidden="true"
        className="-mb-[0.12em] px-2 type-display text-[13vw] leading-[0.8] whitespace-nowrap text-soot select-none"
      >
        Cherry Supreza
      </p>

      <div className="border-t border-bone/15">
        <p className="container-site py-5 type-kicker text-ash">© {year} Cherry Supreza</p>
      </div>
    </footer>
  );
}
