import { PotRow } from "./PotRow";
import { AddPotjeSection } from "./AddPotjeSection";
import { formatEuro } from "@/lib/format";
import type { CategorieGroep } from "@/lib/queries";

export function CategoryGroup({
  groep,
  maandId,
  afgerond,
}: {
  groep: CategorieGroep;
  maandId: number;
  afgerond: boolean;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between px-2 pb-1.5">
        <span className="text-xs font-bold tracking-wide text-ink-secondary">{groep.titel}</span>
        <span className="text-xs text-ink-faint">{formatEuro(groep.subtotaal)}</span>
      </div>
      <div className="overflow-hidden rounded-card border border-line-soft bg-white">
        {groep.potjes.map((potje) => (
          <PotRow key={potje.id} potje={potje} afgerond={afgerond} />
        ))}
        {!afgerond && <AddPotjeSection maandId={maandId} categorie={groep.categorie} />}
      </div>
    </div>
  );
}
