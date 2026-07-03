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

export function volgendePeriode(periode: string): string {
  const [jaar, maand] = periode.split("-").map(Number);
  const volgendeMaand = maand === 12 ? 1 : maand + 1;
  const volgendJaar = maand === 12 ? jaar + 1 : jaar;
  return `${volgendJaar}-${String(volgendeMaand).padStart(2, "0")}`;
}

// Salaris komt rond de 24e binnen, dus vanaf de 20e van de maand is de
// vólgende maand de relevante om potjes voor te vullen.
const DAG_VOLGENDE_MAAND = 20;

export function standaardPeriode(d: Date): string {
  const dag = Number(
    new Intl.DateTimeFormat("en-CA", { timeZone: TIJDZONE, day: "2-digit" }).format(d)
  );
  const huidigePeriode = periodeVanDatum(d);
  return dag >= DAG_VOLGENDE_MAAND ? volgendePeriode(huidigePeriode) : huidigePeriode;
}

export function euroNaarString(bedrag: number | null): string | null {
  if (bedrag === null || Number.isNaN(bedrag)) return null;
  return bedrag.toFixed(2);
}

export function parseEuroInput(ruw: string): number | null {
  const genormaliseerd = ruw.replace(",", ".").trim();
  if (!genormaliseerd) return null;
  const n = Number(genormaliseerd);
  return Number.isNaN(n) ? null : n;
}
