import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  pgEnum,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Auth.js (NextAuth) tabellen — vereist zodra er een e-mail/magic-link provider
// actief is (Auth.js weigert anders te starten: "Email login requires an adapter").
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compositePk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const potjeTypeEnum = pgEnum("potje_type", ["vast", "variabel"]);

export const categorieEnum = pgEnum("categorie", [
  "vaste_lasten",
  "doelen_sparen",
  "weekgeld",
]);

export const maanden = pgTable("maanden", {
  id: serial("id").primaryKey(),
  // "2026-07" (jaar-maand, 1e van de maand)
  periode: text("periode").notNull(),
  // netto inkomen komt op 1 rekening binnen, altijd opnieuw invullen
  nettoInkomen: numeric("netto_inkomen", { precision: 10, scale: 2 }),
  gebaseerdOpMaandId: integer("gebaseerd_op_maand_id"),
  aangemaaktOp: timestamp("aangemaakt_op").defaultNow().notNull(),
});

export const potjes = pgTable("potjes", {
  id: serial("id").primaryKey(),
  maandId: integer("maand_id")
    .references(() => maanden.id, { onDelete: "cascade" })
    .notNull(),
  naam: text("naam").notNull(),
  categorie: categorieEnum("categorie").notNull(),
  type: potjeTypeEnum("type").notNull(),
  bedrag: numeric("bedrag", { precision: 10, scale: 2 }),
  afgevinkt: boolean("afgevinkt").default(false).notNull(),
  volgorde: integer("volgorde").default(0).notNull(),
});

export const maandenRelations = relations(maanden, ({ many }) => ({
  potjes: many(potjes),
}));

export const potjesRelations = relations(potjes, ({ one }) => ({
  maand: one(maanden, {
    fields: [potjes.maandId],
    references: [maanden.id],
  }),
}));

export type Categorie = (typeof categorieEnum.enumValues)[number];
export type PotjeType = (typeof potjeTypeEnum.enumValues)[number];
export type Potje = typeof potjes.$inferSelect;
export type Maand = typeof maanden.$inferSelect;
