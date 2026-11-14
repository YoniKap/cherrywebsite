import type { Band } from "@/types/content";

export const band: Band = {
  name: "Cherry Supreza",
  // DRAFT COPY — written from the brief, needs band approval before launch.
  bio: [
    "Cherry Supreza is four people: two guitars, a bass and a drum kit.",
    "The songs move between tight, funk-bent grooves, crooked guitar lines, long atmospheric stretches and louder, messier moments that owe a debt to nineties alternative rock and grunge.",
  ],
  genres: ["Alternative rock", "Funk rock", "Indie rock", "Grunge"],
  members: [
    {
      slug: "erad-tamam",
      name: "Erad Tamam",
      nickname: "Cherry",
      roles: ["vocals", "guitar"],
    },
    {
      slug: "yonatan-kaplounov",
      name: "Yonatan Kaplounov",
      nickname: "Kappi",
      roles: ["vocals", "guitar"],
    },
    {
      slug: "adam-hersonsky",
      name: "Adam Hersonsky",
      nickname: "Racoon",
      roles: ["bass"],
    },
    {
      slug: "gal-gantz",
      name: "Gal Gantz",
      nickname: "Bon",
      roles: ["drums"],
    },
  ],
  photos: [],
};
