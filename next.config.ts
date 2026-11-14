import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is deliberately OFF: on Cloudflare Workers (OpenNext) it
  // hangs requests at runtime. Classic static rendering is used instead.
  // Images are pre-sized and compressed at export time (see public/images).
  // Cloudflare needs an IMAGES binding for Next's optimizer; until that's set
  // up, serve files as-is so <Image> never points at a missing /_next/image.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
