import Link from "next/link";
import { PotMark } from "@/components/PotMark";
import { formatPeriodeLabel, vorigePeriode, volgendePeriode, standaardPeriode } from "@/lib/format";

export function MonthNav({ periode }: { periode: string }) {
  // Verder vooruitkijken dan de actuele maand (die zelf al rond de 20e
  // opschuift naar de volgende, zie standaardPeriode) heeft geen nut: er
  // is nog geen inkomen/potjes-startpunt voor iets verder in de toekomst.
  const toonVolgende = periode < standaardPeriode(new Date());

  return (
    <div className="flex items-center gap-1">
      <PotMark size={28} className="mr-1.5 flex-none" />
      <Link
        href={`/overzicht?periode=${vorigePeriode(periode)}`}
        aria-label="vorige maand"
        className="flex h-11 w-11 flex-none items-center justify-center text-ink-muted"
      >
        <ChevronIcon direction="left" />
      </Link>
      <div className="flex-1 text-center text-xl font-bold tracking-tight">
        {formatPeriodeLabel(periode)}
      </div>
      {toonVolgende ? (
        <Link
          href={`/overzicht?periode=${volgendePeriode(periode)}`}
          aria-label="volgende maand"
          className="flex h-11 w-11 flex-none items-center justify-center text-ink-muted"
        >
          <ChevronIcon direction="right" />
        </Link>
      ) : (
        <span className="h-11 w-11 flex-none" aria-hidden />
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}
