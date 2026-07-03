import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const potjeTypeEnum = pgEnum("potje_type", ["vast", "variabel"]);

export const categorieEnum = pgEnum("categorie", [
  "vaste_lasten",
  "doelen_sparen",
  "weekgeld",
]);

export const maanden = pgTable("maanden", {
  id: serial("id").primaryKey(),
  // bv. "2026-06/07"
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
