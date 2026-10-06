# noki-public-web-next

Nouveau frontend public NOKI en reconstruction depuis zero.

## Stack

- Next.js 16.2.10
- React 19.2.4
- React DOM 19.2.4
- TypeScript 5.9.x
- ESLint 9
- App Router avec `src/`
- pnpm

## Versions requises

- Node.js 24.18.0
- pnpm 10.23.0

## Commandes

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm check
```

## Regles de base

L'ancien `noki-public-web` est une archive historique et ne sert pas de base de code pour ce repo.

La source visuelle officielle sera l'archive Claude Design validee. Cette archive ne doit pas etre commitee dans ce repo.

## Production configuration (server-side, never `NEXT_PUBLIC_`)

- `NOKI_API_BASE_URL` — NOKI API origin. Required for the public tracking page and the contact / merchant-application forms (`/api/intake/lead`, `/api/intake/merchant` relay to `POST /v1/public/leads` and `POST /v1/public/merchant-applications`). Without it the forms answer "unavailable" and never claim the request was saved.
- `NOKI_MERCHANT_PORTAL_URL` — URL of the merchant (seller) portal the "Sign in" page links to. Without it the sign-in page states that merchant access is unavailable instead of showing a credential form.

The public site holds no accounts and no testimonials/metrics of its own: authentication lives in the portals, and no customer quote or traction figure is published until verified content exists.
