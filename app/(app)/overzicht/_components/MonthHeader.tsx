import { MonthNav } from "./MonthNav";
import { IncomeInput } from "./IncomeInput";
import { TotalsStrip } from "./TotalsStrip";

export function MonthHeader({
  periode,
  maandId,
  nettoInkomen,
  ontvangen,
  toegewezen,
  resterend,
}: {
  periode: string;
  maandId: number;
  nettoInkomen: string | null;
  ontvangen: number;
  toegewezen: number;
  resterend: number;
}) {
  return (
    <div className="flex-none border-b border-line-soft bg-white px-5 pb-5 pt-4">
      <MonthNav periode={periode} />

      <div className="mt-4 rounded-[14px] border border-[#e7e4dc] bg-field px-4 py-3.5">
        <div className="text-[12.5px] font-semibold text-ink-secondary">netto inkomen deze maand</div>
        <IncomeInput maandId={maandId} initieelBedrag={nettoInkomen} />
      </div>

      <TotalsStrip ontvangen={ontvangen} toegewezen={toegewezen} resterend={resterend} />
    </div>
  );
}
