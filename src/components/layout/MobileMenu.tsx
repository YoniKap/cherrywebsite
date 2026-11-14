"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_ITEMS } from "@/lib/site";

/**
 * Full-screen menu for small screens, built on a native modal <dialog>:
 * focus is contained, Escape closes it, the page behind is inert, and focus
 * returns to the Menu button on close.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // If the viewport grows past the mobile breakpoint, don't leave an
  // invisible modal making the page inert.
  useEffect(() => {
    const mq = window.matchMedia("(width >= 48rem)");
    const onChange = () => mq.matches && dialogRef.current?.close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="-mr-2 p-2 type-kicker text-bone md:hidden"
      >
        Menu
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="menu-dialog m-0 h-dvh max-h-none w-full max-w-none bg-ink text-bone md:hidden"
      >
        <div className="container-site flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-bone/15">
            <Wordmark className="text-xl" />
            <button type="button" onClick={close} className="-mr-2 p-2 type-kicker" autoFocus>
              Close
            </button>
          </div>

          <nav aria-label="Main" className="flex flex-1 flex-col justify-center py-10">
            <ol className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="group flex items-center gap-4 py-1 transition-colors hover:text-cherry focus-visible:text-cherry"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative SVG */}
                    <img
                      src="/images/doodles/cherry.svg"
                      width={160}
                      height={204}
                      alt=""
                      aria-hidden="true"
                      className="h-10 w-auto shrink-0 transition-transform duration-300 ease-snap group-hover:rotate-12"
                    />
                    <span className="type-display text-[clamp(3rem,15vw,5.5rem)] leading-[0.95] transition-transform duration-300 ease-snap group-hover:translate-x-2">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <p className="shrink-0 border-t border-bone/15 py-5 type-kicker text-ash">
            Two guitars · bass · drums
          </p>
        </div>
      </dialog>
    </>
  );
}
