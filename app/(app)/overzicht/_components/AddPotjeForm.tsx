import { maakPotjeForm } from "@/lib/actions";
import type { Categorie } from "@/drizzle/schema";
import { PotjeFormFields } from "./PotjeFormFields";

export function AddPotjeForm({
  maandId,
  categorie,
  periode,
}: {
  maandId: number;
  categorie: Categorie;
  periode: string;
}) {
  const action = maakPotjeForm.bind(null, maandId, categorie, periode);

  return (
    <form action={action} className="flex flex-col gap-3 border-t border-line-faint bg-field-alt px-3.5 py-4">
      <div className="text-xs font-bold text-ink-secondary">nieuw potje</div>
      <PotjeFormFields />
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
  );
}
