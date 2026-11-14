import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is deliberately OFF: on Cloudflare Workers (OpenNext) it
  // hangs requests at runtime. Classic static rendering is used instead.
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
