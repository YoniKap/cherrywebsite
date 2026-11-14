import type { ContactChannel, SocialLink } from "@/types/content";

export const socials: SocialLink[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/cherrysupreza/",
    handle: "@cherrysupreza",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@CherrySupreza",
    handle: "@CherrySupreza",
  },
  {
    platform: "spotify",
    url: "https://open.spotify.com/artist/3s2ty8vjUuWSU5AORNoajy",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@cherrysupreza",
    handle: "@cherrysupreza",
  },
];

// One address for everything for now. Add separate "booking" / "press"
// entries later and the contact page labels them individually.
export const contacts: ContactChannel[] = [
  { purpose: "general", email: "cherrysupreza@gmail.com" },
];
