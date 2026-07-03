import { formatEuro } from "@/lib/format";

export function TotalsStrip({
  ontvangen,
  toegewezen,
  resterend,
}: {
  ontvangen: number;
  toegewezen: number;
  resterend: number;
}) {
  const negatief = resterend < 0;
  return (
    <div className="mt-3 flex gap-2">
      <TotaalKaart label="ontvangen" waarde={ontvangen} />
      <TotaalKaart label="toegewezen" waarde={toegewezen} />
      <TotaalKaart label="resterend" waarde={resterend} nadruk negatief={negatief} />
    </div>
  );
}

function TotaalKaart({
  label,
  waarde,
  nadruk,
  negatief,
}: {
  label: string;
  waarde: number;
  nadruk?: boolean;
  negatief?: boolean;
}) {
  return (
    <div
      className="flex-1 rounded-xl border px-2 py-2.5 text-center"
      style={{
        background: nadruk && !negatief ? "#e6f0ec" : "#fff",
        borderColor: nadruk && !negatief ? "#cfe0da" : "#eeece6",
      }}
    >
      <div
        className="text-[11px]"
        style={{
          color: negatief ? "#b4362f" : nadruk ? "#0f6e56" : "#6c6a64",
          fontWeight: nadruk ? 600 : 400,
        }}
      >
        {label}
      </div>
      <div
        className="mt-0.5 text-[15px] font-bold tabular-nums"
        style={{ color: negatief ? "#b4362f" : nadruk ? "#0f6e56" : "#1b1a17" }}
      >
        {formatEuro(waarde)}
      </div>
    </div>
  );
}
