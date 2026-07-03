// Eenmalig te draaien tegen een database waar het schema al via `drizzle-kit
// push` staat (zoals productie nu), zodat `drizzle-kit migrate` de
// 0000_init-migratie niet opnieuw probeert toe te passen (de tabellen
// bestaan al). Raakt alleen de migratie-boekhoudtabel `drizzle.__drizzle_migrations`,
// geen enkele bestaande tabel/data.
//
// Gebruik:
//   DATABASE_URL="<production-connectiestring>" node scripts/baseline-migration.mjs
//
// Kan daarna verwijderd worden — is alleen nodig voor de allereerste overstap
// van `db:push` naar de migraties-workflow.
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(dir, "..", "drizzle", "migrations");

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Zet DATABASE_URL in de omgeving (de production-connectiestring).");
  process.exit(1);
}

const sql = neon(databaseUrl);
const migrationPath = path.join(migrationsDir, "0000_init.sql");
const content = readFileSync(migrationPath).toString();
const hash = createHash("sha256").update(content).digest("hex");
const journal = JSON.parse(readFileSync(path.join(migrationsDir, "meta", "_journal.json")).toString());
const createdAt = journal.entries[0].when;

await sql`CREATE SCHEMA IF NOT EXISTS "drizzle"`;
await sql`
  CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
  )
`;

const bestaand = await sql`select id from "drizzle"."__drizzle_migrations" where hash = ${hash}`;
if (bestaand.length > 0) {
  console.log("Baseline-migratie stond al geregistreerd, niets gedaan.");
} else {
  await sql`insert into "drizzle"."__drizzle_migrations" ("hash", "created_at") values (${hash}, ${createdAt})`;
  console.log("Baseline-migratie (0000_init) gemarkeerd als toegepast.");
}
