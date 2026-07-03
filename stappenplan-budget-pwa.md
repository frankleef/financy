# Budget PWA — stappenplan en referentie

## Doel
Het huidige papieren systeem (netto inkomen verdelen over potjes, per maand) digitaliseren als PWA voor 2 gebruikers.

## Beslissingen tot nu toe

- **Stack**: Next.js (App Router) als PWA, met `next-pwa`/Serwist voor manifest + service worker
- **Auth**: Auth.js (NextAuth) met magic-link e-mail login via Resend, gelimiteerd tot 2 whitelisted e-mailadressen
- **Database**: Postgres (Neon of Vercel Postgres) + Drizzle ORM — geschikter dan Upstash Redis zodra we historie/grafieken willen
- **Hosting (primair advies)**: Vercel + Neon Postgres + Resend, gratis tier ruim voldoende voor 2 gebruikers
- **Hosting (zelf-host alternatief)**: eigen server met Gitea voor de repo + Coolify of Dokploy als deploy-target (luistert naar git push, bouwt/deployt automatisch, incl. Postgres-container en HTTPS) — makkelijker dan losse Gitea Actions pipeline optuigen
- **Design**: geen Claude Design nodig, look & feel wordt direct in code/mockup vormgegeven
- **ING-koppeling**: geen API beschikbaar. Voorstel: vaste potjes (hypotheek, verzekeringen, sparen) als periodieke overboeking instellen bij ING zelf, app fungeert dan als overzicht + checklist voor de rest, met vinkjes zoals nu op papier

## Datamodel

**Maand**
- periode (bv. "2026-06/07")
- gebaseerd op vorige maand (referentie voor duplicatie)

**Maand** heeft daarnaast één vast veld:
- netto inkomen (bedrag) — alles komt op 1 rekening binnen, dus geen losse inkomens-regels meer maar één totaalbedrag per maand, altijd opnieuw in te vullen (nooit gekopieerd bij duplicatie)

**Potje** (regel binnen een maand — categorieën: vaste lasten, doelen/sparen, weekgeld)
- naam
- categorie
- type: `vast` of `variabel` — bepaalt duplicatiegedrag, blijft geset op het potje
- bedrag
- vinkje (overgemaakt / verwerkt ja-nee)
- volgorde

Geen notitieveld per potje (bewust weggelaten).

## Duplicatielogica

Bij "dupliceer vorige maand als startpunt":
- **netto inkomen** → altijd leeg, nooit gekopieerd, moet elke maand opnieuw ingevuld worden
- **vast** potje → bedrag wordt meegekopieerd
- **variabel** potje (bv. weekgeld) → structuur (naam, categorie) wordt gekopieerd, bedrag wordt leeggemaakt en moet opnieuw ingevuld worden (optioneel: bedrag van vorige maand als grijze placeholder tonen)

## Stappenplan

- [x] **Stap 1 — Requirements vastleggen**: welke potjes zijn vast vs variabel, welke categorieën, wel/niet historie en grafieken over meerdere maanden nodig
- [x] **Stap 2 — Project opzetten**: scaffold gemaakt (`budget-pwa-scaffold.zip`) — nog te doen: uitpakken, `npm install`, repo aanmaken op Gitea/GitHub en pushen
- [x] **Stap 3 — Auth**: `lib/auth.ts` met Resend magic link en e-mail-whitelist, incl. Drizzle-adapter (`users`/`accounts`/`sessions`/`verificationTokens`) — zonder adapter weigerde Auth.js te starten, dit was in de scaffold nog niet gefixt. Inlogscherm (`/inloggen`) en check-je-mail-bevestiging gebouwd en end-to-end getest (echte magic-link mail verstuurd + verificatietoken in DB bevestigd)
- [x] **Stap 4 — Database + schema**: `drizzle/schema.ts` met `maanden` en `potjes`, Neon-database staat live, `npm run db:push` gedraaid
- [x] **Stap 5 — Core features**: maandoverzicht (`/overzicht`), potjes toevoegen (inline formulier) en vinkjes zijn gebouwd en getest tegen de echte database. Dupliceren volgt de afgesproken regels: netto inkomen nooit gekopieerd, `vast`-bedrag wel gekopieerd, `variabel`-bedrag leeggemaakt, vinkjes altijd gereset. Bewerken/verwijderen van een bestaand potje (bedrag aanpassen na aanmaken) is nog niet gebouwd — stond niet in de meegeleverde designs
- [x] **Stap 6 — PWA-laag**: manifest + iconen (`icon-192.png`/`icon-512.png`, gegenereerd uit het PotMark-beeldmerk) + service worker, minimale tab-bar (overzicht/jaaroverzicht/instellingen) en instellingen-scherm (uitloggen). Jaaroverzicht is bewust een placeholder — bouwen we later
- [ ] **Stap 7 — Deploy**: Vercel + Neon (via Vercel Storage-tab) + Resend (of Coolify/Dokploy op eigen server)
- [ ] **Stap 8 — Overboek-workflow**: periodieke overboekingen instellen bij ING voor vaste potjes, checklist-view in app voor de rest

## Overdracht naar Claude Code

Vanaf stap 7 werken we verder in Claude Code, omdat daar wel een echte terminal met internettoegang is (nodig voor `npm install`, Vercel CLI, deploys). Dit document en de eerdere mockups zijn de context die je meeneemt.

## UI/UX richtlijnen (uit mockup-sessie)

- Mobile-first: 1 kolom, tap-targets minimaal 44px hoog
- Toegankelijk: hele rij (niet alleen checkbox) is tikbaar via `<label>`-elementen, badges gebruiken kleur én tekst (niet alleen kleur)
- Geen aparte views/modals voor simpele acties: nieuw potje toevoegen gebeurt inline op dezelfde pagina (zoals een todo-app) via een `+ potje toevoegen`-knop die een klein formuliertje opent binnen de lijst
- Stijl: flat, simpel, weinig chrome — geen gradients/schaduwen, gebruik van gewone systeemkleuren
- Onderin een simpele tab-bar: overzicht, jaaroverzicht, instellingen

## Bevestigd in stap 1

- Categorieën: vaste lasten, doelen/sparen, weekgeld — plus één netto inkomen-veld per maand (geen losse inkomens meer, alles komt op 1 rekening binnen)
- Geen notitieveld per potje
- Jaaroverzicht/grafiek over meerdere maanden is gewenst → meenemen als aparte feature na de core-app (waarschijnlijk stap 6/7), en reden om voor Postgres te kiezen i.p.v. Upstash Redis (query't prettiger voor aggregaties over maanden heen)
- Look en feel vastgelegd via mockups (desktop maandoverzicht + mobiele inline-add flow)

Stap 1 t/m 6 zijn afgerond. Verder in Claude Code vanaf stap 7 (deploy).
