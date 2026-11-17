import type { Band } from "@/types/content";

export const band: Band = {
  name: "Cherry Supreza",
  // Approved by the band.
  bio: [
    "Cherry Supreza is a four-piece band with two guitars, bass and drums.",
    "Our sound mixes funky grooves, unconventional guitar riffs and atmospheric sections with the raw, noisy energy of 90s alternative rock and grunge.",
  ],
  genres: ["Alternative rock", "Funk rock", "Indie rock", "Grunge"],
  members: [
    {
      slug: "erad-tamam",
      name: "Erad Tamam",
      nickname: "Cherry",
      roles: ["lead vocals", "rhythm guitar"],
      portrait: {
        src: "/images/members/cherry.webp",
        alt: "Cherry with head thrown back and eyes closed, playing guitar on a dark stage in black and white",
        width: 720,
        height: 900,
      },
    },
    {
      slug: "yonatan-kaplounov",
      name: "Yonatan Kaplounov",
      nickname: "Kappi",
      roles: ["lead guitar", "backing vocals"],
      portrait: {
        src: "/images/members/kappi.webp",
        alt: "Kappi playing a dark red guitar on a small, smoky stage",
        width: 720,
        height: 900,
        credit: "Alon Peled",
      },
    },
    {
      slug: "adam-hersonsky",
      name: "Adam Hersonsky",
      nickname: "Raccoon",
      roles: ["bass"],
      portrait: {
        src: "/images/members/racoon.webp",
        alt: "Raccoon playing a red bass guitar under a single stage light",
        width: 720,
        height: 900,
        credit: "Dani Photography",
      },
    },
    {
      slug: "gal-gantz",
      name: "Gal Gantz",
      nickname: "Bon",
      roles: ["drums"],
      portrait: {
        src: "/images/members/bon.webp",
        alt: "Bon in a black bucket hat and sunglasses, drumming in front of a wall of old records",
        width: 720,
        height: 900,
        credit: "Dani Photography",
      },
    },
  ],
  photos: [
    {
      src: "/images/band/band-setlists.webp",
      alt: "Black-and-white photo of the four band members grinning on a small stage in front of a wall of vinyl records, two of them holding up handwritten setlists",
      width: 1800,
      height: 1200,
    },
  ],
};
