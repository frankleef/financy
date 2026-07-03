import { PotMark } from "@/components/PotMark";
import { maakLegeMaand, dupliceerMaand } from "@/lib/actions";
import { formatPeriodeLabel, vorigePeriode } from "@/lib/format";
import { MonthNav } from "./MonthNav";

export function EmptyMaandState({
  periode,
  vorigeMaandId,
}: {
  periode: string;
  vorigeMaandId: number | null;
}) {
  const legeAction = maakLegeMaand.bind(null, periode);
  const dupliceerAction = vorigeMaandId ? dupliceerMaand.bind(null, vorigeMaandId, periode) : null;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-none border-b border-line-soft bg-white px-5 pb-5 pt-4">
        <MonthNav periode={periode} />
        <div className="mt-4 rounded-[14px] border border-[#e7e4dc] bg-field px-4 py-3.5">
          <div className="text-[12.5px] font-semibold text-ink-secondary">netto inkomen deze maand</div>
          <div className="mt-1.5 text-[26px] font-bold text-line-input">€ 0,00</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-10 text-center">
        <PotMark size={60} className="opacity-90" />
        <div>
          <div className="text-lg font-bold">nog geen potjes</div>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
            begin met een schone maand, of neem je potjes van vorige maand over als startpunt.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2.5">
          {dupliceerAction && (
            <form action={dupliceerAction}>
              <button
                type="submit"
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-control bg-teal text-[15px] font-semibold text-white"
              >
                <CopyIcon />
                {formatPeriodeLabel(vorigePeriode(periode))} overnemen
              </button>
            </form>
          )}
          <form action={legeAction}>
            <button
              type="submit"
              className="h-[50px] w-full rounded-control border border-teal-border bg-white text-[15px] font-semibold text-teal"
            >
              leeg beginnen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  );
}
