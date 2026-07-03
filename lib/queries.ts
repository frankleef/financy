import { asc, desc, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { maanden, potjes, type Categorie, type Potje } from "@/drizzle/schema";

export async function getMaandVoorPeriode(periode: string) {
  return db.query.maanden.findFirst({
    where: (m, { eq }) => eq(m.periode, periode),
    with: {
      potjes: {
        orderBy: [asc(potjes.volgorde)],
      },
    },
  });
}

export async function getVorigeMaand(periode: string) {
  return db.query.maanden.findFirst({
    where: lt(maanden.periode, periode),
    orderBy: [desc(maanden.periode)],
    with: {
      potjes: {
        orderBy: [asc(potjes.volgorde)],
      },
    },
  });
}

const CATEGORIE_VOLGORDE: Categorie[] = ["vaste_lasten", "doelen_sparen", "weekgeld"];

const CATEGORIE_LABELS: Record<Categorie, string> = {
  vaste_lasten: "vaste lasten",
  doelen_sparen: "doelen / sparen",
  weekgeld: "weekgeld",
};

export type CategorieGroep = {
  categorie: Categorie;
  titel: string;
  subtotaal: number;
  potjes: Potje[];
};

export function groepeerPotjesPerCategorie(alleP: Potje[]): CategorieGroep[] {
  return CATEGORIE_VOLGORDE.map((categorie) => {
    const potjesInCategorie = alleP.filter((p) => p.categorie === categorie);
    const subtotaal = potjesInCategorie.reduce((som, p) => som + Number(p.bedrag ?? 0), 0);
    return {
      categorie,
      titel: CATEGORIE_LABELS[categorie],
      subtotaal,
      potjes: potjesInCategorie,
    };
  });
}
