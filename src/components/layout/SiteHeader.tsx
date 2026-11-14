import Link from "next/link";
import { Suspense } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { ActiveNavItems } from "./ActiveNavItems";
import { MobileMenu } from "./MobileMenu";
import { NavItems } from "./NavItems";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-bone/15 bg-ink">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl transition-opacity hover:opacity-80 sm:text-2xl">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          {/* usePathname can suspend on routes with params unknown at build time */}
          <Suspense fallback={<NavItems />}>
            <ActiveNavItems />
          </Suspense>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
