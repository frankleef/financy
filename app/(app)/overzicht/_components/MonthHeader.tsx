import Link from "next/link";
import { PotMark } from "@/components/PotMark";
import { formatPeriodeLabel } from "@/lib/format";
import { IncomeInput } from "./IncomeInput";
import { TotalsStrip } from "./TotalsStrip";

export function MonthHeader({
  periode,
  maandId,
  nettoInkomen,
  ontvangen,
  toegewezen,
  resterend,
  vorigePeriode,
}: {
  periode: string;
  maandId: number;
  nettoInkomen: string | null;
  ontvangen: number;
  toegewezen: number;
  resterend: number;
  vorigePeriode: string;
}) {
  return (
    <div className="flex-none border-b border-line-soft bg-white px-5 pb-5 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PotMark size={30} />
          <div className="text-xl font-bold tracking-tight">{formatPeriodeLabel(periode)}</div>
        </div>
        <Link
          href={`/overzicht?periode=${vorigePeriode}`}
          className="flex h-[38px] items-center gap-1.5 rounded-control border border-line-input px-3 text-[12.5px] font-semibold text-teal"
        >
          <ClockIcon />
          vorige maand
        </Link>
      </div>

      <div className="mt-4 rounded-[14px] border border-[#e7e4dc] bg-field px-4 py-3.5">
        <div className="text-[12.5px] font-semibold text-ink-secondary">netto inkomen deze maand</div>
        <IncomeInput maandId={maandId} initieelBedrag={nettoInkomen} />
      </div>

      <TotalsStrip ontvangen={ontvangen} toegewezen={toegewezen} resterend={resterend} />
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  );
}
