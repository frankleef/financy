import Link from "next/link";
import { PotRow } from "./PotRow";
import { AddPotjeForm } from "./AddPotjeForm";
import { EditPotjeForm } from "./EditPotjeForm";
import { formatEuro } from "@/lib/format";
import type { CategorieGroep } from "@/lib/queries";

export function CategoryGroup({
  groep,
  maandId,
  periode,
  open,
  editingPotjeId,
}: {
  groep: CategorieGroep;
  maandId: number;
  periode: string;
  open: boolean;
  editingPotjeId: number | null;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between px-2 pb-1.5">
        <span className="text-xs font-bold tracking-wide text-ink-secondary">{groep.titel}</span>
        <span className="text-xs text-ink-faint">{formatEuro(groep.subtotaal)}</span>
      </div>
      <div className="overflow-hidden rounded-card border border-line-soft bg-white">
        {groep.potjes.map((potje) =>
          potje.id === editingPotjeId ? (
            <EditPotjeForm key={potje.id} potje={potje} periode={periode} />
          ) : (
            <PotRow key={potje.id} potje={potje} periode={periode} />
          )
        )}
        {open ? (
          <AddPotjeForm maandId={maandId} categorie={groep.categorie} periode={periode} />
        ) : (
          <Link
            href={`/overzicht?add=${groep.categorie}&periode=${periode}`}
            className="flex min-h-[52px] w-full items-center gap-2 border-t border-line-faint px-3.5 py-3 text-[13.5px] font-semibold text-teal first:border-t-0"
          >
            <PlusIcon />
            potje toevoegen
          </Link>
        )}
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
