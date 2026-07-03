import { getMaandVoorPeriode, getVorigeMaand, groepeerPotjesPerCategorie } from "@/lib/queries";
import { standaardPeriode } from "@/lib/format";
import { MonthHeader } from "./_components/MonthHeader";
import { CategoryGroup } from "./_components/CategoryGroup";
import { EmptyMaandState } from "./_components/EmptyMaandState";
import { MaandAfrondenButton } from "./_components/MaandAfrondenButton";

export default async function OverzichtPage({
  searchParams,
}: {
  searchParams: Promise<{ periode?: string }>;
}) {
  const params = await searchParams;
  const periode = params.periode ?? standaardPeriode(new Date());
  const maand = await getMaandVoorPeriode(periode);

  if (!maand) {
    const vorigeMaand = await getVorigeMaand(periode);
    return <EmptyMaandState periode={periode} vorigeMaandId={vorigeMaand?.id ?? null} />;
  }

  const groepen = groepeerPotjesPerCategorie(maand.potjes);
  const toegewezen = maand.potjes.reduce((som, p) => som + Number(p.bedrag ?? 0), 0);
  const ontvangen = Number(maand.nettoInkomen ?? 0);
  const resterend = ontvangen - toegewezen;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <MonthHeader
        periode={periode}
        maandId={maand.id}
        nettoInkomen={maand.nettoInkomen}
        ontvangen={ontvangen}
        toegewezen={toegewezen}
        resterend={resterend}
        afgerond={maand.afgerond}
      />
      <div className="flex-1 px-3.5 pb-6">
        {groepen.map((groep) => (
          <CategoryGroup key={groep.categorie} groep={groep} maandId={maand.id} afgerond={maand.afgerond} />
        ))}
      </div>
      <MaandAfrondenButton maandId={maand.id} afgerond={maand.afgerond} />
    </div>
  );
}
