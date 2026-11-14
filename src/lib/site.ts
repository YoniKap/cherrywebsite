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

/** Hand-drawn band mark: a bitten cherry (C) and a snake coiled round a cherry (S). */
export const LOGO = {
  alt: "Cherry Supreza logo: a bitten cherry and a snake coiled around a second cherry, forming the letters C and S",
  full: { src: "/images/brand/logo.webp", width: 958, height: 901 },
  medium: { src: "/images/brand/logo-480.webp", width: 480, height: 451 },
  small: { src: "/images/brand/logo-128.webp", width: 128, height: 120 },
} as const;

export const SOCIAL_LABEL = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  spotify: "Spotify",
  bandcamp: "Bandcamp",
} as const;
