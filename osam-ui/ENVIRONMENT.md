# Environment variables (Next.js)

Files added:

- `.env.development` — used during local development (`next dev`).
- `.env.production` — used during build/production (`next build` / `next start`).
- `.env.example` — placeholder/template safe to commit.

Variables (client-visible must be prefixed with `NEXT_PUBLIC_`):

- `NEXT_PUBLIC_API_BASE` — base API URL, e.g. `http://localhost:8000/api` or `https://api.example.com/api`.
- `NEXT_PUBLIC_IMAGE_BASE` — base URL for images/CDN, e.g. `http://localhost:8000/media`.
- `NEXT_PUBLIC_FEATURE_BETA` — feature flag, set to `true` or `false`.
- `NEXT_PUBLIC_FEATURE_GALLERY_UPLOAD` — feature flag for gallery upload.

How to use in code:

Use `process.env.NEXT_PUBLIC_API_BASE` in client code and `process.env.NEXT_PUBLIC_API_BASE` in server code.
Example (TypeScript/React):

```ts
const apiBase = process.env.NEXT_PUBLIC_API_BASE;
const imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE;
const isBeta = process.env.NEXT_PUBLIC_FEATURE_BETA === 'true';
```

Notes on switching environments:

- Local development: run `npm run dev` or `next dev`. Next.js automatically loads `.env.development`.
- Production build/start: run `next build` then `next start` (or your host's build/start). Next.js uses `.env.production` at build time.
- You can override any value by setting environment variables in your host (Vercel, Netlify, Docker, Kubernetes, etc.). Platform-set env vars take precedence over files.
- For local sensitive values use `.env.local` (ignored by git) to override `.env.development`.

Tips:

- Remember client-exposed variables must use `NEXT_PUBLIC_` prefix. Do NOT store secrets with that prefix.
- For feature flags consider using a single `NEXT_PUBLIC_FEATURES` JSON string or individual flags — both work; comparing strings to `'true'` is recommended.
