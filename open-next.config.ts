import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Every page is prerendered at build time, so the cache only needs to be
 * read: it's served from Workers static assets (no R2 bucket or KV needed).
 * If pages ever need runtime revalidation (e.g. `revalidate` for shows),
 * switch to r2IncrementalCache and add the R2 bucket to wrangler.jsonc.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
