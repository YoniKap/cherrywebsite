# Cherry Supreza — official website

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · pnpm.

## Requirements

- Node 22+ (`nvm install 22`)
- pnpm 10 (`npm install -g pnpm@10`)

Develop from the WSL Linux filesystem (e.g. `~/code/cherrywebsite`), not `/mnt/c` — installs and
file watching are much faster there.

## Scripts

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Dev server at http://localhost:3000 |
| `pnpm build`        | Production build                    |
| `pnpm start`        | Serve the production build          |
| `pnpm lint`         | ESLint                              |
| `pnpm typecheck`    | Generate route types + `tsc`        |
| `pnpm format`       | Prettier (write)                    |
| `pnpm format:check` | Prettier (check, used in CI)        |
| `pnpm test`         | Content integrity + unit tests      |
| `pnpm e2e`          | Playwright against a prod build     |

### First-time Playwright setup (WSL/Linux)

```sh
pnpm exec playwright install chromium
sudo env "PATH=$PATH" pnpm exec playwright install-deps chromium   # system libraries, once
```

CI (`.github/workflows/ci.yml`) runs format check, lint, typecheck, unit tests, build and e2e on every push and PR.

## Deployment (Cloudflare Workers)

Built with the OpenNext Cloudflare adapter (`wrangler.jsonc`, `open-next.config.ts`).

| Command           | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `pnpm cf:build`   | Build + adapt for Workers (output in `.open-next/`)       |
| `pnpm cf:preview` | Run the built Worker locally in the Workers runtime       |
| `pnpm deploy`     | Build and deploy from your machine (needs wrangler login) |

Cloudflare dashboard (Workers Builds, connected to GitHub):

- Build command: `pnpm run cf:build`
- Deploy command: `pnpm exec opennextjs-cloudflare deploy`
- Non-production branch deploy command: `pnpm exec opennextjs-cloudflare upload`

Next.js Cache Components is turned **off**: under the Workers runtime it hangs requests.
All pages are static, so date-dependent bits (upcoming vs. past shows, footer year) update
on each deploy.

## Editing content

All band content lives as typed data in `src/content/`. Pages read it through `src/lib/content.ts`.

| File          | What's in it                                       |
| ------------- | -------------------------------------------------- |
| `band.ts`     | Bio, genres, members                               |
| `releases.ts` | Singles / EPs / albums — one object = one page     |
| `shows.ts`    | Gigs; past shows move to the archive automatically |
| `media.ts`    | Videos, photos, artwork, posters                   |
| `socials.ts`  | Social profiles and contact emails                 |

Release `status`: `draft` (hidden in production, visible in `pnpm dev`), `announced`
(upcoming), `released`, `archived`. `pnpm test` checks the data — unique slugs, valid dates,
https links, alt text on every image — so mistakes fail CI instead of shipping.

Only add verified facts: no placeholder links, dates or credits.

Design-system reference (dev only): http://localhost:3000/dev/type
