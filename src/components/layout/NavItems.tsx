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
      {NAV_ITEMS.map((item, i) => {
        const active = pathname ? isActivePath(pathname, item.href) : false;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "group inline-flex items-baseline gap-1.5 py-2 transition-colors",
                active ? "text-mustard" : "text-bone/80 hover:text-bone",
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "transition-colors",
                  active ? "text-mustard" : "text-ash group-hover:text-mustard",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="link-wipe">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
