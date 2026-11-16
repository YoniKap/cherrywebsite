import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is deliberately OFF: on Cloudflare Workers (OpenNext) it
  // hangs requests at runtime. Classic static rendering is used instead.
  // Images are pre-sized and compressed at export time (see public/images).
  // Cloudflare needs an IMAGES binding for Next's optimizer; until that's set
  // up, serve files as-is so <Image> never points at a missing /_next/image.
  images: { unoptimized: true },
  experimental: {
    // Turbopack's persistent cache served stale globals.css: locally after
    // edits, and on Cloudflare (whose build cache restores .next/cache) it
    // shipped a stylesheet missing newer rules. Always build from source.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
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
