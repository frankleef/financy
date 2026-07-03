# Potjes

PWA om de maandelijkse verdeling van inkomen over potjes bij te houden.

## Setup

1. `npm install`
2. Kopieer `.env.example` naar `.env.local` en vul in:
   - `DATABASE_URL` — maak een gratis Postgres-database aan op [neon.tech](https://neon.tech) of via Vercel Postgres
   - `AUTH_SECRET` — genereer met `npx auth secret`
   - `RESEND_API_KEY` en `AUTH_EMAIL_FROM` — account op [resend.com](https://resend.com), verifieer een domein of gebruik hun test-adres tijdens ontwikkelen
   - `ALLOWED_EMAILS` — de twee e-mailadressen die mogen inloggen
3. Schema naar de database pushen: `npm run db:push`
4. `npm run dev` en open `http://localhost:3000`

## Structuur

- `app/` — pagina's en routes (Next.js App Router)
- `drizzle/schema.ts` — datamodel: `maanden` en `potjes`
- `lib/auth.ts` — magic-link login, gewhitelist tot `ALLOWED_EMAILS`
- `lib/db.ts` — database connectie
- `public/manifest.json` — PWA manifest (nog 192x192 en 512x512 iconen toevoegen aan `public/`)

## Nog te doen (zie stappenplan)

- Iconen (`icon-192.png`, `icon-512.png`) toevoegen aan `public/`
- Migraties genereren: `npm run db:generate`
- Maandoverzicht-UI bouwen (stap 5)
- Inloggen/check-je-mail pagina bouwen
- Deployen naar Vercel of eigen server (stap 7)
