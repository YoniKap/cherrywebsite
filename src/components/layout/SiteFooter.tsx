import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { getContacts, getFeaturedRelease, getReleases, getSocials } from "@/lib/content";
import { LOGO, NAV_ITEMS, SOCIAL_LABEL } from "@/lib/site";
import { getCurrentYear } from "@/lib/today";

/** Ticker lines come straight from content, so they're always true. */
function tickerItems(): string[] {
  const items: string[] = [];
  const featured = getFeaturedRelease();
  if (featured?.status === "released") items.push(`${featured.title} — out now`);
  for (const r of getReleases(false)) {
    if (r.status === "announced") items.push(`${r.title} — coming soon`);
  }
  return items;
}

export async function SiteFooter() {
  const year = await getCurrentYear();
  const socials = getSocials();
  const email = getContacts()[0]?.email;
  const ticker = tickerItems();

  return (
    <footer className="mt-24 overflow-hidden border-t border-bone/15 bg-ink/85 backdrop-blur-xl">
      {/* ── News ticker ───────────────────────────────────────────── */}
      {ticker.length > 0 && (
        <div aria-hidden="true" className="ticker border-b border-bone/10 py-2.5">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <span key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 4 }, () => ticker)
                  .flat()
                  .map((item, i) => (
                    <span key={i} className="flex items-center type-kicker text-ash">
                      <span className="px-6 whitespace-nowrap">{item}</span>
                      <span className="size-1.5 rounded-full bg-cherry" />
                    </span>
                  ))}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Main ──────────────────────────────────────────────────── */}
      <div className="container-site grid grid-cols-2 gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {email && (
          <div className="col-span-2 lg:col-span-6">
            <h2 className="type-kicker text-ash">Write to us</h2>
            <a
              href={`mailto:${email}`}
              className="group mt-4 inline-block font-serif text-[clamp(1.75rem,3.4vw,3rem)] leading-tight italic"
            >
              <span className="link-wipe group-hover:text-mustard">
                {email.split("@")[0]}@<wbr />
                {email.split("@")[1]}
              </span>
            </a>
          </div>
        )}

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-8">
          <h2 className="type-kicker text-ash">Index</h2>
          <ul className="mt-4 space-y-2.5">
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
          <div className="lg:col-span-2">
            <h2 className="type-kicker text-ash">Follow</h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-mustard"
                  >
                    <span className="link-wipe">{SOCIAL_LABEL[s.platform]}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-3.5 text-ash transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mustard"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static asset */}
        <img
          src={LOGO.small.src}
          width={LOGO.small.width}
          height={LOGO.small.height}
          alt=""
          loading="lazy"
          className="hidden w-16 justify-self-end lg:col-span-1 lg:block"
        />
      </div>

      {/* ── Wordmark: fine outline, kaleidoscope on hover ─────────── */}
      <p
        aria-hidden="true"
        className="groovy pb-[2.6vw] text-center type-display text-[12.4vw] leading-[0.82] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_rgb(241_228_201/0.22)]"
      >
        Cherry Supreza
      </p>

      {/* ── Sign-off ──────────────────────────────────────────────── */}
      <div className="border-t border-bone/10">
        <div className="container-site flex items-center justify-between gap-4 py-5">
          <p className="type-kicker text-ash">© {year} Cherry Supreza</p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 type-kicker text-ash hover:text-mustard"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
