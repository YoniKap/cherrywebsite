import clsx from "clsx";
import Link from "next/link";
import { NAV_ITEMS, isActivePath } from "@/lib/site";

/**
 * Desktop nav list. Presentational: renders on the server as the Suspense
 * fallback (no active state) and inside ActiveNavItems on the client.
 */
export function NavItems({ pathname }: { pathname?: string }) {
  return (
    <ol className="flex items-center gap-7 type-kicker">
      {NAV_ITEMS.map((item) => {
        const active = pathname ? isActivePath(pathname, item.href) : false;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "group inline-flex items-center gap-1.5 py-2 transition-colors",
                active ? "text-mustard" : "text-bone/80 hover:text-bone",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative SVG */}
              <img
                src="/images/doodles/cherry.svg"
                width={160}
                height={204}
                alt=""
                aria-hidden="true"
                className={clsx(
                  "h-[1.35em] w-auto self-center transition-[opacity,filter,rotate] duration-300",
                  active
                    ? "opacity-100"
                    : "opacity-45 saturate-50 group-hover:rotate-12 group-hover:opacity-100 group-hover:saturate-100",
                )}
              />
              <span className="link-wipe">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
