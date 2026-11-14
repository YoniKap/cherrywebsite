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

CI (`.github/workflows/ci.yml`) runs format check, lint, typecheck and build on every push and PR.

## Editing content

Coming in Phase 1: releases, shows, members, media and socials will live as typed data in
`src/content/`, so announcing a show or release won't require touching page code.
