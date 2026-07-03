import { updatePotjeForm, verwijderPotje } from "@/lib/actions";
import type { Potje } from "@/drizzle/schema";
import { PotjeFormFields } from "./PotjeFormFields";

export function EditPotjeForm({ potje, periode }: { potje: Potje; periode: string }) {
  const opslaanAction = updatePotjeForm.bind(null, potje.id, periode);
  const verwijderAction = verwijderPotje.bind(null, potje.id);

  return (
    <div className="flex flex-col gap-3 border-t border-line-faint bg-field-alt px-3.5 py-4">
      <div className="text-xs font-bold text-ink-secondary">potje bewerken</div>
      <form action={opslaanAction} className="flex flex-col gap-3">
        <PotjeFormFields
          defaultNaam={potje.naam}
          defaultType={potje.type}
          defaultBedrag={potje.bedrag ? Number(potje.bedrag).toFixed(2).replace(".", ",") : ""}
        />
        <div className="mt-0.5 flex gap-2.5">
          <button type="submit" className="h-[46px] flex-1 rounded-control bg-teal text-[14px] font-semibold text-white">
            bewaren
          </button>
          <a
            href={`/overzicht?periode=${periode}`}
            className="flex h-[46px] items-center rounded-control border border-line-input bg-white px-4 text-[14px] font-semibold text-ink-muted"
          >
            annuleren
          </a>
        </div>
      </form>
      <form action={verwijderAction}>
        <button type="submit" className="w-full text-center text-[13px] font-semibold text-destructive">
          potje verwijderen
        </button>
      </form>
    </div>
  );
}
