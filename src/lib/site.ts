export const SITE = {
  name: "Cherry Supreza",
  description:
    "Official website of Cherry Supreza: alternative rock with funk-bent grooves, crooked guitars and grunge noise.",
} as const;

export const NAV_ITEMS = [
  { href: "/music", label: "Music" },
  { href: "/shows", label: "Shows" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
