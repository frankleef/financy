const TIJDZONE = "Europe/Amsterdam";

export function formatEuro(bedrag: string | number | null | undefined): string {
  if (bedrag === null || bedrag === undefined) return "€ 0,00";
  const n = typeof bedrag === "string" ? Number(bedrag) : bedrag;
  if (Number.isNaN(n)) return "€ 0,00";
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
}

export function periodeVanDatum(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIJDZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(d);
  const jaar = parts.find((p) => p.type === "year")!.value;
  const maand = parts.find((p) => p.type === "month")!.value;
  return `${jaar}-${maand}`;
}

export function formatPeriodeLabel(periode: string): string {
  const [jaar, maand] = periode.split("-").map(Number);
  const datum = new Date(Date.UTC(jaar, maand - 1, 1));
  return new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric", timeZone: "UTC" }).format(datum);
}

export function vorigePeriode(periode: string): string {
  const [jaar, maand] = periode.split("-").map(Number);
  const vorigeMaand = maand === 1 ? 12 : maand - 1;
  const vorigJaar = maand === 1 ? jaar - 1 : jaar;
  return `${vorigJaar}-${String(vorigeMaand).padStart(2, "0")}`;
}

export function euroNaarString(bedrag: number | null): string | null {
  if (bedrag === null || Number.isNaN(bedrag)) return null;
  return bedrag.toFixed(2);
}
