"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { maanden, potjes, type Categorie, type PotjeType } from "@/drizzle/schema";
import { euroNaarString } from "@/lib/format";

async function requireSession() {
  const session = await auth();
  if (!session) throw new Error("Niet ingelogd");
  return session;
}

export async function maakLegeMaand(periode: string) {
  await requireSession();
  await db.insert(maanden).values({ periode, nettoInkomen: null });
  revalidatePath("/overzicht");
}

export async function dupliceerMaand(bronMaandId: number, nieuwePeriode: string) {
  await requireSession();

  const bronPotjes = await db.query.potjes.findMany({
    where: eq(potjes.maandId, bronMaandId),
    orderBy: (p, { asc }) => [asc(p.volgorde)],
  });

  const [nieuweMaand] = await db
    .insert(maanden)
    .values({ periode: nieuwePeriode, nettoInkomen: null, gebaseerdOpMaandId: bronMaandId })
    .returning();

  if (bronPotjes.length > 0) {
    await db.insert(potjes).values(
      bronPotjes.map((p) => ({
        maandId: nieuweMaand.id,
        naam: p.naam,
        categorie: p.categorie,
        type: p.type,
        bedrag: p.type === "vast" ? p.bedrag : null,
        afgevinkt: false,
        volgorde: p.volgorde,
      }))
    );
  }

  revalidatePath("/overzicht");
}

export async function updateNettoInkomen(maandId: number, bedrag: number | null) {
  await requireSession();
  await db
    .update(maanden)
    .set({ nettoInkomen: euroNaarString(bedrag) })
    .where(eq(maanden.id, maandId));
  revalidatePath("/overzicht");
}

export async function maakPotje(input: {
  maandId: number;
  naam: string;
  categorie: Categorie;
  type: PotjeType;
  bedrag: number | null;
}) {
  await requireSession();
  const naam = input.naam.trim();
  if (!naam) throw new Error("Naam is verplicht");

  const bestaande = await db.query.potjes.findMany({
    where: eq(potjes.maandId, input.maandId),
  });
  const volgorde = bestaande.reduce((max, p) => Math.max(max, p.volgorde), -1) + 1;

  const [nieuwPotje] = await db
    .insert(potjes)
    .values({
      maandId: input.maandId,
      naam,
      categorie: input.categorie,
      type: input.type,
      bedrag: euroNaarString(input.bedrag),
      volgorde,
    })
    .returning();

  revalidatePath("/overzicht");
  return { id: nieuwPotje.id };
}

export async function maakPotjeForm(
  maandId: number,
  categorie: Categorie,
  periode: string,
  formData: FormData
) {
  const naam = String(formData.get("naam") ?? "");
  const type = (String(formData.get("type") ?? "vast") === "variabel" ? "variabel" : "vast") as PotjeType;
  const bedragRuw = String(formData.get("bedrag") ?? "").replace(",", ".").trim();
  const bedrag = bedragRuw ? Number(bedragRuw) : null;

  await maakPotje({
    maandId,
    naam,
    categorie,
    type,
    bedrag: bedrag !== null && !Number.isNaN(bedrag) ? bedrag : null,
  });

  redirect(`/overzicht?periode=${periode}`);
}

export async function updatePotje(input: {
  potjeId: number;
  naam: string;
  type: PotjeType;
  bedrag: number | null;
}) {
  await requireSession();
  const naam = input.naam.trim();
  if (!naam) throw new Error("Naam is verplicht");

  await db
    .update(potjes)
    .set({ naam, type: input.type, bedrag: euroNaarString(input.bedrag) })
    .where(eq(potjes.id, input.potjeId));

  revalidatePath("/overzicht");
}

export async function updatePotjeForm(potjeId: number, periode: string, formData: FormData) {
  const naam = String(formData.get("naam") ?? "");
  const type = (String(formData.get("type") ?? "vast") === "variabel" ? "variabel" : "vast") as PotjeType;
  const bedragRuw = String(formData.get("bedrag") ?? "").replace(",", ".").trim();
  const bedrag = bedragRuw ? Number(bedragRuw) : null;

  await updatePotje({
    potjeId,
    naam,
    type,
    bedrag: bedrag !== null && !Number.isNaN(bedrag) ? bedrag : null,
  });

  redirect(`/overzicht?periode=${periode}`);
}

export async function verwijderPotje(potjeId: number) {
  await requireSession();
  await db.delete(potjes).where(eq(potjes.id, potjeId));
  revalidatePath("/overzicht");
}

export async function toggleAfgevinkt(potjeId: number, afgevinkt: boolean) {
  await requireSession();
  await db.update(potjes).set({ afgevinkt }).where(eq(potjes.id, potjeId));
  revalidatePath("/overzicht");
}
